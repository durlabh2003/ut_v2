# Udta Teer — Website Redesign

A Jaipur-rooted creative digital transformation agency website exploring a Rajasthan-inspired visual identity.

## Preview locally

This first branch implementation is a self-contained HTML prototype.

1. Download or clone the `redesign/udta-teer` branch.
2. Keep `index.html` and the `assets/` directory together.
3. Open `index.html` in a browser, or run:

```bash
python -m http.server 4173
```

Then visit `http://localhost:4173`.

## Current implementation

- Warm ivory, Jaipur rose, terracotta, marigold and indigo visual direction.
- Original SVG illustration of a Jaipur-inspired skyline, Hawa Mahal-inspired façade, Amer Fort silhouette, jharokha studio, desk, chai, kites and arrow.
- Responsive navigation and mobile menu.
- Design / Build / Grow interactive service explorer with original inline SVG illustrations.
- Five-stage process, industry selector and portfolio concept previews.
- Starting-price package presentation.
- FAQ accordion.
- Light / dark appearance toggle.
- English / Hindi hero and navigation toggle.
- Project brief modal with validation and copy-to-clipboard behaviour.
- Keyboard shortcut `K` for the kite visual cue.
- Reduced-motion support.

## Important limitations before production

This is the first homepage prototype, not the complete production website.

- The site currently uses a single-page structure; individual service, case-study, package, industry, about, contact and insights routes remain to be built.
- The website-audit request flow and full three-step lead flow are not connected to a backend in this initial prototype.
- The project brief is prepared locally. It is not sent to Udta Teer until a verified secure form endpoint is configured.
- WhatsApp, business email, phone, social accounts and physical address must be populated with confirmed details.
- Portfolio projects, client marks, testimonials, performance figures and team biographies must be replaced with real approved content.
- Hindi translation currently covers the hero and primary navigation only.
- Search interface, analytics, sitemap, canonical URL and structured data are not yet implemented.
- Complete browser QA across mobile, tablet and desktop is still required.

## Brand palette

| Name | Value |
|---|---|
| Desert Ivory | `#F2EBDD` |
| Jaipur Rose | `#C77C78` |
| Terracotta | `#AA573E` |
| Marigold | `#D7A33E` |
| Royal Indigo | `#293D65` |
| Peacock Green | `#347266` |
| Sandstone | `#D9B99A` |
| Charcoal | `#292724` |

## Branch strategy

- `main`: repository baseline.
- `redesign/udta-teer`: active redesign branch.

Keep production deployment on `main` until the redesign has been reviewed, expanded and tested.

## Next implementation milestones

1. Refine the responsive homepage and illustration composition.
2. Complete service detail and portfolio/case-study pages.
3. Build package, industry, process, about, contact and insights pages.
4. Finish the full Hindi translation.
5. Connect enquiry and audit forms to secure endpoints.
6. Configure verified contact details, SEO and analytics.
7. Run browser-based accessibility, responsive and functional QA.
