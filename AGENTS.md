# Project Rules

## UI Components Policy

- For this business site, all UI components must come from `shadcn/ui` (registry `@shadcn`).
- Do not create custom UI components when a `shadcn` component exists.
- Build pages by composing `shadcn` components and variants.
- If a required component is not available in `shadcn`, stop and ask for explicit approval before implementing a custom one.

## Video Assembly Policy (Mandatory)

- These rules are mandatory for every request like: "склей видео", "пересобери видео", "нанеси плашки/текст", "добавь водяной знак".
- Source clips: use numbered clips in `Без водяного знака` (`1..N`) in numeric order.

### Watermark Logo (Axiom)

- Target frame: `1920x1080`.
- Logo position is fixed and immutable: `x=1708`, `y=936` (right-bottom).
- Logo size: `120x120`.
- Logo corner radius: `16px`.
- Logo opacity: `0.62` (62%).
- Always use this position/size/opacity unless user explicitly asks to change.

### Font (Axiom)

- Use only `Organetto` with Cyrillic support.
- Default required face: `Organetto-BoldSemiExp.ttf`.
- Fixed font source path (single source of truth): `c:\Users\konst\site_stroy_kuban\organetto-bold-semiexp.ttf`.
- Relative path in repo: `organetto-bold-semiexp.ttf`.
- Any other font is forbidden unless user explicitly overrides.

### Text Plates (Axiom)

- Plate color is fixed orange: `RGBA(220, 137, 47, 155)`.
- Plate corner radius is fixed: `30px`.
- Text color: `RGBA(245, 245, 245, 255)`.
- Text stroke: `RGBA(35, 35, 35, 180)`, stroke width `2`.
- Default font sizes (Organetto Bold SemiExp):
  - top/title plate: `30pt`
  - work-description plate: `36pt`

### Seamless Splice Rule (Axiom)

- Splicing method is strict:
  1. Take the last frame of clip `i`.
  2. Find the identical/closest frame in clip `i+1`.
  3. Cut redundant frames in clip `i+1` by this match.
  4. Start clip `i+1` from the frame after the matched one.
- Do not apply arbitrary trims unrelated to frame matching unless user explicitly requests.

### Audio Rule

- Remove original clip audio tracks.
- Add one chosen music track over the final assembled video.
- Trim music exactly to final video duration.
- Apply fade-out at the end: `2.5s` (allowed range `2-3s` only if user asks).
