import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE, DUR, viewportOnce } from '@/lib/motion/variants';

/** Standard scroll reveal — the L2 layer. Small travel, once, no repeat. */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'header';
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: DUR.reveal, ease: EASE.calm, delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Staggered group — children each use <RevealItem>. */
export function RevealGroup({
  children,
  className = '',
  stagger = 0.07,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: 'div' | 'ul' | 'section' | 'ol';
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={viewportOnce}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className = '',
  as = 'div',
  y = 18,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: 'div' | 'li' | 'article';
  y?: number;
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      id={id}
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        shown: { opacity: 1, y: 0, transition: { duration: DUR.reveal, ease: EASE.calm } },
      }}
    >
      {children}
    </MotionTag>
  );
}
