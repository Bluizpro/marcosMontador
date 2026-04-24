# 🗺️ marcosMontador — Project Map

## Stack
- Frontend: Next.js 15, TypeScript, Tailwind CSS
- Backend: Next.js API Routes (Serverless)
- Auth/DB: Supabase
- Infra: Netlify / Docker (local)

## Folder Structure
frontend/
  src/
    app/                → Next.js App Router (pages and API)
    components/         → Shared UI components
    lib/                → Shared utilities and helpers

## Routes / Pages
GET  /                  → Landing page
POST /api/contact       → Contact form endpoint

## Key Files
frontend/src/middleware.ts → Rate limiting (5 req/s) and bot protection (FORBIDDEN_PATHS)
.env.example            → Environment variables template
docker-compose.yml      → Local development environment

## Last updated: 2026-04-24
