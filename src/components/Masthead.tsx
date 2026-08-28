import { useState } from 'react'
import { ChevronDown } from './icons'

function SgCrest() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" fill="#E53E3E" />
    </svg>
  )
}

/*
 * SGDS Official Government Masthead, 48px tall.
 * Colours come from the sgds/* tokens: bg-alternate, label/color-default,
 * link/primary/color — so it flips correctly between light and dark.
 */
export default function Masthead() {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full bg-[var(--bg-alternate)] text-[12px] leading-5 text-[var(--label-default)]">
      <div className="flex flex-col gap-0 px-4 py-1">
        <div className="flex items-center gap-2">
          <SgCrest />
          <span>A Singapore Government Agency Website</span>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 text-[var(--link)]"
          style={{ paddingLeft: 'calc(20px + 0.5rem)' }}
          aria-expanded={open}
        >
          How to identify
          <ChevronDown
            size={14}
            className={open ? 'rotate-180 transition-transform' : 'transition-transform'}
          />
        </button>
      </div>
      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--bg-alternate)] px-4 py-3 text-[12px] text-[var(--text-subtler)]">
          <p>
            Official websites end with <strong className="text-[var(--text)]">.gov.sg</strong>.
            Government agencies communicate via{' '}
            <strong className="text-[var(--text)]">.gov.sg</strong> websites (e.g. go.gov.sg/open).{' '}
            <a href="https://go.gov.sg/trusted-sites" className="text-[var(--primary)] underline">
              Trusted websites
            </a>
          </p>
        </div>
      )}
    </div>
  )
}
