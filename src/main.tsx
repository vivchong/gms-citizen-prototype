import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/*
 * Theme selection.
 *
 * Dark is the default (it's the mode the Figma screens were designed in).
 * Light mode uses the same Flagship Design System token names with their
 * light-mode values — see src/index.css.
 *
 * To view light mode, append ?theme=light to the URL (before the # route),
 * e.g. …/gms-citizen-prototype/?theme=light#/events/womens-open-5v5
 * The choice is remembered in localStorage; ?theme=dark switches back.
 * No visible theme control is added, since none exists in the design.
 */
function applyTheme() {
  const params = new URLSearchParams(window.location.search)
  const requested = params.get('theme')

  let theme: string | null = null
  if (requested === 'light' || requested === 'dark') {
    theme = requested
    try {
      localStorage.setItem('gms-theme', theme)
    } catch {
      /* storage unavailable — fall through, the URL param still applies */
    }
  } else {
    try {
      theme = localStorage.getItem('gms-theme')
    } catch {
      theme = null
    }
  }

  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

applyTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
