# AGENTS.md — 2Hands Production Website

## Project state

This directory is the production Astro website for `https://2handsacademy.com`. The site is already live. Treat changes as production changes, not prototype work.

- Repository: `https://github.com/AbdessamadBendada/2hands-academy.git`
- Production branch: `main`
- Hosting: Cloudflare Pages
- Default language: French
- English prefix: `/en/`
- Static output: `dist/`
- Server-side functionality: `functions/api/enquiry.js`

Read `../PROJECT-HANDOFF.md` before making material changes. Outstanding client confirmations belong in `../outputs/2hands-client-inputs-needed.md`, not on public pages.

## Non-negotiable product rules

- Preserve the approved warm, premium and restrained visual direction.
- Preserve the existing brand colors and font families.
- Keep hospitality as the primary offer and the Academy as the secondary pathway.
- Do not shorten or rewrite approved content merely to make layout easier without user approval.
- Do not publish internal placeholders such as “to confirm”, “coming soon” or “source needed”. Hide incomplete public elements and record the missing input internally.
- Do not make unsupported claims about certifications, awards, championships, editorial coverage, partnerships or outcomes.
- Do not use a client logo unless permission or prior approval is recorded.
- Preserve both languages and keep paired routes, labels, metadata and language switching synchronized.
- French remains the root/default language; do not restore a `/fr/` page tree.
- Preserve legacy redirects while search engines recrawl the former WordPress URLs.

## Architecture

- `src/pages/index.astro` — French homepage
- `src/pages/en/index.astro` — English homepage
- `src/pages/[...slug].astro` — static bilingual content routes sourced from `src/data/pages.ts`
- `src/data/site.ts` — route map, navigation and homepage/service content
- `src/data/pages.ts` — bilingual page definitions
- `src/data/testimonials.ts` — approved testimonial source
- `src/content.config.ts` — in-progress Astro blog collection schema
- `src/content/blog/` — source directory for bilingual blog articles; currently contains no public articles
- `src/data/blog.ts` — French and English blog route helpers
- `src/components/BlogRoute.astro` — shared conditional hub/article renderer
- `src/pages/conseils/[...slug].astro` and `src/pages/en/insights/[...slug].astro` — draft-safe bilingual routes
- `src/pages/[feed].xml.ts` — conditional bilingual RSS feed
- `src/components/` — page and shared UI components
- `src/layouts/BaseLayout.astro` — metadata, structured data, fonts and global shell
- `src/styles/` — global and page-specific styling
- `functions/api/enquiry.js` — Cloudflare Pages enquiry endpoint
- `public/_redirects` — legacy URL redirects
- `public/_headers` — production response headers
- `public/llms.txt` — concise machine-readable guide to the business and canonical content
- `scripts/finalize-build.mjs` — English 404 promotion and direct sitemap creation
- `scripts/audit-site.mjs` — production markup/link/SEO audit

## Routing

Canonical routes are defined in `src/data/site.ts`. Always use that route map for internal links and language switching.

French:

- `/`
- `/services/`
- `/services/diagnostic/`
- `/services/formation-equipe/`
- `/services/soin-signature/`
- `/services/accompagnement/`
- `/a-propos/`
- `/references/`
- `/formations/`
- `/contact/`
- `/politique-confidentialite/`

English equivalents live under `/en/`.

Planned blog routes are `/conseils/` for French and `/en/insights/` for English. These are not public routes yet. Do not add them to navigation, sitemaps or production output until the first approved bilingual article pair is ready.

## Forms and secrets

The enquiry forms post JSON to `/api/enquiry`. Preserve:

- Required privacy consent
- Honeypot handling
- Request-size and field-length limits
- Email validation
- HTML escaping
- `reply_to` set to the visitor’s email
- Separate hospitality and Academy subjects/details

Cloudflare runtime variables:

- `RESEND_API_KEY` — secret
- `ENQUIRY_TO_EMAIL` — intended value: `brookes2hands@gmail.com`
- `ENQUIRY_FROM_EMAIL` — `2Hands Website <enquiries@2handsacademy.com>`

Never commit real secret values or paste them into logs, issues, docs or screenshots. If the form is changed, test validation, successful delivery and failure messaging in both languages.

## SEO and indexing

Every indexable page must retain:

- One unique, non-empty `<title>`
- One meta description
- One canonical URL
- Exactly one `<h1>`
- English, French and `x-default` hreflang links
- Open Graph/Twitter metadata
- JSON-LD structured data
- Descriptive alt text and intrinsic image dimensions

Preferred sitemap: `/sitemap.xml`. Keep `/sitemap-index.xml` and `/sitemap-0.xml` available because Search Console previously processed the generated index.

Do not remove the `/home/` or `/fr/` redirects. Google sitelinks cannot be selected manually; redirects, canonical URLs, internal links and clear titles are the approved way to influence them.

The live `public/llms.txt` was deployed in production commit `348687c`. Keep it concise, factual and synchronized with canonical routes, verified services and language structure. Do not treat it as a sitemap, keyword dump or substitute for visible page content. Never add unverified claims, private information or internal planning notes.

## Blog and editorial publishing

The controlling internal references are:

- `../outputs/2hands-blog-seo-content-plan.md`
- `../outputs/2hands-blog-editorial-plan.csv`
- `../outputs/2hands-blog-launch-task-list.md`
- `../outputs/2hands-blog-topic-validation-2026-10-27.md`
- `../outputs/blog-content-hub/2Hands_Blog_Content_Hub.xlsx`
- `../outputs/blog-drafts/01-swedish-vs-deep-tissue-massage-approval-draft.md`

The blog remains hospitality-first, but the approved editorial programme now has three connected tracks: hospitality/spa management, massage education/careers and client treatment education. Hospitality supports the primary B2B position; learner and client topics support the Academy. Do not let the latter turn the site into a generic consumer massage blog.

Tasks 1–6 in the launch checklist are complete locally. The content schema, draft-safe bilingual routing, shared templates, article/discovery SEO, conditional navigation/RSS and permanent automated QA have been implemented and fixture-tested. No approved article pair exists, so the public blog remains intentionally absent.

Manual Morocco-oriented French and English SERP validation is complete for the original six hospitality clusters. Exact Morocco volume, difficulty, CPC and Search Console fields are still pending authenticated exports. The 12 newer learner/client topics have not yet received equivalent keyword validation. Before publishing a proposed topic, evaluate cluster volume, intent, difficulty, CPC, existing impressions, competitor quality and likely business value together. Do not reject a commercially important niche topic only because one exact phrase reports zero volume, and do not publish a topic with no demonstrated search or strategic value.

The Swedish-versus-deep-tissue file in `../outputs/blog-drafts/` is an English approval draft for Brooke, not an Astro article and not approved public copy. Do not move it into `src/content/blog/` unchanged. First incorporate Brooke's definitions, terminology, teaching observations, safety corrections and audience decision; then create a natural French counterpart and complete normal metadata/image approval.

Topics involving Moroccan certification/regulation, earnings, current training prices, pain, medical conditions or lymphatic drainage require current authoritative research and careful claim boundaries. Never infer legal requirements, income figures, clinical outcomes or contraindications from Brooke's anecdotal experience alone.

Publishing requirements:

- French hub: `/conseils/`
- English hub: `/en/insights/`
- French articles: `/conseils/{french-slug}/`
- English articles: `/en/insights/{english-slug}/`
- Use the Astro content collection in `src/content.config.ts`.
- Exclude drafts from generated routes, hub listings, feeds and sitemaps.
- Do not publish an empty hub, sample post or internal placeholder.
- Publish paired French and English articles unless an exception is explicitly approved and its hreflang behavior is handled deliberately.
- Normally draft and approve the French article first, then create a natural English adaptation rather than a literal translation. An English expert-review draft may be used to collect Brooke's input, but it is not a publication exception: the final public pair must still be naturally authored and approved in both languages.
- Attribute articles to Brooke Wescott and link the byline to the correct language version of her profile.
- Obtain Brooke's approval for first-hand observations, terminology, examples and client-related evidence.
- Do not fabricate statistics, outcomes, case studies, quotations or professional claims.
- Give each article unique metadata, one H1, canonical and reciprocal hreflang links, Open Graph/Twitter metadata, `BlogPosting` and breadcrumb structured data, descriptive image alt text, intrinsic image dimensions and a relevant service CTA.
- Link articles to the most relevant commercial service and add reciprocal links from service pages only when the article materially helps the reader.
- Use genuine publication dates and change `updatedAt` only after a substantive revision.
- Validate both languages, structured data, internal links, mobile presentation and sitemap behavior before deployment.

## Privacy and tracking

- Privacy pages exist in French and English.
- Forms require explicit contact consent.
- Cloudflare Web Analytics is currently the only analytics noted in the policy and is treated as cookieless aggregate measurement.
- Do not add Meta Pixel, Google Ads tags, remarketing, session recording or optional cookies without first adding an appropriate consent mechanism and updating the policy.
- Do not invent CNDP registration details or a fixed retention period.

## UI behavior

- Keep the right-to-left mobile navigation and its restrained motion.
- Keep active navigation states route-specific; do not highlight both the services hub and a child page.
- Maintain reduced-motion behavior for all entrance animations.
- Avoid regressions in the full-height mobile menu, CTA hover states and body scroll locking.
- Eyebrows use short marks; unnumbered variants use a small dot.
- The homepage currently shows three testimonial cards in a static grid. Do not assume a carousel exists. If asked to test or change a “slider”, first identify the exact component and expected behavior.
- Verify significant visual changes at desktop and mobile widths.

## Development workflow

Use Node `>=22.12.0`.

```bash
npm install
npm run dev
npm run build
npm run audit
npm run preview
```

Before committing:

1. Inspect `git status` and preserve unrelated user changes.
2. Run `npm run audit`.
3. Check the built sitemap, redirects and 404 files in `dist/`.
4. Test both language versions and language-switch destinations.
5. Test header/mobile navigation, forms and changed interactions.
6. Run `git diff --check`.

For Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`
- Root directory: repository root
- Production branch: `main`

Automatic deployment is enabled. A push to `main` is a production deployment; verify the live custom domain after Cloudflare finishes.

## Git and workspace safety

- This website has its own Git repository at `website/.git` inside a larger business-growth workspace.
- Run Git commands from this directory or use `git -C website` from the parent.
- The surrounding workspace contains user-owned strategy, design and prototype files. Do not delete, reset or move them.
- The local checkout may be behind production. Fetch and compare with `origin/main` before making or pushing changes.
- Production includes `242706e` for legacy `/home` redirects and `348687c` for the live `llms.txt`. Reconcile the local branch with `origin/main` without discarding the existing worktree changes before the next production commit.
- Do not use destructive Git commands.
- Commit only files relevant to the requested change.

## Astro references

- Routing: https://docs.astro.build/en/guides/routing/
- Components: https://docs.astro.build/en/basics/astro-components/
- Assets: https://docs.astro.build/en/guides/images/
- Styling: https://docs.astro.build/en/guides/styling/
- Internationalization: https://docs.astro.build/en/guides/internationalization/
- Cloudflare Pages: https://docs.astro.build/en/guides/deploy/cloudflare/
