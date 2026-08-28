import { ChevronLeft, External as ExternalLink } from '../components/icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Masthead from '../components/Masthead'
import Pill from '../components/Pill'
import Button from '../components/Button'
import BulletList from '../components/BulletList'
import Timeline from '../components/Timeline'
import { getEventById } from '../data/events'

/* Type ramps straight off the Figma tokens (V3/… text styles). */
const headingXs =
  'font-[family-name:var(--font-heading)] text-[length:var(--font-size-heading-xs)] leading-[var(--line-height-heading-xs)] tracking-[var(--letter-spacing-heading-xs)]'
const bodyMd =
  'text-[length:var(--font-size-body-md)] leading-[var(--line-height-body-md)] tracking-[var(--letter-spacing-body-md)]'
const bodySm =
  'text-[length:var(--font-size-body-sm)] leading-[var(--line-height-body-sm)] tracking-[var(--letter-spacing-body-sm)]'
const bodyXs =
  'text-[length:var(--font-size-body-xs)] leading-[var(--line-height-body-xs)] tracking-[var(--letter-spacing-body-xs)]'

export default function EventDetails() {
  const { eventId } = useParams<{ eventId: string }>()
  const navigate = useNavigate()
  // Scroll reset is handled globally by <ScrollToTop /> in App.tsx.
  const event = eventId ? getEventById(eventId) : undefined

  if (!event) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-[var(--bg)] px-6 text-center text-[var(--text)]">
        <p>We couldn't find that event.</p>
        <Link to="/browse" className="text-[var(--primary)] underline">
          Back to browse events
        </Link>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-svh flex-col bg-[var(--bg)]">
      {/* Background flare — exact Figma paint (390x716, absolute, behind everything) */}
      <div className="page-flare z-0" aria-hidden />

      <div className="relative z-10 flex flex-col">
        <Masthead />

        {/* Figma root: pt 64 / px 24 / pb 224 / gap 64. Masthead is 48px of that 64. */}
        <div className="flex flex-col gap-16 px-[var(--page-gutter)] pb-[224px] pt-4">
          {/* Back button — gap 4, chevron uses Icon/icon-strongest */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`flex items-center gap-1 self-start text-[var(--text)] ${bodyMd}`}
          >
            <ChevronLeft size={16} color="var(--icon-strong)" />
            Back
          </button>

          {/* Main — gap 32 */}
          <div className="flex w-full flex-col gap-8">
            {/* Title — gap 16 */}
            <div className="flex w-full flex-col gap-4">
              {/* Sport + Event — gap 4 */}
              <div className="flex w-full flex-col gap-1 font-bold text-[var(--text)]">
                <div className={bodySm}>{event.sport.toUpperCase()}</div>
                <p className="font-[family-name:var(--font-heading)] text-[length:var(--font-size-heading-xl)] leading-[var(--line-height-heading-xl)] tracking-[var(--letter-spacing-heading-xl)]">
                  {event.category.toUpperCase()}
                </p>
              </div>
              {/* Details — gap 4 */}
              <div className={`flex w-full flex-col gap-1 text-[var(--text-subtle)] ${bodyMd}`}>
                <div>{event.location}</div>
                <div>{event.dateRange}</div>
              </div>
            </div>

            {/* Event details card — p 20, gap 32, radius 8, 1px inside gradient stroke */}
            <div className="relative flex w-full flex-col gap-8 overflow-hidden rounded-[var(--radius-md)] bg-[var(--card-bg)] p-5">
              <div className="gradient-ring" aria-hidden />

              {/* Eligibility — gap 16 */}
              <div className="flex w-full flex-col gap-4">
                <h2 className={`w-full font-bold text-[var(--text)] ${headingXs}`}>ELIGIBILITY</h2>
                <div className="flex w-full flex-col gap-2">
                  <p className={`w-full font-semibold text-[var(--text)] ${bodyMd}`}>
                    Your team must have:
                  </p>
                  <BulletList items={event.eligibility.team} />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <p className={`w-full font-semibold text-[var(--text)] ${bodyMd}`}>
                    Each participant must be:
                  </p>
                  <BulletList items={event.eligibility.participant} />
                </div>
              </div>

              <div className="h-px w-full bg-[var(--border)]" />

              {/* How to participate — gap 16 */}
              <div className="flex w-full flex-col gap-4">
                <h2 className={`w-full font-bold text-[var(--text)] ${headingXs}`}>
                  HOW TO PARTICIPATE
                </h2>
                <Timeline steps={event.steps} />
              </div>

              <div className="h-px w-full bg-[var(--border)]" />

              {/* Rules & regulations — gap 12 */}
              <div className="flex w-full flex-col gap-3">
                <h2 className={`w-full font-bold text-[var(--text)] ${headingXs}`}>
                  RULES &amp; REGULATIONS
                </h2>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  /* 16px padding measured to the outer edge — Figma's stroke is
                     INSIDE-aligned, so 15px padding + 1px border keeps the box at 73px. */
                  className="flex w-full items-center gap-2.5 rounded-[var(--radius-md)] border border-[var(--primary)] bg-[var(--bg-primary-subtlest)] p-[15px] no-underline"
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <p className={`w-full font-semibold text-[var(--text)] ${bodySm}`}>
                      View {event.sport} rules &amp; regulations
                    </p>
                    <p className="text-[length:var(--font-size-body-xs)] leading-[1.05] tracking-[var(--letter-spacing-body-xs)] text-[var(--text-subtler)]">
                      PDF updated {event.rulesUpdated}
                    </p>
                  </div>
                  {/* 20px box, 15px glyph, Primary 50/60 — per Figma */}
                  <span className="flex size-5 shrink-0 items-center justify-center">
                    <ExternalLink size={15} color="var(--primary)" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer — p 24, gap 16, 1px top border, Shadows/sm-subtle */}
      <div className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-[var(--container-max)] -translate-x-1/2 flex-col gap-4 overflow-hidden border-t border-[var(--border)] bg-[var(--bg)] p-6 shadow-[var(--shadow-sm)]">
        <div className="flex w-full items-start gap-2">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="text-[var(--text)]">
              <span className="text-[length:var(--font-size-heading-sm)] font-semibold leading-[var(--line-height-heading-sm)]">
                ${event.price.toFixed(2)}{' '}
              </span>
              <span className="text-[length:var(--font-size-body-baseline)] font-normal leading-[var(--line-height-body-baseline)]">
                {event.priceUnit}
              </span>
            </p>
            <p className={`w-full text-[var(--text-subtler)] ${bodyXs}`}>
              Register by {event.registerBy}
            </p>
          </div>
          <Pill tone="outline" color="yellow">
            {event.spotsLeft} spots left
          </Pill>
        </div>
        <Button
          fullWidth
          onClick={() =>
            window.alert('This is a prototype — Singpass login is not wired up yet.')
          }
        >
          Login with Singpass to register
        </Button>
      </div>
    </div>
  )
}
