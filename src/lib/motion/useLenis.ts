import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth scrolling, driven by GSAP's ticker and wired into ScrollTrigger
 * so scroll-driven timelines stay in sync with the virtual scroll position.
 *
 * Disabled entirely under prefers-reduced-motion — those visitors get native
 * scrolling, which is what they asked for.
 */
export function useLenis() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
}

/** Smooth-scroll to an in-page anchor, offset for the fixed nav. */
export function scrollToId(id: string) {
  // Every `#top` link on the page resolves here; there is no element with that
  // id, and adding one would be a second source of truth for "the top".
  if (id === 'top') return scrollToTop();
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) {
    lenis.resize();
    lenis.scrollTo(el, { offset: -80 });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/** Scroll back to the top of the document. */
export function scrollToTop() {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}
