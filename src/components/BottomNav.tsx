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
    <nav className="fixed bottom-0 left-1/2 flex h-16 w-full max-w-[var(--container-max)] -translate-x-1/2 items-center justify-between border-t border-[#554d4d] bg-[#0d0c0c] px-[var(--gutter)] py-2.5 shadow-[0_2px_4px_rgba(104,104,104,0.24)]">
      {tabs.map(({ label, icon: Icon, path }) => {
        const active = label === 'Explore'
        return (
          <Link
            key={label}
            to={path}
            className="flex flex-1 flex-col items-center gap-0.5"
            aria-current={active ? 'page' : undefined}
          >
            <Icon size={20} strokeWidth={2} color={active ? '#fa6938' : '#b2aeae'} />
            <span
              className={`text-[12px] leading-5 ${
                active ? 'font-bold text-[#fa6938]' : 'font-normal text-[#b2aeae]'
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
