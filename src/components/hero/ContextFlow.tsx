import { useEffect, useRef } from 'react';
import { finePointer, prefersReduced } from '@/lib/motion/variants';

/**
 * Context Flow — the site's signature visual.
 *
 * A stream of context travelling left to right through the pipeline. Each
 * particle carries a signal value. At the compress gate the low-signal
 * particles are culled; protected particles are marked and pass through
 * untouched; what survives reaches the model edge as a brighter, sparser
 * stream. The metaphor is the product: the same context, minus the noise.
 *
 * The pointer disturbs the field locally, so the system reads as live rather
 * than as a looping video. Under prefers-reduced-motion it composes a single
 * static frame — the same picture, drawn once.
 *
 * Everything here is decorative. The stages are labelled in the DOM overlay,
 * and the hero carries the same information as text.
 */

/** Gate positions as a fraction of width. Mirrors the pipeline in content. */
export const FLOW_GATES = [
  { key: 'input', at: 0.02, label: 'Raw context' },
  { key: 'classify', at: 0.24, label: 'Classify' },
  { key: 'compress', at: 0.44, label: 'Compress' },
  { key: 'cache', at: 0.62, label: 'Cache' },
  { key: 'protect', at: 0.78, label: 'Protect' },
  { key: 'model', at: 0.98, label: 'Model' },
] as const;

const COMPRESS_AT = 0.44;
const PROTECT_AT = 0.78;

/**
 * Canvas colours.
 *
 * The field is paper now, so the stream is navy rather than white — a white
 * particle on white is nothing at all. Teal still marks a survivor and coral
 * still marks a protected one, so the two readings the diagram depends on are
 * unchanged.
 */
const C = {
  ink: '11,31,60',
  signal: '20,153,156',
  protect: '252,122,92',
};

interface Particle {
  x: number;
  y: number;
  vy: number;
  /** 0–1. Below the cull threshold, this particle is noise. */
  signal: number;
  /** Coral, and exempt from compression. */
  protectedP: boolean;
  /** 1 → fully drawn. Fades to 0 as the particle is culled or delivered. */
  alpha: number;
  culled: boolean;
  size: number;
}

export function ContextFlow({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = prefersReduced();
    const interactive = finePointer() && !reduced;

    let raf = 0;
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let running = true;

    // Pointer state, in canvas space.
    const pointer = { x: -9999, y: -9999, active: false };

    const cullThreshold = 0.42;

    const spawn = (atStart = false): Particle => {
      const isProtected = Math.random() < 0.07;
      const signal = isProtected ? 1 : Math.random();
      return {
        x: atStart ? Math.random() * w : -10 - Math.random() * 40,
        y: Math.random() * h,
        vy: (Math.random() - 0.5) * 0.22,
        signal,
        protectedP: isProtected,
        alpha: 0,
        culled: false,
        // Slightly larger than the dark-field original: a navy dot at this
        // radius on white reads lighter than a white dot did on navy, so the
        // stream needs the extra weight to hold the same presence.
        size: signal > 0.7 ? 1.9 : 1.35,
      };
    };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density keyed to area, capped so the frame budget holds on laptops.
      const count = w < 560 ? 90 : w < 1100 ? 190 : 300;
      particles = Array.from({ length: count }, () => {
        const p = spawn(true);
        // Start mid-flight so the first frame is already a populated stream.
        p.x = Math.random() * w;
        p.alpha = 1;
        if (p.signal < cullThreshold && !p.protectedP && p.x > COMPRESS_AT * w) p.culled = true;
        return p;
      });
    };

    const drawGate = (xf: number) => {
      const x = xf * w;
      ctx.strokeStyle = `rgba(${C.ink},0.15)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    };

    /**
     * One frame. `t` advances motion only when animating; the static frame
     * passes t = 0 so the composition is identical, just frozen.
     */
    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, w, h);

      FLOW_GATES.forEach((g) => drawGate(g.at));

      const speed = w < 560 ? 1.5 : 1.15;

      for (const p of particles) {
        if (animate) {
          // Travel, faster once it has survived compression — the stream
          // visibly thins and quickens on the far side of the gate.
          const past = p.x > COMPRESS_AT * w;
          p.x += (past ? speed * 1.5 : speed) * (0.6 + p.signal * 0.8);
          p.y += p.vy;
          if (p.y < 0 || p.y > h) p.vy *= -1;

          // Cull at the compress gate.
          if (!p.culled && !p.protectedP && p.signal < cullThreshold && p.x > COMPRESS_AT * w) {
            p.culled = true;
          }

          // Pointer disturbance — particles near the cursor are pushed away.
          if (pointer.active) {
            const dx = p.x - pointer.x;
            const dy = p.y - pointer.y;
            const d2 = dx * dx + dy * dy;
            const R = 130;
            if (d2 < R * R && d2 > 0.01) {
              const d = Math.sqrt(d2);
              const force = (1 - d / R) * 2.4;
              p.x += (dx / d) * force;
              p.y += (dy / d) * force;
            }
          }

          if (p.culled) {
            p.alpha -= 0.035;
            if (p.alpha <= 0) {
              Object.assign(p, spawn());
            }
          } else if (p.x > w + 12) {
            Object.assign(p, spawn());
          } else if (p.alpha < 1) {
            p.alpha = Math.min(1, p.alpha + 0.04);
          }
        }

        if (p.alpha <= 0) continue;

        // Colour: protected carry coral, survivors carry teal, noise is navy.
        let fill: string;
        if (p.protectedP) fill = `rgba(${C.protect},${0.9 * p.alpha})`;
        else if (p.culled) fill = `rgba(${C.ink},${0.22 * p.alpha})`;
        else if (p.signal > 0.7) fill = `rgba(${C.signal},${0.95 * p.alpha})`;
        else fill = `rgba(${C.ink},${0.58 * p.alpha})`;

        ctx.beginPath();
        // Survivors grow slightly past the protect gate — the signal coheres.
        const r = p.x > PROTECT_AT * w && !p.culled ? p.size * 1.25 : p.size;
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();
      }

      if (animate && running) raf = requestAnimationFrame(() => draw(true));
    };

    build();
    draw(!reduced);

    // Only run while the hero is on screen.
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        const wasRunning = running;
        running = visible && !reduced;
        if (running && !wasRunning) raf = requestAnimationFrame(() => draw(true));
        if (!running) cancelAnimationFrame(raf);
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);

    const onMove = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    if (interactive) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerleave', onLeave);
    }

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        if (reduced) draw(false);
      }, 180);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`h-full w-full ${className}`}
      style={{ display: 'block' }}
    />
  );
}
