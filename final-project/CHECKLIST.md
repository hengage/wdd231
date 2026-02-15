# W06 Project Rubric Checklist

## Preflight Setup

- [x] Working branch is `feature/final-project`
- [x] Project folder is `final-project/`
- [x] Core folders exist: `images/`, `styles/`, `scripts/`, `data/`
- [ ] Required pages exist:
  - [x] `index.html`
  - [x] `vocabulary.html`
  - [ ] `resources.html`
  - [x] `quiz.html`
  - [x] `result.html`
  - [ ] `attributions.html`

## 1. Page Audits (20 pts)

- [ ] No HTML validation errors on required pages
- [ ] No CSS validation errors on required pages
- [ ] No critical console errors on required pages
- [ ] Broken links and missing assets resolved

## 2. Lighthouse Test (6 pts)

- [ ] Mobile Lighthouse Accessibility is 95+ on all required pages
- [ ] Mobile Lighthouse Best Practices is 95+ on all required pages
- [ ] Mobile Lighthouse SEO is 95+ on all required pages

## 3. Color Contrast (4 pts)

- [ ] DevTools CSS Overview reports no AA contrast errors
- [ ] Interactive states (hover/focus/active) keep AA contrast

## 4. Design Principles (20 pts)

- [ ] Clear proximity, alignment, and repetition across pages
- [ ] Visual hierarchy is consistent and readable
- [ ] No horizontal scrolling at 320px width
- [ ] No text overflow, clipping, or overlap issues
- [ ] Visual layout looks intentional and polished

## 5. Responsive Menu (5 pts)

- [x] Hamburger menu appears and works on small screens
- [x] Larger screens use Flex-based navigation layout
- [x] Wayfinding is implemented (active page indication)
- [x] Menu is keyboard accessible with visible focus

## 6. Layouts (5 pts)

- [ ] Pages use meaningful CSS layout methods (Flex/Grid), not just stacked blocks
- [ ] At least two sections per page use deliberate layout structure
- [ ] Layout adapts cleanly from mobile to desktop

## 7. Form Action Page (5 pts)

- [x] `quiz.html` includes a valid form with labels and required fields
- [x] Form submits via URL search params to `result.html`
- [x] `result.html` displays submitted form values correctly
- [x] `result.html` shows check result (correct vs incorrect meaning)

## 8. Displayed Data (5 pts)

- [x] Dynamic data is displayed using JavaScript
- [x] Data source provides 15+ items with 4+ fields each
- [x] Data render uses template literals
- [x] At least one array method is used (`map`, `filter`, etc.)
- [x] User interaction updates displayed data (search/filter/view)

## 9. Local Storage (3 pts)

- [x] `localStorage` is used to store user state/value
- [x] Stored value is read back and applied on page load

## 10. Modal Dialog (4 pts)

- [x] At least one modal dialog structure is implemented
- [x] Modal opens/closes via clear controls
- [ ] Modal is keyboard accessible

## 11. JavaScript (10 pts)

- [x] Evidence of DOM manipulation
- [x] Evidence of array method usage
- [x] Evidence of template literals

## 12. Video: JavaScript Functionality (10 pts)

- [ ] Demo shows API or local JSON data usage
- [ ] Demo shows asynchronous functionality with a `try` block
- [ ] Demo shows ES module usage

## 13. Video: Specifications (3 pts)

- [ ] Video is about 5 minutes
- [ ] Student face is visible in video
- [ ] Screen recording clearly shows app and code/output

## SEO + Document Standards (All Required Pages)

- [ ] Correct `<!DOCTYPE html>` and `<html lang="en">`
- [ ] Meta tags: `charset`, `viewport`, `author`, unique `description`
- [ ] Unique `<title>` per page
- [ ] OG tags: `og:title`, `og:description`, `og:type`, `og:url`, `og:image`
- [ ] Twitter tags: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- [ ] Favicon linked
- [ ] Exactly one `h1` per page

## Attribution + Compliance

- [ ] `attributions.html` lists all external sources/assets
- [ ] No Bootstrap, template kits, or site builders used
- [ ] All external data/media sources are properly cited

## Additional Technical Coverage

- [x] Async `fetch` implemented with `try/catch`
- [x] ES modules used (`type="module"`)
- [ ] Images are optimized and lazy-loaded where appropriate
- [ ] Each required page stays under 500kB transfer target

## Final Submission Readiness

- [ ] All internal links work in GitHub Pages path
- [ ] Final manual test on mobile and desktop viewports
- [ ] Commit history is clear and scoped
- [ ] Branch pushed and ready for PR/review
