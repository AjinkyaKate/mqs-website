# MQS Technologies — Website

Marketing site for **MQS Technologies** (industrial X-ray, CT & NDT inspection
systems, Hyderabad — aerospace/defence, automotive, electronics).

## Stack
- **Next.js 16** (App Router, Turbopack) · React · TypeScript
- **Tailwind CSS v4** · framer-motion · lenis
- Hosted on **Vercel**
  - Staging/review: <https://trivexa-test-theta.vercel.app>
  - Production: <https://www.mqstechnologies.in>

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
Every push to `main` deploys automatically to production through the Vercel ↔
GitHub integration. Phase 2 work must be reviewed from a feature-branch preview
before it is merged to `main`. Manual production deploys: `npx vercel --prod`.

## Phase 2

Planning, reference audits, the client-input register and the draft Trydot ERP
contract are tracked in [`docs/phase-2`](docs/phase-2/README.md).
