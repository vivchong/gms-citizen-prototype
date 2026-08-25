/*
 * Theme resolution — three modes.
 *
 *   auto  (default) follows the device's light/dark setting
 *   light forced light
 *   dark  forced dark
 *
 * Switch by putting ?theme=auto | light | dark in the URL *before* the # route:
 *   …/gms-citizen-prototype/?theme=light#/events/womens-open-5v5
 * The choice is remembered in localStorage; ?theme=auto clears it and goes back
 * to following the device.
 *
 * `auto` is always resolved to a concrete data-theme="dark" | "light" on <html>,
 * which is why src/index.css only needs a dark block and a light block rather
 * than a duplicated prefers-color-scheme palette.
 *
 * NOTE: the same resolution runs as a small blocking script in index.html so the
 * correct palette is in place before first paint. If you change the storage key
 * or the attribute here, change it there too.
 */

export type ThemeMode = 'auto' | 'light' | 'dark'

const STORAGE_KEY = 'gms-theme'
const LIGHT_QUERY = '(prefers-color-scheme: light)'

function readStored(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : 'auto'
  } catch {
    return 'auto'
  }
}

/** The user's selection — 'auto' unless they've explicitly forced a mode. */
export function getThemeMode(): ThemeMode {
  const requested = new URLSearchParams(window.location.search).get('theme')
  if (requested === 'light' || requested === 'dark' || requested === 'auto') {
    try {
      if (requested === 'auto') localStorage.removeItem(STORAGE_KEY)
      else localStorage.setItem(STORAGE_KEY, requested)
    } catch {
      /* storage unavailable — the URL param still applies for this page load */
    }
    return requested
  }
  return readStored()
}

/** What that selection resolves to right now. */
export function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'light' || mode === 'dark') return mode
  return window.matchMedia(LIGHT_QUERY).matches ? 'light' : 'dark'
}

export function applyTheme() {
  const mode = getThemeMode()
  document.documentElement.setAttribute('data-theme', resolveTheme(mode))
  return mode
}

/**
 * Keep following the device while in auto mode. Returns an unsubscribe fn.
 */
export function watchSystemTheme() {
  const mql = window.matchMedia(LIGHT_QUERY)
  const onChange = () => {
    if (getThemeMode() === 'auto') {
      document.documentElement.setAttribute('data-theme', resolveTheme('auto'))
    }
  }
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}
