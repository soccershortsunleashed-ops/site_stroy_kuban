# StroyTrust-23 Business Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a multi-page business website for "СтройТрест-23" using provided project materials, with visual identity based on the uploaded logo and content based on `tz.md` + `Виды деятельности.docx`.

**Architecture:** Next.js 14 App Router project with static/generated content modules (`/data`), Shadcn UI for all interface components, and a page-based information architecture (`/`, `/services`, `/projects`, `/technologies`, `/investors`). Media assets are imported from local files in `public/` and rendered via `next/image`.

**Tech Stack:** Next.js 14, React, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion, Recharts.

---

## 1) Design Inputs (from provided materials)

- **Core brief:** `tz.md`
- **Service content source:** `Виды деятельности.docx`
- **Logo (brand source):** `Изображение WhatsApp 2025-01-28 в 09.44.21_27038ad3.jpg`
- **Portfolio images:**  
  `Изображение WhatsApp 2025-01-28 в 09.43.09_461d245d.jpg`  
  `Изображение WhatsApp 2025-01-28 в 09.43.09_49858d38.jpg`  
  `Изображение WhatsApp 2025-01-28 в 09.43.09_af1ba479.jpg`  
  `Изображение WhatsApp 2025-01-28 в 09.43.09_f96a5b9c.jpg`

## 2) Brand Color Policy (from logo)

Recommended token set for UI theme:

- `--brand-navy`: `#182038` (deep navy from logo lines/text)
- `--brand-orange-500`: `#F2994A` (brief-approved accent orange)
- `--brand-orange-600`: `#F88808` (strong logo orange for active accents)
- `--brand-orange-300`: `#F8C030` (highlight/hover)
- `--concrete-900`: `#1F232B` (dark concrete background)
- `--concrete-700`: `#374151` (secondary dark surface)
- `--concrete-300`: `#D1D5DB` (muted border/text)

Usage:
- Dark theme by default.
- Orange only for CTA/highlight/data emphasis.
- Main text and structural strokes in navy + light neutral.

## 3) Solution Approaches

### Approach A (Recommended): Static-first corporate site + simulated Digital Foreman
- Build all pages from local JSON/TS data modules.
- "Digital Foreman" is interactive UI with deterministic calculators/mocks (no backend dependency).
- Best for fast launch and stable demo quality.

### Approach B: CMS-ready content layer from day one
- Build same UI, but inject an abstraction layer prepared for future CMS.
- Slightly higher initial complexity.

### Approach C: Backend-integrated chatbot + contract lookup now
- Add API, storage, auth, contract ID flows in first iteration.
- High complexity/risk; not needed for first production web release.

**Recommendation:** Approach A now, architect data modules so migration to B is straightforward.

---

### Task 1: Initialize application and tooling baseline

**Files:**
- Create: `app/*`, `components/*`, `lib/*`, `data/*`, `public/*`, `tailwind.config.*`, `components.json`

**Step 1:** Scaffold Next.js 14 app (App Router, TypeScript, Tailwind).  
**Step 2:** Install and initialize Shadcn UI (`@shadcn` registry).  
**Step 3:** Install runtime deps: `framer-motion`, `recharts`, icons.  
**Step 4:** Add ESLint/format scripts and strict TS settings.  
**Step 5:** Run `npm run lint` and `npm run build` as baseline check.

### Task 2: Import provided assets into project

**Files:**
- Create: `public/brand/logo.jpg`, `public/projects/*.jpg`

**Step 1:** Copy logo file into `public/brand/logo.jpg`.  
**Step 2:** Copy 4 project photos into `public/projects/`.  
**Step 3:** Create `data/media.ts` with typed metadata (title, alt, category, source).  
**Step 4:** Validate image rendering via `next/image` in a temporary test component.

### Task 3: Encode visual system from logo palette

**Files:**
- Modify: `app/globals.css`
- Create: `lib/theme/tokens.ts`

**Step 1:** Add CSS custom properties for brand + concrete neutrals.  
**Step 2:** Bind Tailwind semantic colors to these variables.  
**Step 3:** Define button/surface states (default/hover/active/disabled).  
**Step 4:** Add utility classes for gradient overlays and glass-like dark cards.

### Task 4: Build global shell and navigation

**Files:**
- Create: `app/layout.tsx`, `components/layout/site-header.tsx`, `components/layout/site-footer.tsx`, `components/layout/nav-menu.tsx`

**Step 1:** Compose header with Shadcn `NavigationMenu`.  
**Step 2:** Add route groups: Home, Services, Projects, Technologies, Investors.  
**Step 3:** Implement mobile menu (Sheet + Accordion).  
**Step 4:** Add sticky header with scroll-based shadow state.

### Task 5: Prepare structured data from Word + TZ

**Files:**
- Create: `data/services.ts`, `data/faq.ts`, `data/kpi.ts`, `data/stages.ts`, `data/bot-scenarios.ts`

**Step 1:** Convert all 8 activity directions from `Виды деятельности.docx` into structured objects.  
**Step 2:** Map project categories from `tz.md` ("Жилые", "Общественные хабы", "Ревитализация").  
**Step 3:** Add construction lifecycle stages ("Эскиз", "BIM-проектирование", "Хэндовер").  
**Step 4:** Prepare FAQ/tech specs content for Accordion blocks.

### Task 6: Home page (dashboard-style corporate overview)

**Files:**
- Create: `app/page.tsx`, `components/sections/hero.tsx`, `components/sections/key-activities-bento.tsx`, `components/sections/project-stats.tsx`

**Step 1:** Hero section with brand statement + CTA.  
**Step 2:** Bento Grid for key activities using Shadcn `Card` composition only.  
**Step 3:** KPI strip and chart teaser (Recharts wrapped in card).  
**Step 4:** Add carousel preview of portfolio images.

### Task 7: Services area with deep detail pages

**Files:**
- Create: `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `components/sections/service-stepper.tsx`

**Step 1:** Build services overview grid from `data/services.ts`.  
**Step 2:** Implement per-service dynamic routes.  
**Step 3:** Implement vertical lifecycle stepper (Shadcn primitives + data).  
**Step 4:** Add Accordion block for specs + FAQ.

### Task 8: Projects portfolio page

**Files:**
- Create: `app/projects/page.tsx`, `components/sections/projects-filter.tsx`, `components/sections/project-gallery.tsx`

**Step 1:** Build filter tabs/chips by category.  
**Step 2:** Render responsive masonry/grid with `AspectRatio`.  
**Step 3:** Add Framer Motion transitions for filtering and card reveal.  
**Step 4:** Add Dialog modal for project details and enlarged media.

### Task 9: Technologies page

**Files:**
- Create: `app/technologies/page.tsx`, `components/sections/technology-highlights.tsx`, `components/sections/bim-analytics.tsx`

**Step 1:** Present BIM and smart-dispatching narrative sections.  
**Step 2:** Add dashboard cards with Recharts sample analytics.  
**Step 3:** Add Tabs for phase switching and metrics per stage.

### Task 10: Investors/Partners page

**Files:**
- Create: `app/investors/page.tsx`, `components/sections/investor-docs.tsx`, `components/sections/returns-overview.tsx`

**Step 1:** Build content cards for documentation and partnership model.  
**Step 2:** Add chart components for returns/portfolio health (demo data).  
**Step 3:** Add contact/lead section in brand style.

### Task 11: Floating "Digital Foreman" experience

**Files:**
- Create: `components/bot/digital-foreman.tsx`, `components/bot/bot-widget.tsx`

**Step 1:** Floating launcher button + panel (`Card`, `ScrollArea`).  
**Step 2:** Add three сценария: ROI calculator, Twins status simulation, interior recommendation flow.  
**Step 3:** Implement deterministic logic + typed prompt/response mapping from `data/bot-scenarios.ts`.  
**Step 4:** Add graceful fallback and reset state.

### Task 12: SEO, metadata, accessibility

**Files:**
- Modify/Create: `app/*/page.tsx` metadata exports, `app/sitemap.ts`, `app/robots.ts`

**Step 1:** Add page-level metadata (title, description, OG image).  
**Step 2:** Add semantic headings and landmark structure.  
**Step 3:** Check keyboard navigation and focus states for all interactive elements.

### Task 13: Performance and media optimization

**Files:**
- Modify: image components and shared section wrappers

**Step 1:** Optimize `next/image` sizes/priorities for hero/gallery.  
**Step 2:** Add lazy loading where appropriate.  
**Step 3:** Verify Lighthouse key metrics (LCP/CLS/INP baseline).

### Task 14: Verification and launch readiness

**Files:**
- Create: `docs/plans/verification-checklist.md` (optional)

**Step 1:** Run `npm run lint`.  
**Step 2:** Run `npm run build`.  
**Step 3:** Manual responsive pass (mobile/tablet/desktop).  
**Step 4:** Validate that all UI components are Shadcn-based per `AGENTS.md`.  
**Step 5:** Final content check against `tz.md` and `Виды деятельности.docx`.

---

## Implementation Constraints (mandatory)

- Use Shadcn UI components for all UI building blocks (project rule in `AGENTS.md`).
- Do not introduce custom component systems when equivalent exists in `@shadcn`.
- Reuse provided images and document content; do not replace with placeholders for final pages.
- Keep dark, industrial high-tech aesthetic consistent across all pages.

## Acceptance Criteria

- Multi-page site implemented: Home, Services (+detail), Projects, Technologies, Investors.
- Brand palette matches uploaded logo and remains consistent.
- Content reflects both `tz.md` and `Виды деятельности.docx`.
- Portfolio uses provided photos with category filtering and detailed preview.
- "Digital Foreman" widget works as interactive simulation.
- Site is responsive and production build passes.
