import cv2
import numpy as np
import re
import subprocess
import shutil
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(r"C:\Users\konst\site_stroy_kuban")
WEB_PROJECTS = ROOT / "web" / "public" / "projects"
FFMPEG = Path(r"C:\Program Files\Topaz Labs LLC\Topaz Video AI\ffmpeg.exe")

# Axiom constants for all video assemblies (1920x1080)
TARGET_W = 1920
TARGET_H = 1080
LOGO_X = 1708
LOGO_Y = 936
LOGO_W = 120
LOGO_H = 120
LOGO_RADIUS = 16
LOGO_OPACITY = 0.62
PLATE_COLOR = (220, 137, 47, 155)
PLATE_RADIUS = 30
TEXT_COLOR = (245, 245, 245, 255)
TEXT_STROKE = (35, 35, 35, 180)
TEXT_STROKE_WIDTH = 2
FONT_TOP_SIZE = 30
FONT_WORK_SIZE = 36
FADE_OUT_SEC = 2.5


def find_source_dir() -> Path:
    preferred = ROOT / "Без водяного знака"
    if preferred.is_dir():
        numbered = [f for f in preferred.glob("*.mp4") if re.match(r"^\d+", f.name)]
        if len(numbered) >= 12:
            return preferred
    for p in ROOT.iterdir():
        if p.is_dir() and sum(1 for f in p.glob("*.mp4") if re.match(r"^\d+", f.name)) >= 12:
            return p
    raise RuntimeError("Не найдена папка с 12 кадрами")


def read_meta(path: Path):
    cap = cv2.VideoCapture(str(path))
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS) or 24.0
    cap.release()
    return total, fps


def load_frames(path: Path, take_start=True, n=90, scale=(256, 144)):
    cap = cv2.VideoCapture(str(path))
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS) or 24.0
    start = 0 if take_start else max(0, total - n)
    cap.set(cv2.CAP_PROP_POS_FRAMES, start)
    frames = []
    for _ in range(min(n, total)):
        ok, fr = cap.read()
        if not ok:
            break
        fr = cv2.resize(fr, scale)
        g = cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY).astype(np.float32)
        frames.append(g)
    cap.release()
    return np.array(frames), total, fps


def find_organetto_bold_semi_exp_cyr() -> Path:
    fixed = ROOT / "organetto-bold-semiexp.ttf"
    if fixed.exists():
        return fixed

    preferred = ROOT / "tools" / "Organetto_Font_unpacked"
    if preferred.exists():
        hit = next(preferred.rglob("Organetto-BoldSemiExp.ttf"), None)
        if hit:
            return hit

    for root in [Path(r"C:\Windows\Fonts"), ROOT]:
        if not root.exists():
            continue
        for p in root.rglob("*.ttf"):
            if p.name.lower() == "organetto-boldsemiexp.ttf":
                return p
    raise RuntimeError("Шрифт Organetto-BoldSemiExp.ttf с кириллицей не найден")


def main():
    source_dir = find_source_dir()

    clips = sorted(
        [f for f in source_dir.glob("*.mp4") if re.match(r"^\d+", f.name)],
        key=lambda p: int(re.match(r"^(\d+)", p.name).group(1)),
    )
    if len(clips) != 12:
        raise RuntimeError(f"Ожидалось 12 клипов, найдено {len(clips)}")

    music = next((f for f in source_dir.glob("*.mp3") if "Retro_Wave_Mix_2" in f.name), None)
    if music is None:
        raise RuntimeError("Музыка не найдена")

    organetto = find_organetto_bold_semi_exp_cyr()

    logo_src = ROOT / "web" / "public" / "brand-logo.jpg"
    if not logo_src.exists():
        raise RuntimeError("Логотип brand-logo.jpg не найден")

    meta = [read_meta(c) for c in clips]
    start_trim = [0] * len(clips)
    end_trim = [m[0] - 1 for m in meta]

    # Стыки по аксиоме: последний кадр текущего клипа -> совпадение в следующем
    for i in range(len(clips) - 1):
        last_a, a_total, _ = load_frames(clips[i], take_start=False, n=1)
        b_all, b_total, _ = load_frames(clips[i + 1], take_start=True, n=meta[i + 1][0])
        if len(last_a) == 0 or len(b_all) == 0:
            continue
        ref = last_a[-1]
        d = ((b_all - ref) ** 2).mean(axis=(1, 2))
        best_ib = int(np.argmin(d))
        # Начинаем со следующего кадра после совпавшего, чтобы убрать дубль.
        cut_start = min(best_ib + 1, b_total - 1)
        start_trim[i + 1] = max(start_trim[i + 1], cut_start)
        end_trim[i] = a_total - 1

    # Клапан безопасности
    for i, (total, fps) in enumerate(meta):
        s = max(0, int(start_trim[i]))
        e = min(total - 1, int(end_trim[i]))
        if e <= s:
            s, e = max(0, total - 2), total - 1
        start_trim[i], end_trim[i] = s, e

    fps_out = 24.0
    clip_durations = [((end_trim[i] - start_trim[i] + 1) / fps_out) for i in range(len(clips))]
    starts = [0.0]
    for d in clip_durations[:-1]:
        starts.append(starts[-1] + d)
    ends = [starts[i] + clip_durations[i] for i in range(len(clips))]
    total_duration = sum(clip_durations)

    text1_start = starts[0] + 0.35
    text1_end = max(text1_start + 1.5, ends[0] - 0.35)
    text2_start = starts[4] + 0.35
    text2_end = max(text2_start + 2.0, ends[4] - 0.35)

    work = ROOT / ".tmp_video" / "rebuild"
    work.mkdir(parents=True, exist_ok=True)

    plate1 = work / "plate1.png"
    plate2 = work / "plate2.png"
    wm = work / "wm_logo.png"
    filter_script = work / "filter.txt"
    out_ascii = work / "fok_rebuild.mp4"

    # Водяной знак
    logo = Image.open(logo_src).convert("RGBA").resize((LOGO_W, LOGO_H), Image.Resampling.LANCZOS)
    mask = Image.new("L", (LOGO_W, LOGO_H), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, LOGO_W - 1, LOGO_H - 1), radius=LOGO_RADIUS, fill=255)
    logo.putalpha(mask)
    arr = np.array(logo)
    arr[..., 3] = (arr[..., 3] * LOGO_OPACITY).astype(np.uint8)
    Image.fromarray(arr, "RGBA").save(wm)

    # Плашки с текстом
    W, H = TARGET_W, TARGET_H
    font1 = ImageFont.truetype(str(organetto), FONT_TOP_SIZE)
    font2 = ImageFont.truetype(str(organetto), FONT_WORK_SIZE)

    def centered_plate(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont,
                       top_y: int, min_w: int, max_w: int, pad_x: int, pad_y: int, spacing: int):
        bbox = draw.multiline_textbbox(
            (0, 0), text, font=font, align="center", spacing=spacing, stroke_width=TEXT_STROKE_WIDTH
        )
        tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
        plate_w = max(min_w, min(max_w, tw + 2 * pad_x))
        plate_h = th + 2 * pad_y
        x1 = (W - plate_w) // 2
        y1 = top_y
        x2 = x1 + plate_w
        y2 = y1 + plate_h
        tx = (W - tw) // 2
        ty = y1 + ((plate_h - th) // 2)
        return (x1, y1, x2, y2), (tx, ty), spacing

    img1 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d1 = ImageDraw.Draw(img1)
    text1 = (
        "Физкультурно-оздоровительный комплекс\n"
        "«Центр художественной гимнастики»\n"
        "Краснодарский край, пгт. Сириус, ул. Триумфальная, 7"
    )
    r1, (tx1, ty1), spacing1 = centered_plate(
        d1, text1, font1, top_y=20, min_w=1360, max_w=1760, pad_x=72, pad_y=24, spacing=8
    )
    d1.rounded_rectangle(r1, radius=PLATE_RADIUS, fill=PLATE_COLOR)
    d1.multiline_text(
        (tx1, ty1),
        text1,
        font=font1,
        fill=TEXT_COLOR,
        align="center",
        spacing=spacing1,
        stroke_width=TEXT_STROKE_WIDTH,
        stroke_fill=TEXT_STROKE,
    )
    img1.save(plate1)

    img2 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d2 = ImageDraw.Draw(img2)
    text2 = (
        "Выполнено в качестве подрядчика:\n"
        "Напыляемая гидроизоляция фасадов,\n"
        "инъектирование и наружное\n"
        "армирование несущих монолитных\n"
        "конструкций,\n"
        "теплоизоляционная штукатурка, отделка."
    )
    r2, (tx2, ty2), spacing2 = centered_plate(
        d2, text2, font2, top_y=580, min_w=1480, max_w=1760, pad_x=78, pad_y=24, spacing=8
    )
    d2.rounded_rectangle(r2, radius=PLATE_RADIUS, fill=PLATE_COLOR)
    d2.multiline_text(
        (tx2, ty2),
        text2,
        font=font2,
        fill=TEXT_COLOR,
        align="center",
        spacing=spacing2,
        stroke_width=TEXT_STROKE_WIDTH,
        stroke_fill=TEXT_STROKE,
    )
    img2.save(plate2)

    # Filter graph
    lines = []
    for i in range(len(clips)):
        s = start_trim[i]
        e = end_trim[i] + 1
        lines.append(
            f"[{i}:v]trim=start_frame={s}:end_frame={e},setpts=PTS-STARTPTS,"
            f"scale={TARGET_W}:{TARGET_H}:force_original_aspect_ratio=increase,crop={TARGET_W}:{TARGET_H},"
            "fps=24,format=yuv420p"
            f"[v{i}]"
        )

    concat_inputs = "".join(f"[v{i}]" for i in range(len(clips)))
    lines.append(f"{concat_inputs}concat=n={len(clips)}:v=1:a=0[vcat]")
    lines.append(f"[vcat][12:v]overlay=0:0:enable='between(t,{text1_start:.3f},{text1_end:.3f})'[vtxt1]")
    lines.append(f"[vtxt1][13:v]overlay=0:0:enable='between(t,{text2_start:.3f},{text2_end:.3f})'[vtxt2]")
    lines.append(f"[vtxt2][14:v]overlay={LOGO_X}:{LOGO_Y}:format=auto[vout]")

    fade_d = FADE_OUT_SEC
    fade_st = max(0.0, total_duration - fade_d)
    lines.append(f"[15:a]atrim=0:{total_duration:.3f},afade=t=out:st={fade_st:.3f}:d={fade_d:.3f}[aout]")

    filter_script.write_text(";\n".join(lines), encoding="utf-8")

    cmd = [str(FFMPEG), "-y"]
    for c in clips:
        cmd += ["-i", str(c)]
    cmd += ["-i", str(plate1), "-i", str(plate2), "-i", str(wm), "-i", str(music)]
    cmd += [
        "-filter_complex_script", str(filter_script),
        "-map", "[vout]", "-map", "[aout]",
        "-c:v", "h264_mf", "-b:v", "12M", "-maxrate", "14M", "-bufsize", "24M",
        "-c:a", "aac", "-b:a", "192k",
        "-movflags", "+faststart",
        str(out_ascii),
    ]

    print("--- trim summary ---")
    for i, c in enumerate(clips, 1):
        print(f"{i:02d}. {c.name}: start={start_trim[i-1]} end={end_trim[i-1]} dur={clip_durations[i-1]:.2f}s")
    print(f"Total duration: {total_duration:.2f}s")

    subprocess.run(cmd, check=True)

    web_video = WEB_PROJECTS / "fok-sirius-final.mp4"
    web_poster = WEB_PROJECTS / "fok-sirius-poster.jpg"

    subprocess.run([
        str(FFMPEG), "-y", "-ss", "00:00:01.000", "-i", str(out_ascii),
        "-frames:v", "1", "-q:v", "2", str(web_poster)
    ], check=True)

    shutil.copy2(out_ascii, web_video)

    # Дополнительная копия в исходную папку
    final_name = "склейка_12кадров_финал_пересборка.mp4"
    shutil.copy2(out_ascii, source_dir / final_name)

    print("saved:", web_video)
    print("saved:", source_dir / final_name)


if __name__ == "__main__":
    main()
