import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Title } from '@/components/ui/parts';
import { Field } from '@/components/motion/Field';
import { closing } from '@/lib/content/site';
import { EASE } from '@/lib/motion/variants';

/**
 * The close.
 *
 * The only place the field appears at full bleed. It is the same node system
 * that runs behind the hero, on the same dark ground — the page ends where it
 * started, which is the point of a single-page architecture.
 */
export function Closing() {
  // The trigger is the section, not any one child: the heading reveals on its
  // own observer, so anchoring the rest to the opening paragraph made the body
  // and the buttons arrive a beat after the line they belong to.
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' });

  return (
    <section ref={ref} id="closing" className="relative overflow-hidden bg-ink">
      <div aria-hidden="true" className="tech-grid-dark pointer-events-none absolute inset-0 opacity-60" />
      <Field density={34} opacity={0.5} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent"
      />

      <span aria-hidden="true" className="absolute left-1/2 top-10 h-2 w-2 -translate-x-1/2 rounded-full bg-protect" />
      <div className="shell relative py-28 text-center md:py-36 lg:py-44">
        <span className="font-mono text-meta uppercase text-white/45">
          {closing.index} · next
        </span>

        <Title
          lines={closing.lines}
          className="t-hero mx-auto mt-8 max-md:max-w-[16ch] text-paper"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE.calm, delay: 0.2 }}
          className="mx-auto mt-8 max-w-[40ch] font-display text-[clamp(1.1rem,2vw,1.5rem)] font-medium leading-snug tracking-[-0.02em] text-paper/70"
        >
          {closing.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE.calm, delay: 0.32 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a href={closing.primary.href} className="btn bg-paper text-ink hover:bg-signal hover:text-ink">
            {closing.primary.label}
            <span aria-hidden="true">→</span>
          </a>
          <Link to={closing.secondary.to} className="btn-dark">
            {closing.secondary.label}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
