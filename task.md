# Milk Chug Studios — Website Project Plan

## Overview
A clean, minimal game studio website for Milk Chug Studios. The site showcases games
built in Godot, allows visitors to play them directly in the browser, and tracks play counts
per game. Built with Astro (frontend), Vercel (hosting), and Supabase (database).

---

## Phase 1: Project Setup ✓ COMPLETE
- [x] Initialize Astro project (`npm create astro@latest`)
- [x] Choose Astro template: minimal/blank
- [x] Install dependencies
- [x] Initialize a Git repository
- [x] Create a GitHub repository and push initial commit
- [x] Connect GitHub repo to Vercel for automatic deploys
- [x] Purchase and connect custom domain `milkchugstudios.com` via Namecheap → Vercel

---

## Phase 2: Supabase Setup ✓ COMPLETE
- [x] Create a free Supabase account
- [x] Create project `milk-chug-studios`
- [x] Create `games` table (`id`, `slug`, `title`, `play_count`, `live`)
- [x] Enable Row Level Security with public read + update policies
- [x] Add Supabase keys to `.env` file
- [x] Add `.env` to `.gitignore`
- [x] Add environment variables to Vercel dashboard
- [x] Add `live` boolean column to control Coming Soon vs. playable state
- [x] Reset Power Thief play count to 0

---

## Phase 3: Site Structure & Pages ✓ COMPLETE
- [x] Home (`/`) — Hero, tagline, game cards from Supabase
- [x] Games (`/games`) — Full game list
- [x] Game Detail (`/games/[slug]`) — Coming Soon or live embed based on `live` flag
- [x] About (`/about`) — Mission, currently building, tech stack cards
- [x] Privacy Policy (`/privacy`) — Linked in footer
- [x] Header component with SVG logo
- [x] Footer component with copyright and Privacy Policy link
- [x] GameCard component
- [x] BaseLayout with global styles

---

## Phase 4: Design & Styling ✓ COMPLETE
- [x] Global CSS variables (colors, fonts, spacing)
- [x] Color palette matched to logo: eggshell bg, navy text, blue accent
- [x] Space Grotesk font via Google Fonts
- [x] SVG logo integrated into header
- [x] All pages styled and responsive
- [x] About page redesigned with dark hero, mission card, stack grid
- [x] Coming Soon styled page for unreleased games

---

## Phase 5: Godot HTML5 Export ← NEXT
- [ ] In Godot: Editor → Export → Manage Export Templates → Download Web template
- [ ] Add a Web (HTML5) export preset in Godot
- [ ] Export Power Thief to `public/games/power-thief/` (main file must be `index.html`)
- [ ] Push via GitHub Desktop → Vercel redeploys
- [ ] Test game loads correctly on the live site
- [ ] If game doesn't load, add `vercel.json` with SharedArrayBuffer headers (see webpage.md)

---

## Phase 6: Play Count Integration ✓ MOSTLY COMPLETE
- [x] Supabase JS client installed and configured
- [x] Play count increments when a live game page is loaded
- [x] Play count is disabled for Coming Soon games
- [x] Play count displays on GameCard and game detail page
- [ ] Improve to atomic increment using Supabase RPC function (prevents race conditions)

---

## Phase 7: Content — Power Thief
- [x] Power Thief row added to Supabase games table
- [ ] Add `description` column to `games` table in Supabase
- [ ] Write and add a short description for Power Thief in Supabase
- [ ] Add `cover` column to `games` table in Supabase
- [ ] Create cover art for Power Thief (16:9, at least 600x338px, save as WebP)
- [ ] Place cover at `public/covers/power-thief.webp` and update Supabase
- [ ] Export game from Godot (see Phase 5)
- [ ] Set `live: true` in Supabase when ready to launch

---

## Phase 8: Launch & Polish
- [x] Custom domain connected (`milkchugstudios.com`)
- [ ] Replace default favicon with Milk Chug Studios icon
- [ ] Add Open Graph meta tags to BaseLayout (for Discord/Twitter link previews)
- [ ] Create a 1200x630px social share image
- [ ] Add loading spinner on game embed while Godot initializes
- [ ] Final review on desktop and mobile
- [ ] Test all pages in incognito window at `milkchugstudios.com`
- [ ] Announce launch

---

## Future / Backlog (Priority Order)
- [ ] Dev log / blog section — document game development with screenshots and lessons
- [ ] Social links in footer (Twitter/X, itch.io)
- [ ] Trailer video embed per game page (YouTube embed above game iframe)
- [ ] Vercel Analytics or Plausible for page view tracking
- [ ] Atomic play count fix via Supabase Postgres RPC function
- [ ] Leaderboard / high score system per game (new `scores` table in Supabase)
- [ ] Newsletter / mailing list signup (Mailchimp or Buttondown)
- [ ] Admin dashboard — private page showing play count analytics
- [ ] Game tags and genre filters on the Games page
- [ ] Astro SSR mode — so new games appear without a full redeploy
- [ ] Self-host Space Grotesk font for faster load times
- [ ] Mobile hamburger menu for small screens

---

## Tech Stack Reference
| Tool | Purpose | Cost |
|------|---------|------|
| Astro | Static site framework | Free |
| Vercel | Hosting + CI/CD | Free |
| Supabase | Play count database | Free |
| GitHub | Version control | Free |
| GitHub Desktop | Git GUI (push changes) | Free |
| Namecheap | Domain registrar | ~$12/yr |
| Godot 4.3 | Game engine (HTML5 export) | Free |

---

## Important Notes
- `.env` must NEVER be committed to GitHub — keys live in Vercel environment variables
- Each new game needs: a Supabase row, an HTML5 export in `public/games/<slug>/`, a cover image, and a description. Everything else is automatic.
- Supabase free tier pauses after 1 week of inactivity — log in periodically to keep it active
- Godot HTML5 exports may need `vercel.json` headers for SharedArrayBuffer — see webpage.md
- Always push via GitHub Desktop after committing — commits alone do not trigger a Vercel deploy
- See `webpage.md` for full documentation, file structure, and detailed improvement notes
