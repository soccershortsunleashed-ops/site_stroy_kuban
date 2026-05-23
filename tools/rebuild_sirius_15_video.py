import argparse
import re
import subprocess
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(r"C:\Users\konst\site_stroy_kuban")
DEFAULT_CLIPS_DIR = ROOT / "Президентский лицей" / "Видео Кадры" / "Очищенные_видео_1-15"
DEFAULT_MUSIC_DIR = ROOT / "Без водяного знака"
WORK_DIR = ROOT / ".tmp_video" / "sirius_15"

TARGET_W = 1920
TARGET_H = 1080
FPS_OUT = 24.0

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
FINAL_LOGO_SEC = 2.0
DEFAULT_FINAL_FRAME_NAME = "Take_a_fullframe_2k_202602231836.jpeg"

TITLE_1 = (
    "Жилой корпус Интернат\n"
    "АНОО «Президентский Лицей «Сириус»\n"
    "Краснодарский край, пгт. Сириус, ул. Рекордов, д.15"
)
TITLE_2 = (
    "Реконструкция здания гостиницы «Сигма Сириус»\n"
    "под интернат для детей"
)
WORK_TEXT = (
    "Выполнено в качестве субгенподрядчика:\n"
    "Перепланировка, отделка, инженерные сети,\n"
    "благоустройство, фасады."
)


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def ffmpeg_bin() -> str:
    return "ffmpeg"


def clip_number(path: Path) -> int | None:
    m = re.match(r"^(\d+)", path.name)
    if not m:
        return None
    return int(m.group(1))


def parse_clip_numbers(value: str) -> set[int]:
    if not value.strip():
        return set()
    result: set[int] = set()
    for part in value.split(","):
        token = part.strip()
        if not token:
            continue
        n = int(token)
        if n < 1 or n > 15:
            raise RuntimeError(f"Номер клипа вне диапазона 1..15: {n}")
        result.add(n)
    return result


def parse_soft_seam(value: str) -> tuple[int, int] | None:
    token = value.strip()
    if not token:
        return None
    m = re.match(r"^\s*(\d+)\s*[-:>]+\s*(\d+)\s*$", token)
    if not m:
        raise RuntimeError("Формат --soft-seam: A-B, например 11-14")
    a = int(m.group(1))
    b = int(m.group(2))
    if not (1 <= a <= 15 and 1 <= b <= 15) or a == b:
        raise RuntimeError("Номера в --soft-seam должны быть в диапазоне 1..15 и различаться")
    return (a, b)


def get_clips(clips_dir: Path, exclude_nums: set[int] | None = None) -> list[tuple[int, Path]]:
    by_num: dict[int, Path] = {}
    for p in clips_dir.glob("*.mp4"):
        n = clip_number(p)
        if n is None:
            continue
        if 1 <= n <= 15:
            by_num[n] = p

    missing = [n for n in range(1, 16) if n not in by_num]
    if missing:
        raise RuntimeError(f"Не найдены обязательные клипы: {missing}")

    exclude = exclude_nums or set()
    selected_nums = [n for n in range(1, 16) if n not in exclude]
    if not selected_nums:
        raise RuntimeError("После исключения клипов последовательность пуста")

    return [(n, by_num[n]) for n in selected_nums]


def get_music(music_dir: Path) -> Path:
    tracks = sorted(music_dir.glob("*.mp3"))
    if not tracks:
        raise RuntimeError(f"В папке '{music_dir}' не найдена музыка (.mp3)")
    return tracks[0]


def read_meta(path: Path) -> tuple[int, float]:
    cap = cv2.VideoCapture(str(path))
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS) or FPS_OUT
    cap.release()
    return total, fps


def read_last_frame_gray(path: Path, scale=(256, 144)) -> np.ndarray:
    cap = cv2.VideoCapture(str(path))
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    if total <= 0:
        cap.release()
        raise RuntimeError(f"Пустой клип: {path}")
    cap.set(cv2.CAP_PROP_POS_FRAMES, max(0, total - 1))
    ok, fr = cap.read()
    if not ok:
        cap.set(cv2.CAP_PROP_POS_FRAMES, max(0, total - 2))
        ok, fr = cap.read()
    cap.release()
    if not ok:
        raise RuntimeError(f"Не удалось прочитать финальный кадр: {path}")
    fr = cv2.resize(fr, scale)
    return cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY).astype(np.float32)


def find_best_match_index(path: Path, ref: np.ndarray, scale=(256, 144)) -> tuple[int, float, int]:
    cap = cv2.VideoCapture(str(path))
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    if total <= 0:
        cap.release()
        raise RuntimeError(f"Пустой клип: {path}")
    best_idx = 0
    best_score = float("inf")
    idx = 0
    while True:
        ok, fr = cap.read()
        if not ok:
            break
        fr = cv2.resize(fr, scale)
        g = cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY).astype(np.float32)
        d = float(np.mean((g - ref) ** 2))
        if d < best_score:
            best_score = d
            best_idx = idx
            if best_score <= 0.01:
                break
        idx += 1
    cap.release()
    return best_idx, best_score, total


def find_font() -> Path:
    p = ROOT / "organetto-bold-semiexp.ttf"
    if not p.exists():
        raise RuntimeError("Не найден шрифт organetto-bold-semiexp.ttf")
    return p


def find_logo_source() -> Path:
    candidates = [
        ROOT / "web" / "public" / "brand-logo.jpg",
        ROOT / "web" / "public" / "projects" / "watermark-logo-rounded.png",
        ROOT / ".tmp_video" / "brand-logo-rounded.png",
    ]
    for p in candidates:
        if p.exists():
            return p
    raise RuntimeError("Не найден исходный логотип")


def centered_plate(
    draw: ImageDraw.ImageDraw,
    text: str,
    font: ImageFont.FreeTypeFont,
    top_y: int,
    min_w: int,
    max_w: int,
    pad_x: int,
    pad_y: int,
    spacing: int,
) -> tuple[tuple[int, int, int, int], tuple[int, int], int]:
    bbox = draw.multiline_textbbox(
        (0, 0), text, font=font, align="center", spacing=spacing, stroke_width=TEXT_STROKE_WIDTH
    )
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    plate_w = max(min_w, min(max_w, tw + 2 * pad_x))
    plate_h = th + 2 * pad_y
    x1 = (TARGET_W - plate_w) // 2
    y1 = top_y
    x2 = x1 + plate_w
    y2 = y1 + plate_h
    tx = (TARGET_W - tw) // 2
    ty = y1 + ((plate_h - th) // 2)
    return (x1, y1, x2, y2), (tx, ty), spacing


def make_assets(font_path: Path, logo_src: Path, final_frame_src: Path | None) -> tuple[Path, Path, Path, Path, Path]:
    WORK_DIR.mkdir(parents=True, exist_ok=True)
    plate1 = WORK_DIR / "plate1.png"
    plate2 = WORK_DIR / "plate2.png"
    plate3 = WORK_DIR / "plate3.png"
    wm_logo = WORK_DIR / "wm_logo.png"
    final_logo = WORK_DIR / "final_logo_screen.png"

    logo = Image.open(logo_src).convert("RGBA")

    wm = logo.resize((LOGO_W, LOGO_H), Image.Resampling.LANCZOS)
    mask = Image.new("L", (LOGO_W, LOGO_H), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, LOGO_W - 1, LOGO_H - 1), radius=LOGO_RADIUS, fill=255)
    wm.putalpha(mask)
    wm_arr = np.array(wm)
    wm_arr[..., 3] = (wm_arr[..., 3] * LOGO_OPACITY).astype(np.uint8)
    Image.fromarray(wm_arr, "RGBA").save(wm_logo)

    if final_frame_src is not None and final_frame_src.exists():
        src = Image.open(final_frame_src).convert("RGB")
        fitted = ImageOps.fit(src, (TARGET_W, TARGET_H), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
        fitted.convert("RGBA").save(final_logo)
    else:
        bg = Image.new("RGBA", (TARGET_W, TARGET_H), (220, 137, 47, 255))
        max_w = int(TARGET_W * 0.78)
        max_h = int(TARGET_H * 0.78)
        ratio = min(max_w / logo.width, max_h / logo.height)
        w2 = max(1, int(logo.width * ratio))
        h2 = max(1, int(logo.height * ratio))
        big_logo = logo.resize((w2, h2), Image.Resampling.LANCZOS)
        bg.alpha_composite(big_logo, ((TARGET_W - w2) // 2, (TARGET_H - h2) // 2))
        bg.save(final_logo)

    font_top = ImageFont.truetype(str(font_path), FONT_TOP_SIZE)
    font_work = ImageFont.truetype(str(font_path), FONT_WORK_SIZE)

    img1 = Image.new("RGBA", (TARGET_W, TARGET_H), (0, 0, 0, 0))
    d1 = ImageDraw.Draw(img1)
    r1, (tx1, ty1), sp1 = centered_plate(d1, TITLE_1, font_top, 20, 1460, 1780, 72, 34, 8)
    d1.rounded_rectangle(r1, radius=PLATE_RADIUS, fill=PLATE_COLOR)
    d1.multiline_text(
        (tx1, ty1),
        TITLE_1,
        font=font_top,
        fill=TEXT_COLOR,
        align="center",
        spacing=sp1,
        stroke_width=TEXT_STROKE_WIDTH,
        stroke_fill=TEXT_STROKE,
    )
    img1.save(plate1)

    img2 = Image.new("RGBA", (TARGET_W, TARGET_H), (0, 0, 0, 0))
    d2 = ImageDraw.Draw(img2)
    r2, (tx2, ty2), sp2 = centered_plate(d2, TITLE_2, font_top, 28, 1380, 1780, 72, 24, 8)
    d2.rounded_rectangle(r2, radius=PLATE_RADIUS, fill=PLATE_COLOR)
    d2.multiline_text(
        (tx2, ty2),
        TITLE_2,
        font=font_top,
        fill=TEXT_COLOR,
        align="center",
        spacing=sp2,
        stroke_width=TEXT_STROKE_WIDTH,
        stroke_fill=TEXT_STROKE,
    )
    img2.save(plate2)

    img3 = Image.new("RGBA", (TARGET_W, TARGET_H), (0, 0, 0, 0))
    d3 = ImageDraw.Draw(img3)
    r3, (tx3, ty3), sp3 = centered_plate(d3, WORK_TEXT, font_work, 612, 1520, 1780, 72, 24, 8)
    d3.rounded_rectangle(r3, radius=PLATE_RADIUS, fill=PLATE_COLOR)
    d3.multiline_text(
        (tx3, ty3),
        WORK_TEXT,
        font=font_work,
        fill=TEXT_COLOR,
        align="center",
        spacing=sp3,
        stroke_width=TEXT_STROKE_WIDTH,
        stroke_fill=TEXT_STROKE,
    )
    img3.save(plate3)

    return plate1, plate2, plate3, wm_logo, final_logo


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Rebuild 15-frame Sirius video with seam-matched cuts.")
    parser.add_argument("--clips-dir", type=Path, default=DEFAULT_CLIPS_DIR)
    parser.add_argument("--music-dir", type=Path, default=DEFAULT_MUSIC_DIR)
    parser.add_argument("--output", type=Path, default=None)
    parser.add_argument("--final-frame", type=Path, default=None)
    parser.add_argument("--no-final-frame-image", action="store_true")
    parser.add_argument("--clip15-sec", type=float, default=None)
    parser.add_argument(
        "--exclude-clips",
        type=str,
        default="",
        help="Comma-separated clip numbers to exclude, e.g. 12,13",
    )
    parser.add_argument(
        "--soft-seam",
        type=str,
        default="",
        help="Soft transition between adjacent clip numbers after exclusions, e.g. 11-14",
    )
    parser.add_argument(
        "--soft-seam-sec",
        type=float,
        default=0.45,
        help="Duration of dissolve transition in seconds",
    )
    parser.add_argument(
        "--soft-seam-next-start-frame",
        type=int,
        default=1,
        help="Force next clip start frame for soft seam if auto-trim is too deep",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    clips_dir: Path = args.clips_dir
    music_dir: Path = args.music_dir
    out_video: Path = args.output if args.output else clips_dir / "склейка_15кадров_финал_пересборка.mp4"
    final_frame: Path | None = args.final_frame
    no_final_frame_image: bool = bool(args.no_final_frame_image)
    clip15_sec: float | None = args.clip15_sec
    soft_seam_pair = parse_soft_seam(args.soft_seam)
    soft_seam_sec = float(args.soft_seam_sec)
    soft_seam_next_start_frame = int(args.soft_seam_next_start_frame)
    use_final_overlay = not no_final_frame_image

    if not clips_dir.exists():
        raise RuntimeError(f"Не найдена папка клипов: {clips_dir}")
    if not music_dir.exists():
        raise RuntimeError(f"Не найдена папка музыки: {music_dir}")
    if no_final_frame_image:
        final_frame = None
    elif final_frame is None:
        auto = clips_dir / DEFAULT_FINAL_FRAME_NAME
        if auto.exists():
            final_frame = auto
        else:
            root_auto = ROOT / DEFAULT_FINAL_FRAME_NAME
            if root_auto.exists():
                final_frame = root_auto

    exclude_clips = parse_clip_numbers(args.exclude_clips)
    clip_items = get_clips(clips_dir, exclude_clips)
    clip_nums = [n for n, _ in clip_items]
    clips = [p for _, p in clip_items]
    music = get_music(music_dir)
    font = find_font()
    logo_src = find_logo_source()
    meta = [read_meta(c) for c in clips]

    start_trim = [0] * len(clips)
    end_trim = [m[0] - 1 for m in meta]
    seam_report = []

    for i in range(len(clips) - 1):
        ref = read_last_frame_gray(clips[i])
        best_idx, score, total_next = find_best_match_index(clips[i + 1], ref)
        cut_start = min(best_idx + 1, max(0, total_next - 1))
        start_trim[i + 1] = max(start_trim[i + 1], cut_start)
        end_trim[i] = meta[i][0] - 1
        seam_report.append((clip_nums[i], clip_nums[i + 1], best_idx, cut_start, score))

    for i, (total, _fps) in enumerate(meta):
        s = max(0, int(start_trim[i]))
        e = min(total - 1, int(end_trim[i]))
        if e <= s:
            s = max(0, total - 2)
            e = total - 1
        start_trim[i], end_trim[i] = s, e

    soft_left_idx: int | None = None
    soft_right_idx: int | None = None
    if soft_seam_pair is not None:
        left_num, right_num = soft_seam_pair
        if left_num in clip_nums and right_num in clip_nums:
            li = clip_nums.index(left_num)
            ri = clip_nums.index(right_num)
            if ri != li + 1:
                raise RuntimeError(
                    f"Пара --soft-seam {left_num}-{right_num} не соседняя после исключений: {clip_nums}"
                )
            soft_left_idx = li
            soft_right_idx = ri
            # Keep more content from the right clip if seam matching cut too much.
            start_trim[ri] = min(start_trim[ri], max(0, soft_seam_next_start_frame))

    if clip15_sec is not None and 15 in clip_nums:
        if clip15_sec <= 0:
            raise RuntimeError("--clip15-sec должен быть > 0")
        clip15_frames = max(1, int(round(clip15_sec * FPS_OUT)))
        idx15 = clip_nums.index(15)
        s15 = start_trim[idx15]
        e15_max = meta[idx15][0] - 1
        e15 = min(e15_max, s15 + clip15_frames - 1)
        if e15 <= s15:
            e15 = min(e15_max, s15 + 1)
        end_trim[idx15] = e15

    durations = [((end_trim[i] - start_trim[i] + 1) / FPS_OUT) for i in range(len(clips))]
    starts = [0.0]
    for d in durations[:-1]:
        starts.append(starts[-1] + d)
    ends = [starts[i] + durations[i] for i in range(len(clips))]
    total_duration = sum(durations)
    soft_applied_sec = 0.0
    if soft_left_idx is not None and soft_right_idx is not None:
        max_soft = min(
            soft_seam_sec,
            max(0.0, durations[soft_left_idx] - 0.08),
            max(0.0, durations[soft_right_idx] - 0.08),
        )
        if max_soft >= 0.08:
            soft_applied_sec = max_soft
            total_duration -= soft_applied_sec

    plate1_start = starts[0] + 0.2
    plate1_end = max(plate1_start + 1.2, ends[0] - 0.2)

    plate2_start = 15.0
    plate2_end = 20.0
    plate3_start = 40.0
    plate3_end = 46.0

    final_logo_start = max(0.0, total_duration - FINAL_LOGO_SEC)
    fade_start = max(0.0, total_duration - FADE_OUT_SEC)

    plate1, plate2, plate3, wm_logo, final_logo = make_assets(font, logo_src, final_frame)
    filter_path = WORK_DIR / "filter.txt"
    out_video.parent.mkdir(parents=True, exist_ok=True)

    lines = []
    for i in range(len(clips)):
        s = start_trim[i]
        e = end_trim[i] + 1
        lines.append(
            f"[{i}:v]trim=start_frame={s}:end_frame={e},setpts=PTS-STARTPTS,"
            f"scale={TARGET_W}:{TARGET_H}:force_original_aspect_ratio=increase,crop={TARGET_W}:{TARGET_H},"
            f"fps={int(FPS_OUT)},format=yuv420p[v{i}]"
        )

    if soft_applied_sec > 0.0 and soft_left_idx is not None and soft_right_idx is not None:
        if soft_left_idx == 0:
            left_label = "[v0]"
        else:
            left_inputs = "".join(f"[v{i}]" for i in range(soft_left_idx + 1))
            lines.append(f"{left_inputs}concat=n={soft_left_idx + 1}:v=1:a=0[vleft]")
            left_label = "[vleft]"

        left_duration = sum(durations[: soft_left_idx + 1])
        xfade_offset = max(0.0, left_duration - soft_applied_sec)
        lines.append(f"{left_label}settb=AVTB[vlefttb]")
        lines.append(f"[v{soft_right_idx}]settb=AVTB[vrighttb]")
        lines.append(
            f"[vlefttb][vrighttb]"
            f"xfade=transition=dissolve:duration={soft_applied_sec:.3f}:offset={xfade_offset:.3f}[vxf]"
        )

        if soft_right_idx == len(clips) - 1:
            lines.append("[vxf]null[vcat]")
        else:
            post_inputs = "".join(f"[v{i}]" for i in range(soft_right_idx + 1, len(clips)))
            post_n = 1 + (len(clips) - soft_right_idx - 1)
            lines.append(f"[vxf]{post_inputs}concat=n={post_n}:v=1:a=0[vcat]")
    else:
        concat_inputs = "".join(f"[v{i}]" for i in range(len(clips)))
        lines.append(f"{concat_inputs}concat=n={len(clips)}:v=1:a=0[vcat]")
    pi = len(clips)
    lines.append(f"[vcat][{pi}:v]overlay=0:0:enable='between(t,{plate1_start:.3f},{plate1_end:.3f})'[v1]")
    lines.append(f"[v1][{pi + 1}:v]overlay=0:0:enable='between(t,{plate2_start:.3f},{plate2_end:.3f})'[v2]")
    lines.append(f"[v2][{pi + 2}:v]overlay=0:0:enable='between(t,{plate3_start:.3f},{plate3_end:.3f})'[v3]")
    lines.append(f"[v3][{pi + 3}:v]overlay={LOGO_X}:{LOGO_Y}:format=auto[v4]")
    if use_final_overlay:
        lines.append(f"[v4][{pi + 4}:v]overlay=0:0:enable='gte(t,{final_logo_start:.3f})'[vout]")
    else:
        lines.append("[v4]null[vout]")
    lines.append(
        f"[{pi + 5}:a]atrim=0:{total_duration:.3f},asetpts=PTS-STARTPTS,"
        f"afade=t=out:st={fade_start:.3f}:d={FADE_OUT_SEC:.3f}[aout]"
    )

    filter_path.write_text(";\n".join(lines), encoding="utf-8")

    cmd = [ffmpeg_bin(), "-y"]
    for c in clips:
        cmd += ["-i", str(c)]
    cmd += ["-i", str(plate1), "-i", str(plate2), "-i", str(plate3), "-i", str(wm_logo), "-i", str(final_logo), "-i", str(music)]
    cmd += [
        "-filter_complex_script",
        str(filter_path),
        "-map",
        "[vout]",
        "-map",
        "[aout]",
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-crf",
        "18",
        "-r",
        str(int(FPS_OUT)),
        "-pix_fmt",
        "yuv420p",
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        "-movflags",
        "+faststart",
        str(out_video),
    ]

    print("--- selected clips ---")
    print(",".join(str(n) for n in clip_nums))
    print("--- seam match summary ---")
    for a, b, m_idx, cut, score in seam_report:
        print(f"{a:02d}->{b:02d}: best_match={m_idx}, next_start={cut}, mse={score:.4f}")
    print("--- trims ---")
    for i, c in enumerate(clips, 1):
        print(f"{i:02d}. {c.name}: start={start_trim[i-1]} end={end_trim[i-1]} dur={durations[i-1]:.2f}s")
    print(f"Total duration: {total_duration:.2f}s")
    if soft_applied_sec > 0.0 and soft_left_idx is not None and soft_right_idx is not None:
        print(
            f"Soft seam: {clip_nums[soft_left_idx]}->{clip_nums[soft_right_idx]}, "
            f"duration={soft_applied_sec:.2f}s, forced_start={start_trim[soft_right_idx]}"
        )
    print(f"Plate1: {plate1_start:.2f}-{plate1_end:.2f}")
    print(f"Plate2: {plate2_start:.2f}-{plate2_end:.2f}")
    print(f"Plate3: {plate3_start:.2f}-{plate3_end:.2f}")
    if use_final_overlay:
        print(f"Final logo screen starts at: {final_logo_start:.2f}s")
    else:
        print("Final logo screen overlay: disabled")

    run(cmd)
    print("saved:", out_video)


if __name__ == "__main__":
    main()
