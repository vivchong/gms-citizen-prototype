# GMS Citizen Prototype — Pesta Sukan 2027

A clickable React + Vite prototype of two Games Management System (GMS) citizen-facing screens, built from Figma designs:

- **Browse events** — search and browse events within a sport (Basketball)
- **Event details** — eligibility, how-to-participate timeline, rules & regulations, and the registration CTA

## Live prototype

Deployed automatically to GitHub Pages on every push to `main`: see the repo's **About** section on GitHub for the live link, or check the "pages-build-deployment" / "Deploy to GitHub Pages" run in the **Actions** tab.

## Running locally

```bash
npm install
npm run dev
```

## Building

```bash
npm run build
npm run preview
```

## Deployment

`.github/workflows/deploy.yml` builds the app and publishes `dist/` to GitHub Pages automatically on every push to `main` — no manual steps needed. GitHub Pages must be set to the **GitHub Actions** source (Settings → Pages → Build and deployment → Source) for this to work.

## Notes on fidelity

- Icons are substituted 1:1 with [lucide-react](https://lucide.dev) equivalents (pin, calendar, chevron, search, sliders, home, compass, layers, user, external-link) — the exact Figma-exported SVGs weren't reachable from the build sandbox that generated this prototype.
- The hero cover photo (`src/assets/basketball-cover.png`) is the real photo, supplied directly.
- All background gradients (the event-details hero flare and the browse-page card-area flare) use the exact colour stops from Figma; the event-details one couldn't be replicated with Figma's exact skewed gradient angle since CSS `radial-gradient` doesn't support arbitrary transforms, but the colours and general direction match.
- Fonts match the Figma design tokens exactly. Body copy is **Hanken Grotesk** (loaded from Google Fonts). Headings are **Apfel Grotezk**, self-hosted from the licensed `.otf` files in `src/assets/fonts` (Regular/Mittel/Fett/Satt, `@font-face`'d in `src/index.css` at weights 400/500/600/700/800 — Mittel is registered under both 500 and 600 since there's no dedicated semibold cut). Space Grotesk remains as a fallback in `--font-heading` only in case those font files are ever unavailable.
- Event data (all 6 basketball events) is mock data in `src/data/events.ts` — swap in real API data when available.
- "Login with Singpass to register" and the sport filter are not wired to a real backend; the register button shows a placeholder alert.
