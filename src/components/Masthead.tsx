import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

function SgCrest() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M9.5 3C7.5 3 6 4.5 6 6.5c0 1.2.6 2.3 1.5 3-.9.5-1.5 1.5-1.5 2.5 0 1.7 1.3 3 3 3h1c1.7 0 3-1.3 3-3 0-1-.6-2-1.5-2.5.9-.7 1.5-1.8 1.5-3C13 4.5 11.5 3 9.5 3z"
        fill="#E53E3E"
      />
      <path
        d="M9.5 4.5c-.4 0-.7.1-1 .3.5.3.8.8.8 1.4 0 .9-.7 1.6-1.6 1.6-.2 0-.4 0-.5-.1.1 1.3 1.1 2.3 2.3 2.3 1.3 0 2.3-1 2.3-2.3 0-1.3-1-2.3-2.3-2.3v-.9z"
        fill="#C53030"
      />
    </svg>
  )
}

export default function Masthead() {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full bg-[#161414] text-[12px] leading-5 text-[#f9f9f9]">
      <div className="flex items-center gap-2 px-4 py-2">
        <SgCrest />
        <span>A Singapore Government Agency Website</span>
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-4 pb-2 text-[#6B9FFF]"
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
