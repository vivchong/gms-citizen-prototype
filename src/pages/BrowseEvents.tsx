import { useMemo, useState } from 'react'
import { ChevronLeft, Search, SlidersHorizontal } from 'lucide-react'
import Masthead from '../components/Masthead'
import BottomNav from '../components/BottomNav'
import EventCard from '../components/EventCard'
import { basketballEvents, seasonLabel, sportName } from '../data/events'

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
    <div className="flex min-h-svh flex-col bg-[#0d0c0c] pb-16">
      <Masthead />

      {/* Hero */}
      <div className="relative h-[332px] w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 100% at 30% 20%, #7a3a1a 0%, #3d1f16 45%, #17110f 80%, #0d0c0c 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'repeating-radial-gradient(circle at 20% 30%, rgba(255,255,255,0.06) 0 2px, transparent 2px 40px)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-[267px] bg-gradient-to-t from-[#121212] via-[#121212]/55 via-50% to-[#121212]/0" />

        <button
          type="button"
          onClick={() => window.history.back()}
          className="absolute left-5 top-5 flex items-center gap-1 text-[16px] leading-6 text-white"
        >
          <ChevronLeft size={16} />
          Browse sports
        </button>

        <div className="absolute inset-x-0 bottom-4 flex flex-col items-start gap-2">
          <div className="flex w-full flex-col items-center px-6 text-center text-white drop-shadow-[0_0_4px_rgba(0,0,0,0.4)]">
            <div className="w-full text-[12px] font-semibold leading-5 tracking-[0.12px]">
              {seasonLabel}
            </div>
            <div className="w-full text-[40px] font-bold leading-[48px] tracking-[-0.32px]">
              {sportName.toUpperCase()}
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-2 px-6">
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

      {/* Cards */}
      <div className="flex w-full flex-1 flex-col gap-3 px-6 py-4">
        <p className="text-[16px] font-semibold leading-6 text-[#b2aeae]">
          {events.length} event{events.length === 1 ? '' : 's'}
        </p>
        <div className="flex w-full flex-col gap-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
          {events.length === 0 && (
            <p className="py-8 text-center text-[14px] text-[#928e8e]">
              No events match “{query}”.
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
