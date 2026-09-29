"use client";

import { motion } from "motion/react";
import { experience } from "@/data/portfolio";
import Section from "./Section";

const EASE = [0.22, 1, 0.36, 1];

export default function Experience() {
  return (
    <Section id="experience" index="05" label="Experience" title="Where I've been building lately.">
      <ol>
        {experience.map((job, i) => (
          <motion.li
            key={`${job.company}-${job.period}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="group relative"
          >
            <motion.span
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
              transition={{ duration: 1.2, ease: EASE, delay: i * 0.1 }}
              className="absolute inset-x-0 top-0 h-px origin-left bg-pacific"
            />
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 + i * 0.1 }}
              className="grid gap-3 py-10 transition-transform duration-700 ease-out-expo md:grid-cols-[200px_1fr_1fr_120px] md:items-baseline md:gap-8 md:group-hover:translate-x-3"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-steel">{job.period}</span>
              <div>
                <h3 className="font-display text-2xl tracking-tight sm:text-3xl">{job.role}</h3>
                <p className="mt-1 font-display text-lg text-steel">{job.company}</p>
              </div>
              <p className="leading-relaxed text-steel">{job.description}</p>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-steel md:text-right">
                {job.location}
              </span>
            </motion.div>
          </motion.li>
        ))}
        <motion.li
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          aria-hidden
          className="h-px origin-left bg-pacific"
        />
      </ol>
    </Section>
  );
}
