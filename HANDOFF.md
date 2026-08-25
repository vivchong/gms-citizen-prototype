# Handoff: GMS Citizen Prototype

Hand-off notes between the Claude (Cowork) session and a local Claude Code session working
in `~/Documents/GMS/Citizen_Prototype`. Read this before changing anything — it captures
decisions and constraints that aren't obvious from the code.

**Last updated:** after the light-mode refinement pass — three theme modes (auto/light/dark)
and the Browse page reconciled against its light Figma frame.

---

## 1. What this is

A React + Vite prototype of the citizen-facing Games Management System (GMS) screens for
Pesta Sukan 2027 (SportSG). Two screens exist:

- **Browse events** (`/`) — `src/pages/BrowseEvents.tsx`. **Considered finished by the
  designer.** Don't restyle it without being asked.
- **Event details** (`/events/:eventId`) — `src/pages/EventDetails.tsx`. Just refined to
  match Figma exactly (see §4).

Figma source: `nlhBZQNIHe5BB7DyxNOWqs`, page **Handoff Screens** (`2019:10101`).

| Frame | Node ID |
|---|---|
| Event Page – Dark (the reference for the current build) | `2487:15185` |
| Event Page – Light | `2472:13990` |
| Event details card (dark / light) | `2487:15198` / `2472:14003` |
| Background flare (dark / light) | `2487:15186` / `2472:13991` |
| Basketball sport listing – Dark | `2409:41347` |
| Basketball sport listing – Light | `2477:14852` |
| Browse sports – Dark | `2512:4536` |
| Sport page – Dark / Light | `2501:18152` / `2501:18461` |
| Homepage – Dark / Light | `2464:10908` / `2477:14960` |
| Your dashboard – Dark / Light | `2501:18369` / `2501:18678` |

---

## 2. Repo & deployment

- **Remote:** `vivchong/gms-citizen-prototype` (`origin` already configured)
- **Deploy:** `.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on
  every push to `main`. Pages source is already set to **GitHub Actions**.
- **Base path:** `vite.config.ts` sets `base: '/gms-citizen-prototype/'`. Update if the repo
  is ever renamed.
- **Routing:** `HashRouter`, deliberately — GitHub Pages 404s on a hard refresh of a
  client-side sub-route. Keep it unless the deploy target changes.
- Claude Code has normal git/network access here; just `git add / commit / push`. (The
  Cowork session that wrote some of this repo could not push — that's why some commits were
  authored via hand-delivered shell commands. Not a constraint for you.)

---

## 3. Stack

React 19 + TypeScript, Vite 8, **Tailwind CSS v4** via `@tailwindcss/vite`.

> Tailwind v4 is CSS-first: there is **no `tailwind.config.js`**. Design tokens live in
> `src/index.css` as CSS custom properties, and components reference them with arbitrary
> values like `text-[var(--text-subtle)]` / `text-[length:var(--font-size-body-md)]`.

Also: `react-router-dom` v7, `lucide-react` for icons, `oxlint` (`npm run lint`).

---

## 4. What changed in the most recent pass

### 4.1 Full light + dark design token system (`src/index.css`)

The Flagship Design System Foundations token set is now implemented as CSS custom
properties. Values were read from Figma's **variable definitions** on the dark
(`2487:15185`) and light (`2472:13990`) Event Page frames, plus the locally-modified tokens
in `Modified Colours/{Dark,Light}.tokens.json`.

- Light redefines only the *values* under `:root[data-theme="light"]` — every token name is
  identical across modes, so components never branch on theme.
- **Three modes: `auto` (default, follows the device), `light`, `dark`.** Switch with
  `?theme=auto|light|dark` before the `#` route. A forced choice persists in `localStorage`
  under `gms-theme`; `?theme=auto` clears it. There is deliberately **no visible theme
  control** — the design doesn't have one.
- **`auto` is always resolved to a concrete `data-theme` on `<html>`** by a blocking script
  in `index.html` (so no flash of the wrong palette), which is why the stylesheet needs only
  two blocks instead of a duplicated `prefers-color-scheme` palette. `src/theme.ts` holds the
  same logic for runtime use and keeps `auto` in sync when the OS setting changes.
  **The script in `index.html` and `src/theme.ts` duplicate the storage key and attribute —
  change one, change the other.**
- Legacy variable names (`--text-1`, `--border-40`, `--primary-subtlest`, …) are kept as
  aliases at the bottom of `:root` **so the Browse page keeps rendering**. Don't delete them
  without migrating `BrowseEvents.tsx` and `EventCard.tsx` first.

### 4.2 Both gradients are now pixel-exact — and this is the important part

Figma's `get_design_context` codegen **flattens gradient strokes to their first stop**. It
reported the event card's border as `border: 1px solid #dc5d39`. That is wrong.

Reading the real paint objects through the **Figma plugin API** showed both the page
background flare and the card border are `GRADIENT_RADIAL` paints on a **rotated ellipse**.
CSS `radial-gradient()` cannot express a rotation — there is no approximation that lands on
the design.

Both are therefore rendered as **inline SVG data URIs** held in CSS custom properties.

**Every gradient in the app is a complete spec in one variable — geometry AND stops.** That
is deliberate: Figma's gradient *geometry* is per-mode data just as much as colour is, and a
variable can carry stop colours but not an ellipse. So anything shape-different between modes
gets overridden wholesale in the light block rather than recoloured. Never inline a gradient
in a component; add a variable.

| Property | Used by | Shape differs by mode? | Figma source |
|---|---|---|---|
| `--flare-image` | `.page-flare` | **yes** (different matrix + stop count) | `2487:15186` / `2472:13991` |
| `--browse-flare-image` | Browse bg glow | **yes** (different centre + radii) | `2409:41349` / `2477:14930` |
| `--card-border-image` | `.gradient-ring` | no (same matrix, different stops) | `2487:15198` / `2472:14003` |
| `--browse-card-border-image` | `EventCard` ring | no (same matrix, token-bound stops) | `2409:41367` / `2477:14933` |
| `--hero-scrim-top` / `-bottom` | Browse hero | no — hardcoded `#0d0c0c` in **both** Figma modes | `2409:41352-3` / `2477:14879-80` |

Note the last row: the hero overlays are byte-identical across the two Figma frames, and they
are the only reason the hero's white text stays readable in light mode. Don't tokenise them
to a light value without re-tokenising the hero text at the same time.

Two things to understand before touching these:

1. **The matrices in the CSS are the *inverse* of Figma's `gradientTransform`.** Figma's
   matrix maps normalised node space → gradient space; SVG's maps gradient space → object
   space. If you re-derive one from a new Figma node, you must invert it. The card border
   uses `gradientUnits="objectBoundingBox"` with `cx=.5 cy=.5 r=.5`, which reproduces
   Figma's normalised-space model exactly; the flare uses `userSpaceOnUse` on a
   `0 0 390 716` viewBox.
2. **`preserveAspectRatio="none"` is load-bearing.** Figma computes the gradient in
   normalised (square) space and *then* stretches it to the node's aspect ratio. Stretching
   the SVG non-uniformly reproduces that. Don't "fix" it to `meet`.

The card border is a **1px INSIDE-aligned stroke**, reproduced by `.gradient-ring` — an
`inset-0` overlay with `padding: 1px` and `mask-composite: exclude`, so it contributes no
layout height. Both `-webkit-mask-composite: xor` and the standard property are set.

**Verification method (reuse this if you change a gradient):** screenshot at
`deviceScaleFactor: 2`, then sample rendered pixels and compare against an analytic model of
Figma's paint (invert the matrix, compute `t`, interpolate the stops in sRGB, composite over
the background at the paint's opacity). The current build measured **worst-case error 1/255
per channel** across 18 probe points on both gradients. Anything worse than ~2/255 means
something regressed.

Known differences from Figma, both deliberate:

- The light flare sits at `y: 48` and the dark at `y: 0` (`--flare-top`). That offset is in
  the design — the light one is pushed down by the masthead height — not a porting bug.
- The light flare's Figma **Noise** effect (monotone white, 0.25 alpha) is **not**
  reproduced. Nothing in CSS matches it convincingly.

### 4.3 Layout, type and component corrections

- `EventDetails.tsx` spacing now matches the frame: root `pt 64 / gap 64 / pb 224` (the
  masthead accounts for 48 of the 64), Main `gap 32`, Title `gap 16`, Sport+Event `gap 4`.
  Verified: the card lands at `y=372, w=342` — identical to Figma.
- Full type ramp as tokens. Heading/XS is **18/26 with 0.16 letter-spacing** — the tracking
  was missing before. Body/XS is 12/**16**/0.12.
- **Figma strokes are INSIDE-aligned and don't grow the box; CSS borders do.** Pills, the
  Rules & Regulations box and anything else with a visible 1px border use padding reduced by
  1px to compensate (e.g. `p-[15px] border` instead of `p-4 border`). Keep this in mind for
  any new bordered component.
- `Pill.tsx` rewritten around exact Figma fills/strokes: outline-primary is
  `bg-primary-subtlest` + `--pill-primary-border` + `text-primary`; solid-white resolves to
  `#e1e0e0` (not pure white); outline-yellow uses the warning triplet.
- `Button.tsx` — the primary CTA uses the **heading typeface (Apfel Grotezk)** SemiBold
  18/26, 48px tall, radius 4. Its label colour is bound to Figma's "Black" token, which
  resolves to the page background per mode, hence `text-[var(--bg)]`.
- `Timeline.tsx` — the connector line now renders on the **final** step too, as in the design.
- `Masthead.tsx` is token-driven (`--bg-alternate`, `--label-default`, `--link`). This
  changed its dark background from `#0d0c0c` to `#1a1a1a` per `sgds/bg-alternate`. It's
  shared with the Browse page — the designer was told and hasn't objected, but it is the one
  change in this pass that touches the "finished" screen.

### 4.4 Light mode is not always a colour flip

Almost all of it is a straight token flip. Two things are not, and both are absorbed by
tokens so component code stays theme-agnostic — don't "simplify" them back to `--bg`:

- **The sport hero stays dark in light mode.** Compare `2409:41347` and `2477:14852`: photo,
  scrims, title and back link are identical; only the search input inside flips to white. So
  `--hero-bg` and `--bg-scrim-50/55` are deliberately **not** overridden under
  `[data-theme="light"]`. (An earlier pass had tokenised the hero to `--bg`, which turned it
  white and destroyed the type contrast.)
- **The listing's background glow is a different ellipse per mode.** It's the `Content`
  frame's radial fill — dark `2409:41349`, light `2477:14930`, paint opacity `0.3` in both.
  Dark: centre `(50%, 100%)`, semi-axes `92.104% × 100%`. Light: centre `(50%, 85.285%)`,
  semi-axes `93.375% × 85.285%`. Unlike the event-page flare, **both invert to axis-aligned
  ellipses**, so plain CSS `radial-gradient()` is exact here — verified to 1/255 per channel
  in the page gutters. Dark's stops are variable-bound; light's are hardcoded in Figma.

**Two mistakes made and corrected in this area — worth knowing about:**

1. *A token missing from a frame's variable list means "not variable-bound here", never "not
   present".* `BG LIGHT FLARE COLOUR` is absent from the light listing's variables, and an
   earlier pass concluded the light listing had no glow and switched it off. It has one; the
   paint is just hardcoded.
2. *Don't read component fills off a rendered screenshot.* The filter button was implemented
   as filled-primary-with-white-icon in light, from eyeballing a 390px-wide Figma export. The
   plugin API says it's the design system's **Secondary button** (`Size=small, Type=icon
   only`, `2409:41364` / `2477:14892`): fill = `Bg` token, stroke and icon = `Primary 50/60`,
   40×40, radius 4 — a plain token flip. It's now `Button variant="secondary" size="icon"`.

Also fixed along the way: the filter button's resting state had been neutral grey, where both
Figma frames show it primary-coloured.

### 4.5 Fonts are fully self-hosted

Both typefaces now live in `src/assets/fonts` and there are **no external font requests**;
the Google Fonts `<link>` was removed from `index.html`.

- **Apfel Grotezk** (headings) — licensed `.otf`, weights 400/500/600/700/800. Mittel is
  registered at both 500 and 600 because there's no dedicated semibold cut.
- **Hanken Grotesk** (body) — variable `.woff2`, SIL Open Font License, latin + latin-ext.

---

## 5. Gotchas

- **`--gutter` vs `--page-gutter`.** `--gutter` is `clamp(16px, 5vw, 24px)` and resolves to
  19.5px at a 390px viewport. Figma uses a flat 24px. `EventDetails` uses `--page-gutter`
  (24px) to match the frame exactly; `BrowseEvents` still uses `--gutter`. So the two pages
  have slightly different gutters on a phone. Left alone deliberately — unifying them would
  change the finished Browse page.
- **Content differs from the Figma mock-up.** `src/data/events.ts` holds the real 22
  Basketball events with eligibility copy taken from the actual rules PDF, so the rendered
  page is ~10px shorter than the 1827px Figma frame. That is expected; don't "fix" it by
  changing spacing.
- **Never trust Figma codegen for gradients or strokes.** Use the plugin API, or
  `get_variable_defs` for token values. Codegen also emits stale fallback values inside
  `var(…)` — the light flare's codegen output described a completely different 10-stop
  gradient than the node actually has.

---

## 6. Two token gaps to raise with the designer

Both are recorded in the README as well.

1. The **outline/primary Pill's stroke** on the dark frame is `#c72a00`, the only paint on
   that component with no variable binding — and `#c72a00` is the *light*-mode value of
   `Primary 50 and 60`. Held as `--pill-primary-border` so dark matches the design exactly,
   but it looks like a token-coverage gap rather than intent.
2. The **dark** event card's gradient stroke is hardcoded, while the **light** one is bound
   to `BORDER LIGHT FLARE COLOUR` / `BORDER LIGHT FLARE`. Only the light card would follow a
   mode switch inside Figma.

---

## 7. What's left

Nothing is blocked. In rough priority order:

1. **Light mode is verified on the Event Details and Basketball listing screens only.**
   Both were checked against their Figma frames at 390×844 in all three modes. Any screen
   built from here needs the same check — and note that `Homepage` and `Your dashboard` have
   light frames ready (node IDs in §1) that may contain more structural mode differences
   like the three in §4.4.
2. **The bottom nav's "Explore" icon is a compass; Figma uses a magnifying glass** in both
   modes. Trivial swap in `BottomNav.tsx` (`Compass` → `Search`), left alone because it isn't
   a light-mode issue.
3. **The hero's progressive blur is an approximation.** Figma's `Bottom Blur` and
   `Top Vignette + Blur` use `blurType: "PROGRESSIVE"` background blur, where the radius
   ramps across the element (`0 → 8` from 31% down, and `4 → 0` on the top vignette).
   `backdrop-filter` can't ramp, so `BrowseEvents.tsx` fakes it with masked blur layers. The
   colour gradients underneath are exact; only the blur ramp is approximate. Needs a
   multi-layer stack or a baked asset to go further.
4. **Real icon assets.** Icons are lucide-react look-alikes (pin, calendar, chevron, search,
   sliders, home, compass, layers, user, external-link). The Cowork sandbox couldn't reach
   Figma's asset CDN. You can — pull the real SVGs via `get_design_context` /
   `download_assets`. Note the external-link glyph is 15px inside a 20px box and is
   `--primary`-coloured; the back chevron is 16px and `--icon-strong` (`#e1e0e0`).
5. **The SG crest in `Masthead.tsx` is a placeholder red circle.** Replace with the real
   SGDS `sg-crest` asset.
6. **More screens.** Homepage, Sport page and Your dashboard all have light/dark frames
   ready in Figma (node IDs in §1). None are built.
7. **Backend.** "Login with Singpass to register" shows a `window.alert`; search/filter/sort
   run client-side over the mock array. No API integration exists.
8. `public/icons.svg` is dead weight from an earlier approach — safe to delete once you've
   confirmed nothing references it.

---

## 8. Housekeeping in the working folder

These are untracked or gitignored and can be deleted whenever:

- `gms-sync.local` — a transfer bundle from the Cowork session (gitignored via `*.local`).
- `_to_delete/` — leftovers including a stale `.git/index.lock` that had to be moved rather
  than deleted, because the Cowork device bridge cannot unlink files.
- `IMAGE.png`, `.claude/`, `Modified Colours/` — the last of these is a real input (the
  designer's modified token exports) and is referenced by `src/index.css` comments, so keep
  it even though it's untracked.
