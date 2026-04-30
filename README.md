# CineFlix

A professional Next.js movie & TV show streaming-style website with an integrated XHTTP relay backend, ready for one-click deployment to Vercel.

## What's inside

- **Frontend** — A modern, fully responsive movie/TV discovery site built with Next.js 14 (App Router), React Server Components, Tailwind CSS, and TMDB data.
  - Hero slider, trending rows, category browsing, genre filtering, search
  - Detail pages for movies and TV shows with cast, similar titles, ratings, genres
  - "Watch Online" / "Download" / "Trailer" / "IMDb" deep links to external sources
  - SEO: per-page metadata, OpenGraph, Twitter cards, sitemap.xml, robots.txt
  - Fast: ISR caching, image optimization, edge-friendly fetching

- **Backend** — Your XHTTP relay (Xray/V2Ray) is mounted at `/api/relay/*`.
  - The website occupies all visible URLs. The relay only answers under `/api/relay/`.
  - Configure your Xray client to use path `/api/relay/<your-secret-path>`.
  - 100% functional behavior of the original `vercel-xhttp-relay` is preserved (header passthrough, streaming bodies, IP forwarding, redirect=manual, 60s maxDuration, 128MB).

## Deploy to Vercel

1. Push this folder to a GitHub repo (or use `vercel` CLI directly).
2. Import the project on https://vercel.com.
3. Add an Environment Variable:
   - `TARGET_DOMAIN` = `https://your-upstream-host.example.com` (the upstream your old relay pointed to)
   - (optional) `TMDB_API_KEY` = your own TMDB v3 API key
4. Deploy. Done.

## Local development

```bash
npm install
cp .env.example .env.local   # set TARGET_DOMAIN
npm run dev
```

Open http://localhost:3000

## Routing

| Path                 | Purpose                          |
|----------------------|----------------------------------|
| `/`                  | Home with hero + rows            |
| `/movie/[id]`        | Movie detail                     |
| `/tv/[id]`           | TV show detail                   |
| `/category/movie`    | Browse movies by genre           |
| `/category/tv`       | Browse TV shows by genre         |
| `/search?q=...`      | Search                           |
| `/api/relay/*`       | **Your XHTTP relay** (backend)   |

## Notes

- TMDB ships with a public demo API key for convenience. Replace via `TMDB_API_KEY` env var for production.
- The download/watch buttons link to external aggregators (Google search, IMDb, YouTube). No copyrighted content is hosted.
- Security headers (X-Frame-Options, nosniff, Referrer-Policy) are set globally via `next.config.mjs`.
