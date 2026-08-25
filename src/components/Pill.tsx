import type { ReactNode } from 'react'

type PillProps = {
  children: ReactNode
  tone?: 'outline' | 'solid'
  color?: 'primary' | 'white' | 'yellow'
}

/*
 * Figma "Pill" component (SGDS/GMS).
 * Geometry is identical across variants: radius full, 20px tall, 8px horizontal
 * padding measured to the OUTER edge (Figma strokes are INSIDE-aligned), 4px gap,
 * label = Body typeface SemiBold 12/16, letter-spacing 0.12.
 *
 * Outlined variants therefore use 7px padding + 1px border so the box still
 * measures 20px, matching the design rather than growing to 22px.
 */
const base =
  'inline-flex shrink-0 items-center gap-1 rounded-[var(--radius-full)] text-[length:var(--font-size-body-xs)] font-semibold leading-[var(--line-height-body-xs)] tracking-[var(--letter-spacing-body-xs)]'

const variants = {
  'outline-primary':
    'border border-[var(--pill-primary-border)] bg-[var(--bg-primary-subtlest)] text-[var(--text-primary)] px-[7px] py-px',
  'outline-white':
    'border border-[var(--text)] bg-transparent text-[var(--text)] px-[7px] py-px',
  'outline-yellow':
    'border border-[var(--border-warning)] bg-[var(--bg-warning)] text-[var(--text-warning)] px-[7px] py-px',
  'solid-primary': 'bg-[var(--primary)] text-[var(--bg)] px-2 py-0.5',
  // Colour "white" resolves to Background/bg-inverse (#e1e0e0), not pure white.
  'solid-white': 'bg-[var(--bg-inverse)] text-[var(--text-inverse)] px-2 py-0.5',
  'solid-yellow': 'bg-[var(--bg-warning-strong)] text-[var(--bg)] px-2 py-0.5',
} as const

export default function Pill({ children, tone = 'outline', color = 'primary' }: PillProps) {
  const key = `${tone}-${color}` as keyof typeof variants

  return <span className={`${base} ${variants[key]}`}>{children}</span>
}
