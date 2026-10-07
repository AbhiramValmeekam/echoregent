import { useEffect, useRef, useState } from 'react';
import { prefersReduced } from '@/lib/motion/variants';

/**
 * A telemetry counter. Counts up once on entry, then holds.
 *
 * Uses tabular figures so the digits do not reflow as they change, and renders
 * the final value immediately under reduced motion — the number is the point,
 * the animation is not.
 */
export function Counter({
  to,
  decimals = 0,
  duration = 1.5,
  className = '',
  prefix = '',
  suffix = '',
  /** Separate thousands with commas (18,679 rather than 18679). */
  grouped = false,
}: {
  to: number;
  decimals?: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  grouped?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(() => (prefersReduced() ? to : 0));

  useEffect(() => {
    if (prefersReduced()) {
      setValue(to);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let started = false;

    const run = () => {
      const t0 = performance.now();
      const total = duration * 1000;
      const step = () => {
        const t = Math.min(1, (performance.now() - t0) / total);
        // easeOutExpo — fast arrival, soft settle. Matches the site's easing.
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        setValue(to * eased);
        if (t < 1) raf = requestAnimationFrame(step);
        else setValue(to);
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [to, duration]);

  const text = grouped
    ? value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : value.toFixed(decimals);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
