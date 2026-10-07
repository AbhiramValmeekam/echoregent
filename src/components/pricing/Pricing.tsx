import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { pricing } from '@/lib/content/pricing';
import { mail, SUBJECTS } from '@/lib/content/site';
import { EASE } from '@/lib/motion/variants';

/**
 * The four tiers, as a spec sheet.
 *
 * Laid out horizontally rather than as four cards: no boxes, no "most popular"
 * badge. The live site publishes real prices, so the price is the largest thing
 * in each column — but nothing is purchasable yet, so the qualifier travels with
 * the section and only the free tier has a live action. A "Start" button that
 * leads to a 404 is worse than a label saying so.
 *
 * Below `md` each tier becomes one row rather than a stacked card. A column of
 * four cards is the generic-SaaS pattern the brief rules out; a table is not.
 *
 * **This file used to export a `Pricing` section as well**, which wrapped
 * `TierSpecs` in the landing page's band and carried its own heading, its own
 * `id="pricing"` and its own notes list. Home no longer renders it — `/pricing`
 * owns that copy now — and a second copy of a price table is how a price table
 * starts disagreeing with itself. `TierSpecs` is the whole export.
 */

export function TierSpecs() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });

  return (
    <div
      ref={ref}
      className="grid border-t border-[var(--line)] md:grid-cols-4 md:divide-x md:divide-[var(--line)]"
    >
      {pricing.tiers.map((tier, i) => (
        <motion.div
          key={tier.id}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE.calm, delay: i * 0.08 }}
          className="group relative flex flex-col border-b border-[var(--line)] py-7 md:border-b-0 md:px-6 md:py-9 md:first:pl-0 md:last:pr-0"
        >
          {/* The rule that grows on hover — the only affordance, since a tier
              cannot be selected. */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-[-1px] h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-500 ease-calm group-hover:scale-x-100 md:w-[calc(100%-3rem)]"
          />

          <h3 className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink">{tier.name}</h3>

          <p className="tnum mt-6 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold leading-none tracking-[-0.04em] text-ink">
            {tier.price}
          </p>
          <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-hush">{tier.billing}</p>

          <p className="tnum mt-7 border-t border-[var(--line-soft)] pt-5 font-mono text-[13px] text-ink/85">
            {tier.allowance}
            <span className="text-ink/70"> {tier.unit}</span>
          </p>

          <ul className="mt-5 space-y-2">
            {tier.features.map((f) => (
              <li key={f} className="flex gap-3 text-[13.5px] leading-snug text-ink/70">
                <span aria-hidden="true" className="mt-[7px] h-px w-2.5 shrink-0 bg-ink/25" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-[13.5px] leading-relaxed text-ink/70">{tier.note}</p>

          {/* The tier's action, pushed to the foot of the column so all four sit
              on the same line whatever their copy length. */}
          <div className="mt-7 md:mt-auto md:pt-7">
            {tier.cta.action === 'waitlist' ? (
              <a href={mail(SUBJECTS.waitlist)} className="btn-ghost w-full justify-center">
                {tier.cta.label}
                <span aria-hidden="true">→</span>
              </a>
            ) : (
              <span
                className="flex w-full items-center justify-center gap-2 border border-[var(--line)] px-5 py-3 font-mono text-meta uppercase text-hush"
                title="Not purchasable yet"
              >
                <span className="chip-dot chip-dot--idle" aria-hidden="true" />
                {tier.cta.label}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
