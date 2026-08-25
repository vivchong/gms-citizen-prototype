import Pill from './Pill'
import type { TimelineStep } from '../data/events'

/*
 * Figma "Timeline".
 * Indicator column: 4px vertical padding, 8px gap, 18px indicator, 4px connector.
 *   - step 1 = "Current Indicator" (filled)
 *   - later steps = "Upcoming Indicator" (4px ring)
 * Every step carries a connector line, including the last one.
 * Content column: 16px gap, 32px bottom padding; title + pills + copy at 8px gap.
 */
export default function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="flex w-full items-start">
      <div className="flex min-w-0 flex-1 flex-col">
        {steps.map((step, index) => (
          <div key={step.title} className="flex w-full items-start gap-4">
            <div className="flex shrink-0 flex-col items-center gap-2 self-stretch overflow-hidden py-1">
              <div
                className={
                  index === 0
                    ? 'size-[18px] shrink-0 rounded-full bg-[var(--primary)]'
                    : 'size-[18px] shrink-0 rounded-full border-4 border-[var(--primary)]'
                }
              />
              <div className="min-h-0 w-1 flex-1 rounded-full bg-[var(--primary)]" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-4 pb-8">
              <div className="flex w-full flex-col gap-2">
                <div className="w-full font-[family-name:var(--font-heading)] text-[length:var(--font-size-heading-xs)] font-semibold leading-[var(--line-height-heading-xs)] tracking-[var(--letter-spacing-heading-xs)] text-[var(--text)]">
                  {step.title}
                </div>
                {step.badges && step.badges.length > 0 && (
                  <div className="flex flex-wrap items-start gap-2">
                    {step.badges.map((badge) => (
                      <Pill
                        key={badge.label}
                        tone={badge.tone === 'solid' ? 'solid' : 'outline'}
                        color={badge.tone === 'solid' ? 'white' : 'primary'}
                      >
                        {badge.label}
                      </Pill>
                    ))}
                  </div>
                )}
                <p className="w-full whitespace-pre-line text-[length:var(--font-size-body-md)] leading-[var(--line-height-body-md)] tracking-[var(--letter-spacing-body-md)] text-[var(--text)]">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
