import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { SectionHead, Title } from '@/components/ui/parts';
import { features } from '@/lib/content/site';
import { EASE } from '@/lib/motion/variants';
import { useCursorState } from '@/components/cursor/Cursor';
import { CollapseVisual, MatrixVisual, NodesVisual, ZonesVisual } from './visuals';

type Item = (typeof features.items)[number];

/**
 * The four decisions.
 *
 * Four full-width editorial movements rather than four cards. Each one gets its
 * own entrance — a rise, a wipe, a bloom, an iris — so scrolling the section
 * feels like passing four different machines instead of reading a grid.
 *
 * The last one is coral. That is the only place in the site where the accent
 * means something other than "signal", and it is deliberate: the colour is the
 * policy.
 */
export function Features({ index = features.index, head = true }: { index?: string; head?: boolean }) {
  return (
    <section id="features" data-tone="teal" className="relative bg-signal text-ink">
      {head && (
        <div className="shell relative pb-8 pt-24 md:pt-32 lg:pt-40">
          <SectionHead index={index} label={features.label} chip="Per request" chipTone="idle" />
          <Title
            lines={features.heading.split('\n')}
            className="t-section mt-12 max-md:max-w-[16ch] text-ink"
          />
        </div>
      )}

      {features.items.map((item, i) => (
        <FeatureBand key={item.key} item={item} index={i} />
      ))}
    </section>
  );
}

/* ── entrances ────────────────────────────────────────────────────────── */

/**
 * Four distinct entrances, keyed off the item's index. Each animates a
 * different property so the rhythm of the section changes as you scroll it —
 * `opacity` alone would make all four feel like the same reveal.
 */
const entrance: Record<number, { copy: Variants; visual: Variants }> = {
  // 01 · rise — everything lifts into place.
  0: {
    copy: {
      hidden: { opacity: 0, y: 26 },
      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE.calm, staggerChildren: 0.07 } },
    },
    visual: {
      hidden: { opacity: 0, y: 34 },
      show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE.calm, delay: 0.12 } },
    },
  },
  // 02 · wipe — copy enters from the left, visual from the right.
  1: {
    copy: {
      hidden: { opacity: 0, x: -30 },
      show: { opacity: 1, x: 0, transition: { duration: 0.85, ease: EASE.calm, staggerChildren: 0.07 } },
    },
    visual: {
      hidden: { opacity: 0, x: 34 },
      show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE.calm, delay: 0.12 } },
    },
  },
  // 03 · bloom — scale from the centre, no translation.
  2: {
    copy: {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.7, ease: EASE.calm, staggerChildren: 0.07 } },
    },
    visual: {
      hidden: { opacity: 0, scale: 0.94 },
      show: { opacity: 1, scale: 1, transition: { duration: 1.0, ease: EASE.calm, delay: 0.15 } },
    },
  },
  // 04 · iris — the visual opens top-down, the copy sits still.
  3: {
    copy: {
      hidden: { opacity: 0, y: 14 },
      show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE.calm, staggerChildren: 0.07 } },
    },
    visual: {
      hidden: { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' },
      show: {
        opacity: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        transition: { duration: 1.0, ease: EASE.precise, delay: 0.1 },
      },
    },
  },
};

const line: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE.calm } },
};

function FeatureBand({ item, index }: { item: Item; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-18% 0px -18% 0px' });
  const cursor = useCursorState('target', item.name);

  const isProtected = 'protected' in item && item.protected;
  const flip = index % 2 === 1;
  const motionSet = entrance[index] ?? entrance[0];

  return (
    <div
      ref={ref}
      className={`relative border-t border-[var(--line)] ${index % 2 === 1 ? 'bg-wash' : ''}`}
    >
      {isProtected && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-px bg-protect/50"
        />
      )}
      <div className="shell py-16 md:py-24 lg:py-28">
        <motion.div
          variants={motionSet.copy}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className={`grid gap-x-16 gap-y-10 lg:grid-cols-2 lg:items-center ${
            flip ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          {/* Copy column */}
          <div>
            <motion.div variants={line} className="flex items-center gap-4">
              <span
                className={`font-mono text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-none tracking-[-0.03em] ${
                  isProtected ? 'text-protect' : 'text-signal'
                }`}
              >
                {item.numeral}
              </span>
              <span className="h-px flex-1 bg-[var(--line)]" />
              <span className="font-mono text-meta uppercase text-hush">
                {isProtected ? 'policy' : 'capability'}
              </span>
            </motion.div>

            <motion.h3
              variants={line}
              className={`mt-6 font-display text-[clamp(2rem,4.6vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.035em] ${
                isProtected ? 'text-protect' : 'text-ink'
              }`}
            >
              {item.name}
            </motion.h3>

            <motion.p
              variants={line}
              className="mt-5 max-w-[24ch] font-display text-[clamp(1.1rem,1.9vw,1.5rem)] font-medium leading-tight tracking-[-0.02em] text-ink/85"
            >
              {item.line}
            </motion.p>

            <motion.p variants={line} className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-ink/60">
              {item.body}
            </motion.p>

            <motion.dl
              variants={line}
              className={`mt-9 grid max-w-[38rem] gap-px border-t sm:grid-cols-2 ${
                isProtected ? 'border-protect/25' : 'border-[var(--line)]'
              }`}
            >
              {item.facts.map((f) => (
                <div
                  key={f.label}
                  className={`border-b py-4 sm:border-b-0 sm:border-r sm:pr-6 sm:last:border-r-0 ${
                    isProtected ? 'border-protect/20' : 'border-[var(--line)]'
                  }`}
                >
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-hush">{f.label}</dt>
                  <dd
                    className={`mt-2 font-mono text-[12.5px] ${isProtected ? 'text-protect' : 'text-ink/90'}`}
                  >
                    {f.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Visual column */}
          <motion.div variants={motionSet.visual} {...(index === 3 ? { style: { willChange: 'clip-path' } } : {})}>
            <div {...cursor}>
              <Visual kind={item.visual} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function Visual({ kind }: { kind: Item['visual'] }) {
  switch (kind) {
    case 'matrix':
      return <MatrixVisual />;
    case 'collapse':
      return <CollapseVisual />;
    case 'nodes':
      return <NodesVisual />;
    case 'zones':
      return <ZonesVisual />;
  }
}
