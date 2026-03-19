# Milk Chug Studios — Website Documentation

## Overview
This document captures the current state of the Milk Chug Studios website, what has been
built, what still needs to be done, known issues, things to watch out for, and a detailed
roadmap for future improvements.

Last updated: March 2026

---

## Current State of the Site

### Live URL
- Primary: `milkchugstudios.com` (DNS may still be propagating)
- Backup: `milk-chug-studios-website.vercel.app`

### Pages Live
| Page | URL | Status | Notes |
|------|-----|--------|-------|
| Home | `/` | ✅ Live | Hero, tagline, game cards pulled from Supabase |
| Games | `/games` | ✅ Live | Lists all games dynamically from Supabase |
| Game Detail | `/games/[slug]` | ✅ Live | Shows "Coming Soon" until `live = true` in Supabase |
| About | `/about` | ✅ Live | Studio mission, currently building section, tech stack |
| Privacy Policy | `/privacy` | ✅ Live | Linked in footer |

### Tech Stack (Current)
| Tool | Purpose | Cost |
|------|---------|------|
| Astro | Static site framework | Free |
| Vercel | Hosting + auto deploys on push | Free |
| Supabase | Play count database | Free |
| GitHub | Version control | Free |
| GitHub Desktop | Git GUI for pushing changes | Free |
| Godot 4.3 | Game engine (HTML5 export) | Free |

### Database (Supabase)
Table: `games`
| Column | Type | Notes |
|--------|------|-------|
| `id` | int | Auto-increment primary key |
| `slug` | text | Unique URL identifier e.g. `power-thief` |
| `title` | text | Display name |
| `play_count` | int | Increments when game is loaded |
| `live` | bool | `false` = Coming Soon, `true` = Game playable |

Game currently in database:
- **Power Thief** — `live: false`, `play_count: 0`

### Branding
- Logo: SVG wordmark stored in `/logos/` and served from `/public/logo.svg`
- Colors: Eggshell `#F8F6F0` (bg), Navy `#1A3A6A` (text/primary), Blue `#4488CC` (accent)
- Font: Space Grotesk (Google Fonts)

---

## What Has Been Built

### Components
- `src/components/Header.astro` — Sticky header with SVG logo and nav links
- `src/components/Footer.astro` — Copyright, Privacy Policy link
- `src/components/GameCard.astro` — Reusable game card with cover, title, play count, Play button

### Layouts
- `src/layouts/BaseLayout.astro` — Wraps all pages with Header, Footer, and global styles

### Styles
- `src/styles/global.css` — CSS variables, resets, container, base typography

### Library
- `src/lib/supabase.js` — Supabase client initialized with env vars

---

## Immediate Next Steps

### 1. Export Power Thief from Godot (Phase 5)
This is the most important next step. The site is ready — we just need the game.

- In Godot: **Project → Export → Add → Web (HTML5)**
- Install the HTML5 export template if prompted
- Export output folder: `public/games/power-thief/`
- The main file must be named `index.html`
- Once exported, push via GitHub Desktop — Vercel will deploy automatically
- In Supabase, set Power Thief's `live` column to `true`
- The "Coming Soon" screen will automatically switch to the game embed

### 2. Add a Description to Power Thief (Phase 7)
- In Supabase, add a `description` column (text) to the `games` table
- Fill in a short description for Power Thief e.g. "A top-down roguelike where you steal power cores from enemies and combine them to unlock new abilities."
- This will display on the game card and game detail page automatically

### 3. Add Cover Art for Power Thief (Phase 7)
- In Supabase, add a `cover` column (text) to store the image path
- Create a cover image (16:9 ratio recommended, at least 600x338px)
- Place it in `public/covers/power-thief.png`
- In Supabase, set the cover value to `/covers/power-thief.png`
- The GameCard will automatically display it

### 4. Add Open Graph Meta Tags (Phase 8)
- These make links look good when shared on Discord, Twitter, Reddit etc.
- Need to add `og:title`, `og:description`, `og:image` to BaseLayout.astro
- Create a default social share image (1200x630px) for the studio

### 5. Add a Favicon
- Currently using the default Astro favicon
- Replace `public/favicon.ico` and `public/favicon.svg` with a Milk Chug Studios icon
- Should ideally be a simplified version of the logo or a milk jug icon

### 6. Verify milkchugstudios.com is Fully Propagated
- DNS can take up to 24 hours
- Test by visiting `milkchugstudios.com` in an incognito window
- Also verify `https://` works (Vercel auto-provisions SSL)

---

## Things to Improve

### Performance
- **Images**: When cover art is added, use WebP format for smaller file sizes
- **Game embed loading**: Add a loading spinner while the Godot iframe initializes — Godot HTML5 builds can take a few seconds to load
- **Font loading**: Currently loading Space Grotesk from Google Fonts on every page — consider self-hosting the font for faster load times

### Design
- **Mobile navigation**: The header nav works on mobile but could benefit from a hamburger menu on very small screens
- **Game card descriptions**: Currently no descriptions are showing because the `description` column hasn't been added to Supabase yet
- **Home page**: Once more games are added, consider adding a "Featured Game" hero section that highlights the newest release
- **About page**: Could benefit from a progress timeline or dev log preview once multiple games have been released
- **Empty state**: The Games page shows "No games yet" if Supabase is empty — make this message more visually appealing

### Code Quality
- **Play count race condition**: Currently the play count increment reads then writes in two steps — if two people load the game simultaneously the count could be off by one. Fix by creating a Postgres RPC function in Supabase that does an atomic `UPDATE games SET play_count = play_count + 1`
- **Static site rebuild required for new games**: Because Astro is a static site generator, adding a new game to Supabase requires a Vercel redeploy to generate the new game page. Consider adding a Vercel deploy webhook or switching to Astro SSR mode in the future
- **TypeScript**: The project uses `.js` for the Supabase client but Astro supports TypeScript — migrating would catch bugs earlier

---

## Things to Watch Out For

### Supabase
- **Free tier limits**: Supabase free tier pauses projects after 1 week of inactivity. If the site goes quiet, the database will pause and play counts will stop working. Log in to Supabase occasionally to keep it active, or upgrade when ready
- **RLS policies**: Row Level Security is enabled. If play counts stop updating, check that the UPDATE policy is still active in Supabase → Authentication → Policies
- **Never expose the `service_role` key** — only the `anon` key should ever be in `.env` or Vercel environment variables
- **The `.env` file must never be committed to GitHub** — it is in `.gitignore` but double-check before pushing

### Vercel
- **Environment variables**: If Vercel ever resets or you create a new project, you must re-add `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` in Vercel → Settings → Environment Variables
- **Build failures**: If a Vercel deploy fails, check the build log — the most common cause will be a missing environment variable or a JavaScript error in a page
- **Free tier limits**: Vercel free tier allows 100GB bandwidth/month — more than enough for now but worth monitoring as traffic grows

### Godot HTML5 Export
- **SharedArrayBuffer requirement**: Godot 4 HTML5 exports require `SharedArrayBuffer` which needs specific HTTP headers (`Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy`). Vercel supports this but you may need to add a `vercel.json` config file with the correct headers if the game doesn't load
- **Export template**: The HTML5 export template must be downloaded in Godot before exporting. Go to Editor → Export → Manage Export Templates
- **File size**: Godot HTML5 exports can be large (10-50MB+). This is fine for Vercel but keep it in mind for load times
- **Mobile compatibility**: Godot HTML5 games may have issues on mobile browsers, especially iOS Safari. Test thoroughly on mobile before marking a game as live

### Domain
- **Renewal**: `milkchugstudios.com` was purchased through Namecheap. Set up auto-renew in your Namecheap account so you don't lose the domain
- **Nameservers**: Currently pointed to Vercel's nameservers. If you ever switch hosting providers, you'll need to update these in Namecheap

### Git & GitHub Desktop
- **Always push after committing**: GitHub Desktop commits locally but you must click "Push origin" to send changes to GitHub and trigger a Vercel deploy
- **One repo, one project**: The website repo is separate from the Power Thief game repo. Keep them separate

---

## Future Backlog (In Priority Order)

1. **Dev Log / Blog** — Document each game's development. Short posts with screenshots and lessons learned. Great for building an audience and showing growth over time
2. **Social links in footer** — Add Twitter/X, itch.io, or any other platform you use
3. **Trailer video per game** — Embed a YouTube trailer on each game's detail page above the play embed
4. **Analytics** — Add Vercel Analytics or a privacy-friendly tool like Plausible to see page views, where visitors come from, and which games get the most traffic
5. **Play count atomic fix** — Replace the two-step read/write with a Supabase Postgres RPC function for accurate counts under load
6. **Leaderboards / High Scores** — Per-game leaderboard using Supabase. Requires player name input and a new `scores` table
7. **Newsletter / Mailing list** — Use a free tool like Mailchimp or Buttondown. Add a signup form to the homepage
8. **Admin dashboard** — A private `/admin` page showing play count history over time, total plays across all games, and new game management
9. **Game tags / categories** — Filter games by genre, engine version, jam vs. commercial, etc.
10. **Astro SSR mode** — Switch from static to server-side rendering so new games appear instantly without a redeploy

---

## How to Add a New Game (Checklist)

When a new game is ready to be added to the site:

- [ ] In Supabase, insert a new row in the `games` table with `slug`, `title`, `live: false`, `play_count: 0`
- [ ] Export the game from Godot as HTML5 into `public/games/<slug>/`
- [ ] Add cover art to `public/covers/<slug>.png`
- [ ] Update the `cover` and `description` columns in Supabase for the new game
- [ ] Push via GitHub Desktop → Vercel rebuilds and generates the new game page
- [ ] Test the "Coming Soon" page at `/games/<slug>`
- [ ] When ready to launch, set `live: true` in Supabase — game goes live instantly
- [ ] Announce on social media

---

## File Structure Reference

```
milk-chug-studios-website/
├── logos/                          # Original logo files
├── public/
│   ├── favicon.ico
│   ├── logo.svg                    # Logo served in header
│   ├── covers/                     # Game cover images (to be created)
│   └── games/                      # Godot HTML5 exports go here
│       └── power-thief/            # (to be exported from Godot)
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── GameCard.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/
│   │   └── supabase.js
│   ├── pages/
│   │   ├── index.astro             # Home
│   │   ├── about.astro             # About
│   │   ├── privacy.astro           # Privacy Policy
│   │   └── games/
│   │       ├── index.astro         # Games list
│   │       └── [slug].astro        # Individual game page
│   └── styles/
│       └── global.css
├── .env                            # Secret keys — NEVER commit this
├── .gitignore
├── astro.config.mjs
├── package.json
├── task.md                         # Project task tracker
└── webpage.md                      # This file
```
