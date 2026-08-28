import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import Masthead from '../components/Masthead'
import BottomNav from '../components/BottomNav'
import AssetImage from '../components/AssetImage'
import { Arrow, ExclamationTriangle, External } from '../components/icons'
import MaterialIcon from '../components/MaterialIcon'
import {
  actionTasks,
  featureCard,
  greeting,
  homeImages,
  upcomingEvents,
  type ActionTask,
  type UpcomingEvent,
} from '../data/home'

/* Type ramps straight off the Figma tokens (V3/… text styles). */
const headingXs =
  'font-[family-name:var(--font-heading)] text-[length:var(--font-size-heading-xs)] leading-[var(--line-height-heading-xs)] tracking-[var(--letter-spacing-heading-xs)]'
const bodyMd =
  'text-[length:var(--font-size-body-md)] leading-[var(--line-height-body-md)] tracking-[var(--letter-spacing-body-md)]'
const bodySm =
  'text-[length:var(--font-size-body-sm)] leading-[var(--line-height-body-sm)] tracking-[var(--letter-spacing-body-sm)]'

/* "Ack indemnity" / "Add members" — p 16, gap 16, radius 4 (sm). */
function TaskCard({ task }: { task: ActionTask }) {
  return (
    <button
      type="button"
      /* Task-card stroke is NOT one token resolving per mode: dark binds
         Border (n-40) (grey), light binds Primary 50 and 60 (orange). See
         --task-card-border. */
      className="flex w-full flex-col justify-center gap-4 rounded-[var(--radius-sm)] border border-[var(--task-card-border)] bg-[var(--bg-primary-subtlest)] p-[15px] text-left"
    >
      <div className="flex w-full items-center gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex w-full items-center gap-2">
            {/* Figma uses the Fill=Yes variant in BOTH modes: a solid triangle with
                the "!" knocked out. lucide only ships an outline glyph, so it's
                filled with the warning colour and stroked in the card's own
                background, which reproduces the knockout. */}
            <ExclamationTriangle
              size={24}
              fill="var(--icon-warning)"
              stroke="var(--bg-primary-subtlest)"
              strokeWidth={2}
              className="shrink-0"
            />
            <p className={`min-w-0 flex-1 font-bold text-[var(--text)] ${bodyMd}`}>{task.title}</p>
          </div>
          <p className={`w-full text-[var(--text-subtle)] ${bodySm}`}>{task.description}</p>
        </div>
        <Arrow size={24} className="shrink-0 text-[var(--icon-primary)]" />
      </div>

      {/* Reg details — p 8, radius 8 (md) */}
      <div className="flex w-full flex-col overflow-hidden rounded-[var(--radius-md)] bg-[var(--bg-primary-subtler)] p-2">
        <div className="flex w-full items-center gap-4">
          <AssetImage
            src={task.registration.image}
            alt=""
            className="size-10 shrink-0 rounded-[var(--radius-sm)]"
          />
          <div className={`flex min-w-0 flex-1 flex-col ${bodySm}`}>
            <p className="w-full font-semibold text-[var(--text)]">{task.registration.name}</p>
            <p className="w-full text-[var(--text-subtler)]">{task.registration.event}</p>
          </div>
        </div>
      </div>
    </button>
  )
}

/* "RIBA" — p 16, gap 16, radius 4. The stroke is the shared BORDER LIGHT FLARE
   gradient, byte-identical to the sport-listing cards (same gradientTransform
   and the same two variable bindings), so it reuses --flare-border-image rather
   than being a flat --border-light-flare-colour edge. */
function EventRow({ event }: { event: UpcomingEvent }) {
  return (
    <Link
      to="/browse"
      className="relative flex w-full items-center gap-4 rounded-[var(--radius-sm)] bg-[var(--card-bg)] p-4 no-underline"
    >
      <div
        className="gradient-ring"
        style={{ '--ring-image': 'var(--flare-border-image)' } as CSSProperties}
        aria-hidden
      />
      <AssetImage src={event.image} alt="" className="size-10 shrink-0 rounded-[var(--radius-sm)]" />
      <div className="flex min-w-0 flex-1 flex-col">
        <p className={`w-full font-semibold text-[var(--primary)] ${bodyMd}`}>{event.title}</p>
        <p className={`w-full text-[var(--text-subtle)] ${bodySm}`}>{event.detail}</p>
      </div>
    </Link>
  )
}

export default function Home() {
  return (
    <div className="relative flex min-h-svh flex-col bg-[var(--bg)] pb-16">
      {/* Background flare — exact Figma paint, starts below the masthead */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 z-0"
        style={{
          top: 'var(--masthead-height)',
          height: 'var(--home-flare-height)',
          backgroundImage: 'var(--home-flare-image)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="relative z-10 flex flex-col">
        <Masthead />

        {/* Main — pt 24 / px 24 / pb 64, gap 34 */}
        <div className="flex flex-col gap-[34px] px-[var(--page-gutter)] pb-16 pt-6">
          {/* Heading — gap 24 */}
          <div className="flex w-full flex-col gap-6">
            <div className="flex w-full items-center justify-between">
              {/* The dark and light frames use genuinely different logo assets */}
              <AssetImage
                src={homeImages.logoDark}
                alt="Sport Singapore"
                className="dark-only h-[31px] w-[68px] shrink-0"
                imgClassName="object-contain"
              />
              <AssetImage
                src={homeImages.logoLight}
                alt="Sport Singapore"
                className="light-only h-[31px] w-[68px] shrink-0"
                imgClassName="object-contain"
              />

              {/* Notifications — 40x40, radius 20, badge overlaps at 26,-4 */}
              <button
                type="button"
                aria-label="Notifications, 1 unread"
                className="relative flex size-10 shrink-0 items-center justify-center rounded-[20px] border border-[var(--notif-border)] bg-[var(--notif-bg)]"
              >
                <MaterialIcon
                  name="notifications"
                  size={24}
                  className="text-[var(--icon-strongest)]"
                />
                <span className="absolute left-[26px] top-[-4px] flex h-4 min-w-5 items-center justify-center rounded-[var(--radius-full)] bg-[var(--badge-bg)] px-1.5 text-[12px] font-bold leading-4 text-[var(--text-inverse)]">
                  1
                </span>
              </button>
            </div>

            <h1 className="w-full font-[family-name:var(--font-heading)] text-[length:var(--font-size-heading-xxl)] font-bold leading-[var(--line-height-heading-xxl)] tracking-[var(--letter-spacing-heading-xxl)] text-[var(--text)]">
              {greeting}
            </h1>
          </div>

          {/* Tasks requiring action — gap 8, cards gap 16 */}
          <section className="flex w-full flex-col gap-2">
            <h2 className={`w-full font-bold text-[var(--text)] ${headingXs}`}>
              {actionTasks.length} TASKS REQUIRE ACTION
            </h2>
            <div className="flex w-full flex-col gap-4">
              {actionTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </section>

          {/* Your events — gap 8 */}
          <section className="flex w-full flex-col gap-2">
            <h2 className={`w-full font-bold text-[var(--text)] ${headingXs}`}>YOUR EVENTS</h2>
            {upcomingEvents.map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </section>

          {/* Feature card — gap 12, radius 4. Stroke binds to Border (n-40), not
              Border-strong; Figma codegen misreported this one. 15px padding +
              1px border keeps the box at Figma's size, since its stroke is
              INSIDE-aligned. */}
          <a
            href={featureCard.href}
            target="_blank"
            rel="noreferrer"
            className="flex w-full flex-col gap-3 overflow-hidden rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--card-bg)] p-[15px] no-underline"
          >
            <AssetImage
              src={featureCard.image}
              alt=""
              className="aspect-[310/79] w-full rounded-[2px]"
            />
            <div className="flex w-full flex-col gap-3">
              <div className="flex w-full flex-col gap-1">
                <p className="w-full text-[16px] font-semibold leading-[22px] tracking-[0.16px] text-[var(--text)]">
                  {featureCard.title}
                </p>
                <p className={`w-full text-[var(--text-subtle)] ${bodySm}`}>{featureCard.body}</p>
              </div>
              <div className="flex items-center gap-1">
                <span className={`font-semibold text-[var(--primary)] ${bodySm}`}>
                  {featureCard.linkLabel}
                </span>
                <External size={16} className="shrink-0 text-[var(--primary)]" />
              </div>
            </div>
          </a>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
