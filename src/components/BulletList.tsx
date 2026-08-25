/*
 * Figma "Text list" (bulleted). The list container has no item spacing —
 * separation comes from the Body/MD line-height alone.
 */
export default function BulletList({ items }: { items: string[] }) {
  return (
    <ul
      className="flex w-full list-disc flex-col gap-0 pl-5 text-[length:var(--font-size-body-md)] leading-[var(--line-height-body-md)] tracking-[var(--letter-spacing-body-md)] text-[var(--text)]"
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
