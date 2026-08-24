import Pill from './Pill'
import type { TimelineStep } from '../data/events'

export default function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="flex w-full items-start">
      <div className="flex flex-1 flex-col">
        {steps.map((step, index) => {
          const isFirst = index === 0
          const isLast = index === steps.length - 1
          return (
            <div key={step.title} className="flex w-full items-start gap-4">
              <div className="flex flex-col items-center gap-2 self-stretch overflow-hidden py-1">
                <div
                  className={
                    isFirst
                      ? 'size-[18px] shrink-0 rounded-full bg-[#fa6938]'
                      : 'size-[18px] shrink-0 rounded-full border-4 border-[#fa6938]'
                  }
                />
                {!isLast && <div className="w-1 min-h-0 flex-1 rounded-full bg-[#fa6938]" />}
              </div>
              <div className="flex flex-1 flex-col gap-4 pb-8">
                <div className="flex w-full flex-col gap-2">
                  <div className="w-full font-[family-name:var(--font-heading)] text-[18px] font-semibold leading-[26px] text-[#f9f9f9]">
                    {step.title}
                  </div>
                  {step.badges && step.badges.length > 0 && (
                    <div className="flex items-start gap-2">
                      {step.badges.map((badge) => (
                        <Pill key={badge.label} tone={badge.tone === 'solid' ? 'solid' : 'outline'} color={badge.tone === 'solid' ? 'white' : 'primary'}>
                          {badge.label}
                        </Pill>
                      ))}
                    </div>
                  )}
                  <p className="w-full whitespace-pre-line text-[16px] leading-6 text-[#f9f9f9]">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
