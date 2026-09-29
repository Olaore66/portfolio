"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { profile } from "@/data/portfolio";
import { useLoaded, useOpenContact } from "./Providers";
import RevealText from "./RevealText";
import Magnetic from "./Magnetic";
import { LocalTime } from "./Footer";

const EASE = [0.22, 1, 0.36, 1];

function Letters({ text, play, delay = 0, className = "" }) {
  return (
    <span aria-hidden className={`flex overflow-hidden ${className}`}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: "105%" }}
          animate={{ y: play ? "0%" : "105%" }}
          transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.045 }}
          className="inline-block"
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

// Large portrait that unmasks upward after the preloader, with a slowly spinning badge.
function Portrait({ play, y }) {
  const badge = "Full-stack engineer · Lagos · ";

  return (
    // Clip reveal is driven by `play`, not in-view detection (a fully clipped
    // element never reports as visible).
    <motion.figure style={{ y }} className="relative mx-auto w-full max-w-md lg:max-w-none">
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0% round 28px)" }}
        animate={{ clipPath: play ? "inset(0% 0% 0% 0% round 28px)" : "inset(100% 0% 0% 0% round 28px)" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="group relative aspect-[5/6] max-h-[calc(100svh-9rem)] w-full overflow-hidden rounded-[28px] bg-pacific"
      >
        <motion.div
          initial={{ scale: 1.3 }}
          animate={{ scale: play ? 1 : 1.3 }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
          className="absolute inset-0"
        >
          <Image
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover object-top transition-transform duration-1000 ease-out-expo group-hover:scale-105"
          />
        </motion.div>
      </motion.div>

      {/* Rotating circular badge overlapping the portrait's corner. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={play ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1.3 }}
        className="absolute -bottom-6 -right-3 grid h-24 w-24 place-items-center rounded-full bg-skin text-ink sm:-bottom-8 sm:-right-8 sm:h-32 sm:w-32"
        aria-hidden
      >
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <path id="hero-badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
          </defs>
          <text className="fill-ink font-mono text-[8.5px] uppercase" letterSpacing="1.6">
            <textPath href="#hero-badge-circle">{badge}</textPath>
          </text>
        </motion.svg>
        <span className="font-display text-2xl sm:text-3xl">
          {profile.firstName[0]}
          {profile.lastName[0]}
        </span>
      </motion.div>
    </motion.figure>
  );
}

const icons = {
  location: (
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
  ),
  email: <path d="M3 6.5h18v11H3v-11Zm0 0 9 7 9-7" />,
  github: (
    <path d="M9 19c-4.5 1.4-4.5-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
};

// One contact card: label, value and a turquoise fill that wipes up on hover.
function InfoCard({ icon, label, value, detail, href, external, index, play }) {
  const Tag = href ? motion.a : motion.div;
  const linkProps = href
    ? { href, ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}) }
    : {};

  return (
    <Tag
      {...linkProps}
      initial={{ opacity: 0, y: 24 }}
      animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.8, ease: EASE, delay: 1.3 + index * 0.1 }}
      whileHover={href ? { y: -4 } : undefined}
      className="group relative block overflow-hidden rounded-2xl border border-pacific/40 p-4 sm:p-5"
    >
      {href && (
        <span className="absolute inset-0 origin-bottom scale-y-0 bg-surf transition-transform duration-500 ease-out-expo group-hover:scale-y-100" />
      )}
      <span className="relative flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel transition-colors duration-300 group-hover:text-ink/70">
          {label}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-skin transition-colors duration-300 group-hover:text-ink"
          aria-hidden
        >
          {icons[icon]}
        </svg>
      </span>
      <span className="relative mt-3 block break-words text-sm font-medium text-alabaster transition-colors duration-300 group-hover:text-ink sm:text-base">
        {value}
      </span>
      {detail && (
        <span className="relative mt-1 block text-xs text-steel transition-colors duration-300 group-hover:text-ink/70">
          {detail}
        </span>
      )}
    </Tag>
  );
}

export default function Hero() {
  const loaded = useLoaded();
  const openContact = useOpenContact();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  const githubHandle = profile.github?.split("/").filter(Boolean).pop();

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-x-clip px-4 pb-20 pt-28 sm:px-8 lg:flex lg:min-h-svh lg:items-center lg:pb-12 lg:pt-28"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <Portrait play={loaded} y={portraitY} />

        <motion.div style={{ y: textY, opacity: fade }}>
          <motion.div
            {...fadeUp(0.5)}
            className="mb-6 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-steel"
          >
            {profile.available && (
              <span className="flex items-center gap-3 rounded-full border border-pacific px-4 py-2 text-alabaster">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-surf opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-surf" />
                </span>
                Available for work
              </span>
            )}
            <span>{profile.role}</span>
          </motion.div>

          <h1
            aria-label={profile.name}
            className="font-display text-[clamp(3.25rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.03em]"
          >
            <Letters text={profile.firstName} play={loaded} delay={0.3} className="pb-[0.06em] font-medium" />
            <Letters text={profile.lastName} play={loaded} delay={0.5} className="pb-[0.1em] text-skin" />
          </h1>

          <RevealText
            as="p"
            text={profile.intro}
            play={loaded}
            delay={0.9}
            stagger={0.02}
            className="mt-5 max-w-xl text-lg leading-snug text-alabaster sm:text-xl"
          />

          <motion.div {...fadeUp(1.1)} className="mt-8 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.3}>
              <button
                type="button"
                onClick={openContact}
                aria-haspopup="dialog"
                className="group relative overflow-hidden rounded-full bg-skin px-7 py-4 text-sm font-medium text-ink"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-alabaster transition-transform duration-500 ease-out-expo group-hover:scale-y-100" />
                <span className="relative">Hire me ↗</span>
              </button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href="#work"
                data-cursor="Work"
                className="group relative block overflow-hidden rounded-full border border-surf px-7 py-4 text-sm font-medium text-surf"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-surf transition-transform duration-500 ease-out-expo group-hover:scale-y-100" />
                <span className="relative transition-colors duration-300 group-hover:text-ink">See my work ↓</span>
              </a>
            </Magnetic>
          </motion.div>

          <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_1.5fr_1fr]">
            <InfoCard
              icon="location"
              label="Location"
              value={profile.location}
              detail={
                <>
                  Local time <LocalTime />
                </>
              }
              index={0}
              play={loaded}
            />
            <InfoCard
              icon="email"
              label="Email"
              value={profile.email}
              href={`mailto:${profile.email}`}
              index={1}
              play={loaded}
            />
            {profile.github && (
              <InfoCard
                icon="github"
                label="GitHub"
                value={`@${githubHandle}`}
                href={profile.github}
                external
                index={2}
                play={loaded}
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
