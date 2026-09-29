"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { navLinks, profile } from "@/data/portfolio";
import { usePathname } from "next/navigation";
import { useLoaded, useOpenContact } from "./Providers";
import Magnetic from "./Magnetic";
import RollLink from "./RollLink";
import SmartLink from "./SmartLink";

const EASE = [0.76, 0, 0.24, 1];

export default function Navbar() {
  const loaded = useLoaded();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const openContact = useOpenContact();
  const onHome = usePathname() === "/";

  const hireMe = () => {
    setOpen(false);
    openContact();
  };

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200 && !open);
    setScrolled(y > 40);
  });

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [lenis, open]);

  const initials = `${profile.firstName[0]}${profile.lastName[0]}`;

  return (
    <>
      <motion.header
        initial={{ y: "-100%" }}
        animate={{ y: loaded && !hidden ? "0%" : "-100%" }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled && !open ? "bg-ink" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-8">
          <SmartLink href={onHome ? "#top" : "/"} className="group flex items-center gap-3" aria-label={onHome ? "Back to top" : "Home"}>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-alabaster font-display text-lg text-ink transition-transform duration-500 ease-out-expo group-hover:rotate-[360deg]">
              {initials}
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-steel sm:block lg:hidden xl:block">
              {profile.role}
            </span>
          </SmartLink>

          <ul className="hidden items-center gap-7 text-sm lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <RollLink href={link.href} className="text-steel hover:text-alabaster">
                  {link.label}
                </RollLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden sm:inline-block">
              <button
                type="button"
                onClick={hireMe}
                aria-haspopup="dialog"
                className="block rounded-full bg-skin px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-alabaster"
              >
                Hire me
              </button>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={`relative z-50 grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden ${
                open ? "border-ink/40" : "border-pacific"
              }`}
            >
              <span
                className={`absolute h-px w-4 transition-[transform,background-color] duration-500 ease-out-expo ${open ? "bg-ink" : "bg-alabaster"} ${
                  open ? "rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                className={`absolute h-px w-4 transition-[transform,background-color] duration-500 ease-out-expo ${open ? "bg-ink" : "bg-alabaster"} ${
                  open ? "-rotate-45" : "translate-y-1"
                }`}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-surf px-4 pb-10 pt-28 text-ink sm:px-8 lg:hidden"
          >
            <ul className="space-y-2">
              {navLinks.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.25 + i * 0.06 }}
                  >
                    <SmartLink
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-1 font-display text-5xl tracking-tight sm:text-7xl"
                    >
                      <span className="font-mono text-xs text-ink/60">0{i + 1}</span>
                      {link.label}
                    </SmartLink>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <button
                type="button"
                onClick={hireMe}
                aria-haspopup="dialog"
                className="w-full rounded-full bg-ink py-4 text-base font-medium text-alabaster sm:w-auto sm:px-10"
              >
                Hire me ↗
              </button>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/70">
              {profile.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
