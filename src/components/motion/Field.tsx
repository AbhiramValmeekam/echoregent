import { useEffect, useRef } from 'react';

/**
 * The computational field.
 *
 * A restrained node/link system — the visual equivalent of "something is being
 * investigated here." Deliberately NOT a brain, a globe, or a glowing gradient.
 * Density scales down on small screens; the whole thing stops under
 * prefers-reduced-motion and renders a single static frame.
 *
 * Tuned for the dark field: links are low-alpha white, accents carry the teal.
 */
export function Field({
  className = '',
  density,
  accentEvery = 11,
  opacity = 0.55,
  /** Invert for the ivory break field. */
  tone = 'dark',
}: {
  className?: string;
  density?: number;
  accentEvery?: number;
  opacity?: number;
  tone?: 'dark' | 'light';
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onLight = tone === 'light';
    const lineRGB = onLight ? '11,31,60' : '255,255,255';

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = density ?? (w < 520 ? 14 : w < 1100 ? 28 : 44);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.3 + 0.5,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const linkDist = w < 520 ? 88 : 126;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!reduced) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x <= 0 || a.x >= w) a.vx *= -1;
          if (a.y <= 0 || a.y >= h) a.vy *= -1;
        }
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkDist) {
            ctx.strokeStyle = `rgba(${lineRGB},${(1 - d / linkDist) * (onLight ? 0.15 : 0.14)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n, i) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        if (i % accentEvery === 0) {
          ctx.fillStyle = onLight ? 'rgba(20,153,156,0.75)' : 'rgba(20,153,156,0.85)';
        } else {
          ctx.fillStyle = onLight ? 'rgba(11,31,60,0.25)' : 'rgba(255,255,255,0.24)';
        }
        ctx.fill();
      });

      if (!reduced && running) raf = requestAnimationFrame(draw);
    };

    build();
    draw();

    // The field only appears at the foot of the page. Once it is scrolled past
    // there is no reason to keep a rAF loop alive, so it stops and restarts
    // with the canvas.
    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = !!entry?.isIntersecting;
        if (visible && !running) {
          running = true;
          if (!reduced) raf = requestAnimationFrame(draw);
        } else if (!visible && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: '160px' },
    );
    io.observe(canvas);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        if (reduced) draw();
      }, 180);
    };

    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    };
  }, [density, accentEvery, tone]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
    />
  );
}
