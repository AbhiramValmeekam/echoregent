/** Motion primitives — shared timings and variants.
 *
 *  Hierarchy (same as Arkadhi's, so the two sites move alike):
 *    L1 micro-interactions  ~180–300ms
 *    L2 section reveals     ~600–800ms
 *    L3 narrative moves     ~900–1200ms
 *    L4 hero / page         ~800–1400ms
 *
 *  One easing family throughout. No bounce, no spring overshoot.
 */

export const EASE = {
  calm: [0.22, 1, 0.36, 1],
  precise: [0.65, 0, 0.35, 1],
} as const;

export const DUR = {
  micro: 0.22,
  reveal: 0.72,
  narrative: 1.05,
  hero: 1.15,
  page: 0.72,
} as const;

/** Word/line reveal from behind a mask. L4. */
export const lineRise = {
  hidden: { y: '110%' },
  shown: (i: number) => ({
    y: '0%',
    transition: { duration: DUR.hero, ease: EASE.calm, delay: 0.06 * i },
  }),
};

/** Standard section entry. L2. */
export const fadeRise = {
  hidden: { opacity: 0, y: 22 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.reveal, ease: EASE.calm },
  },
};

export const staggerParent = (stagger = 0.07, delay = 0) => ({
  hidden: {},
  shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Metadata / eyebrow fade. L1–L2. */
export const metaFade = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.8, ease: EASE.calm } },
};

export const viewportOnce = { once: true, margin: '-12% 0px -12% 0px' } as const;

/** True when the pointer is a fine pointer (mouse) — gates cursor-driven work. */
export const finePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** True when the visitor has asked for reduced motion. */
export const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
