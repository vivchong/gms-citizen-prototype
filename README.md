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

## Design tokens (light + dark)

`src/index.css` carries the Flagship Design System Foundations token set as CSS custom
properties. Values were read directly from Figma's variable definitions on **Event Page –
Dark** (`2487:15185`) and **Event Page – Light** (`2472:13990`), plus the locally-modified
tokens in `Modified Colours/{Dark,Light}.tokens.json`.

Dark is the default. Light mode lives under `:root[data-theme="light"]` and redefines only
the values — every token name stays the same, so components never branch on theme.

**To view light mode**, append `?theme=light` to the URL before the `#` route:

```
…/gms-citizen-prototype/?theme=light#/events/womens-open-5v5
```

The choice is remembered in `localStorage`; `?theme=dark` switches back. No visible theme
control is added, because there isn't one in the design.

## Notes on fidelity

- **Both gradients on the event page are exact, not approximations.** Figma's background
  flare and the event card's border stroke are both `GRADIENT_RADIAL` paints on a *rotated*
  ellipse, which CSS `radial-gradient()` cannot express. They are instead rendered as inline
  SVG data URIs (`--flare-image`, `--card-border-image`) built from Figma's real
  `gradientTransform` matrices and stop lists, read via the Figma plugin API rather than
  codegen (codegen flattens a gradient stroke to its first stop). Verified by sampling the
  rendered pixels against an analytic model of Figma's paint — worst-case error is 1/255 per
  channel across both gradients.
  - The card border is a 1px INSIDE stroke, reproduced with a mask-composited 1px ring
    (`.gradient-ring`) so it adds no layout height.
  - The light-mode flare sits 48px lower than the dark one and has different stops — that
    offset is in the design, not a porting bug.
  - Not reproduced: the light flare's Figma **Noise** effect (monotone white, 0.25 alpha).
    CSS has no equivalent that would match it.
- Fonts match the Figma design tokens and are **both self-hosted** — there are no external
  font requests. **Apfel Grotezk** (headings) from the licensed `.otf` files, and **Hanken
  Grotesk** (body) as a variable `.woff2` (SIL Open Font License), both in
  `src/assets/fonts`. Mittel is registered under both 500 and 600 since Apfel Grotezk has no
  dedicated semibold cut.
- Pills, the primary button and the Rules & Regulations box use 1px-reduced padding
  alongside their border, because Figma strokes are INSIDE-aligned and so don't add to the
  box size the way a CSS border does.
- Icons are substituted 1:1 with [lucide-react](https://lucide.dev) equivalents (pin,
  calendar, chevron, search, sliders, home, compass, layers, user, external-link) — the
  exact Figma-exported SVGs weren't reachable from the build sandbox that generated this
  prototype.
- The hero cover photo (`src/assets/basketball-cover.png`) is the real photo, supplied directly.
- Event data is mock data in `src/data/events.ts` — swap in real API data when available.
  Copy differs slightly from the Figma mock-up (the eligibility text came from the real
  Basketball rules PDF), so the page renders ~10px shorter than the 1827px Figma frame.
- "Login with Singpass to register" and the sport filter are not wired to a real backend;
  the register button shows a placeholder alert.

### Two token gaps worth raising with the designer

1. The **outline/primary Pill's stroke** (`#c72a00` on the dark frame) is the only paint on
   that component with no variable binding — and `#c72a00` is the *light*-mode value of
   `Primary 50 and 60`. It's held as `--pill-primary-border` so dark matches the design
   exactly, but it looks like a token-coverage gap rather than intent.
2. The **dark** event card's gradient stroke is hardcoded, while the **light** one is bound
   to `BORDER LIGHT FLARE COLOUR` / `BORDER LIGHT FLARE`. Only the light card would follow a
   mode switch inside Figma.
