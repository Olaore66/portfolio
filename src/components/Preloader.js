"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { profile } from "@/data/portfolio";

const EASE = [0.76, 0, 0.24, 1];

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (visible) lenis.stop();
    else lenis.start();
  }, [lenis, visible]);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.8,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(() => setVisible(false), 250),
    });
    return () => controls.stop();
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="preloader"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{ clipPath: "inset(0 0 0% 0)" }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-surf p-5 text-ink sm:p-10"
        >
          <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-ink/70">
            <span>{profile.name}</span>
            <span>Portfolio ©{new Date().getFullYear()}</span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <p className="max-w-[14ch] animate-fade-up font-display text-3xl leading-none sm:text-5xl">
              {profile.role}
            </p>
            <span className="font-display text-[26vw] leading-[0.8] tabular-nums sm:text-[16vw]">
              {count}
            </span>
          </div>

          <div className="h-px w-full bg-ink/20">
            <div className="h-full bg-ink" style={{ width: `${count}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
