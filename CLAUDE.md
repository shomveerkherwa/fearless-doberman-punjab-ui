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

## Current Local Data State
- Base staging records mapped inside `src/data/pedigree.json`.
- Principal reference entity: **Ranger (Call name: Dollar)**, KCI Number: `2025/000704`, Sire: `CH. DICASA ORO EXCALIBUR UNBEATABLE`, Dam: `ATINA`.

---

## Engineering Guidelines
- Dark-mode first, premium UI aesthetic matching luxury working dog profiles.
- Keep components modular, typing explicit via TypeScript interfaces, and avoid hardcoding text strings for kennel name variations.
