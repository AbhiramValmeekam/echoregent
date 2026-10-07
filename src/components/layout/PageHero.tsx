import type { ReactNode } from 'react';
import { Title } from '@/components/ui/parts';

/**
 * The header every routed page opens with.
 *
 * The landing page's hero is a full-height stage; an inner page needs the
 * opposite — you arrive already knowing which page you asked for, so it gets
 * the eyebrow, the headline and the lede, and then gets out of the way.
 *
 * `Title` is rendered as the h1 here, which is what makes it the focus target
 * on navigation (see lib/motion/useRouteScroll.ts).
 */
export function PageHero({
  eyebrow,
  lines,
  lede,
  meta,
  children,
  tone = 'paper',
}: {
  eyebrow: string;
  /** Authored lines — one per mask. Each must fit the shell at every width. */
  lines: readonly string[];
  lede?: string;
  /** Optional key/value strip under the lede. */
  meta?: readonly { label: string; value: string }[];
  children?: ReactNode;
  tone?: 'paper' | 'ink';
}) {
  void tone;

  return (
    <section data-auto="1" className="relative overflow-hidden bg-paper text-ink">

      <div className="shell relative pb-16 pt-[132px] md:pb-20 md:pt-[168px] lg:pt-[188px]">
        <p
          className="hero-in flex items-center gap-3 font-mono text-meta uppercase tracking-[0.3em] text-ink"
          style={{ animationDelay: '0.05s' }}
        >
          <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-protect" />
          {eyebrow}
        </p>

        <Title as="h1" lines={lines} delay={0.1} className="t-section mt-6 text-ink" />

        {lede && (
          <p className="t-lede hero-in mt-7 max-w-text text-ink" style={{ animationDelay: '0.55s' }}>
            {lede}
          </p>
        )}

        {meta && meta.length > 0 && (
          <dl
            className="hero-in mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-muted/50 pt-6"
            style={{ animationDelay: '0.75s' }}
          >
            {meta.map((m) => (
              <div key={m.label} className="flex items-baseline gap-2.5">
                <dt className="font-mono text-meta uppercase text-signal">{m.label}</dt>
                <dd className="font-mono text-[12px] text-ink">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {children}
      </div>
    </section>
  );
}
