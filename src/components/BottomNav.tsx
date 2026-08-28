import { Link, useLocation } from 'react-router-dom'
import { CardsStacked, House, Person, TabIcon } from './icons'

/*
 * Figma "Bottom nav" — 64px tall, px 24 / py 11, 20px icons, Body/XS labels
 * (bold + primary when active). Registrations and Profile aren't built yet, so
 * they render as inert buttons rather than links that go somewhere wrong.
 */
const tabs = [
  { label: 'Home', icon: House, path: '/' },
  { label: 'Explore', icon: TabIcon, path: '/browse' },
  { label: 'Registrations', icon: CardsStacked, path: null },
  { label: 'Profile', icon: Person, path: null },
] as const

export default function BottomNav() {
  const { pathname } = useLocation()

  const activeLabel =
    pathname === '/' ? 'Home' : pathname.startsWith('/browse') || pathname.startsWith('/events') ? 'Explore' : ''

  return (
    <nav className="fixed bottom-0 left-1/2 z-20 flex h-16 w-full max-w-[var(--container-max)] -translate-x-1/2 items-start justify-between border-t border-[var(--border)] bg-[var(--bg)] px-[var(--page-gutter)] py-[11px] shadow-[var(--shadow-sm)]">
      {tabs.map(({ label, icon: Icon, path }) => {
        const active = label === activeLabel
        const content = (
          <>
            <Icon
              size={20}
              strokeWidth={2}
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
          <button key={label} type="button" className={className}>
            {content}
          </button>
        )
      })}
    </nav>
  )
}
