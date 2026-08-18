import { MapPin, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { SportEvent } from '../data/events'

export default function EventCard({ event }: { event: SportEvent }) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="flex w-full flex-col gap-3 rounded-[4px] border border-[#dc5d39] bg-white/5 p-5 no-underline transition-colors hover:bg-white/10"
    >
      <div className="w-full text-[18px] font-semibold leading-[26px] text-[#fa6938]">
        {event.category}
      </div>
      <div className="flex w-full flex-col gap-1">
        <div className="flex w-full items-center gap-3">
          <MapPin size={16} color="#b2aeae" />
          <span className="text-[14px] leading-5 text-[#b2aeae]">{event.location}</span>
        </div>
        <div className="flex w-full items-center gap-3">
          <Calendar size={16} color="#b2aeae" />
          <span className="text-[14px] leading-5 text-[#b2aeae]">{event.dateRange}</span>
        </div>
      </div>
      <p className="text-[18px] leading-[26px]">
        <span className="font-semibold text-[#f9f9f9]">${event.price}</span>{' '}
        <span className="text-[16px] text-[#b2aeae]">{event.priceUnit}</span>
      </p>
    </Link>
  )
}
