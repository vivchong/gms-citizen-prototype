import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'default' | 'icon'
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
  size = 'default',
  fullWidth = false,
  className = '',
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2.5 rounded-[var(--radius-button)] font-[family-name:var(--font-heading)] text-[length:var(--font-size-heading-xs)] font-semibold leading-[var(--line-height-heading-xs)] tracking-[var(--letter-spacing-heading-xs)] transition-opacity disabled:cursor-not-allowed disabled:opacity-50'

  /* Size=small / Type=icon only is a fixed 40x40 in Figma — the component's
     16px padding is overridden by the fixed frame size, so the 16px icon just
     centres with a 12px effective inset. */
  const sizes = {
    default: 'h-12 px-4',
    icon: 'size-10 shrink-0 p-0',
  }

  /* "Secondary button": fill = the Bg token, 1px INSIDE stroke and icon both
     = Primary 50/60. Identical structure in both modes — only the token values
     change (#0d0c0c/#fa6938 dark, #ffffff/#c72a00 light). */
  const variants = {
    primary: 'bg-[var(--primary)] text-[var(--bg)] hover:opacity-90 active:opacity-80',
    secondary:
      'border border-[var(--primary)] bg-[var(--bg)] text-[var(--primary)] hover:opacity-90 active:opacity-80',
  }

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
