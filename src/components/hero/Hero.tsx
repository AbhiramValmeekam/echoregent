import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ContextFlow, FLOW_GATES } from '@/components/hero/ContextFlow';
import { Scramble } from '@/components/motion/Scramble';
import { Magnetic } from '@/components/motion/Magnetic';
import { hero, site } from '@/lib/content/site';
import { EASE, prefersReduced } from '@/lib/motion/variants';

/**
 * Hero.
 *
 * Arkadhi's hero is a dissolving particle nameplate — its signature. This one
 * deliberately does not repeat that: the wordmark is set as type, and the
 * signature is the Context Flow band beneath it, which shows the product's
 * whole argument before a single word of body copy.
 */
export function Hero() {
  const [entered, setEntered] = useState(false);
  const bandRef = useRef<HTMLDivElement | null>(null);

  // Kick the entrance once, after paint, so the masks are measurable.
  useEffect(() => {
    if (prefersReduced()) {
      setEntered(true);
      return;
    }
    const t = window.setTimeout(() => setEntered(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  const reduced = prefersReduced();

  /**
   * Under `prefers-reduced-motion` the headline is already at its final
   * position on the first paint — no slide, no stagger, no delay. Every other
   * heading on the site gets this from `<Title>`, which calls `gsap.set`
   * instead of animating; the hero's entrance is bespoke, so it has to say so
   * itself. Without this the headline still travelled for a second and a half
   * for a reader who asked it not to.
   */
  const enter = (delay: number) =>
    reduced
      ? { initial: { y: '0%' }, animate: { y: '0%' }, transition: { duration: 0 } }
      : {
          initial: { y: '108%' },
          animate: { y: entered ? '0%' : '108%' },
          transition: { duration: 1.15, ease: EASE.calm, delay },
        };

  const actions: { label: string; variant: string; href?: string; to?: string }[] = [
    { ...hero.primary, variant: 'btn' },
    { ...hero.secondary, variant: 'btn-ghost' },
  ];

  return (
    <section
      id="top"
      ref={bandRef}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-7 pt-24 md:pt-28"
    >
      {/* A single soft teal wash behind the headline — the only gradient on the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-10%] top-[8%] h-[520px] w-[520px] rounded-full opacity-[0.16] blur-[120px]"
        style={{ background: 'radial-gradient(circle, #14999C 0%, transparent 70%)' }}
      />

      <div className="shell relative flex flex-1 flex-col justify-center">
        <p className="flex items-center gap-3 font-mono text-meta uppercase tracking-[0.3em] text-muted">
          <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-signal" />
          <Scramble text={hero.eyebrow} duration={0.9} />
          <span className="text-ink/70">/</span>
          <span className="text-ink/70">{hero.index}</span>
        </p>

        {/* `t-hero` sits on the h1 rather than an inner span so that the display
            size is the h1's own — a `ch`-based max-width on the h1 would
            otherwise resolve against 16px and crush the headline into its own
            clip box. */}
        {/* `data-route-heading` is what focus lands on after a route change —
            see lib/motion/useRouteScroll.ts. The landing page sets it here
            rather than through <Title>, because its headline is a bespoke
            stagger rather than the shared mask component. */}
        <h1 className="t-hero mt-7 max-w-[92rem] text-ink" tabIndex={-1} data-route-heading style={{ outline: 'none' }}>
          <span className="sr-only">{hero.headline}</span>
          <span aria-hidden="true" className="block">
            {hero.lines.map((line, i) => (
              <span key={line} className="line-mask pb-[0.06em]">
                <motion.span className="block" {...enter(0.18 + i * 0.11)}>
                  {line}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.p
          className="mt-7 max-w-[60ch] text-[clamp(1.0625rem,1.45vw,1.25rem)] leading-[1.6] text-ink/70"
          initial={{ clipPath: reduced ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' }}
          animate={
            reduced || entered ? { clipPath: 'inset(0 0 0% 0)' } : { clipPath: 'inset(0 0 100% 0)' }
          }
          transition={{ duration: reduced ? 0 : 1.0, ease: EASE.calm, delay: reduced ? 0 : 0.62 }}
        >
          {hero.lede}
        </motion.p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          {/* The primary action is a mailto and the secondary is a route, so
              they are typed as one shape with one of the two destinations set
              — the map below stays a single list either way. */}
          {actions.map((c, i) => (
            <motion.span
              key={c.label}
              initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 16 }}
              animate={entered ? { opacity: 1, y: 0 } : reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: reduced ? 0 : 0.8, ease: EASE.calm, delay: reduced ? 0 : 0.74 + i * 0.09 }}
            >
              <Magnetic>
                {c.to ? (
                  <Link to={c.to} className={c.variant}>
                    {c.label} <span aria-hidden="true">→</span>
                  </Link>
                ) : (
                  <a href={c.href} className={c.variant}>
                    {c.label} <span aria-hidden="true">→</span>
                  </a>
                )}
              </Magnetic>
            </motion.span>
          ))}
        </div>
      </div>

      {/* ── Context Flow band ─────────────────────────────────────────── */}
      <motion.div
        className="relative mt-11"
        initial={{ opacity: reduced ? 1 : 0 }}
        animate={entered || reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: reduced ? 0 : 1.2, ease: EASE.calm, delay: reduced ? 0 : 0.5 }}
      >
        <div className="shell">
          <div className="rule-soft" />
          <div className="relative h-[158px] md:h-[184px]">
            <ContextFlow />
            {/* Gate labels live in the DOM, not the canvas — crisp text, and
                the pipeline is readable without seeing the animation at all. */}
            <ul className="pointer-events-none absolute inset-0" aria-hidden="true">
              {FLOW_GATES.map((g) => (
                <li
                  key={g.key}
                  className="absolute bottom-0 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.18em] text-hush"
                  style={{ left: `${g.at * 100}%` }}
                >
                  {g.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="rule-soft" />

          <div className="mt-6 flex flex-wrap items-center justify-between gap-x-10 gap-y-4">
            <dl className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {hero.readouts.map((r) => (
                <div key={r.label} className="flex items-baseline gap-2.5">
                  <dt className="font-mono text-meta uppercase text-hush">{r.label}</dt>
                  <dd className="font-mono text-[12px] text-ink/85">{r.value}</dd>
                </div>
              ))}
            </dl>
            <p className="font-mono text-meta uppercase text-hush">
              {site.byline}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
