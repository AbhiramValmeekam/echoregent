import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion/variants';

/** Section eyebrow: "01 ──── LABEL", as on Arkadhi. */
export function Eyebrow({
  index,
  label,
  tone = 'light',
}: {
  index: string;
  label: string;
  tone?: 'light' | 'ink';
}) {
  const onNavy = tone === 'ink';
  return (
    <p className="flex items-center gap-5 font-mono text-[12px] uppercase tracking-[0.22em]">
      <span className={onNavy ? 'text-protect' : 'text-ink'}>{index}</span>
      <span aria-hidden="true" className={`h-px w-14 md:w-24 ${onNavy ? 'bg-paper/30' : 'bg-ink/40'}`} />
      <span className={onNavy ? 'text-paper/75' : 'text-ink/75'}>{label}</span>
    </p>
  );
}

/** Fade-up on entering the viewport (Arkadhi's `Yt`). */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -8% 0px' }}
      transition={{ duration: 0.9, ease: EASE.calm, delay }}
    >
      {children}
    </motion.div>
  );
}

const TONES = {
  white: 'bg-paper text-ink',
  coral: 'bg-protect text-ink',
  teal: 'bg-signal text-ink',
  gray: 'bg-signal text-ink',
  navy: 'bg-ink text-paper',
} as const;

/** A full-bleed colour block with Arkadhi's rhythm (py-20 / md:py-32). */
export function Block({
  id,
  tone,
  children,
}: {
  id?: string;
  tone: keyof typeof TONES;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`relative ${TONES[tone]}`}>
      {tone === 'navy' && (
        <div aria-hidden="true" className="tech-grid-dark pointer-events-none absolute inset-0 opacity-60" />
      )}
      <div className="shell relative py-20 md:py-32">{children}</div>
    </section>
  );
}
