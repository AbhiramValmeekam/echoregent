import { useEffect, useRef } from 'react';
import { prefersReduced } from '@/lib/motion/variants';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/+';

/**
 * Text scramble — glyphs resolve left to right through a deterministic
 * character set. Runs once on entry. This is the console's voice: a readout
 * settling, not a decoration.
 */
export function Scramble({
  text,
  className = '',
  duration = 1.1,
  delay = 0,
}: {
  text: string;
  className?: string;
  duration?: number;
  /** Seconds to wait after entering view before resolving. */
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) {
      el.textContent = text;
      return;
    }
    let raf = 0;
    let started = false;
    let timer = 0;
    const run = () => {
      const t0 = performance.now();
      const total = duration * 1000;
      const step = () => {
        const t = Math.min(1, (performance.now() - t0) / total);
        const out = Array.from(text)
          .map((c, i) => {
            if (c === ' ') return ' ';
            const local = t * (text.length + 6) - i;
            if (local >= 1) return c;
            if (local <= 0) return GLYPHS[(i * 7 + ((t * 60) | 0)) % GLYPHS.length];
            return Math.random() > 0.5 ? c : GLYPHS[(i * 13) % GLYPHS.length];
          })
          .join('');
        if (el) el.textContent = out;
        if (t < 1) raf = requestAnimationFrame(step);
        else if (el) el.textContent = text;
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started) {
          started = true;
          timer = window.setTimeout(run, delay * 1000);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, [text, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
