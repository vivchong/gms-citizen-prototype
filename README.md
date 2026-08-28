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

## Screens

| Route | Screen | Figma |
|---|---|---|
| `/` | Home | `2501:18369` (dark, "FINAL") |
| `/browse` | Basketball event listing | `2409:41347` / `2477:14852` |
| `/events/:eventId` | Event details | `2487:15185` / `2472:13990` |

The Home screen's five rasters live in `src/assets` and are imported (so Vite fingerprints
them); node IDs and sizes are in the header comment of `src/data/home.ts`. Figma's asset CDN
isn't reachable from the build environment, so they were exported by hand.

The two SportSG logos are named for the **background** they sit on, not the colour of the
artwork: `sportsg-logo-on-dark.png` is the white wordmark, `sportsg-logo-on-light.png` is the
black one. Both Figma nodes are called "…White…", which makes this easy to get backwards.

Icon substitutions all live in `src/components/icons.tsx`, exported under their Figma
component names — replace the exports there and every screen picks up the real assets.

## Notes on fidelity

- **Every gradient is a complete spec held in one CSS variable** — geometry *and* stops —
  because Figma's gradient geometry is per-mode data just as much as colour is, and a
  variable can carry stop colours but not an ellipse. Anything shape-different between modes
  is overridden wholesale in the light block rather than recoloured; the rest is defined once
  with token-bound stops. Gradients are never inlined in a component. The full inventory,
  with which ones actually differ in shape, is in the `GRADIENTS` block of `src/index.css`.
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
- The listing's filter control is the design system's **Secondary button**
  (`Size=small, Type=icon only`) — `Button` with `variant="secondary" size="icon"`. Fill is
  the `Bg` token, with the 1px stroke and the icon both on `Primary 50/60`; that's a plain
  token flip between modes. Figma only defines `State=default`, so the inverted fill used
  for the sort-active state is ours, not the design's.
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

Almost everything is a straight token flip. Two things aren't:

- **The sport hero stays dark in light mode.** Photo, scrims, title and "Browse sports" are
  identical in both frames — only the search input inside it flips to white. Hence
  `--hero-bg` and `--bg-scrim-*` are deliberately *not* overridden under `[data-theme="light"]`.
- **The listing's background glow is a different ellipse per mode**, not just different
  colours: dark is centred at `(50%, 100%)` with semi-axes `92.104% × 100%`; light at
  `(50%, 85.285%)` with `93.375% × 85.285%`. Both invert to axis-aligned ellipses, so plain
  CSS `radial-gradient()` reproduces them exactly — unlike the event page's rotated flare.
  See `--browse-flare-image`.

> **A cautionary note on reading absence.** `BG LIGHT FLARE COLOUR` does not appear in the
> light listing frame's variable list, and an earlier pass concluded from that the light
> listing had no glow, and switched it off. Wrong: the light gradient is *hardcoded* in
> Figma (`2477:14930` has no `boundVariables`), so it never shows up as a variable. A token
> missing from a frame's variable list means "not variable-bound here", never "not present".

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
