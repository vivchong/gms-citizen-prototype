import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/*
 * Reset the scroll position on every route change.
 *
 * The browser doesn't do this for client-side navigation, so without it you
 * arrive at a new screen already scrolled to wherever you were on the last one.
 * Rendered once inside the router in App.tsx, so it covers every route.
 *
 * `instant` rather than smooth: this is a jump between screens, not a scroll
 * within one, and animating it would read as a glitch.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
