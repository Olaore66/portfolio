"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView, useScroll, useTransform } from "motion/react";
import { about, profile } from "@/data/portfolio";
import Section from "./Section";
import RollLink from "./RollLink";

const EASE = [0.22, 1, 0.36, 1];

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

// Words light up one by one as the paragraph scrolls through the viewport.
function ScrollParagraph({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className="font-display text-3xl leading-[1.2] tracking-tight sm:text-5xl">
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </span>
    </p>
  );
}

function Counter({ value, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// Compact portrait in a slightly tall frame (trims only the backdrop at the sides); unmasks upward on entry.
function Portrait() {
  return (
    // The in-view trigger lives on the unclipped <figure>: a fully clipped
    // element has no visible area, so it would never report as intersecting.
    <motion.figure
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="w-[300px] max-w-full sm:w-[380px]"
    >
      <motion.div
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          visible: { clipPath: "inset(0% 0% 0% 0%)" },
        }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        className="relative aspect-[5/6] overflow-hidden rounded-2xl bg-pacific"
      >
        <Image
          src={profile.photoCasual}
          alt={`${profile.name} smiling in traditional attire`}
          fill
          priority
          sizes="380px"
          className="object-cover object-top transition-transform duration-1000 ease-out-expo hover:scale-105"
        />
      </motion.div>
      <figcaption className="mt-3 flex justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
        <span>{profile.name}</span>
        <span>{profile.location}</span>
      </figcaption>
    </motion.figure>
  );
}

export default function About() {
  return (
    <Section id="about" index="02" label="About">
      <ScrollParagraph text={about.statement} />

      <div className="mt-24 grid gap-12 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-20">
        <Portrait />

        <div className="space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="space-y-8"
          >
            <p className="max-w-lg text-lg leading-relaxed text-steel">{about.detail}</p>
            <RollLink
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-alabaster pb-1 text-sm font-medium"
            >
              Download résumé ↗
            </RollLink>
            <RollLink href="/about" className="ml-8 border-b border-surf pb-1 text-sm font-medium text-surf">
              More about me →
            </RollLink>
          </motion.div>

          <dl className="grid grid-cols-3 gap-4 sm:gap-6">
            {about.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
                className="flex flex-col-reverse border-t border-pacific pt-5"
              >
                <dt className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-steel sm:text-[11px]">
                  {stat.label}
                </dt>
                <dd className="font-display text-4xl leading-none sm:text-6xl">
                  <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
