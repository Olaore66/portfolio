"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/data/portfolio";
import RevealText from "./RevealText";
import Magnetic from "./Magnetic";
import { useOpenContact } from "./Providers";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const openContact = useOpenContact();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="bg-surf px-4 pb-16 pt-24 text-ink sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em] opacity-70 sm:mb-16">
          <span>(06)</span>
          <span className="h-px w-10 bg-current" />
          <span>Contact</span>
        </div>

        <h2 className="font-display text-[clamp(3rem,10vw,9.5rem)] leading-[0.95] tracking-[-0.03em]">
          <RevealText text="Let's build" className="block" />
          <RevealText text="something great." delay={0.15} className="block text-ink/70" />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80 sm:text-xl"
        >
          I take ownership like it&apos;s my own product. Bring me onto your team and get peace of mind.
        </motion.p>

        <div className="mt-16 flex flex-col gap-10 border-t border-ink/25 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/70">Drop me a line</p>
            <button
              type="button"
              onClick={copyEmail}
              data-cursor="Copy"
              className="relative text-2xl font-medium tracking-tight sm:text-4xl"
            >
              {profile.email}
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    role="status"
                    className="absolute -top-8 left-0 rounded-full bg-alabaster px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-ink"
                  >
                    Copied!
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          <Magnetic strength={0.45}>
            <button
              type="button"
              onClick={openContact}
              aria-haspopup="dialog"
              className="group relative grid h-40 w-40 place-items-center overflow-hidden rounded-full bg-alabaster text-center font-medium text-ink sm:h-48 sm:w-48"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-ink transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
              <span className="relative transition-colors duration-500 group-hover:text-alabaster">
                Start a
                <br />
                project ↗
              </span>
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
