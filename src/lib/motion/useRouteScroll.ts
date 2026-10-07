import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToId } from '@/lib/motion/useLenis';
import { LEGACY, normalisePath, ROUTE_TITLES } from '@/lib/content/ia';

/**
 * Any path without an entry in the IA renders `NotFoundPage`, so the fallback
 * is the 404's title rather than the bare brand name — a route that forgets its
 * entry announces the wrong page, which is a loud failure rather than a silent
 * one. The record itself is derived from `ia.ts`, not maintained by hand.
 */
const FALLBACK_TITLE = 'Page not found — EchoRegent';

/**
 * Routing side effects: scroll position, focus, title, and ScrollTrigger.
 *
 * Three things have to happen on every navigation, and each of them is a bug
 * if it does not:
 *
 *  1. **ScrollTrigger.refresh().** GSAP caches each trigger's start position
 *     at creation. A `<Title>` mounted into a freshly-rendered route is
 *     measured against the *old* scroll position, and its masked reveal never
 *     fires — the line sits at `y: 112%`, permanently hidden. This is the
 *     single most likely visible failure of adding routes, so the refresh runs
 *     twice: once after paint, once after fonts and images have settled.
 *
 *  2. **Scroll to top, through Lenis.** `window.scrollTo` fights the smooth
 *     scroller and the position snaps back. An instant Lenis scrollTo is the
 *     only version that lands.
 *
 *  3. **Focus.** A client-side route change is invisible to a screen reader
 *     unless focus moves. It goes to the page's h1.
 *
 * Deep links with a hash (`/about#principles`) scroll to the anchor instead
 * of the top, after the target has mounted. There is one such link left in the
 * whole site and one retired address that resolves to one; the four areas used
 * to be full of them, and the anchors are gone.
 *
 * **A hash that resolves to nothing is treated as no hash at all.** This is the
 * difference between a stale link degrading and a stale link trapping: with the
 * hash honoured blindly, the reader would land mid-scroll, unfocused, on a page
 * whose anchor does not exist, with nothing logged. Retired anchors are mapped
 * in `ia.ts` and redirected before any of that; anything else falls through to
 * the ordinary top-of-page behaviour.
 */
export function useRouteScroll() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // A retired anchor — a band that is now a page of its own. The key is
    // normalised so `/Product/#classify` is recognised as `/product#classify`.
    // `replace` so the back button does not bounce.
    const retired = LEGACY[`${normalisePath(pathname)}${hash}`];
    if (retired) {
      navigate(retired, { replace: true });
      return;
    }

    document.title = ROUTE_TITLES[normalisePath(pathname)] ?? FALLBACK_TITLE;

    // Measured after commit, so the new route's DOM is already in the document.
    const anchorId = hash ? hash.slice(1) : '';
    const anchored = Boolean(anchorId) && Boolean(document.getElementById(anchorId));

    if (!anchored) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
      // `immediate` — a smooth scroll would animate across a page that no
      // longer exists.
      lenis?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }

    let anchorTimer = 0;
    if (anchored) {
      // Wait for the new subtree to lay out before measuring the target.
      anchorTimer = window.setTimeout(() => scrollToId(anchorId), 240);
    }

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    const settle = window.setTimeout(() => ScrollTrigger.refresh(), 420);

    // Focus last, so it does not fight the scroll above. On a genuine in-page
    // jump the reader is already where they want to be and has just activated
    // a link — pulling focus back to the page h1 would undo the jump for anyone
    // navigating by keyboard, so it is skipped.
    const focusTimer = window.setTimeout(() => {
      if (anchored) return;
      document.querySelector<HTMLElement>('[data-route-heading]')?.focus({ preventScroll: true });
    }, 60);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      window.clearTimeout(focusTimer);
      if (anchorTimer) window.clearTimeout(anchorTimer);
    };
  }, [pathname, hash, navigate]);
}
