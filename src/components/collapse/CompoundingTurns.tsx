import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Block, Eyebrow, Reveal } from '@/components/arkadhi/Motion';
import { Title } from '@/components/ui/parts';
import { problem, statement } from '@/lib/content/site';

gsap.registerPlugin(ScrollTrigger);

const TURNS = 9;
const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * "Every turn resends the turns before it", drawn.
 *
 * Nine rows, one per turn. Row n is n units long — the n−1 turns it carries
 * again, faint, and the one new turn, solid — and each row draws itself as it
 * crosses the viewport, so the staircase builds with the scroll. Below it, the
 * two measured figures as proportional bars.
 *
 * The rows are an illustration of the mechanism (one unit = one turn), and are
 * labelled that way; the two bars underneath are the measured pair, to scale.
 */
export function CompoundingTurns() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || reduced()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-turn]').forEach((row) => {
        const bar = row.querySelector('[data-turn-bar]');
        const tag = row.querySelector('[data-turn-tag]');
        const trig = { trigger: row, start: 'top 94%', end: 'top 64%', scrub: 0.5 };
        gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: trig });
        gsap.fromTo(tag, { opacity: 0 }, { opacity: 1, ease: 'none', scrollTrigger: trig });
      });
      gsap.fromTo(
        '[data-measure]',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'power3.out',
          duration: 1.6,
          stagger: 0.25,
          scrollTrigger: { trigger: '[data-measures]', start: 'top 80%', once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const [full, small] = problem.collapse;
  const pct = (small.tokens / full.tokens) * 100;

  return (
    <Block id="problem" tone="white">
      <Eyebrow index="03" label={problem.label} />
      <div className="mt-10 md:mt-14">
        <Title
          lines={['EVERY CONVERSATION', 'CARRIES BAGGAGE.']}
          className="font-display font-bold uppercase text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em]"
        />
      </div>
      <Reveal className="mt-10">
        <p className="max-w-[60ch] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-[1.6]">{problem.body}</p>
      </Reveal>

      <div ref={root} className="mt-14 md:mt-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">
          {statement.note} · Illustration: one unit = one turn
        </p>
        <ol className="mt-6 space-y-2.5 md:space-y-3">
          {Array.from({ length: TURNS }, (_, i) => i + 1).map((n) => (
            <li key={n} data-turn className="grid grid-cols-[2.6rem_1fr_6.5rem] items-center gap-3 md:grid-cols-[4rem_1fr_12rem] md:gap-6">
              <span className="font-mono text-[11px] tracking-[0.16em] md:text-[12px]">T{String(n).padStart(2, '0')}</span>
              <div className="h-5 md:h-7">
                <div
                  data-turn-bar
                  className="flex h-full origin-left gap-px"
                  style={{ width: `${(n / TURNS) * 100}%` }}
                >
                  {Array.from({ length: n }, (_, k) => (
                    <span key={k} className={`h-full flex-1 ${k === n - 1 ? 'bg-ink' : 'bg-ink/15'}`} />
                  ))}
                </div>
              </div>
              <span data-turn-tag className="whitespace-nowrap text-right font-mono text-[11px] uppercase tracking-[0.12em] md:text-[12px]">
                {n} {n === 1 ? 'unit' : 'units'}
                {n > 1 && <span className="hidden text-ink/60 md:inline"> · {n - 1} resent</span>}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div data-measures className="mt-16 border-t border-ink/20 pt-10 md:mt-24 md:pt-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">Measured · to scale</p>
        <div className="mt-8 space-y-7">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-[12px] uppercase tracking-[0.18em]">{full.note}</span>
              <span className="font-mono text-[clamp(1.4rem,3vw,2.2rem)] font-medium tabular-nums">
                {full.tokens.toLocaleString('en-US')}
              </span>
            </div>
            <div className="mt-3 h-8 bg-ink/10">
              <div data-measure className="h-full origin-left bg-ink" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-[12px] uppercase tracking-[0.18em]">{small.note}</span>
              <span className="font-mono text-[clamp(1.4rem,3vw,2.2rem)] font-medium tabular-nums">{small.tokens}</span>
            </div>
            <div className="mt-3 h-8 bg-ink/10">
              <div data-measure className="h-full origin-left bg-protect" style={{ width: `max(${pct}%, 6px)` }} />
            </div>
          </div>
        </div>
        <p className="mt-6 max-w-[60ch] text-[14.5px] leading-relaxed text-ink/75">{problem.collapseSource}</p>
      </div>
    </Block>
  );
}
