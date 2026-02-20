# StroyTrust-23 Immersive Animation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Добавить иммерсивную бизнес-анимацию на страницы `Главная`, `Процесс`, `Проекты` с балансом визуала и производительности, сохранив русскоязычный интерфейс.

**Architecture:** Поверх текущих секций добавляется слой переиспользуемых анимационных примитивов (`page reveal`, `parallax`, `count up`, `scroll progress`) и единые токены движения. Тяжелые эффекты запускаются только в зоне видимости и упрощаются на мобильных устройствах и в режиме `prefers-reduced-motion`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Shadcn UI, ESLint.

---

## Связанные навыки

- `@superpowers/test-driven-development`
- `@superpowers/systematic-debugging`
- `@superpowers/verification-before-completion`

### Task 1: Подготовить минимальную тестовую основу для анимационных утилит

**Files:**
- Modify: `web/package.json`
- Create: `web/vitest.config.ts`
- Create: `web/vitest.setup.ts`
- Create: `web/lib/__tests__/motion-tokens.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest"
import { motionTokens } from "@/lib/motion-tokens"

describe("motion tokens", () => {
  it("contains balanced durations", () => {
    expect(motionTokens.reveal.duration).toBeGreaterThan(0.4)
  })
})
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- motion-tokens`
Expected: FAIL (`motion-tokens` module not found)

**Step 3: Write minimal implementation**

Добавить `vitest` и базовый конфиг запуска тестов.

**Step 4: Run test to verify it passes**

Run: `npm run test -- motion-tokens`
Expected: PASS

**Step 5: Commit**

```bash
git add web/package.json web/vitest.config.ts web/vitest.setup.ts web/lib/__tests__/motion-tokens.test.ts
git commit -m "test: add vitest baseline for animation utilities"
```

### Task 2: Ввести единые токены движения и режим упрощенной анимации

**Files:**
- Create: `web/lib/motion-tokens.ts`
- Create: `web/lib/use-motion-mode.ts`
- Test: `web/lib/__tests__/motion-tokens.test.ts`

**Step 1: Write the failing test**

```ts
it("exposes reduced profile", () => {
  expect(motionTokens.reduced.revealDuration).toBe(0)
})
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- motion-tokens`
Expected: FAIL (`reduced` profile missing)

**Step 3: Write minimal implementation**

Создать токены длительностей/смещений и хук, который учитывает `prefers-reduced-motion` + мобильный breakpoint.

**Step 4: Run test to verify it passes**

Run: `npm run test -- motion-tokens`
Expected: PASS

**Step 5: Commit**

```bash
git add web/lib/motion-tokens.ts web/lib/use-motion-mode.ts web/lib/__tests__/motion-tokens.test.ts
git commit -m "feat: add centralized motion tokens and motion mode hook"
```

### Task 3: Собрать переиспользуемые анимационные примитивы

**Files:**
- Create: `web/components/animation/page-reveal.tsx`
- Create: `web/components/animation/parallax-layer.tsx`
- Create: `web/components/animation/count-up.tsx`
- Create: `web/components/animation/scroll-progress.tsx`
- Create: `web/components/animation/index.ts`
- Test: `web/components/animation/__tests__/count-up.test.tsx`

**Step 1: Write the failing test**

```tsx
it("renders final number when reduced motion is on", () => {
  // render CountUp with reduced mode
  // expect final value immediately
})
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- count-up`
Expected: FAIL (`CountUp` not implemented)

**Step 3: Write minimal implementation**

Реализовать 4 примитива на Framer Motion с параметрами из `motion-tokens`.

**Step 4: Run test to verify it passes**

Run: `npm run test -- count-up`
Expected: PASS

**Step 5: Commit**

```bash
git add web/components/animation web/components/animation/__tests__/count-up.test.tsx
git commit -m "feat: add reusable immersive animation primitives"
```

### Task 4: Интегрировать иммерсивные эффекты на Главной странице

**Files:**
- Modify: `web/app/page.tsx`
- Modify: `web/components/sections/reference-intro.tsx`
- Modify: `web/components/sections/home-hero.tsx`
- Modify: `web/components/sections/kpi-strip.tsx`
- Modify: `web/components/sections/key-activities-bento.tsx`
- Modify: `web/components/sections/project-stats-chart.tsx`

**Step 1: Write the failing test**

```tsx
it("shows KPI numbers with animation wrappers", () => {
  // render home page
  // expect count-up role/data-attribute present
})
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- home-immersive`
Expected: FAIL (no animation wrappers)

**Step 3: Write minimal implementation**

Подключить `PageReveal`, `ParallaxLayer`, `CountUp`; закрепить только первый экран и блок KPI.

**Step 4: Run test to verify it passes**

Run: `npm run test -- home-immersive`
Expected: PASS

**Step 5: Commit**

```bash
git add web/app/page.tsx web/components/sections/reference-intro.tsx web/components/sections/home-hero.tsx web/components/sections/kpi-strip.tsx web/components/sections/key-activities-bento.tsx web/components/sections/project-stats-chart.tsx
git commit -m "feat: add immersive motion to home page"
```

### Task 5: Интегрировать сцену прогресса на странице Процесс

**Files:**
- Create: `web/components/sections/process-immersive-list.tsx`
- Modify: `web/app/process/page.tsx`
- Test: `web/components/sections/__tests__/process-immersive-list.test.tsx`

**Step 1: Write the failing test**

```tsx
it("highlights active step as scroll index changes", () => {
  // render with mocked index
  // expect active card class present
})
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- process-immersive`
Expected: FAIL (component missing)

**Step 3: Write minimal implementation**

Вынести список этапов в отдельный компонент с прогресс-линией и мягким переключением активного шага.

**Step 4: Run test to verify it passes**

Run: `npm run test -- process-immersive`
Expected: PASS

**Step 5: Commit**

```bash
git add web/components/sections/process-immersive-list.tsx web/app/process/page.tsx web/components/sections/__tests__/process-immersive-list.test.tsx
git commit -m "feat: add immersive progress scene to process page"
```

### Task 6: Интегрировать фокус активного проекта на странице Проекты

**Files:**
- Modify: `web/app/projects/page.tsx`
- Modify: `web/components/sections/projects-gallery.tsx`
- Test: `web/components/sections/__tests__/projects-gallery-focus.test.tsx`

**Step 1: Write the failing test**

```tsx
it("marks one project card as active focus", () => {
  // render gallery
  // expect one active card marker
})
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- projects-focus`
Expected: FAIL (active focus behavior missing)

**Step 3: Write minimal implementation**

Добавить вычисление активной карточки, легкий масштаб, приглушение соседних карточек и поэтапный показ метаданных.

**Step 4: Run test to verify it passes**

Run: `npm run test -- projects-focus`
Expected: PASS

**Step 5: Commit**

```bash
git add web/app/projects/page.tsx web/components/sections/projects-gallery.tsx web/components/sections/__tests__/projects-gallery-focus.test.tsx
git commit -m "feat: add immersive active-project focus behavior"
```

### Task 7: Ввести защиту производительности и адаптивные ограничения

**Files:**
- Modify: `web/components/animation/parallax-layer.tsx`
- Modify: `web/components/animation/page-reveal.tsx`
- Modify: `web/components/sections/process-immersive-list.tsx`
- Modify: `web/components/sections/projects-gallery.tsx`
- Create: `web/lib/__tests__/use-motion-mode.test.ts`

**Step 1: Write the failing test**

```ts
it("returns reduced mode for small viewport", () => {
  // mock mobile viewport
  // expect reduced mode true
})
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- motion-mode`
Expected: FAIL (mobile reduction not implemented)

**Step 3: Write minimal implementation**

Отключить длинные закрепления на мобильных; ограничить интенсивность параллакса; запускать эффекты только при `inView`.

**Step 4: Run test to verify it passes**

Run: `npm run test -- motion-mode`
Expected: PASS

**Step 5: Commit**

```bash
git add web/components/animation/parallax-layer.tsx web/components/animation/page-reveal.tsx web/components/sections/process-immersive-list.tsx web/components/sections/projects-gallery.tsx web/lib/__tests__/use-motion-mode.test.ts
git commit -m "perf: add adaptive motion safeguards for mobile and reduced mode"
```

### Task 8: Проверить русскоязычность и регрессии по контенту

**Files:**
- Modify: `web/app/process/page.tsx` (если останутся англицизмы)
- Modify: `web/app/projects/page.tsx` (если останутся англицизмы)
- Modify: `web/components/sections/*.tsx` (точечно по результатам проверки)

**Step 1: Write the failing check**

Run: `rg -n "[A-Za-z]{3,}" web/app web/components web/data`
Expected: FOUND (служебные и/или пользовательские англицизмы)

**Step 2: Confirm failing condition**

Проверить и отфильтровать служебные вхождения (import, className, slug) от пользовательских текстов.

**Step 3: Write minimal implementation**

Исправить только пользовательские тексты и подписи, оставить технические идентификаторы без изменений.

**Step 4: Run check to verify it passes**

Run: `rg -n "Construction|Process|ROI|Smart|twins|FAQ" web/app web/components web/data`
Expected: no matches in user-facing strings

**Step 5: Commit**

```bash
git add web/app web/components web/data
git commit -m "chore: finalize russian-only user-facing copy after immersive update"
```

### Task 9: Финальная верификация и запуск

**Files:**
- No file changes required unless issues found

**Step 1: Run lint**

Run: `npm run lint`
Expected: PASS

**Step 2: Run build**

Run: `npm run build`
Expected: PASS

**Step 3: Run local smoke check**

Run: `npm run dev -- --port 6001`
Expected: site opens; animations visible on `/`, `/process`, `/projects`

**Step 4: Manual QA checklist**

- Desktop: плавность скролла и анимаций
- Mobile: нет тяжелых закреплений
- `prefers-reduced-motion`: упрощенный режим
- Русский текст в пользовательском интерфейсе

**Step 5: Commit**

```bash
git add .
git commit -m "feat: deliver immersive business animations for key pages"
```
