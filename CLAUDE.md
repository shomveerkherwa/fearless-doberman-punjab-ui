# CLAUDE.md - Fearless Kennel Project Context

## Project Vision & Scope
- **Core Goal**: Build a world-class digital platform for "Fearless Dobermans Punjab" (owned by Gurinder) to showcase elite European Dobermann lines.
- **Ethical Positioning**: Counter backyard breeder stereotypes by implementing extreme medical/health transparency.
- **Surprise Project**: This is a surprise staging project for Gurinder. All brand names, domain roots, and config keys should remain dynamic/replaceable via environment variables for a seamless final switch.
- **Future Scale**: The design and schemas must be highly reusable and extensible to other animal pedigree registries (e.g., horses, other pet breeds).

---

## Technical Stack & Constraints
- **Frontend**: Vite + React + Tailwind CSS + TypeScript (Staging locally via Node development server on `localhost:5173`).
- **Hosting**: Static engine built for global edge deployment via Cloudflare Pages or Vercel. 
- **Database Architecture (Planned)**: Relational or Hybrid SQL (SQLite/Cloudflare D1/PostgreSQL via Supabase) optimized for Directed Acyclic Graphs (DAG) using Recursive CTEs. 
- **Alternative NoSQL Strategy**: MongoDB using the Polymorphic Pattern for animals and an explicit `ancestors_cache` array to handle rapid pedigree lookup without deep relational joins.

---

## Core Components to Implement
1. **Interactive Pedigree Tree**: A recursive 4-generation canvas mapping an animal's sire, dam, and ancestors.
2. **Health Vault Grid**: A modular showcase linking directly to laboratory diagnostic reports (DCM1/DCM2 DNA, Holter logs, HD hip scores) served via an asset storage bucket (Cloudflare R2/S3).
3. **Intake Screening Pipeline**: A multi-step structured questionnaire filtering for high-intent, qualified buyers instead of standard phone text spams.
4. **Community Tools (Upcoming)**: 
   - An OCR ingestion parser to convert KCI (Kennel Club of India) registration papers into structured JSON.
   - An inbreeding calculator evaluating Wright's Coefficient of Inbreeding (COI) using ancestral graph path traversals.

---

## Current Build State

### Dogs in the system
Two dogs in `src/data/dogs.ts`:
- **Ranger "Dollar"** — Male, KCI 2025/000704, Black & Tan, born 24 Nov 2024. Internal ID: FDP-HOM-k7x2m9. Photos: dollar_solo.png, herotogether.png, dollar_2.png, dollar_3.png, dollar_4.png
- **Pedra Dona De Galius "Dona"** — Female, KCI 2025/017688, Black & Tan, born 12 Jul 2022. Internal ID: FDP-HOM-p3n8qw. Photos: dona1.jpeg, dona2.jpeg

### Completed steps
1. ✅ Vite + React + TypeScript + Tailwind scaffolded
2. ✅ Tailwind config with design tokens (colours, fonts, spacing)
3. ✅ `src/config/site.ts` — kennel name, nav, announcement, social links
4. ✅ `src/types/dog.ts`, `testimonial.ts`, `enquiry.ts` — TypeScript interfaces
5. ✅ `src/components/layout/Header.tsx` — announcement bar + logo + nav
6. ✅ `src/components/layout/Footer.tsx` — kennel name + social links
7. ✅ `src/App.tsx` — routing wired up with React Router
8. ✅ `src/components/sections/Hero.tsx` — full-bleed hero with herotogether.png
9. ✅ `src/components/sections/FeaturedDog.tsx` — reusable, accepts props, flip layout
10. ✅ `src/pages/HomePage.tsx` — Hero + FeaturedDog for Dollar + FeaturedDog for Dona (flipped)
11. ✅ `src/pages/DogProfilePage.tsx` — full profile: breadcrumb, hero, gallery, registration, pedigree (4-gen with arrows), health vault (empty), enquiry CTA
12. ✅ Logo processed — white version with पंजाब in Yatra One font at `public/images/logo.png`

### Folder structure
```
src/
  assets/dogs/dollar/   — dollar_solo.png, herotogether.png, dollar_2-4.png
  assets/dogs/dona/     — dona1.jpeg, dona2.jpeg
  components/layout/    — Header.tsx, Footer.tsx
  components/sections/  — Hero.tsx, FeaturedDog.tsx
  config/               — site.ts
  data/                 — dogs.ts
  pages/                — HomePage.tsx, DogProfilePage.tsx
  types/                — dog.ts, testimonial.ts, enquiry.ts
public/
  images/               — logo.png, originalLogoWithMobileNumber.jpeg
  fonts/                — YatraOne-Regular.ttf
```

### Routes wired in App.tsx
- `/` → HomePage
- `/dogs` → DogsPage (placeholder)
- `/dogs/:slug` → DogProfilePage (live — dollar and dona work)
- `/about` → AboutPage (placeholder)
- `/enquire` → EnquirePage (placeholder)

### Next to build (in order)
1. Homepage — HealthStrip section (kennel-level, not per-dog)
2. Homepage — Testimonials section
3. Homepage — Enquiry CTA section
4. `/dogs` listing page — grid of all dogs
5. `/about` page
6. `/enquire` page — multi-step questionnaire

### ID system for dogs
Format: `[KENNEL]-[ORIGIN]-[random6]`
- Kennel prefix: `FDP` (Fearless Dobermans Punjab)
- Origin codes: `HOM` (home bred), `SUB` (placed with trusted person), `EXT` (external), `STD` (stud lineage)
- Random part: 6 chars — not sequential, not guessable

---

## Collaborator Working Style
- Non-technical background. Familiar with HTML and CSS basics. All other technologies need plain-English explanation before use.
- Always map new concepts back to HTML/CSS where possible.
- Explain what a technology/tool is and why it exists before using it.
- One thing at a time. One page, one component, one function at a time.
- Nothing moves forward without explicit approval.
- Mockup before code. Every page and section gets a visual mockup first.
- Slow and deliberate pace. Confirm understanding before moving to the next step.
- Involved in every decision. No assumptions.
- Never write code speculatively. Always confirm the plan first.

---

## Engineering Guidelines
- Dark-mode first, premium UI aesthetic matching luxury working dog profiles.
- Keep components modular, typing explicit via TypeScript interfaces, and avoid hardcoding text strings for kennel name variations.

---

## Design Decisions Locked
- **Aesthetic**: Leica-inspired — dark (`#0d0d0d`), minimal, photography-forward, no fluff
- **Accent colour**: Leica red `#E20612` — used sparingly (logo dot, section markers, indicators)
- **Fonts**: Cormorant Garamond (headings) + Inter (body)
- **Tone**: Gallery, not marketplace. No selling language, no exclamation marks, no urgency
- **Announcement bar**: Static strip at top — factual credentials by default, real news when available. No auto-scroll or animation
- **Navigation**: Dogs · Learn more · Enquire
- **Site structure**: Option 2 — homepage teaser → `/dogs` → `/dogs/[slug]` for individual profiles
- **Testimonials**: Screenshot image cards linking out to original post URL (Instagram, YouTube). No WhatsApp.
- **No ad gutters**: Full-bleed layout, no space reserved for ads
- **No moving elements**: Nothing auto-scrolls, auto-plays, or animates without user intent
