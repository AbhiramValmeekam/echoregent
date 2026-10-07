import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eyebrow } from '@/components/arkadhi/Motion';
import { Title } from '@/components/ui/parts';
import { pipeline } from '@/lib/content/site';

gsap.registerPlugin(ScrollTrigger);

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * The pipeline as a track.
 *
 * The section pins and scrolling pulls the six stages sideways, left to right,
 * in the order a message passes through them. Each stage lights as it nears
 * the centre; a packet rides a rail along the bottom and the rail fills behind
 * it. Reduced-motion visitors get the stages as a plain vertical list.
 */
export function PipelineTrack() {
  const [animated] = useState(() => !reduced());
  const root = useRef<HTMLElement | null>(null);
  const stages = pipeline.stages;

  useLayoutEffect(() => {
    if (!animated || !root.current) return;
    const el = root.current;
    const ctx = gsap.context(() => {
      const track = el.querySelector<HTMLElement>('[data-track]')!;
      const panels = gsap.utils.toArray<HTMLElement>('[data-panel]');
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 48);

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${dist() + window.innerHeight * 0.6}`,
          pin: '[data-pin]',
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, { x: () => -dist(), duration: 1 }, 0);
      tl.fromTo('[data-fill]', { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);
      tl.fromTo('[data-packet]', { left: '0%' }, { left: '100%', duration: 1 }, 0);
      panels.forEach((p, i) => {
        const at = (i / Math.max(1, panels.length - 1)) * 0.92;
        gsap.set(p, { opacity: i === 0 ? 1 : 0.55, y: i === 0 ? -8 : 0, backgroundColor: i === 0 ? '#FFFFFF' : '#14999C' });
        if (i > 0) tl.to(p, { opacity: 1, y: -8, backgroundColor: '#FFFFFF', duration: 0.1, ease: 'power2.out' }, Math.max(0, at - 0.1));
      });
    }, el);
    return () => ctx.revert();
  }, [animated]);

  const head = (
    <>
      <Eyebrow index="04" label="How it works" />
      <div className="mt-8 md:mt-10">
        <Title
          lines={['FROM MESSAGE', 'TO MODEL.']}
          className="font-display font-bold uppercase text-[clamp(2.2rem,5.4vw,4.6rem)] leading-[0.95] tracking-[-0.03em]"
        />
      </div>
    </>
  );

  if (!animated) {
    return (
      <section id="pipeline" className="bg-signal text-ink">
        <div className="shell py-20 md:py-32">
          {head}
          <p className="mt-8 max-w-[60ch] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-relaxed">{pipeline.intro}</p>
          <ol className="mt-12 space-y-10">
            {stages.map((s, i) => (
              <li key={s.key} className="border-t border-ink/30 pt-6">
                <p className="font-mono text-[12px] tracking-[0.2em]">{String(i + 1).padStart(2, '0')} · {s.role}</p>
                <h3 className="mt-2 font-display text-[clamp(2rem,6vw,3.5rem)] font-bold uppercase leading-none tracking-[-0.03em]">{s.name}</h3>
                <p className="mt-4 max-w-[52ch] leading-relaxed">{s.summary} {s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section ref={root} id="pipeline" aria-label="How it works" className="bg-signal text-ink">
      <div data-pin className="relative flex h-[100svh] min-h-[620px] flex-col justify-center overflow-hidden">
        <div className="shell pt-14">
          {head}
          <p className="mt-6 hidden max-w-[62ch] text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed md:block">
            {pipeline.intro}
          </p>
        </div>

        <div data-track className="mt-8 flex w-max gap-4 pl-6 pr-6 md:mt-10 md:gap-6 md:pl-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))]">
          {stages.map((s, i) => (
            <article
              key={s.key}
              data-panel
              className="flex h-[min(40svh,360px)] w-[min(80vw,440px)] shrink-0 flex-col justify-between border border-ink/45 bg-signal p-6 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[clamp(2.4rem,5vw,4rem)] font-medium leading-none tracking-[-0.04em]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em]">{s.role}</span>
              </div>
              <div>
                <h3 className="font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em]">
                  {s.name}
                </h3>
                <p className="mt-3 max-w-[34ch] text-[15.5px] leading-snug">{s.summary}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="shell mt-8 md:mt-10">
          <div className="relative h-px bg-ink/30">
            <div data-fill className="absolute inset-0 origin-left bg-ink" />
            <span
              data-packet
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-protect ring-4 ring-ink/10"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
