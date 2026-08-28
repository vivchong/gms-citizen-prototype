import { useEffect } from 'react'

/*
 * Small transient message for prototype-only dead ends.
 *
 * Not in the Figma designs — it exists so unbuilt destinations say so instead
 * of silently doing nothing. Styled entirely from tokens: an inverted surface
 * (--bg-inverse / --text-inverse), which reads clearly in both modes without
 * needing its own palette.
 *
 * Sits above the 64px bottom nav and shares its centring so it lines up with
 * the app's max-width column rather than the viewport.
 */
export default function Toast({
  message,
  onDismiss,
  duration = 2600,
}: {
  message: string | null
  onDismiss: () => void
  duration?: number
}) {
  useEffect(() => {
    if (!message) return
    const t = window.setTimeout(onDismiss, duration)
    return () => window.clearTimeout(t)
  }, [message, duration, onDismiss])

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed bottom-[76px] left-1/2 z-30 flex w-full max-w-[var(--container-max)] -translate-x-1/2 justify-center px-[var(--page-gutter)]"
    >
      {message && (
        <p
          className="motion-safe:animate-[gms-toast-in_160ms_ease-out] rounded-[var(--radius-md)] bg-[var(--bg-inverse)] px-4 py-2.5 text-center text-[length:var(--font-size-body-sm)] leading-[var(--line-height-body-sm)] tracking-[var(--letter-spacing-body-sm)] text-[var(--text-inverse)] shadow-[var(--shadow-sm)]"
        >
          {message}
        </p>
      )}
    </div>
  )
}
