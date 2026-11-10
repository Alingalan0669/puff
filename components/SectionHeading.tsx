import { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  return (
    <div className={`mb-8 flex flex-col gap-3 ${align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}>
      <div>
        {eyebrow && <p className="mb-1 text-sm font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>}
        <h2 className="font-display text-3xl uppercase leading-tight text-white md:text-5xl">{title}</h2>
        {subtitle && <p className="mt-2 max-w-2xl text-lavender">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
