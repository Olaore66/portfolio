"use client";

import { motion } from "motion/react";
import { services } from "@/data/portfolio";
import Section from "./Section";

export default function Services() {
  return (
    <Section
      id="services"
      index="03"
      label="Services"
      title="What I bring to a team, from first commit to production."
      className="bg-alabaster text-ink"
    >
      <ul className="border-b border-ink/25">
        {services.map((service, i) => (
          <motion.li
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
            className="group relative overflow-hidden border-t border-ink/25"
          >
            {/* Turquoise fill that wipes up on hover */}
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-surf transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />

            <div className="relative grid gap-4 px-2 py-8 transition-colors duration-500 sm:px-6 md:grid-cols-[80px_1.2fr_1fr] md:items-center md:py-12">
              <span className="font-mono text-sm opacity-60">0{i + 1}</span>
              <h3 className="font-display text-3xl tracking-tight transition-transform duration-700 ease-out-expo group-hover:translate-x-4 sm:text-5xl">
                {service.title}
              </h3>
              <div>
                <p className="leading-relaxed opacity-80">{service.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-current px-3 py-1 font-mono text-[11px] uppercase tracking-wider opacity-70"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}
