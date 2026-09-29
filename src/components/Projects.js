"use client";

import { useRef } from "react";
import { useScroll } from "motion/react";
import { projects } from "@/data/portfolio";
import RevealText from "./RevealText";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="work" className="pt-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-12 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em] opacity-70 sm:mb-16">
          <span>(01)</span>
          <span className="h-px w-10 bg-current" />
          <span>Selected work</span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <RevealText
            as="h2"
            text="Things I've designed, built and shipped."
            className="max-w-3xl font-display text-4xl leading-[1.1] tracking-tight sm:text-6xl"
          />
          <p className="text-outline font-display text-7xl leading-none text-pacific sm:text-9xl">
            {String(projects.length).padStart(2, "0")}
          </p>
        </div>
      </div>

      <div ref={ref} className="mt-8 px-4 sm:px-8">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={i}
            progress={scrollYProgress}
            range={[i / projects.length, 1]}
            targetScale={1 - (projects.length - i) * 0.04}
          />
        ))}
      </div>
    </section>
  );
}
