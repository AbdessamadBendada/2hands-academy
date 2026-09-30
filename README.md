# 2Hands Website

Production Astro application for the bilingual 2Hands website.

## Commands

Run these commands from this directory:

| Command | Action |
| --- | --- |
| `npm install` | Installs dependencies |
| `npm run dev` | Starts the local development server |
| `npm run build` | Builds the production site to `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run astro -- --help` | Shows Astro CLI help |

## Deployment

For Cloudflare Pages, use the repository root as the project root, `npm run build` as the build command, and `dist` as the output directory.

The enquiry forms are handled by the Cloudflare Pages Function at `/api/enquiry`. Add these variables under **Workers & Pages → 2Hands project → Settings → Variables and Secrets** for both Production and Preview:

- `RESEND_API_KEY` — store as a secret
- `ENQUIRY_TO_EMAIL` — the inbox that receives website enquiries
- `ENQUIRY_FROM_EMAIL` — a Resend-verified sender, such as `2Hands Website <enquiries@your-domain.com>`

Until a custom sending domain is verified in Resend, `ENQUIRY_FROM_EMAIL` can be omitted and the function will use Resend's testing sender.
