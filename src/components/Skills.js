"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView } from "motion/react";
import { skills } from "@/data/portfolio";
import Section from "./Section";

const EASE = [0.22, 1, 0.36, 1];
const SPRING = { type: "spring", stiffness: 380, damping: 26 };
const ALL = "All";

const allSkills = skills.flatMap(({ group, items }, g) =>
  items.map((name) => ({ name, group, groupIndex: g + 1 }))
);

// Big number that tweens to whatever count is currently shown.
function Count({ value }) {
  const [display, setDisplay] = useState(0);
  const from = useRef(0);

  useEffect(() => {
    const controls = animate(from.current, value, {
      duration: 0.9,
      ease: EASE,
      onUpdate: (v) => {
        from.current = v;
        setDisplay(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [value]);

  return <span className="tabular-nums">{String(display).padStart(2, "0")}</span>;
}

function Filters({ active, onChange }) {
  const options = [{ group: ALL, count: allSkills.length }, ...skills.map((s) => ({ group: s.group, count: s.items.length }))];

  return (
    <div role="group" aria-label="Filter skills" className="flex flex-wrap gap-2">
      {options.map(({ group, count }, i) => {
        const selected = active === group;
        return (
          <motion.button
            key={group}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(group)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
            whileTap={{ scale: 0.94 }}
            className={`relative rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
              selected ? "border-surf text-ink" : "border-pacific/50 text-steel hover:border-alabaster hover:text-alabaster"
            }`}
          >
            {/* Highlight glides between the selected filters. */}
            {selected && (
              <motion.span
                layoutId="skill-filter"
                transition={SPRING}
                className="absolute inset-0 rounded-full bg-surf"
              />
            )}
            <span className="relative">
              {group} <span className="opacity-60">{count}</span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

function SkillTile({ skill, index, showGroup, play }) {
  return (
    <motion.li
      layout
      custom={index}
      variants={{
        hidden: { opacity: 0, scale: 0.4, y: 40, rotate: -8 },
        visible: (i) => ({
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: 0,
          transition: { ...SPRING, delay: Math.min(i * 0.035, 0.7) },
        }),
      }}
      initial="hidden"
      animate={play ? "visible" : "hidden"}
      exit={{ opacity: 0, scale: 0.4, transition: { duration: 0.25 } }}
      whileHover={{ y: -6, rotate: index % 2 ? 2 : -2 }}
      transition={{ layout: SPRING }}
      className="group relative cursor-default overflow-hidden rounded-2xl border border-pacific/40"
    >
      {/* Turquoise fill that wipes up on hover. */}
      <span className="absolute inset-0 origin-bottom scale-y-0 bg-surf transition-transform duration-500 ease-out-expo group-hover:scale-y-100" />
      <span className="relative flex items-baseline gap-3 px-5 py-4 transition-colors duration-300 group-hover:text-ink sm:px-6 sm:py-5">
        {showGroup && (
          <span className="font-mono text-[10px] text-steel transition-colors duration-300 group-hover:text-ink/70">
            0{skill.groupIndex}
          </span>
        )}
        <span className="font-display text-xl leading-none sm:text-3xl">{skill.name}</span>
      </span>
    </motion.li>
  );
}

export default function Skills() {
  const [active, setActive] = useState(ALL);
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, amount: 0.2 });

  const shown = useMemo(
    () => (active === ALL ? allSkills : allSkills.filter((s) => s.group === active)),
    [active]
  );

  return (
    <Section id="skills" index="04" label="Skills">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
        <h2 className="max-w-3xl font-display text-4xl leading-[1.1] tracking-tight sm:text-6xl">
          The toolkit behind{" "}
          <span className="text-skin">the work.</span>
        </h2>
        <p aria-live="polite" className="text-right">
          <span className="text-outline block font-display text-7xl leading-none text-pacific sm:text-9xl">
            <Count value={inView ? shown.length : 0} />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-steel">
            {active === ALL ? "skills in total" : `${active} skills`}
          </span>
        </p>
      </div>

      <Filters active={active} onChange={setActive} />

      <motion.ul ref={gridRef} layout className="mt-10 flex flex-wrap gap-3 sm:gap-4">
        <AnimatePresence mode="popLayout">
          {shown.map((skill, i) => (
            <SkillTile
              key={skill.name}
              skill={skill}
              index={i}
              showGroup={active === ALL}
              play={inView}
            />
          ))}
        </AnimatePresence>
      </motion.ul>

      {active === ALL && (
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-steel"
        >
          {skills.map((s, i) => (
            <li key={s.group}>
              0{i + 1} · {s.group}
            </li>
          ))}
        </motion.ul>
      )}
    </Section>
  );
}
