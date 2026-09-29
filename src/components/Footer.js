"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { profile } from "@/data/portfolio";
import RollLink from "./RollLink";

export function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: profile.timeZone,
        timeZoneName: "short",
      }).format(new Date());
    const tick = () => setTime(format());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 10_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return <span className="tabular-nums">{time || "--:--"}</span>;
}

export default function Footer() {
  const lenis = useLenis();

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-surf px-4 pb-8 text-ink sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 border-t border-ink/25 pt-8 text-sm sm:grid-cols-3 sm:items-end">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/70">Local time</p>
          <p>
            <LocalTime /> · {profile.location}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 sm:justify-center">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <RollLink href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </RollLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-6 sm:justify-end">
          <p className="text-ink/70">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/40 transition-colors hover:bg-ink hover:text-surf"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
