"use client";

import { motion } from "motion/react";

const container = (stagger, delay) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const word = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

// Slides each word up from behind a mask. Plays when scrolled into view,
// or when `play` flips to true if it's provided.
export default function RevealText({
  text,
  as: Tag = "span",
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.06,
  play,
}) {
  const words = text.split(" ");
  const trigger =
    play === undefined
      ? { whileInView: "visible", viewport: { once: true, amount: 0.5 } }
      : { animate: play ? "visible" : "hidden" };

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        variants={container(stagger, delay)}
        {...trigger}
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
            <motion.span variants={word} className={`inline-block ${wordClassName}`}>
              {w}
            </motion.span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
