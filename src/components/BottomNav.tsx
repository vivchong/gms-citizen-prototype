import { User } from 'lucide-react'
import { Link } from 'react-router-dom'

function MaterialIcon({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={`material-symbols-rounded ${className ?? ''}`}
      style={{ fontSize: 20, lineHeight: 1 }}
      aria-hidden="true"
    >
      {name}
    </span>
  )
}

type Tab = {
  label: string
  icon: 'material' | 'lucide'
  materialName?: string
  path: string
}

const tabs: Tab[] = [
  { label: 'Home', icon: 'material', materialName: 'stadium', path: '/' },
  { label: 'Sports', icon: 'material', materialName: 'search', path: '/' },
  { label: 'Registrations', icon: 'material', materialName: 'cards_stack', path: '/' },
  { label: 'Profile', icon: 'lucide', path: '/' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-[var(--container-max)] -translate-x-1/2 items-center justify-between border-t border-[var(--border)] bg-[var(--bg)] px-[var(--gutter)] pb-4 pt-3 shadow-[var(--shadow-sm)]">
      {tabs.map(({ label, icon, materialName, path }) => {
        const active = label === 'Sports'
        const colorClass = active ? 'text-[var(--primary)]' : 'text-[var(--icon)]'
        return (
          <Link
            key={label}
            to={path}
            className="flex flex-1 flex-col items-center gap-0.5"
            aria-current={active ? 'page' : undefined}
          >
            {icon === 'material' ? (
              <MaterialIcon name={materialName!} className={colorClass} />
            ) : (
              <User size={20} strokeWidth={2} className={colorClass} />
            )}
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
