"use client";

import { useEffect, useState } from "react";

const END = Date.parse("2026-10-31T23:59:59+02:00");

function parts(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const p = parts(now === null ? 0 : END - now);

  return (
    <section className="bg-[#111] px-4 py-10 text-center text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#e8d9b8]">
        Spring clearance
      </p>
      <h2 className="mt-2 text-3xl font-black uppercase tracking-tight md:text-4xl">
        Sale ends in
      </h2>
      <p className="mt-2 text-sm text-white/70">Hurry — massive discount + free delivery</p>
      <div className="mx-auto mt-8 grid max-w-lg grid-cols-4 gap-3">
        {(
          [
            ["Days", p.days],
            ["Hours", p.hours],
            ["Minutes", p.minutes],
            ["Seconds", p.seconds],
          ] as const
        ).map(([label, value]) => (
          <div key={label} className="rounded-xl bg-white/10 py-4">
            <p className="text-3xl font-black tabular-nums">
              {String(value).padStart(2, "0")}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/60">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
