export default function Marquee({ items }: { items: string[] }) {
  const text = items.join("  •  ");
  return (
    <div className="relative overflow-hidden border-y-3 border-black bg-accent py-3 text-black" aria-label="Announcements">
      <div className="marquee-track whitespace-nowrap font-display text-sm uppercase tracking-wider md:text-base">
        <span className="px-4">{text}  •  </span>
        <span className="px-4" aria-hidden="true">{text}  •  </span>
      </div>
    </div>
  );
}
