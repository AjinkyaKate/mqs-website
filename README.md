# MQS Technologies — Website

Marketing site for **MQS Technologies** (industrial X-ray, CT & NDT inspection
systems, Hyderabad — aerospace/defence, automotive, electronics).

## Stack
- **Next.js 16** (App Router, Turbopack) · React · TypeScript
- **Tailwind CSS v4** · framer-motion · lenis
- Hosted on **Vercel** — production: <https://trivexa-test.vercel.app>

## Local development
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure
- `app/` — routes: `/` (home), `/products` (catalog), `/products/mqxc-series` (product page)
- `components/` — UI sections (hero, products, contact, footer, …)
- `public/assets/` — images and video used by the site
- `client-assets/` — raw client source material (git-ignored, not deployed)

## Deploys
Every push to `main` deploys automatically via the Vercel ↔ GitHub integration;
pull requests get preview URLs. Manual deploys: `npx vercel --prod`.
