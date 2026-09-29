"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const isExternal = (href) => /^(https?:|mailto:|tel:)/.test(href) || href.endsWith(".pdf");

// Section links like "#work" smooth-scroll on the home page; on other pages
// they become "/#work" so they navigate home first. A link such as
// "/about#faq" becomes plain "#faq" while you're already on /about.
export function useResolvedHref(href) {
  const pathname = usePathname();
  if (href.startsWith("#") && pathname !== "/") return `/${href}`;
  const [path, hash] = href.split("#");
  if (hash && path === pathname) return `#${hash}`;
  return href;
}

// Uses a plain <a> for same-page anchors and external URLs (so Lenis can
// smooth-scroll them), and Next's <Link> for navigating between pages.
export default function SmartLink({ href, children, ...props }) {
  const resolved = useResolvedHref(href);
  if (resolved.startsWith("#") || isExternal(resolved)) {
    return (
      <a href={resolved} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={resolved} {...props}>
      {children}
    </Link>
  );
}
