"use client";

import { useEffect, useState } from "react";

function getTimeLeft(target: number) {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function CountdownTimer() {
  const [target] = useState(() => Date.now() + 1000 * 60 * 60 * 36);
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft(target));
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const blocks = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Mins", value: time.minutes },
    { label: "Secs", value: time.seconds },
  ];

  return (
    <div className="flex gap-2 sm:gap-4" aria-label="Sale countdown timer">
      {blocks.map((b) => (
        <div key={b.label} className="min-w-[64px] rounded-xl border-2 border-accent bg-purple-950/70 px-2 py-3 text-center sm:min-w-[80px]">
          <div className="font-display text-2xl text-accent sm:text-3xl">
            {mounted ? String(b.value).padStart(2, "0") : "--"}
          </div>
          <div className="text-xs uppercase tracking-wider text-lavender">{b.label}</div>
        </div>
      ))}
    </div>
  );
}
