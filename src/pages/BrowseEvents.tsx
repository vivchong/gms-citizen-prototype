import { useMemo, useState } from 'react'
import { ChevronLeft, Search, SlidersHorizontal } from 'lucide-react'
import Masthead from '../components/Masthead'
import BottomNav from '../components/BottomNav'
import EventCard from '../components/EventCard'
import { basketballEvents, seasonLabel, sportName } from '../data/events'
import basketballCover from '../assets/basketball-cover.png'

export default function BrowseEvents() {
  const [query, setQuery] = useState('')
  const [sortByPrice, setSortByPrice] = useState(false)

  const events = useMemo(() => {
    const filtered = basketballEvents.filter((event) =>
      event.category.toLowerCase().includes(query.trim().toLowerCase()),
    )
    if (sortByPrice) {
      return [...filtered].sort((a, b) => a.price - b.price)
    }
    return filtered
  }, [query, sortByPrice])

  return (
    <div className="flex min-h-svh flex-col bg-[var(--bg)] pb-16">
      <Masthead />

      {/* Hero */}
      <div className="relative h-[var(--hero-height)] w-full overflow-hidden bg-[#0d0c0c]">
        <img
          src={basketballCover}
          alt=""
          className="absolute inset-0 size-full object-cover object-[center_20%] sm:object-[center_30%]"
        />
        <div
          className="absolute inset-x-0 top-0 h-[20%]"
          style={{
            background: 'linear-gradient(0deg, rgba(13, 12, 12, 0.00) 0%, rgba(13, 12, 12, 0.50) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-[20%] backdrop-blur-[4px]"
          style={{
            mask: 'linear-gradient(to bottom, black 0%, transparent 100%)',
            WebkitMask: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[80%]"
          style={{
            background: 'linear-gradient(0deg, #0D0C0C 0%, rgba(13, 12, 12, 0.55) 50%, rgba(13, 12, 12, 0.00) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[50%] backdrop-blur-[8px]"
          style={{
            mask: 'linear-gradient(to top, black 0%, transparent 100%)',
            WebkitMask: 'linear-gradient(to top, black 0%, transparent 100%)',
          }}
        />

        <button
          type="button"
          onClick={() => window.history.back()}
          className="absolute left-5 top-5 flex items-center gap-1 text-[16px] leading-6 text-white"
        >
          <ChevronLeft size={16} />
          Browse sports
        </button>

        <div className="absolute inset-x-0 bottom-4 flex flex-col items-start gap-2">
          <div className="flex w-full flex-col items-center px-[var(--gutter)] text-center text-white drop-shadow-[0_0_4px_rgba(0,0,0,0.4)]">
            <div className="w-full text-[12px] font-semibold leading-5 tracking-[0.12px]">
              {seasonLabel}
            </div>
            <div className="w-full font-[family-name:var(--font-heading)] text-[length:var(--text-display)] font-bold leading-[var(--leading-display)] tracking-[-0.32px]">
              {sportName.toUpperCase()}
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-2 px-[var(--gutter)]">
            <div className="flex h-10 flex-1 items-center gap-2 rounded-[4px] border border-[#6d6666] bg-[#0d0c0c] p-3">
              <Search size={16} color="#b2aeae" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by event name"
                className="w-full bg-transparent text-[16px] leading-6 text-[#f9f9f9] placeholder:text-[#b2aeae] focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => setSortByPrice((v) => !v)}
              aria-pressed={sortByPrice}
              title="Sort by price"
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] border ${
                sortByPrice ? 'border-[#fa6938] text-[#fa6938]' : 'border-[#6d6666] text-[#f9f9f9]'
              }`}
            >
              <SlidersHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Background gradient — fixed, fills viewport below hero */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[calc(100svh-var(--hero-height))] opacity-30"
        style={{
          background:
            'radial-gradient(92.1% 100% at 50% 100%, var(--bg-light-flare-colour) 0%, var(--bg) 100%)',
        }}
      />

      {/* Cards */}
      <div className="relative z-10 flex w-full flex-1 flex-col gap-3 px-[var(--gutter)] py-4">
        <p className="text-[16px] font-semibold leading-6 text-[#b2aeae]">
          {events.length} event{events.length === 1 ? '' : 's'}
        </p>
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
          {events.length === 0 && (
            <p className="py-8 text-center text-[14px] text-[#928e8e]">
              No events match "{query}".
            </p>
          )}
        </div>
        <p className="w-full text-[12px] leading-5 text-[#928e8e]">
          Cover photo by Team Nila. Photographer: TK Clickz
        </p>
      </div>

      <BottomNav />
    </div>
  )
}
