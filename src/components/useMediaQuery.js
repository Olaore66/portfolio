"use client";

import { useSyncExternalStore } from "react";

// True while the media query matches. Renders as `false` on the server (mobile
// first), then updates on the client and whenever the viewport crosses the breakpoint.
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
