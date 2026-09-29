"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { faqs, profile } from "@/data/portfolio";
import Section from "./Section";
import { useOpenContact } from "./Providers";

const EASE = [0.22, 1, 0.36, 1];

function FaqItem({ faq, index, open, onToggle }) {
  const id = useId();

  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: EASE, delay: (index % 4) * 0.06 }}
      className="border-t border-ink/20"
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-answer`}
          id={`${id}-question`}
          className="group flex w-full items-center gap-4 py-6 text-left sm:gap-8 sm:py-8"
        >
          <span className="w-8 shrink-0 font-mono text-xs text-ink/50">{String(index + 1).padStart(2, "0")}</span>
          <span className="flex-1 font-display text-2xl leading-tight tracking-tight transition-transform duration-500 ease-out-expo group-hover:translate-x-2 sm:text-4xl">
            {faq.question}
          </span>
          {/* Plus that turns into a cross, inside a circle that fills when open. */}
          <motion.span
            aria-hidden
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border text-xl transition-colors duration-300 ${
              open ? "border-ink bg-ink text-alabaster" : "border-ink/30 group-hover:border-ink"
            }`}
          >
            +
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-answer`}
            role="region"
            aria-labelledby={`${id}-question`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <motion.p
              initial={{ y: -12 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-3xl pb-8 pl-12 text-lg leading-relaxed text-ink/75 sm:pl-16"
            >
              {faq.answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const openContact = useOpenContact();

  return (
    <Section
      id="faq"
      label="FAQ"
      title="Questions people ask before hiring me."
      className="bg-alabaster text-ink"
    >
      <ul className="border-b border-ink/20">
        {faqs.map((faq, i) => (
          <FaqItem
            key={faq.question}
            faq={faq}
            index={i}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </ul>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mt-16 flex flex-col gap-6 rounded-3xl bg-ink p-8 text-alabaster sm:flex-row sm:items-center sm:justify-between sm:p-10"
      >
        <div>
          <p className="font-display text-3xl tracking-tight sm:text-4xl">Still have a question?</p>
          <p className="mt-2 text-steel">
            Ask me directly at{" "}
            <a href={`mailto:${profile.email}`} className="text-alabaster underline underline-offset-4">
              {profile.email}
            </a>
          </p>
        </div>
        <button
          type="button"
          onClick={openContact}
          aria-haspopup="dialog"
          className="group relative shrink-0 overflow-hidden rounded-full bg-skin px-8 py-4 text-sm font-medium text-ink"
        >
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-alabaster transition-transform duration-500 ease-out-expo group-hover:scale-y-100" />
          <span className="relative">Hire me ↗</span>
        </button>
      </motion.div>
    </Section>
  );
}
