import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { SectionHead, Title } from '@/components/ui/parts';
import { statement } from '@/lib/content/site';
import { EASE } from '@/lib/motion/variants';

/**
 * The statement — the first half of the home page's problem band.
 *
 * A claim, then the chain of causes that makes it true. The chain lights up in
 * sequence as the section crosses the viewport — scrubbed, not triggered, so
 * the reader controls the pace by scrolling and it reverses cleanly on the way
 * back up.
 *
 * **The vertical padding is asymmetric on purpose.** This and `Baggage` are one
 * argument rendered as two sections, and both used to carry the landing page's
 * full `py-24 md:py-32 lg:py-40` — so the page paid 320px of empty field for a
 * seam that has nothing to say. The top pad stays (it separates the band from
 * the partner row); the bottom pad drops to the house gap between a heading and
 * the block under it, and `Baggage` opens with no top pad at all. Measured, that
 * is 224px off the front door for no loss of content.
 */
export function Statement() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.4'],
  });

  return (
    <section ref={ref} id="shift" className="relative bg-paper">
      <div className="shell pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-24">
        <SectionHead index={statement.index} label={statement.label} />

        <Title
          lines={statement.lines}
          className="t-section mt-12 max-md:max-w-[18ch] text-ink md:mt-16"
        />

        <p className="t-lede mt-10 max-w-text text-ink/60">{statement.note}</p>

        <Chain progress={scrollYProgress} />
      </div>
    </section>
  );
}

function Chain({ progress }: { progress: MotionValue<number> }) {
  const items = statement.chain;
  return (
    <ol className="mt-16 grid gap-px border-t border-[var(--line)] md:mt-20 md:grid-cols-5">
      {items.map((item, i) => (
        <ChainItem
          key={item}
          item={item}
          index={i}
          total={items.length}
          progress={progress}
        />
      ))}
    </ol>
  );
}

function ChainItem({
  item,
  index,
  total,
  progress,
}: {
  item: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each item owns a slice of the scrub. The last one holds once lit.
  const start = index / (total + 0.6);
  const end = start + 1 / (total + 0.6);

  const opacity = useTransform(progress, [start, end], [0.28, 1]);
  const y = useTransform(progress, [start, end], [10, 0]);
  const barScale = useTransform(progress, [start, end], [0, 1]);

  const isLast = index === total - 1;

  return (
    <li className="relative border-b border-[var(--line)] py-7 md:border-b-0 md:border-r md:px-6 md:py-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
      <motion.div style={{ opacity, y }} className="flex items-baseline gap-3">
        <span className="font-mono text-meta text-signal">{String(index + 1).padStart(2, '0')}</span>
        <span
          className={`font-display text-[clamp(1rem,1.5vw,1.25rem)] font-medium uppercase leading-tight tracking-[-0.01em] ${
            isLast ? 'text-protect' : 'text-ink'
          }`}
        >
          {item}
        </span>
      </motion.div>
      <motion.span
        aria-hidden="true"
        style={{ scaleX: barScale }}
        className={`mt-5 block h-px w-full origin-left ${isLast ? 'bg-protect' : 'bg-signal'}`}
      />
      {index < total - 1 && (
        <span
          aria-hidden="true"
          className="absolute -right-2 top-1/2 hidden -translate-y-1/2 font-mono text-[11px] text-hush md:block"
          style={{ transition: `opacity .4s ${EASE.calm}` }}
        >
          ↓
        </span>
      )}
    </li>
  );
}
