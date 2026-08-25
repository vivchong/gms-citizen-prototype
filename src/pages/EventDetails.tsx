import { useEffect } from 'react'
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

  useEffect(() => { window.scrollTo(0, 0) }, [eventId])

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
    <div className="relative flex min-h-svh flex-col bg-[var(--bg)] pb-[176px]">
      {/* Fixed gradient background — fills viewport, doesn't scroll */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(126.96% 77.56% at 100% -6.03%, rgba(248, 150, 2, 0.80) 0%, rgba(235, 76, 36, 0.80) 30.92%, rgba(178, 0, 0, 0.80) 56.85%, rgba(13, 12, 12, 0.80) 100%)',
        }}
      />

      {/* Scrollable content */}
      <div className="relative z-10 flex flex-col">
        <Masthead />

        {/* Header */}
        <div className="flex flex-col gap-6 px-[var(--gutter)] pb-6 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-[16px] leading-6 text-[#f9f9f9]"
          >
            <ChevronLeft size={16} />
            Back
          </button>

          <div className="flex w-full flex-col gap-0">
            <div className="text-[14px] font-bold leading-5 tracking-[0.12px] text-[#f9f9f9]">
              {event.sport.toUpperCase()}
            </div>
            <div className="font-[family-name:var(--font-heading)] text-[length:var(--text-display)] font-bold leading-[var(--leading-display)] tracking-[-0.32px] text-[#f9f9f9]">
              {event.category.toUpperCase()}
            </div>
            <div className="flex flex-col gap-0 pt-1 text-[16px] leading-6 text-[#c7caca]">
              <div>{event.location}</div>
              <div>{event.dateRange}</div>
            </div>
          </div>
        </div>

        {/* Content card */}
        <div className="flex w-full flex-col px-[var(--gutter)] py-4">
          <div className="relative flex w-full flex-col gap-8 rounded-[8px] bg-[rgba(255,255,255,0.05)] p-5">
            {/* Radial gradient border via masked pseudo-element */}
            <div
              className="pointer-events-none absolute inset-[-1px] rounded-[8px]"
              style={{
                background:
                  'radial-gradient(50% 50% at 50% 0%, #DC5D39 0%, #554D4D 100%)',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                padding: '1px',
              }}
            />

            <div className="flex w-full flex-col gap-4">
              <h2 className="w-full font-[family-name:var(--font-heading)] text-[18px] font-bold leading-[26px] text-[#f9f9f9]">
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

            <div className="h-px w-full bg-[var(--border-40)]" />

            <div className="flex w-full flex-col gap-4">
              <h2 className="w-full font-[family-name:var(--font-heading)] text-[18px] font-bold leading-[26px] text-[#f9f9f9]">
                HOW TO PARTICIPATE
              </h2>
              <Timeline steps={event.steps} />
            </div>

            <div className="h-px w-full bg-[var(--border-40)]" />

            <div className="flex w-full flex-col gap-3">
              <h2 className="w-full font-[family-name:var(--font-heading)] text-[18px] font-bold leading-[26px] text-[#f9f9f9]">
                RULES &amp; REGULATIONS
              </h2>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex w-full items-center gap-2.5 rounded-[8px] border border-[#fa6938] bg-[var(--primary-subtlest)] p-4 no-underline"
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

      <div className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-[var(--container-max)] -translate-x-1/2 flex-col gap-4 border-t border-[var(--border-40)] bg-[var(--bg)] px-[var(--gutter)] py-6 shadow-[0_2px_4px_rgba(104,104,104,0.24)]">
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
