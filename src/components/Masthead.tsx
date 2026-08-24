import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

function SgCrest() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" fill="#E53E3E" />
    </svg>
  )
}

export default function Masthead() {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full bg-[#0d0c0c] text-[12px] leading-5 text-[#f9f9f9]">
      <div className="flex items-center gap-2 px-4 py-2">
        <SgCrest />
        <span>A Singapore Government Agency Website</span>
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 pb-2 text-[#6B9FFF]"
        style={{ paddingLeft: 'calc(1rem + 20px + 0.5rem)' }}
        aria-expanded={open}
      >
        How to identify
        <ChevronDown size={14} className={open ? 'rotate-180 transition-transform' : 'transition-transform'} />
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
