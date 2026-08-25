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
properties. Values were read directly from Figma's variable definitions on all four
reference frames — **Event Page** dark `2487:15185` / light `2472:13990` and **Basketball
(sport listing)** dark `2409:41347` / light `2477:14852` — plus the locally-modified tokens
in `Modified Colours/{Dark,Light}.tokens.json`.

Only the *values* differ between modes; every token name is identical, so components never
branch on theme.

### Three modes

| Mode | Behaviour |
|---|---|
| `auto` | **Default.** Follows the device's light/dark setting, and keeps following it if the device setting changes mid-session. |
| `light` | Forced light. |
| `dark` | Forced dark. |

Switch by putting `?theme=` in the URL **before** the `#` route:

```
…/gms-citizen-prototype/?theme=light#/events/womens-open-5v5
…/gms-citizen-prototype/?theme=dark#/
…/gms-citizen-prototype/?theme=auto#/     ← back to following the device
```

A forced choice is remembered in `localStorage`; `?theme=auto` clears it. No visible theme
control is added, because there isn't one in the design.

`auto` is always resolved to a concrete `data-theme="dark"|"light"` on `<html>` — by a small
blocking script in `index.html`, so there's no flash of the wrong palette on first paint.
That's why the stylesheet needs only a dark block and a light block rather than a duplicated
`prefers-color-scheme` palette. `src/theme.ts` holds the same logic for runtime use and
keeps `auto` in sync with the OS; **if you change the storage key or attribute in one, change
it in the other.**

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

### Where light mode is not simply a colour flip

Three things in the designs differ between modes structurally, not just by value. Each is
handled with a token so component code stays theme-agnostic:

- **The sport hero stays dark in light mode.** Photo, scrims, title and "Browse sports" are
  identical in both frames — only the search input inside it flips to white. Hence
  `--hero-bg` and `--bg-scrim-*` are deliberately *not* overridden under `[data-theme="light"]`.
- **The search-row filter button flips shape, not just colour**: outlined primary in dark,
  *filled* primary with a white icon (`Icon/icon-inverse`) in light. See `--filter-btn-*`.
- **The light sport listing has no background glow.** `BG LIGHT FLARE COLOUR` is bound on the
  dark frame and absent from the light one, so `--browse-flare-*` switches the glow off
  rather than recolouring it.

### Two token gaps worth raising with the designer

1. The **outline/primary Pill's stroke** (`#c72a00` on the dark frame) is the only paint on
   that component with no variable binding — and `#c72a00` is the *light*-mode value of
   `Primary 50 and 60`. It's held as `--pill-primary-border` so dark matches the design
   exactly, but it looks like a token-coverage gap rather than intent.
2. The **dark** event card's gradient stroke is hardcoded, while the **light** one is bound
   to `BORDER LIGHT FLARE COLOUR` / `BORDER LIGHT FLARE`. Only the light card would follow a
   mode switch inside Figma.
3. `Text/text-inverse (N8)` resolves to **`#000000`** on the dark Event Page but **`#ffffff`**
   on the dark sport listing. Same token, same mode, two values — so one of those frames is
   on a stale library version. The code uses `#000000` for dark, matching the Event Page,
   since that's the frame the "NEW" pill actually appears on.
