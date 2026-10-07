import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReduced } from '@/lib/motion/variants';

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────────────────────────────
 * Field tones. Paper leads — it is the page — and navy is spent on whole
 * sections, the way Arkadhi spends it.
 * ──────────────────────────────────────────────────────────────────────── */
const BG = {
  paper: 'bg-paper text-ink',
  ink: 'bg-ink text-paper',
} as const;

export type Tone = keyof typeof BG;

/** Full-bleed field with shell-contained content. */
export function Band({
  id,
  tone = 'paper',
  children,
  className = '',
  ariaLabel,
}: {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <section id={id} aria-label={ariaLabel} className={`${BG[tone]} relative ${className}`}>
      <div className="shell py-20 md:py-28 lg:py-36">{children}</div>
    </section>
  );
}

/**
 * Section head — the console's wayfinding mark.
 *
 * Arkadhi numbers its sections as prose ("01 — The Lab"). Here the same
 * apparatus reads as telemetry: index, hairline, label, and an optional
 * status chip on the right. The coral dot is the section's single point of
 * attention — the brand sheet allows one small marker per section, and this
 * is it, so nothing else in the section reaches for coral.
 */
export function SectionHead({
  index,
  label,
  chip,
  chipTone = 'live',
  tone = 'paper',
  className = '',
}: {
  index: string;
  label: string;
  chip?: string;
  chipTone?: 'live' | 'idle' | 'protect';
  tone?: Tone;
  className?: string;
}) {
  const onDark = tone === 'ink';
  const dot =
    chipTone === 'protect' ? 'chip-dot chip-dot--protect' : chipTone === 'idle' ? 'chip-dot chip-dot--idle' : 'chip-dot';
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-3 ${className}`}>
      <span aria-hidden="true" className="chip-dot chip-dot--mark" />
      <span className="font-mono text-meta text-signal">{index}</span>
      <span className={`h-px w-10 shrink-0 ${onDark ? 'bg-white/25' : 'bg-ink/25'}`} />
      <span className={`font-mono text-meta uppercase ${onDark ? 'text-white/60' : 'text-muted'}`}>{label}</span>
      {chip && (
        <span className={`ml-auto ${onDark ? 'chip-dark' : 'chip'}`}>
          <span className={dot} />
          {chip}
        </span>
      )}
    </div>
  );
}

/**
 * Section heading. Optional per-line mask reveal on scroll.
 *
 * **Do not put an unscoped `max-w-[Nch]` on a `Title`.** Each authored `\n`
 * line is its own `.line-mask`, and from `md` up those masks are `nowrap`
 * inside `overflow: hidden` — so a cap narrower than the line does not measure
 * it, it clips it, with no wrap and no error. Below `md` the lines do wrap and
 * a cap is a legitimate measure, so scope it: `max-md:max-w-[16ch]`.
 */
export function Title({
  lines,
  className = '',
  as = 'h2',
  animate = true,
  delay = 0,
}: {
  lines: readonly string[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  animate?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el || !animate) return;
    const targets = el.querySelectorAll('[data-mask-line]');
    if (prefersReduced()) {
      gsap.set(targets, { y: '0%' });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: '112%' },
        {
          y: '0%',
          duration: 1.0,
          ease: 'expo.out',
          stagger: 0.09,
          delay,
          scrollTrigger: { trigger: el, start: 'top 84%', once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [animate, delay]);

  return (
    <div ref={ref}>
      {/* The h1 of a routed page is where focus lands on navigation — see
          lib/motion/useRouteScroll.ts. `outline-none` is deliberate: the ring
          belongs to keyboard focus, and this focus is programmatic. */}
      <Tag
        className={className}
        {...(as === 'h1' ? { tabIndex: -1, 'data-route-heading': '', style: { outline: 'none' } } : {})}
      >
        {lines.map((line, i) => (
          <span key={i} className="line-mask">
            <span data-mask-line className="block">
              {line}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}

/** Body copy at the lede scale. */
export function Lead({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`t-lede max-w-text ${className}`}>{children}</p>;
}

/** A small labelled value — the console's readout pair. */
export function Readout({
  label,
  value,
  tone = 'paper',
  className = '',
}: {
  label: string;
  value: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const onDark = tone === 'ink';
  return (
    <div className={className}>
      <div className={`font-mono text-meta uppercase ${onDark ? 'text-white/45' : 'text-hush'}`}>{label}</div>
      <div className={`mt-1.5 font-mono text-[13px] ${onDark ? 'text-paper/90' : 'text-ink'}`}>{value}</div>
    </div>
  );
}

/**
 * A provenance line — the source and caveat under any number.
 *
 * This exists so a figure cannot be rendered bare: <Figure> uses it
 * unconditionally. See lib/content/benchmark.ts.
 */
export function Provenance({
  source,
  caveat,
  tone = 'paper',
  className = '',
}: {
  source: string;
  caveat?: string;
  tone?: Tone;
  className?: string;
}) {
  const onDark = tone === 'ink';
  return (
    <div className={className}>
      <p className={`font-mono text-[10.5px] leading-relaxed tracking-[0.06em] ${onDark ? 'text-white/45' : 'text-hush'}`}>
        {source}
      </p>
      {caveat && (
        <p className={`mt-1.5 max-w-[46ch] text-[12.5px] leading-relaxed ${onDark ? 'text-white/60' : 'text-ink/70'}`}>
          {caveat}
        </p>
      )}
    </div>
  );
}
