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
- The hero cover photo is a CSS gradient placeholder standing in for the real event cover photo (same limitation as above). Drop a real image into `src/assets` and reference it in `src/pages/BrowseEvents.tsx` to replace it.
- Event data (all 6 basketball events) is mock data in `src/data/events.ts` — swap in real API data when available.
- "Login with Singpass to register" and the sport filter are not wired to a real backend; the register button shows a placeholder alert.
