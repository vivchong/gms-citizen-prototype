import { Home, Compass, Layers, User } from 'lucide-react'
import { Link } from 'react-router-dom'

const tabs = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'Explore', icon: Compass, path: '/' },
  { label: 'Registrations', icon: Layers, path: '/' },
  { label: 'Profile', icon: User, path: '/' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 flex h-16 w-full max-w-[var(--container-max)] -translate-x-1/2 items-center justify-between border-t border-[var(--border)] bg-[var(--bg)] px-[var(--gutter)] py-2.5 shadow-[var(--shadow-sm)]">
      {tabs.map(({ label, icon: Icon, path }) => {
        const active = label === 'Explore'
        return (
          <Link
            key={label}
            to={path}
            className="flex flex-1 flex-col items-center gap-0.5"
            aria-current={active ? 'page' : undefined}
          >
            <Icon size={20} strokeWidth={2} className={active ? 'text-[var(--primary)]' : 'text-[var(--icon)]'} />
            <span
              className={`text-[12px] leading-5 ${
                active ? 'font-bold text-[var(--primary)]' : 'font-normal text-[var(--text-subtler)]'
              }`}
            >
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
