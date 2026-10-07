import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Counter } from '@/components/motion/Counter';
import { Kind } from '@/components/ui/Kind';
import { benchmark } from '@/lib/content/benchmark';
import { EASE } from '@/lib/motion/variants';

/**
 * The four headline figures.
 *
 * The live home page sets these directly under the hero as a band of four
 * counters. Carried over — with two changes, both of them about not letting a
 * number travel without its provenance:
 *
 *  · Each tile renders its `scope` and its `source`, so "64.7%" cannot be read
 *    as a LoCoMo result when it comes from the load test.
 *  · The values are the precise ones from benchmark.figures, not the live
 *    hero's rounded 26× / 65%. The live site shows both roundings on different
 *    pages; there is one value per claim here, and the benchmark section reads
 *    from the same array.
 *
 * The caveats are not rendered at this size — four paragraphs under a hero is
 * an essay. They are one scroll away, in the section that owns them, and every
 * tile links there.
 */
export function HeroStats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px -12% 0px' });

  return (
    <section aria-label="Headline figures" className="relative border-t border-[var(--line)] bg-paper">
      <div className="shell py-14 md:py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 className="font-mono text-meta uppercase text-muted">By the numbers</h2>
          {/* Plain `/research`: this pointed at `/research#benchmarks` while the
              evidence sections had anchors, and the anchors are gone. It is the
              last hash-carrying internal link the source had. */}
          <Link
            to="/research"
            className="link-underline font-mono text-meta uppercase text-ink/70 transition-colors duration-300 hover:text-ink"
          >
            Method, scope and limits →
          </Link>
        </div>

        <div
          ref={ref}
          className="mt-8 grid grid-cols-1 gap-px border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4"
        >
          {benchmark.figures.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE.calm, delay: i * 0.1 }}
              className="border-b border-[var(--line)] py-7 sm:pr-6 lg:border-b-0 lg:border-r lg:pl-6 lg:first:pl-0 lg:last:border-r-0"
            >
              <div className="flex items-baseline gap-3 whitespace-nowrap">
                <span
                  className={`t-readout whitespace-nowrap text-ink ${
                    !f.count && String(f.value).length > 6 ? 'text-[clamp(1.75rem,4.2vw,3.5rem)]' : ''
                  }`}
                >
                  {f.count ? (
                    <Counter
                      to={f.count.to}
                      decimals={'decimals' in f.count ? f.count.decimals : 0}
                      prefix={'prefix' in f.count ? f.count.prefix : undefined}
                      suffix={'suffix' in f.count ? f.count.suffix : undefined}
                    />
                  ) : (
                    f.value
                  )}
                </span>
                <Kind kind={f.provenance.kind} />
              </div>

              <p className="mt-4 text-[15px] leading-snug text-ink/85">{f.label}</p>
              <p className="mt-2.5 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.1em] text-hush">
                {f.scope}
              </p>
              <p className="mt-2 font-mono text-[10.5px] leading-relaxed tracking-[0.06em] text-hush">
                {f.provenance.source}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 max-w-[80ch] text-[13px] leading-relaxed text-ink/70">
          Four figures from three different tests. The ratio is arithmetic on a figure mem0 published;
          the reduction comes from a load test, not from the benchmark the ratio uses. Each one is
          labelled with the run it belongs to.
        </p>
      </div>
    </section>
  );
}
