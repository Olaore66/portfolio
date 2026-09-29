"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import RollLink from "./RollLink";

// Solid card + contrasting preview panel for each palette theme.
const THEMES = {
  surf: { card: "bg-surf text-ink", panel: "bg-ink text-surf", muted: "text-ink/75", line: "border-ink/25" },
  alabaster: { card: "bg-alabaster text-ink", panel: "bg-surf text-ink", muted: "text-ink/70", line: "border-ink/25" },
  steel: { card: "bg-steel text-ink", panel: "bg-ink text-steel", muted: "text-ink/75", line: "border-ink/25" },
};

// A sticky card that shrinks slightly as the next one stacks on top of it.
export default function ProjectCard({ project, index, progress, range, targetScale }) {
  const { title, year, category, role, description, tags, image, imageFit, imageSize, live, liveLabel, repo, theme } = project;
  const href = live || repo;
  const t = THEMES[theme] ?? THEMES.surf;

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.4, 1]);
  // Gentler zoom for real screenshots so they settle without looking cropped.
  const imageZoom = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={ref} className="sticky top-0 flex h-svh items-center justify-center">
      <motion.article
        style={{ scale, top: `calc(-4vh + ${index * 24}px)` }}
        className={`group relative grid h-[78svh] w-full max-w-7xl origin-top grid-rows-[auto_1fr] overflow-hidden rounded-3xl p-5 sm:p-8 md:grid-cols-[1fr_1.35fr] md:grid-rows-1 md:gap-10 ${
          // On large screens banners get a wider image column so the artwork reads larger.
          imageFit === "banner" ? "lg:grid-cols-[0.8fr_1.6fr] lg:gap-8" : ""
        } ${t.card}`}
      >
        {/* Makes the whole card clickable; real links below sit above it via z-10. */}
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="View"
            aria-label={`Open ${title}${liveLabel ? ` (${liveLabel})` : ""}`}
            className="absolute inset-0 z-0 rounded-3xl"
          />
        )}

        <div className="flex flex-col">
          <div className={`flex justify-between border-b pb-4 font-mono text-[11px] uppercase tracking-[0.2em] ${t.line}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{year}</span>
          </div>
          <p className={`mt-6 font-mono text-[11px] uppercase tracking-[0.2em] ${t.muted}`}>{category}</p>
          <h3 className="mt-2 font-display text-4xl leading-none tracking-tight sm:text-6xl md:text-5xl lg:text-6xl">{title}</h3>
          {role && <p className="mt-3 font-display text-lg">{role}</p>}
          <p className={`mt-4 max-w-md text-sm leading-relaxed ${t.muted}`}>{description}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-current px-3 py-1 font-mono text-[11px] uppercase tracking-wider opacity-80"
              >
                {tag}
              </li>
            ))}
          </ul>
          <div className="relative z-10 mt-6 flex gap-6 text-sm font-medium empty:hidden md:mt-auto">
            {live && (
              <RollLink href={live} target="_blank" rel="noopener noreferrer" className="border-b border-current pb-0.5">
                {liveLabel ?? "Live site"} ↗
              </RollLink>
            )}
            {repo && (
              <RollLink href={repo} target="_blank" rel="noopener noreferrer" className="border-b border-current pb-0.5">
                Source ↗
              </RollLink>
            )}
          </div>
        </div>

        {/* Preview. Images are the panel themselves (no backing box), so there's no empty space around them. */}
        <div className="pointer-events-none relative mt-6 min-h-40 md:mt-0">
          {image && imageFit === "banner" ? (
            <div className="flex h-full items-center">
              <div className="w-full overflow-hidden rounded-2xl">
                <motion.div style={{ scale: imageZoom }}>
                  <Image
                    src={image}
                    alt={`${title} promotional banner`}
                    width={imageSize[0]}
                    height={imageSize[1]}
                    sizes="(min-width: 768px) 55vw, 90vw"
                    className="block h-auto w-full"
                  />
                </motion.div>
              </div>
            </div>
          ) : image && imageFit === "contain" ? (
            <motion.div style={{ scale: imageZoom }} className="absolute inset-0">
              <Image
                src={image}
                alt={`${title} app screenshot`}
                fill
                sizes="(min-width: 768px) 30vw, 60vw"
                className="object-contain"
              />
            </motion.div>
          ) : (
            <div className={`absolute inset-0 overflow-hidden rounded-2xl ${t.panel}`}>
              <motion.div style={{ scale: imageScale }} className="absolute inset-0">
                {image ? (
                  <Image src={image} alt="" fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center p-6">
                    <span className="text-center font-display text-5xl leading-none sm:text-7xl">{title}</span>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </motion.article>
    </div>
  );
}
