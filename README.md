# App Factory Template

**Rapid, production-ready Next.js 16 starter for building modern web apps.**

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38bdf8?logo=tailwindcss&logoColor=white)

## Features

- Next.js 16 App Router
- Clerk authentication (sign-in, sign-up, protected routes, webhook sync)
- Supabase Postgres + Drizzle ORM
- Upstash Redis for caching and rate limiting
- Cloudinary uploads and media handling
- Tailwind CSS 4 styling
- Strict TypeScript + ESLint
- SOLID services/repositories architecture

## Tech Stack

| Technology | Purpose |
| --- | --- |
| Next.js 16 | App framework with App Router |
| React 19 | UI library |
| TypeScript | Type safety and DX |
| Tailwind CSS 4 | Utility-first styling |
| Clerk | Authentication and user management |
| Supabase Postgres | Database |
| Drizzle ORM | Type-safe database access |
| Upstash Redis | Caching and rate limiting |
| Cloudinary | Media storage and transformations |

## Quick Start

```bash
git clone <YOUR_REPO_URL>
cd template
npm install
cp .env.example .env.local
```

Fill in the environment variables using your service dashboards:
- Clerk: https://dashboard.clerk.com
- Supabase: https://supabase.com/dashboard
- Upstash: https://console.upstash.com
- Cloudinary: https://console.cloudinary.com

Start the dev server:
```bash
npm run dev
```

Run database migrations (Drizzle push):
```bash
npm run db:push
```

## Project Structure

```
src/
  app/            # App Router routes, layouts, pages
  components/     # Reusable UI components
  config/         # App and service configuration
  hooks/          # Custom React hooks
  lib/            # Shared utilities
  services/       # Business logic (service layer)
  types/          # Shared TypeScript types
  proxy.ts        # Server-side proxy helpers
```

## Environment Variables

| Variable | Description |
| --- | --- |
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | Clerk publishable key |
| CLERK_SECRET_KEY | Clerk secret key |
| CLERK_WEBHOOK_SECRET | Clerk webhook signing secret |
| NEXT_PUBLIC_CLERK_SIGN_IN_URL | Sign-in route |
| NEXT_PUBLIC_CLERK_SIGN_UP_URL | Sign-up route |
| NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL | Post sign-in redirect |
| NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL | Post sign-up redirect |
| DATABASE_URL | Postgres connection string (Supabase) |
| UPSTASH_REDIS_REST_URL | Upstash Redis REST endpoint |
| UPSTASH_REDIS_REST_TOKEN | Upstash Redis REST token |
| NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME | Cloudinary cloud name |
| CLOUDINARY_API_KEY | Cloudinary API key |
| CLOUDINARY_API_SECRET | Cloudinary API secret |

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Run production server
- `npm run lint` — Lint codebase
- `npm run db:generate` — Generate Drizzle migrations
- `npm run db:migrate` — Run Drizzle migrations
- `npm run db:push` — Push schema to database
- `npm run db:studio` — Open Drizzle Studio

## Architecture

This template follows a services/repositories pattern to keep business logic isolated and testable. Services encapsulate use cases, while repositories handle data access. This separation keeps the codebase SOLID-friendly and easy to scale.

## Deployment

**Vercel (recommended)**

- One-click deploy: https://vercel.com/new
- Or via CLI:

```bash
npm i -g vercel
vercel
```

## Build Note

Next.js 16 builds are run with the `--webpack` flag by default (`npm run build`) to avoid current Turbopack issues.
