import { MapPin, Calendar, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { SportEvent } from '../data/events'

export default function EventCard({ event }: { event: SportEvent }) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="relative flex w-full flex-col gap-3 rounded-[4px] bg-[var(--card-bg)] p-5 no-underline transition-colors hover:bg-white/10"
    >
      <div
        className="pointer-events-none absolute inset-[-1px] rounded-[4px]"
        style={{
          background:
            'radial-gradient(37.5% 50% at 50% 100%, var(--border-light-flare-colour) 0%, var(--border-light-flare) 100%)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />
      <div className="w-full font-[family-name:var(--font-heading)] text-[18px] font-semibold leading-[26px] text-[var(--primary)]">
        {event.category}
      </div>
      <div className="flex w-full flex-col gap-1">
        <div className="flex w-full items-center gap-3">
          <MapPin size={16} className="text-[var(--icon)]" />
          <span className="text-[14px] leading-5 text-[var(--text-subtler)]">{event.location}</span>
        </div>
        <div className="flex w-full items-center gap-3">
          <Calendar size={16} className="text-[var(--icon)]" />
          <span className="text-[14px] leading-5 text-[var(--text-subtler)]">{event.dateRange}</span>
        </div>
        <div className="flex w-full items-center gap-3">
          <Users size={16} className="text-[var(--icon)]" />
          <span className="text-[14px] leading-5 text-[var(--text-subtler)]">{event.ageRange}</span>
        </div>
      </div>
      <p className="text-[18px] leading-[26px]">
        <span className="font-semibold text-[var(--text)]">${event.price}</span>{' '}
        <span className="text-[16px] text-[var(--text-subtler)]">{event.priceUnit}</span>
      </p>
    </Link>
  )
}
