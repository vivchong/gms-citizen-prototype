import type { CSSProperties } from 'react'
import { MapPin, Calendar, Users } from './icons'
import { Link } from 'react-router-dom'
import type { SportEvent } from '../data/events'

export default function EventCard({ event }: { event: SportEvent }) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="relative flex w-full flex-col gap-3 rounded-[var(--radius-sm)] bg-[var(--card-bg)] p-5 no-underline transition-colors hover:bg-[var(--card-bg-hover)]"
    >
      {/* Shared BORDER LIGHT FLARE stroke — same definition as the Home event cards */}
      <div
        className="gradient-ring"
        style={{ '--ring-image': 'var(--flare-border-image)' } as CSSProperties}
        aria-hidden
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
