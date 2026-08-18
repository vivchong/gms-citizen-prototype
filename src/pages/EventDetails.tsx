import { ChevronLeft, ExternalLink } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Masthead from '../components/Masthead'
import Pill from '../components/Pill'
import Button from '../components/Button'
import BulletList from '../components/BulletList'
import Timeline from '../components/Timeline'
import { getEventById } from '../data/events'

export default function EventDetails() {
  const { eventId } = useParams<{ eventId: string }>()
  const navigate = useNavigate()
  const event = eventId ? getEventById(eventId) : undefined

  if (!event) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-[#0d0c0c] px-6 text-center text-[#f9f9f9]">
        <p>We couldn't find that event.</p>
        <Link to="/" className="text-[#fa6938] underline">
          Back to browse events
        </Link>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh flex-col bg-[#0d0c0c] pb-[176px]">
      <Masthead />

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[716px] opacity-80"
          style={{
            background:
              'radial-gradient(140% 90% at 100% 0%, #f89602 0%, #eb4c24 18%, #cf2612 32%, #b10000 42%, #0d0c0c 75%)',
          }}
        />

        <div className="relative flex flex-col gap-16 px-6 pb-8 pt-16">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-[16px] leading-6 text-[#f9f9f9]"
          >
            <ChevronLeft size={16} />
            Back
          </button>

          <div className="flex w-full flex-col items-center gap-4">
            <div className="flex w-full flex-col items-center gap-1 text-center font-bold text-[#f9f9f9]">
              <div className="w-full text-[14px] leading-5 tracking-[0.12px]">
                {event.sport.toUpperCase()}
              </div>
              <div className="w-full text-[40px] leading-[48px] tracking-[-0.32px]">
                {event.category.toUpperCase()}
              </div>
            </div>
            <div className="flex w-full flex-col items-start gap-1 text-[16px] leading-6 text-[#c7caca]">
              <div className="w-full text-center">{event.location}</div>
              <div className="w-full text-center">{event.dateRange}</div>
            </div>

            <div className="flex w-full flex-col gap-8 rounded-[8px] border border-[#dc5d39] bg-white/5 p-5">
              <div className="flex w-full flex-col gap-4">
                <h2 className="w-full text-[18px] font-bold leading-[26px] text-[#f9f9f9]">
                  ELIGIBILITY
                </h2>
                <div className="flex w-full flex-col gap-2">
                  <p className="w-full text-[16px] font-semibold leading-6 text-[#f9f9f9]">
                    Your team must have:
                  </p>
                  <BulletList items={event.eligibility.team} />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <p className="w-full text-[16px] font-semibold leading-6 text-[#f9f9f9]">
                    Each participant must be:
                  </p>
                  <BulletList items={event.eligibility.participant} />
                </div>
              </div>

              <div className="h-px w-full bg-[#554d4d]" />

              <div className="flex w-full flex-col gap-4">
                <h2 className="w-full text-[18px] font-bold leading-[26px] text-[#f9f9f9]">
                  HOW TO PARTICIPATE
                </h2>
                <Timeline steps={event.steps} />
              </div>

              <div className="h-px w-full bg-[#554d4d]" />

              <div className="flex w-full flex-col gap-3">
                <h2 className="w-full text-[18px] font-bold leading-[26px] text-[#f9f9f9]">
                  RULES &amp; REGULATIONS
                </h2>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex w-full items-center gap-2.5 rounded-[8px] border border-[#fa6938] bg-[#001731] p-4 no-underline"
                >
                  <div className="flex flex-1 flex-col gap-2">
                    <p className="w-full text-[14px] font-semibold leading-5 text-[#f9f9f9]">
                      View {event.sport} rules &amp; regulations
                    </p>
                    <p className="text-[12px] leading-[1.05] text-[#b2aeae]">
                      PDF updated {event.rulesUpdated}
                    </p>
                  </div>
                  <ExternalLink size={20} color="#f9f9f9" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 flex w-full max-w-[480px] -translate-x-1/2 flex-col gap-4 border-t border-[#554d4d] bg-[#0d0c0c] p-6 shadow-[0_2px_4px_rgba(104,104,104,0.24)]">
        <div className="flex w-full items-start gap-2">
          <div className="flex flex-1 flex-col gap-1">
            <p className="text-[22px] font-semibold leading-7 text-[#f9f9f9]">
              ${event.price.toFixed(2)}{' '}
              <span className="text-[18px] font-normal leading-[26px]">{event.priceUnit}</span>
            </p>
            <p className="w-full text-[12px] leading-5 text-[#b2aeae]">
              Register by {event.registerBy}
            </p>
          </div>
          <Pill tone="outline" color="yellow">
            {event.spotsLeft} spots left
          </Pill>
        </div>
        <Button fullWidth onClick={() => window.alert('This is a prototype — Singpass login is not wired up yet.')}>
          Login with Singpass to register
        </Button>
      </div>
    </div>
  )
}
