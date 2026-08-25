import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
}

/*
 * Figma "Primary button", size=default, type=text only.
 * 48px tall, radius 4 (Button/button-radius), 16px horizontal padding, 10px gap.
 * Label is the HEADING typeface (Apfel Grotezk) SemiBold 18/26, letter-spacing 0.16.
 * Label colour is bound to the "Black" token, which resolves to the page
 * background per mode — #0d0c0c in dark, #ffffff in light — hence var(--bg).
 */
export default function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex h-12 items-center justify-center gap-2.5 rounded-[var(--radius-button)] px-4 font-[family-name:var(--font-heading)] text-[length:var(--font-size-heading-xs)] font-semibold leading-[var(--line-height-heading-xs)] tracking-[var(--letter-spacing-heading-xs)] transition-opacity disabled:cursor-not-allowed disabled:opacity-50'

  const variants = {
    primary: 'bg-[var(--primary)] text-[var(--bg)] hover:opacity-90 active:opacity-80',
    secondary:
      'border border-[var(--border-strong)] bg-transparent text-[var(--text)] hover:border-[var(--primary)] hover:text-[var(--primary)]',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
