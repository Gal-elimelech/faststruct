# Landing Page Lighthouse Action Plan

## Scope

- Target page: `http://localhost:3000/landing`
- Constraint: keep existing marketing text and page structure unchanged unless explicitly approved

## Current local Lighthouse scores

### Mobile

- Performance: **61**
- Accessibility: **95**
- Best Practices: **100**
- SEO: **100**
- Key metrics:
  - FCP: **0.94s**
  - LCP: **9.93s**
  - TBT: **443ms**
  - CLS: **0.000**
  - Speed Index: **4.59s**

### Desktop

- Performance: **84**
- Accessibility: **91**
- Best Practices: **100**
- SEO: **100**
- Key metrics:
  - FCP: **0.25s**
  - LCP: **2.67s**
  - TBT: **3ms**
  - CLS: **0.000**
  - Speed Index: **1.51s**

## What needs improvement now

### Performance findings (from Lighthouse opportunities)

- Reduce unused JavaScript (**~2360ms potential savings**)
- Minify JavaScript (**~900ms potential savings**)
- Preconnect to required origins (**~430ms potential savings**)
- Avoid serving legacy JavaScript to modern browsers (**~150ms potential savings**)
- Page weight/requests on mobile run:
  - Requests: **73**
  - Total bytes: **~2.38MB**

### Accessibility and runtime findings

- `heading-order` fails (non-sequential headings)
- `color-contrast` fails (insufficient foreground/background contrast in at least one area)
- `bf-cache` fails (back/forward cache restoration prevented)

### Confirmed code hotspots

- Missing `sizes` on `next/image` with `fill`:
  - `src/sections/landing/ConstructionMethodsSection.tsx`
  - `src/sections/landing/components/LandingGalleryCard.tsx`
- Heading-order issue likely starts in hero:
  - `src/sections/landing/HeroLandingSection.tsx` (`h1` followed by `h3`)
- Global script weight candidate:
  - `src/app/layout.tsx` (Font Awesome kit script loaded globally)

## Prioritized action list

1. ~~Add proper `sizes` for all landing `Image` components using `fill`~~ ✅ Done (`ConstructionMethodsSection` and `LandingGalleryCard` now provide responsive `sizes`)
2. Reduce unused JS on landing (defer/lazy-load non-critical client logic)
3. Review and defer non-essential global script loading where safe
4. ~~Fix heading order semantics without changing visible copy~~ ✅ Done (`h1` → `h2` sequence fixed in hero by changing "Licenses" from `h3` to `h2`)
5. Resolve contrast failures in the failing nodes only
6. Investigate and remove bfcache blockers
7. Re-run mobile Lighthouse after each change and keep only measurable improvements

## Validation loop

After each change batch:

1. Run Lighthouse mobile on `http://localhost:3000/landing`
2. Compare:
   - Performance score
   - LCP
   - TBT
   - Accessibility score
3. Keep/revert based on measurable improvement and no regressions
