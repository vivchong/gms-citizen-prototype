export default function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex w-full flex-col gap-1.5 pl-5 text-[16px] leading-6 text-[#f9f9f9]" style={{ listStyleType: 'disc' }}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
