# MQS Technologies — Full-Stack Project Plan

## Company Overview
MQS Technologies (Hyderabad) — industrial X-ray, CT & NDT inspection systems for aerospace/defence, automotive, electronics, and advanced manufacturing.

---

## Project Structure

```
mqs/
├── client/          # Next.js 16 frontend (App Router, Turbopack)
├── server/          # Backend API (to be built)
└── PROJECT.md       # This file
```

---

## Phase 1: Client (DONE)

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP · Lenis smooth scroll

**Current Routes:**
| Route | Status |
|---|---|
| `/` (Home) | Done — Hero, Stats, About, Equipment, Services, Industries, WhyChooseUs, News, Contact, Footer |
| `/products` | Done — Product catalog page |
| `/products/mqxc-series` | Done — MQXC cabinet X-ray product page |
| `/products/high-energy-xray` | Done — High-energy X-ray product page |
| `/industries` | Done — Industries overview |
| `/industries/aerospace-defence` | Done — Industry detail |
| `/industries/electronics` | Done — Industry detail |
| `/industries/automotive` | Done — Industry detail |
| `/careers` | Done — Careers page |

**Remaining Client Pages (from sitemap):**
- `/about` — About Us (company story, leadership, certifications, awards)
- `/products/microfocus-xray`
- `/products/mqct`
- `/products/mqwr-160u`
- `/products/mqx-trace-2d`
- `/products/mqx-trace-ct`
- `/products/optimaxis`
- `/products/prism`
- `/products/pipe-inspection`
- `/products/ginti`
- `/products/shell-inspection`
- `/products/mqir-225`
- `/products/ate`
- `/contract-manufacturing/precision-sub-assemblies`
- `/contract-manufacturing/industrial-electronics`
- `/industries/ndt-labs`
- `/industries/advanced-manufacturing`
- `/services` — CT Services, Preventive Maintenance, AMC, Calibration/Technical Support
- `/resources` — Blogs, Whitepapers, Brochures, News & Events
- `/contact` — Dedicated contact page

---

## Phase 2: Server (NEXT)

**Purpose:** Backend API to power dynamic features — contact form submissions, career applications, blog/resource management, brochure downloads, admin panel, and lead tracking.

**Planned Stack:**
- Node.js + Express (or Fastify)
- TypeScript
- PostgreSQL (or MongoDB) — database
- Prisma (or Mongoose) — ORM
- JWT — authentication
- Multer / S3 — file uploads (resumes, brochures)
- Nodemailer / SES — email notifications
- Zod — request validation

**API Modules:**

### 2.1 Contact / Enquiries
- `POST /api/enquiries` — Submit contact form (name, company, email, phone, industry, application, message)
- `GET /api/enquiries` — Admin: list all enquiries (paginated, filterable)
- `PATCH /api/enquiries/:id` — Admin: update status (new / contacted / closed)
- Email notification on new submission

### 2.2 Careers
- `GET /api/careers/openings` — List current job openings
- `POST /api/careers/apply` — Submit application (resume upload + form data)
- `GET /api/careers/applications` — Admin: list applications
- `PATCH /api/careers/openings/:id` — Admin: create/update/toggle job listings

### 2.3 Products
- `GET /api/products` — List all products (for dynamic catalog)
- `GET /api/products/:slug` — Single product details + specs
- `POST /api/products` — Admin: create product
- `PUT /api/products/:id` — Admin: update product
- `DELETE /api/products/:id` — Admin: delete product
- `POST /api/products/:id/brochure` — Admin: upload brochure PDF

### 2.4 Resources (Blog / Whitepapers / News)
- `GET /api/blogs` — List published blog posts (paginated)
- `GET /api/blogs/:slug` — Single blog post
- `POST /api/blogs` — Admin: create blog
- `PUT /api/blogs/:id` — Admin: update blog
- `DELETE /api/blogs/:id` — Admin: delete blog
- Same CRUD pattern for `/api/whitepapers`, `/api/news`

### 2.5 Brochure Downloads (Lead Gen)
- `POST /api/brochures/download` — Capture lead info, return download link
- `GET /api/brochures` — Admin: list available brochures

### 2.6 Auth (Admin)
- `POST /api/auth/login` — Admin login (JWT)
- `POST /api/auth/refresh` — Refresh token
- `GET /api/auth/me` — Current admin user

---

## Phase 3: Admin Panel

**Purpose:** Internal dashboard for MQS team to manage website content.

**Features:**
- Dashboard — enquiry count, new applications, recent activity
- Enquiries — view, filter, update status, export
- Careers — manage job openings, review applications, download resumes
- Products — CRUD products, upload brochures, manage specs
- Blog / Resources — write, edit, publish/unpublish posts
- Brochure Leads — view download requests
- Settings — admin user management

**Tech options:**
- Separate Next.js app in `admin/` folder, or
- Integrated into client under `/admin` route (protected), or
- Lightweight React + Vite app

---

## Phase 4: AWS Deployment

**Architecture:**
```
Route 53 (DNS)
  └── CloudFront (CDN)
        ├── S3 (static assets, brochures, images)
        └── ALB (Application Load Balancer)
              ├── ECS / EC2 → Client (Next.js — SSR)
              └── ECS / EC2 → Server (Express API)

RDS (PostgreSQL) or DocumentDB (MongoDB)
SES (transactional emails)
S3 (file uploads — resumes, brochures)
CloudWatch (logging & monitoring)
```

**Deployment approach:**
- Docker containers for both client and server
- ECS Fargate (serverless containers) or EC2 with PM2
- CI/CD via GitHub Actions → ECR → ECS
- Environment separation: staging + production
- SSL via ACM (AWS Certificate Manager)

**Alternative (simpler):**
- Client on Vercel (already set up)
- Server on EC2 / Elastic Beanstalk / Lambda
- RDS for database
- S3 for file storage

---

## Navigation (Target)

**Main Nav:** Home | About Us | Products | Industries | Services | Resources | Careers | Contact Us

**Footer:**
- Company: About Us, Careers, Contact Us
- Products: High-Energy X-ray, Microfocus, MQXC, MQCT, MQX.tracE, MQWR 160U, ATE
- Services: CT Services, Preventive Maintenance, AMC, Technical Support
- Resources: Blogs, Whitepapers, Brochures, News & Events
- Industries: Aerospace & Defence, Electronics, Automotive, NDT, Advanced Manufacturing

---

## Key Design Patterns (Client)

- **Colors:** Dark navy `#0B2A3A`, Cyan accent `#16C1F3`, muted `#5F7688`
- **Fonts:** Figtree (body), Archivo (headings)
- **Animations:** GSAP + Framer Motion
- **Smooth scrolling:** Lenis
- **Static UI:** Contact form currently has no submit logic — needs server integration
- **All components are client-side rendered** (`"use client"`)
