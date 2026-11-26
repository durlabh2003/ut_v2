# Udta Teer — Jaipur-rooted creative digital studio

A bespoke, responsive multi-page website for Udta Teer, built as a static site with HTML, CSS, SVG illustration assets and vanilla JavaScript. It is designed to deploy directly from the repository root on Vercel.

## Pages

- `/` — Home: Jaipur-inspired hero, Design / Build / Grow service cards, concept portfolio, process, industries, starting packages, FAQ and studio notes.
- `/services/design.html`, `/services/build.html`, `/services/grow.html` — individual service pages.
- `/work/` — concept portfolio with explicit concept-only disclosure.
- `/packages/`, `/industries/`, `/about/`, `/contact/`.
- `/free-website-audit/`, `/insights/`, an editorial article, `/legal/privacy.html`, `/legal/terms.html`, and `/404.html`.

## Experience and accessibility

- Responsive layouts and mobile navigation.
- Persistent light / dark appearance preference.
- English / Hindi switching for translated page elements.
- Search overlay with keyboard shortcut `Ctrl/⌘ + K` and Escape to close.
- Three-step project planner with required-field validation and downloadable project brief.
- Website audit request flow that prepares a local downloadable request.
- Industry selector, FAQ accordions, skip link, accessible form labels, visible focus styles and reduced-motion support.
- Custom SVG illustration assets for design, development, growth, arrow mark and studio motif. The Jaipur panorama `assets/jaipur-creative-hero.svg` is retained from the earlier redesign branch.

## Important launch configuration

This implementation intentionally does not invent a business email, phone number, WhatsApp number, address or client history.

- `config.js` is the public configuration placeholder. Add only verified contact information.
- Project planner, contact enquiry and audit forms generate local `.txt` files. They do **not** send information to the studio and do not claim to have run a website scan. Configure and test a secure form endpoint before enabling real lead submission.
- Replace the Vercel-domain references in `sitemap.xml` with the final approved domain if a custom domain is connected. Add page-specific canonical URLs at that time.
- Legal pages are drafts and should be reviewed against the business's actual data practices before production use.
- Portfolio entries are explicitly presented as illustrative concepts; replace them only with approved real case studies.
- Prices are indicative starting amounts supplied for the brand and need a commercial review before publication.

## Run locally

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`.

No build step or package installation is required.
