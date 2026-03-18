# Milk Chug Studios — Website Project Plan

## Overview
A clean, minimal game studio website for Milk Chug Studios. The site will showcase games
built in Godot, allow visitors to play them directly in the browser, and track play counts
per game. Built with Astro (frontend), Netlify (hosting), and Supabase (database).

---

## Phase 1: Project Setup
- [ ] Initialize Astro project inside this folder (`npm create astro@latest`)
- [ ] Choose Astro template: minimal/blank
- [ ] Install dependencies
- [ ] Initialize a Git repository
- [ ] Create a GitHub repository and push initial commit
- [ ] Connect GitHub repo to Netlify for automatic deploys

---

## Phase 2: Supabase Setup (Play Count Tracking)
- [ ] Create a free Supabase account at supabase.com
- [ ] Create a new Supabase project (name: milk-chug-studios)
- [ ] Create a `games` table with the following columns:
  - `id` (int, primary key, auto-increment)
  - `slug` (text, unique) — URL-friendly game identifier e.g. `power-thief`
  - `title` (text) — Display name of the game
  - `play_count` (int, default 0)
- [ ] Enable Row Level Security (RLS) and add a policy allowing public reads and increments
- [ ] Copy Supabase project URL and anon key into a `.env` file
- [ ] Add `.env` to `.gitignore` so secrets are not committed
- [ ] Add environment variables to Netlify dashboard

---

## Phase 3: Site Structure & Pages

### Pages to build:
- [ ] **Home (`/`)** — Hero section with studio name/logo, tagline, featured games grid
- [ ] **Games (`/games`)** — Full list of all games with cover art, description, play count
- [ ] **Game Detail (`/games/[slug]`)** — Individual game page with embedded Godot HTML5 build and play count
- [ ] **About (`/about`)** — Studio mission, who you are, progress/dev log summary

### Shared Components to build:
- [ ] **Header** — Logo, nav links (Home, Games, About)
- [ ] **Footer** — Studio name, copyright, optional social links
- [ ] **GameCard** — Reusable card component (cover image, title, play count badge, Play button)
- [ ] **GameEmbed** — iframe wrapper that loads the Godot HTML5 build and triggers play count increment

---

## Phase 4: Design & Styling
- [ ] Set up global CSS variables (colors, fonts, spacing)
- [ ] Color palette: off-white background, dark charcoal text, single warm accent color
- [ ] Choose and import a font (e.g. Google Fonts — something clean and slightly bold)
- [ ] Style the Header and Footer
- [ ] Style the Home page hero section
- [ ] Style the GameCard component
- [ ] Style the Games list page
- [ ] Style the Game Detail page (game embed + metadata)
- [ ] Style the About page
- [ ] Make all pages responsive (mobile-friendly)

---

## Phase 5: Godot HTML5 Export Setup
- [ ] In Godot, install the HTML5 export template (Editor > Export > Manage Export Templates)
- [ ] Configure an HTML5 export preset for each game
- [ ] Export game to a folder inside the Astro `public/` directory (e.g. `public/games/power-thief/`)
- [ ] Test the iframe embed locally
- [ ] Confirm the game loads correctly in Netlify deploy preview

---

## Phase 6: Play Count Integration
- [ ] Install Supabase JS client in Astro project (`npm install @supabase/supabase-js`)
- [ ] Create a Supabase utility/client file
- [ ] In the GameEmbed component, call a function that increments `play_count` for the game slug when the iframe loads
- [ ] Display live `play_count` on the GameCard and Game Detail page
- [ ] Test that counts increment correctly on each page load

---

## Phase 7: Content — First Game (Power Thief)
- [ ] Add Power Thief entry to the Supabase `games` table
- [ ] Export Power Thief from Godot as HTML5 and place in `public/games/power-thief/`
- [ ] Create cover art or placeholder image for Power Thief
- [ ] Write a short description for the Power Thief game page
- [ ] Verify the game plays correctly on the live site

---

## Phase 8: Launch & Polish
- [ ] Set up a custom domain (optional — purchase domain if desired)
- [ ] Add a favicon (milk jug icon or logo)
- [ ] Add Open Graph meta tags (so links shared on Discord/Twitter show a preview)
- [ ] Add a simple loading state while the game iframe initializes
- [ ] Final review: check all pages on desktop and mobile
- [ ] Announce launch

---

## Future / Backlog
- [ ] Dev log / blog section to document game development progress
- [ ] Newsletter signup or mailing list
- [ ] Leaderboard or high score tracking per game
- [ ] Admin dashboard to view play count analytics over time
- [ ] Studio logo / branding (custom art)
- [ ] Trailer video embed per game page

---

## Tech Stack Reference
| Tool       | Purpose                          | Cost  |
|------------|----------------------------------|-------|
| Astro      | Static site framework            | Free  |
| Netlify    | Hosting + CI/CD deploys          | Free  |
| Supabase   | Play count database              | Free  |
| GitHub     | Version control + Netlify trigger| Free  |
| Godot 4.3  | Game engine (HTML5 export)       | Free  |

---

## Notes
- Keep all game HTML5 exports inside `public/games/<slug>/` so Astro serves them as static files.
- Never commit `.env` to Git — add Supabase keys to Netlify's environment variable settings.
- Each new game added in the future just needs: a Supabase row, an HTML5 export folder, a cover image, and a short description. Everything else is handled by the existing templates.
