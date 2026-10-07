import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE, viewportOnce } from '@/lib/motion/variants';

/**
 * The signature reveal: text wiped in behind a clip-path edge.
 *
 * Deliberately not a fade — mid-wipe the glyphs are cut through the middle of
 * a letter, which is what gives the reveal its sense of something physical
 * being drawn across the page.
 */
export function MaskWipe({
  children,
  delay = 0,
  duration = 1.15,
  dir = 'right',
  className,
  play,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  /** Direction the wipe edge travels. */
  dir?: 'right' | 'left' | 'up' | 'down';
  className?: string;
  /** Force the state instead of using viewport detection (for pinned scenes). */
  play?: boolean;
}) {
  const shut = {
    right: 'inset(0 100% 0 0)',
    left: 'inset(0 0 0 100%)',
    up: 'inset(100% 0 0 0)',
    down: 'inset(0 0 100% 0)',
  }[dir];
  const open = 'inset(0 0 0 0)';

  /**
   * Both ends of the wipe are named, rather than animating to a bare target.
   * Framer resolves a lone target by asking the element for its current
   * clip-path; when it can't — a fast scroll can catch the wipe mid-flight —
   * it hands its interpolator a null origin, and mixing null into a clip-path
   * throws inside framer itself. Naming both ends leaves nothing to resolve.
   * Applies to any future animation of a *complex string* CSS value.
   */
  const wipe = { clipPath: [shut, open] };
  const unwind = { clipPath: [open, shut] };

  const transition = { duration, ease: EASE.calm, delay };

  return (
    <motion.div
      className={className}
      style={{ willChange: 'clip-path' }}
      initial={{ clipPath: shut }}
      {...(play === undefined
        ? { whileInView: wipe, viewport: viewportOnce }
        : { animate: play ? wipe : unwind })}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

/** Several lines, each climbing out of its own mask, slightly apart. */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.11,
  duration = 1.15,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName ?? ''}`}
            initial={{ y: '105%' }}
            whileInView={{ y: '0%' }}
            viewport={viewportOnce}
            transition={{ duration, ease: EASE.calm, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
