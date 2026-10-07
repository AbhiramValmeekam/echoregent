import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHead, Title, Lead } from '@/components/ui/parts';
import { Counter } from '@/components/motion/Counter';
import { problem } from '@/lib/content/site';
import { EASE } from '@/lib/motion/variants';

const MAX = problem.collapse[0].tokens;

/**
 * The problem.
 *
 * One visual carries the section: the same conversation, measured at each
 * stage, collapsing from 18,679 tokens to 259. The bars are proportional to
 * the real figures, so the picture is the data rather than a decoration of it.
 */
export function Baggage() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });

  return (
    <section id="problem" className="relative bg-paper">
      <div className="shell py-24 md:py-32 lg:py-40">
        <SectionHead index={problem.index} label={problem.label} chip="Measured on LoCoMo" />
        {/* The heading spans the shell rather than sitting in a grid column:
            at `t-section` scale "EVERY CONVERSATION" is wider than half the
            shell, and a masked line that does not fit is clipped, not wrapped. */}
        <Title
          lines={['EVERY CONVERSATION', 'CARRIES BAGGAGE.']}
          className="t-section mt-12 text-ink"
        />
        <span className="sr-only">{problem.heading}</span>

        <div className="mt-14 grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
          <div>
            <Lead>{problem.body}</Lead>
            <p className="mt-6 font-display text-[clamp(1.25rem,2vw,1.75rem)] font-medium leading-tight tracking-[-0.02em] text-signal">
              {problem.support}
            </p>
          </div>

          <div ref={ref}>
            <div className="rule-soft" />
            <ol>
              {problem.collapse.map((row, i) => {
                const pct = (row.tokens / MAX) * 100;
                const isLast = i === problem.collapse.length - 1;
                return (
                  <li key={row.note} className="border-b border-[var(--line-soft)] py-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <span
                        className={`font-mono text-meta uppercase ${isLast ? 'text-signal' : 'text-muted'}`}
                      >
                        {row.note}
                      </span>
                      <span
                        className={`tnum font-mono text-[clamp(1.05rem,1.8vw,1.5rem)] ${
                          isLast ? 'text-signal' : 'text-ink/80'
                        }`}
                      >
                        <Counter to={row.tokens} grouped duration={1.2 + i * 0.12} />
                      </span>
                    </div>
                    <div className="mt-3 h-[3px] w-full bg-ink/[0.09]">
                      <motion.span
                        className={`block h-full origin-left ${isLast ? 'bg-signal' : 'bg-ink/35'}`}
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: pct / 100 } : { scaleX: 0 }}
                        transition={{ duration: 1.05, ease: EASE.calm, delay: 0.1 + i * 0.13 }}
                      />
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-hush">
              {problem.collapseSource}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
