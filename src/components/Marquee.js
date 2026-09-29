"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { stack } from "@/data/portfolio";

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

// Infinite ticker that speeds up and flips direction with scroll velocity.
function Row({ items, baseVelocity, className = "" }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = direction.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) direction.current = -1;
    else if (factor.get() > 0) direction.current = 1;
    move += direction.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div style={{ x }} className={`flex shrink-0 ${className}`}>
        {Array.from({ length: 4 }).map((_, copy) => (
          <span key={copy} className="flex shrink-0 items-center" aria-hidden={copy > 0}>
            {items.map((item) => (
              <span key={item} className="flex items-center">
                <span className="px-6 sm:px-10">{item}</span>
                <span className="text-[0.4em] text-ink/50">✦</span>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  const half = Math.ceil(stack.length / 2);
  return (
    <section aria-label="Tech stack" className="bg-surf py-8 text-ink sm:py-12">
      <Row items={stack.slice(0, half)} baseVelocity={-3} className="text-5xl font-medium tracking-tight sm:text-8xl" />
      <Row
        items={stack.slice(half)}
        baseVelocity={3}
        className="text-outline mt-2 font-display text-5xl text-ink sm:text-8xl"
      />
    </section>
  );
}
