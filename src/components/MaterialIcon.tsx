import type { CSSProperties } from 'react'

import homeUrl from '../assets/icons/home.svg'
import homeFillUrl from '../assets/icons/home-fill.svg'
import searchUrl from '../assets/icons/search.svg'
import cardsStackUrl from '../assets/icons/cards_stack.svg'
import personUrl from '../assets/icons/person.svg'
import notificationsUrl from '../assets/icons/notifications.svg'

/*
 * Material Symbols Rounded, self-hosted.
 *
 * These are the official SVGs from the `@material-symbols/svg-400` package —
 * real glyph outlines, not redrawn — copied into src/assets/icons so there is
 * no external font request (the rest of the app self-hosts its type too, and
 * the full Material Symbols variable font is megabytes for four glyphs).
 *
 * They're painted with `mask-image` + `background-color: currentColor` rather
 * than <img>, so they inherit the surrounding text colour and stay
 * token-driven like every other icon on the page.
 */
const icons = {
  home: homeUrl,
  'home-fill': homeFillUrl,
  search: searchUrl,
  cards_stack: cardsStackUrl,
  person: personUrl,
  notifications: notificationsUrl,
} as const

export type MaterialIconName = keyof typeof icons

export default function MaterialIcon({
  name,
  size = 20,
  className = '',
}: {
  name: MaterialIconName
  size?: number
  className?: string
}) {
  /* The url() MUST be quoted: Vite inlines assets under 4 KB as data: URIs, and
     an unquoted data: URI makes the declaration invalid, so the browser drops
     mask-image silently and you get a solid block of colour. */
  const mask = `url("${icons[name]}")`

  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-current ${className}`}
      style={
        {
          width: size,
          height: size,
          maskImage: mask,
          WebkitMaskImage: mask,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
        } as CSSProperties
      }
    />
  )
}
