import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * Official Singapore Government masthead, per SGDS guidelines:
 * https://go.gov.sg/guideline-official-government-banner
 */
export default function Masthead() {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full bg-[#0d0c0c] text-[11px] leading-4 text-[#f9f9f9]">
      <div className="flex items-center gap-1.5 px-4 py-1.5">
        <span aria-hidden className="text-sm leading-none">🇸🇬</span>
        <span>A Singapore Government Agency Website</span>
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-4 pb-1.5 font-semibold underline decoration-dotted underline-offset-2"
        aria-expanded={open}
      >
        How to identify
        <ChevronDown size={12} className={open ? 'rotate-180 transition-transform' : 'transition-transform'} />
      </button>
      {open && (
        <div className="border-t border-[#554d4d] bg-[#161414] px-4 py-3 text-[12px] text-[#b2aeae]">
          <p>
            Official websites end with <strong className="text-[#f9f9f9]">.gov.sg</strong>. Government agencies
            communicate via <strong className="text-[#f9f9f9]">.gov.sg</strong> websites (e.g. go.gov.sg/open).{' '}
            <a href="https://go.gov.sg/trusted-sites" className="text-[#fa6938] underline">
              Trusted websites
            </a>
          </p>
        </div>
      )}
    </div>
  )
}
