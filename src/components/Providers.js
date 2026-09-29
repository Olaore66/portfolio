"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig, useReducedMotion } from "motion/react";
import { ReactLenis, useLenis } from "lenis/react";
import Preloader from "./Preloader";
import Cursor from "./Cursor";
import ContactModal from "./ContactModal";

const LoadedContext = createContext(false);
const ContactContext = createContext(() => {});

// True once the preloader has left the screen; intro animations wait for it.
export const useLoaded = () => useContext(LoadedContext);

// Returns a function that opens the "Start a project" form.
export const useOpenContact = () => useContext(ContactContext);

// After moving between pages, start at the top, or at the linked section for "/#work"-style links.
function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const hash = window.location.hash;
    const timer = setTimeout(() => {
      const target = hash && document.querySelector(hash);
      if (target) lenis.scrollTo(target, { duration: 1.2 });
      else lenis.scrollTo(0, { immediate: true });
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname, lenis]);

  return null;
}

export default function Providers({ children }) {
  const [loaded, setLoaded] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const openContact = useCallback(() => setContactOpen(true), []);
  const closeContact = useCallback(() => setContactOpen(false), []);

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ anchors: true, lerp: 0.09, smoothWheel: !reduceMotion }}>
        <LoadedContext.Provider value={loaded}>
          <ContactContext.Provider value={openContact}>
            <Preloader onDone={() => setLoaded(true)} />
            <Cursor />
            <ScrollReset />
            {children}
            <ContactModal open={contactOpen} onClose={closeContact} />
          </ContactContext.Provider>
        </LoadedContext.Provider>
      </ReactLenis>
    </MotionConfig>
  );
}
