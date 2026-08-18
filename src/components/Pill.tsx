import type { ReactNode } from 'react'

type PillProps = {
  children: ReactNode
  tone?: 'outline' | 'solid'
  color?: 'primary' | 'white' | 'yellow'
}

const outlineColors = {
  primary: 'border-[#fa6938] text-[#fa6938]',
  white: 'border-[#f9f9f9] text-[#f9f9f9]',
  yellow: 'border-[#f5c344] text-[#f5c344]',
}

const solidColors = {
  primary: 'bg-[#fa6938] text-[#0d0c0c]',
  white: 'bg-[#f9f9f9] text-[#0d0c0c]',
  yellow: 'bg-[#f5c344] text-[#0d0c0c]',
}

export default function Pill({ children, tone = 'outline', color = 'primary' }: PillProps) {
  const classes =
    tone === 'solid'
      ? solidColors[color]
      : `border ${outlineColors[color]}`

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-semibold leading-4 ${classes}`}
    >
      {children}
    </span>
  )
}
