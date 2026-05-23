# СтройТрест-23 — Tech Stack

## О проекте
Репозиторий содержит сайт строительной компании и вспомогательный пайплайн для сборки видео-материалов проектов.

Есть две версии веб-интерфейса:
- Основная версия (обычно запуск на `6001`) — ветка `main`, папка `web/`.
- Альтернативная версия дизайна (обычно запуск на `6005`) — ветка `blueprint-home-6005` (в отдельном worktree).

## Языки
- TypeScript
- JavaScript
- Python
- HTML/CSS (через React/Next.js + Tailwind)
- Shell/CLI-команды (npm, ffmpeg, git)

## Веб-стек (`web/`)
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **shadcn/ui** (компонентная база)
- **Radix UI** (примитивы UI)
- **Framer Motion** + **Motion** (анимации)
- **Three.js** (3D/шейдерные визуальные эффекты)
- **Recharts** (графики)
- **Embla Carousel** (карусели)
- **React Hook Form** + **Zod** + `@hookform/resolvers` (формы и валидация)
- **Lucide React** (иконки)
- `clsx`, `class-variance-authority`, `tailwind-merge` (управление классами/вариантами)

## Инструменты качества и тестирования
- **ESLint 9** + `eslint-config-next`
- **Vitest 3**
- **Testing Library** (`@testing-library/react`, `@testing-library/jest-dom`)
- **jsdom**

## Медиа и видео-пайплайн (`tools/`)
- Python-скрипты:
  - `tools/rebuild_sirius_15_video.py`
  - `tools/rebuild_fok_video.py`
- Используемые библиотеки:
  - **OpenCV** (`cv2`)
  - **NumPy**
  - **Pillow** (`PIL`)
- Внешние бинарники:
  - **FFmpeg / ffprobe** (монтаж, фильтры, кодирование)
- Дополнительно в репозитории:
  - локальные наборы `pyscenedetect` / `SoraWatermarkCleaner` для вспомогательных задач обработки видео.

## Хранение больших файлов
- Используется **Git LFS** для `.mp4` в `web/public/media/` и `web/public/projects/` (настроено в `.gitattributes`).

## Ключевые директории
- `web/` — Next.js-приложение
- `tools/` — скрипты и утилиты видео-обработки
- `docs/plans/` — проектные планы и рабочие документы
- `web/public/projects/` — фото/видео ассеты проектов

## Быстрый старт
```bash
cd web
npm install
npm run dev -- --port 6001
```

Для альтернативной версии (`6005`) запускается соответствующая ветка/worktree `blueprint-home-6005`.
