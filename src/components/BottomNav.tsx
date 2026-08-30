import { useCallback, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MaterialIcon, { type MaterialIconName } from './MaterialIcon'
import Toast from './Toast'

/*
 * Figma "Bottom nav" (2467:11512) — 64px tall, px 24, pt 12 / pb 16 (asymmetric,
 * so the icons sit slightly high in the bar), 20px icons, Body/XS labels
 * (bold + primary when active). Icons are Material Symbols Rounded; Home uses
 * the FILL variant when it's the active tab, the rest stay unfilled.
 * Registrations and Profile aren't built yet, so they render as inert buttons
 * rather than links that go somewhere wrong.
 */
const tabs: {
  label: string
  icon: MaterialIconName
  activeIcon?: MaterialIconName
  path: string | null
}[] = [
  { label: 'Home', icon: 'home', activeIcon: 'home-fill', path: '/home' },
  { label: 'Explore', icon: 'search', path: '/' },
  { label: 'Registrations', icon: 'cards_stack', path: null },
  { label: 'Profile', icon: 'person', path: null },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  const [toast, setToast] = useState<string | null>(null)
  const dismiss = useCallback(() => setToast(null), [])

  // "/" is the Basketball listing, so Explore owns it along with the event pages.
  const activeLabel = pathname.startsWith('/home')
    ? 'Home'
    : pathname === '/' || pathname.startsWith('/events') || pathname.startsWith('/browse')
      ? 'Explore'
      : ''

  return (
    <>
      <Toast message={toast} onDismiss={dismiss} />
      <nav className="fixed bottom-0 left-1/2 z-20 flex h-16 w-full max-w-[var(--container-max)] -translate-x-1/2 items-start justify-between border-t border-[var(--border)] bg-[var(--bg)] px-[var(--page-gutter)] pb-4 pt-3 shadow-[var(--shadow-sm)]">
      {tabs.map(({ label, icon, activeIcon, path }) => {
        const active = label === activeLabel
        const content = (
          <>
            <MaterialIcon
              name={active && activeIcon ? activeIcon : icon}
              size={20}
              className={active ? 'text-[var(--primary)]' : 'text-[var(--icon)]'}
            />
            <span
              className={`w-full text-center text-[length:var(--font-size-body-xs)] leading-5 tracking-[var(--letter-spacing-body-xs)] ${
                active ? 'font-bold text-[var(--primary)]' : 'font-normal text-[var(--icon)]'
              }`}
            >
              {label}
            </span>
          </>
        )

        const className = 'flex w-[73px] shrink-0 flex-col items-center gap-0.5 no-underline'

        return path ? (
          <Link
            key={label}
            to={path}
            className={className}
            aria-current={active ? 'page' : undefined}
          >
            {content}
          </Link>
        ) : (
          <button
            key={label}
            type="button"
            className={className}
            onClick={() => setToast(`${label} isn't available in this prototype yet.`)}
          >
            {content}
          </button>
        )
      })}
      </nav>
    </>
  )
}
