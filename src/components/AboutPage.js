"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { aboutPage, profile } from "@/data/portfolio";
import { useLoaded, useOpenContact } from "./Providers";
import RevealText from "./RevealText";
import RollLink from "./RollLink";
import Magnetic from "./Magnetic";
import Faq from "./Faq";

const EASE = [0.22, 1, 0.36, 1];
const STORY_LABELS = ["Where I started", "Where I grew", "What I'm building now"];

function Label({ children }) {
  return (
    <div className="mb-10 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em] opacity-70">
      <span className="h-px w-10 bg-current" />
      <span>{children}</span>
    </div>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.9, ease: EASE, delay },
});

function HireButton({ className = "" }) {
  const openContact = useOpenContact();
  return (
    <Magnetic strength={0.3}>
      <button
        type="button"
        onClick={openContact}
        aria-haspopup="dialog"
        className={`group relative overflow-hidden rounded-full bg-skin px-8 py-4 text-sm font-medium text-ink ${className}`}
      >
        <span className="absolute inset-0 origin-bottom scale-y-0 bg-alabaster transition-transform duration-500 ease-out-expo group-hover:scale-y-100" />
        <span className="relative">Hire me ↗</span>
      </button>
    </Magnetic>
  );
}

function Intro() {
  const loaded = useLoaded();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section id="top" ref={ref} className="px-4 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-40">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Label>About me</Label>
          </motion.div>
          <h1 className="font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-[-0.03em]">
            <RevealText text="Hi, I'm" play={loaded} className="block" />
            <RevealText text={`${profile.firstName}.`} play={loaded} delay={0.15} className="block text-skin" />
          </h1>
          <RevealText
            as="p"
            text={aboutPage.intro}
            play={loaded}
            delay={0.5}
            stagger={0.015}
            className="mt-10 max-w-xl text-xl leading-snug text-alabaster sm:text-2xl"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
            className="mt-10 flex flex-wrap items-center gap-8"
          >
            <HireButton />
            <RollLink
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-alabaster pb-1 text-sm font-medium"
            >
              Download résumé ↗
            </RollLink>
          </motion.div>
        </div>

        {/* Trigger sits on the unclipped wrapper; a fully clipped element never reports as visible. */}
        <motion.figure
          initial="hidden"
          animate={loaded ? "visible" : "hidden"}
          className="mx-auto w-full max-w-md lg:max-w-none"
        >
          <motion.div
            variants={{
              hidden: { clipPath: "inset(100% 0% 0% 0% round 24px)" },
              visible: { clipPath: "inset(0% 0% 0% 0% round 24px)" },
            }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            className="relative aspect-[868/855] overflow-hidden rounded-3xl bg-pacific"
          >
            <motion.div style={{ y: photoY }} className="absolute inset-0 scale-110">
              <Image
                src={profile.photoCasual}
                alt={`${profile.name} smiling in traditional attire`}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-top"
              />
            </motion.div>
          </motion.div>
          <figcaption className="mt-4 flex justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
            <span>{profile.name}</span>
            <span>{profile.location}</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Label>My story</Label>
          <RevealText
            as="h2"
            text="From campus to core banking."
            className="font-display text-4xl leading-[1.1] tracking-tight sm:text-6xl"
          />
        </div>
        <ol className="space-y-16">
          {aboutPage.story.map((paragraph, i) => (
            <motion.li key={i} {...fadeUp()} className="border-t border-pacific/50 pt-8">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-surf">
                0{i + 1} · {STORY_LABELS[i] ?? ""}
              </p>
              <p className="text-xl leading-relaxed text-alabaster sm:text-2xl">{paragraph}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="bg-alabaster px-4 py-24 text-ink sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Label>How I work</Label>
        <RevealText
          as="h2"
          text="What you can count on."
          className="mb-16 max-w-3xl font-display text-4xl leading-[1.1] tracking-tight sm:text-6xl"
        />
        <ul className="grid gap-6 md:grid-cols-3">
          {aboutPage.values.map((value, i) => (
            <motion.li
              key={value.title}
              {...fadeUp(i * 0.12)}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-ink/15 p-8 sm:p-10"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-surf transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
              <div className="relative">
                <span className="font-mono text-xs text-ink/50">0{i + 1}</span>
                <h3 className="mt-10 font-display text-4xl">{value.title}</h3>
                <p className="mt-4 leading-relaxed text-ink/75">{value.text}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Facts() {
  return (
    <section className="px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Label>Quick facts</Label>
        <dl className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {aboutPage.facts.map((fact, i) => (
            <motion.div key={fact.label} {...fadeUp(i * 0.08)} className="flex flex-col-reverse border-t border-pacific pt-5">
              <dd className="font-display text-2xl leading-snug">{fact.value}</dd>
              <dt className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-steel">{fact.label}</dt>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="bg-surf px-4 py-24 text-ink sm:px-8 sm:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="font-display text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] tracking-[-0.03em]">
          <RevealText text="Let's build" className="block" />
          <RevealText text="something great." delay={0.15} className="block text-ink/70" />
        </h2>
        <motion.div {...fadeUp(0.3)} className="flex flex-wrap items-center gap-8">
          <Magnetic strength={0.3}>
            <HireCtaButton />
          </Magnetic>
          <RollLink href="/#work" className="border-b border-ink pb-1 text-sm font-medium">
            See my work →
          </RollLink>
        </motion.div>
      </div>
    </section>
  );
}

function HireCtaButton() {
  const openContact = useOpenContact();
  return (
    <button
      type="button"
      onClick={openContact}
      aria-haspopup="dialog"
      className="group relative overflow-hidden rounded-full bg-ink px-8 py-4 text-sm font-medium text-alabaster"
    >
      <span className="absolute inset-0 origin-bottom scale-y-0 bg-alabaster transition-transform duration-500 ease-out-expo group-hover:scale-y-100" />
      <span className="relative transition-colors duration-300 group-hover:text-ink">Hire me ↗</span>
    </button>
  );
}

export default function AboutPage() {
  return (
    <>
      <Intro />
      <Story />
      <Values />
      <Facts />
      <Faq />
      <Cta />
    </>
  );
}
