import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { SectionHead, Title } from '@/components/ui/parts';
import { pipeline } from '@/lib/content/site';
import { EASE } from '@/lib/motion/variants';
import { useCursorState } from '@/components/cursor/Cursor';

type Stage = (typeof pipeline.stages)[number];

/**
 * The core system.
 *
 * One diagram rather than six feature cards. A rail of six stages; selecting
 * one expands what it does, why it exists, its budget and its implementation.
 * The protected stage is the only place coral appears in this section — the
 * colour means "this context is not compressible", and nothing else.
 *
 * Implemented as a disclosure list of buttons rather than ARIA tabs: each
 * control expands one region, which is what actually happens, and it keeps
 * keyboard behaviour predictable without a roving-tabindex implementation.
 */
export function SystemDiagram({ index = pipeline.index }: { index?: string }) {
  const [active, setActive] = useState<string>('classify');
  const current = pipeline.stages.find((s) => s.key === active) ?? pipeline.stages[0];

  return (
    <section id="product" className="relative bg-ink text-paper">
      <div aria-hidden="true" className="tech-grid-dark pointer-events-none absolute inset-0 opacity-40" />
      <div className="shell relative py-24 md:py-32 lg:py-40">
        <SectionHead index={index} label={pipeline.label} chip="As designed" chipTone="idle" />
        <Title
          lines={pipeline.heading.split('\n')}
          className="t-section mt-12 max-md:max-w-[20ch] text-paper"
        />
        <p className="t-lede mt-8 max-w-text text-paper/65">{pipeline.intro}</p>

        <Rail stages={pipeline.stages} active={active} onSelect={setActive} />

        <div className="mt-2 grid gap-px lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <StageList stages={pipeline.stages} active={active} onSelect={setActive} />
          <StageDetail stage={current} />
        </div>
      </div>
    </section>
  );
}

/** The connector rail — six nodes on a hairline, with a travelling pulse. */
function Rail({
  stages,
  active,
  onSelect,
}: {
  stages: readonly Stage[];
  active: string;
  onSelect: (k: string) => void;
}) {
  const track = useRef<HTMLDivElement | null>(null);
  const [w, setW] = useState(0);

  // The pulse travels the rail with a transform rather than by animating
  // `left`, which would recalculate layout on every frame of an animation that
  // is always running. It also only runs while the rail is on screen.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setW(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const inView = useInView(track, { margin: '-10% 0px -10% 0px' });

  return (
    <div className="relative mt-16 hidden md:block" aria-hidden="true">
      <div ref={track} className="relative h-px w-full bg-white/20">
        <motion.span
          className="absolute left-0 top-1/2 h-[3px] w-[3px] -translate-y-1/2 rounded-full bg-signal"
          animate={inView && w ? { x: [0, w - 3] } : { x: 0 }}
          transition={{ duration: 5.5, ease: 'linear', repeat: inView ? Infinity : 0, repeatDelay: 0.6 }}
          style={{ boxShadow: '0 0 8px 2px rgba(20,153,156,0.55)' }}
        />
      </div>
      <div className="grid grid-cols-6">
        {stages.map((s) => {
          const isActive = s.key === active;
          const isProtected = 'protected' in s && s.protected;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => onSelect(s.key)}
              tabIndex={-1}
              className="group flex flex-col items-start gap-2 pt-4 text-left"
            >
              <span
                className={`h-[7px] w-[7px] -translate-y-[calc(50%+3.5px)] rounded-full border transition-colors duration-300 ${
                  isProtected
                    ? 'border-protect bg-protect'
                    : isActive
                      ? 'border-signal bg-signal'
                      : 'border-white/35 bg-ink group-hover:border-signal'
                }`}
              />
              <span
                className={`font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                  isProtected ? 'text-protect' : isActive ? 'text-paper' : 'text-white/45 group-hover:text-white/70'
                }`}
              >
                {s.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StageList({
  stages,
  active,
  onSelect,
}: {
  stages: readonly Stage[];
  active: string;
  onSelect: (k: string) => void;
}) {
  return (
    <div className="border-t border-white/12 md:border-t-0">
      {stages.map((s, i) => {
        const isActive = s.key === active;
        const isProtected = 'protected' in s && s.protected;
        return (
          <button
            key={s.key}
            type="button"
            onClick={() => onSelect(s.key)}
            aria-expanded={isActive}
            aria-controls="stage-detail"
            className={`group flex w-full items-center gap-4 border-b border-white/12 py-5 text-left transition-colors duration-300 md:py-6 ${
              isActive ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
            }`}
          >
            <span className={`font-mono text-meta ${isProtected ? 'text-protect' : 'text-white/40'}`}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className={`font-display text-[clamp(1.15rem,2vw,1.6rem)] font-bold uppercase leading-none tracking-[-0.02em] transition-colors duration-300 ${
                isProtected ? 'text-protect' : isActive ? 'text-paper' : 'text-white/55 group-hover:text-paper'
              }`}
            >
              {s.name}
            </span>
            <span className="ml-auto hidden font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/35 sm:block">
              {s.role}
            </span>
            <span
              aria-hidden="true"
              className={`font-mono text-meta transition-transform duration-300 ${
                isActive ? 'rotate-90 text-signal' : 'text-white/40'
              }`}
            >
              →
            </span>
          </button>
        );
      })}
    </div>
  );
}

function StageDetail({ stage }: { stage: Stage }) {
  const isProtected = 'protected' in stage && stage.protected;
  const cursor = useCursorState('read', 'Stage');

  return (
    <div
      id="stage-detail"
      role="region"
      aria-live="polite"
      aria-label={`${stage.name} detail`}
      {...cursor}
      className={`border-t border-white/12 px-0 pt-10 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-14 ${
        isProtected ? 'lg:border-l-protect/30' : ''
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.key}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: EASE.calm }}
        >
          <div className="flex items-center gap-3">
            <span className={`chip-dark ${isProtected ? '!border-protect/50 !text-protect' : ''}`}>
              <span className={isProtected ? 'chip-dot chip-dot--protect' : 'chip-dot'} />
              {stage.role}
            </span>
          </div>

          <h3 className="mt-6 font-display text-[clamp(1.4rem,2.6vw,2.1rem)] font-bold uppercase leading-tight tracking-[-0.025em] text-paper">
            {stage.summary}
          </h3>

          <p className="mt-5 max-w-[52ch] text-[16.5px] leading-relaxed text-paper/70">{stage.body}</p>

          <dl className="mt-9 grid gap-px border-t border-white/[0.09] sm:grid-cols-3">
            {stage.metrics.map((m) => (
              <div key={m.label} className="border-b border-white/[0.09] py-4 sm:border-b-0 sm:border-r sm:pr-6 sm:last:border-r-0">
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/45">{m.label}</dt>
                <dd
                  className={`mt-1.5 font-mono text-[13px] ${isProtected ? 'text-protect' : 'text-paper/90'}`}
                >
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>

          {isProtected && (
            <p className="mt-8 border-l-2 border-protect pl-4 text-[14.5px] leading-relaxed text-protect/90">
              This is the one stage that removes nothing. When a protected zone matches, the pipeline
              stops optimising and passes the conversation through unchanged.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
