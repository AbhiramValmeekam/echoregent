import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHead, Title } from '@/components/ui/parts';
import { useCursorState } from '@/components/cursor/Cursor';
import { playground, samples, type Sample } from '@/lib/content/playground';
import { EASE, prefersReduced } from '@/lib/motion/variants';

type Phase = 'idle' | 'running' | 'done';

/**
 * The playground.
 *
 * A console rather than a card: the context arrives on the left, the pipeline
 * narrates what it is doing line by line, and the compressed context lands on
 * the right. The third sample is protected, and the console's job is to show
 * the pipeline *declining* to compress it — the refusal is the feature.
 *
 * Nothing is sent anywhere. The reveal is scripted against the sample data in
 * lib/content/playground.ts, and the section says so on the page.
 */
/**
 * `head={false}` drops the section's own section-head, headline and intro.
 *
 * On `/playground` the page hero carries exactly that copy, so rendering it
 * again here would print the same headline twice with a band boundary between
 * them. The switch is a prop rather than a second component because the console
 * below is the expensive half and duplicating it to change a heading is how two
 * versions of one widget start to drift.
 */
export function Playground({ index = playground.index, head = true }: { index?: string; head?: boolean }) {
  const [sampleId, setSampleId] = useState(samples[0].id);
  const [phase, setPhase] = useState<Phase>('idle');
  const [step, setStep] = useState(0);

  const sample = samples.find((s) => s.id === sampleId) ?? samples[0];
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const reset = (id: string) => {
    clearTimers();
    setSampleId(id);
    setPhase('idle');
    setStep(0);
  };

  const run = () => {
    clearTimers();
    if (prefersReduced()) {
      // No fake delay for someone who asked for less motion — show the result.
      setStep(sample.stages.length);
      setPhase('done');
      return;
    }
    setPhase('running');
    setStep(0);
    sample.stages.forEach((_, i) => {
      const t = window.setTimeout(
        () => setStep(i + 1),
        260 + i * 300,
      );
      timers.current.push(t);
    });
    const done = window.setTimeout(
      () => setPhase('done'),
      260 + sample.stages.length * 300 + 300,
    );
    timers.current.push(done);
  };

  const reduced = sample.afterTokens === sample.beforeTokens;
  const reduction = reduced
    ? 0
    : Math.round(((sample.beforeTokens - sample.afterTokens) / sample.beforeTokens) * 1000) / 10;

  return (
    <section id="playground" className="relative bg-paper">
      <div className="shell py-24 md:py-32 lg:py-40">
        {head && (
          <>
            <SectionHead index={index} label={playground.label} chip={playground.disclaimer ? 'Sample data' : undefined} chipTone="idle" />
            <Title lines={['WATCH CONTEXT', 'DISAPPEAR.']} className="t-section mt-12 text-ink" />
            <p className="t-lede mt-8 max-w-text text-ink/60">{playground.intro}</p>
          </>
        )}

        {/* Sample selector */}
        <div role="group" aria-label="Sample conversation" className="mt-12 flex flex-wrap gap-px">
          {samples.map((s) => {
            const isActive = s.id === sampleId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => reset(s.id)}
                aria-pressed={isActive}
                className={`group flex min-h-[44px] items-center gap-3 border px-5 py-3 font-mono text-meta uppercase transition-colors duration-300 ${
                  isActive
                    ? s.protected
                      ? 'border-protect bg-protect/10 text-protect'
                      : 'border-signal bg-signal/10 text-ink'
                    : 'border-[var(--line)] text-ink/70 hover:border-ink/40 hover:text-ink'
                }`}
              >
                <span
                  className={`h-[6px] w-[6px] shrink-0 rounded-full ${
                    s.protected ? 'bg-protect' : isActive ? 'bg-signal' : 'bg-hush'
                  }`}
                />
                {s.label}
              </button>
            );
          })}
        </div>

        <p className="mt-4 max-w-[70ch] text-[14px] leading-relaxed text-ink/70">{sample.blurb}</p>

        {/* Console */}
        <div className="mt-10 border border-ink/15 bg-wash">
          <ConsoleHeader sample={sample} phase={phase} />

          <div className="grid lg:grid-cols-2">
            <ContextPanel
              title="Before"
              tokens={sample.beforeTokens}
              lines={sample.before}
              tone="plain"
              label={`Context as it arrives`}
            />
            <ContextPanel
              title="After"
              tokens={phase === 'done' ? sample.afterTokens : null}
              lines={phase === 'done' ? sample.after : sample.before}
              tone={sample.protected ? 'protect' : 'signal'}
              label={
                phase === 'done'
                  ? sample.protected
                    ? 'Bypassed — nothing removed'
                    : 'Context as it is sent'
                  : 'Awaiting pipeline'
              }
              dimmed={phase !== 'done'}
              emptyMessage={
                sample.protected && phase === 'done'
                  ? 'Protected zone matched. The conversation is forwarded unchanged.'
                  : undefined
              }
            />
          </div>

          <PipelineLog
            stages={sample.stages}
            step={step}
            phase={phase}
            protectedSample={sample.protected}
          />

          {/* Metrics */}
          <div className="grid gap-px border-t border-[var(--line)] sm:grid-cols-3">
            <Metric
              label="Tokens"
              value={
                phase === 'done' ? (
                  <span className="tnum">
                    {sample.beforeTokens.toLocaleString('en-US')}
                    <span className="mx-2 text-ink/70">→</span>
                    <span className={sample.protected ? 'text-protect' : 'text-signal'}>
                      {sample.afterTokens.toLocaleString('en-US')}
                    </span>
                  </span>
                ) : (
                  <span className="tnum text-ink/40">
                    {sample.beforeTokens.toLocaleString('en-US')}
                    <span className="mx-2 text-ink/70">→</span>—
                  </span>
                )
              }
            />
            <Metric
              label="Reduction"
              value={
                phase === 'done' ? (
                  <span className={`tnum ${sample.protected ? 'text-protect' : 'text-signal'}`}>
                    {reduction}%
                  </span>
                ) : (
                  <span className="text-ink/40">—</span>
                )
              }
            />
            <Metric
              label="Protected"
              value={
                <span className={sample.protected ? 'text-protect' : 'text-ink/70'}>
                  {sample.protected ? 'true' : 'false'}
                </span>
              }
            />
          </div>
        </div>

        {/* Verdict + action */}
        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <AnimatePresence mode="wait">
            {phase === 'done' && (
              <motion.p
                key={sample.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE.calm }}
                className={`max-w-[62ch] text-[16.5px] leading-relaxed ${
                  sample.protected ? 'text-protect/90' : 'text-ink/75'
                }`}
              >
                {sample.verdict}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="flex shrink-0 flex-wrap gap-4">
            <button type="button" onClick={run} className="btn" disabled={phase === 'running'}>
              {phase === 'running' ? 'Running…' : phase === 'done' ? 'Run again' : 'Run the pipeline'}
              {phase !== 'running' && <span aria-hidden="true">→</span>}
            </button>
          </div>
        </div>

        <p className="mt-8 max-w-[80ch] border-l-2 border-[var(--line)] pl-4 font-mono text-[10.5px] leading-relaxed tracking-[0.06em] text-hush">
          {playground.disclaimer}
        </p>
      </div>
    </section>
  );
}

/* ── console furniture ────────────────────────────────────────────────── */

function ConsoleHeader({ sample, phase }: { sample: Sample; phase: Phase }) {
  const dot = phase === 'running' ? 'animate-pulse bg-signal' : phase === 'done' ? 'bg-signal' : 'bg-hush';
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-ink/15 bg-ink px-5 py-3">
      <span className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/75">
        <span className={`h-[6px] w-[6px] rounded-full ${dot}`} />
        echoregent · pipeline
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
        domain={sample.domain}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
        intent={sample.intent}
      </span>
      <span
        className={`ml-auto font-mono text-[11px] uppercase tracking-[0.16em] ${
          sample.protected ? 'text-protect' : 'text-white/45'
        }`}
      >
        risk={sample.risk}
      </span>
    </div>
  );
}

function ContextPanel({
  title,
  tokens,
  lines,
  tone,
  label,
  dimmed,
  emptyMessage,
}: {
  title: string;
  tokens: number | null;
  lines: string[];
  tone: 'plain' | 'signal' | 'protect';
  label: string;
  dimmed?: boolean;
  emptyMessage?: string;
}) {
  const tokenTone = tone === 'protect' ? 'text-protect' : tone === 'signal' ? 'text-signal' : 'text-ink';
  return (
    <div className="border-b border-[var(--line)] p-5 lg:border-b-0 lg:border-r lg:last:border-r-0">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">{title}</h3>
        <span className={`tnum font-mono text-[13px] ${tokens === null ? 'text-hush' : tokenTone}`}>
          {tokens === null ? '—' : `${tokens.toLocaleString('en-US')}`}
        </span>
      </div>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-hush">{label}</p>

      {emptyMessage ? (
        <p className="mt-5 border border-protect/25 bg-protect/[0.06] p-4 font-mono text-[11.5px] leading-relaxed text-protect/90">
          {emptyMessage}
        </p>
      ) : (
        <ol className={`mt-5 space-y-1.5 transition-opacity duration-500 ${dimmed ? 'opacity-25' : 'opacity-100'}`}>
          {lines.map((line, i) => (
            <li
              key={i}
              className="flex gap-3 font-mono text-[11.5px] leading-relaxed text-ink/75"
            >
              <span className="shrink-0 select-none text-ink/70">{String(i + 1).padStart(2, '0')}</span>
              <span className="break-words">{line}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function PipelineLog({
  stages,
  step,
  phase,
  protectedSample,
}: {
  stages: Sample['stages'];
  step: number;
  phase: Phase;
  protectedSample: boolean;
}) {
  const cursor = useCursorState('target');
  return (
    <div
      {...cursor}
      className="relative border-t border-[var(--line)] px-5 py-5"
      aria-live="polite"
      aria-label="Pipeline output"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">Pipeline output</h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-hush">
          {phase === 'idle' ? 'idle' : phase === 'running' ? 'running' : 'complete'}
        </span>
      </div>

      <ol className="mt-5 min-h-[196px] space-y-1">
        {phase === 'idle' && (
          <li className="font-mono text-[11.5px] text-hush">
            awaiting input<span className="animate-pulse">_</span>
          </li>
        )}
        {stages.slice(0, step).map((s, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28, ease: EASE.precise }}
            className="flex items-baseline gap-3 font-mono text-[11.5px] leading-relaxed"
          >
            <span className="shrink-0 select-none text-ink/70">›</span>
            <span className={s.protect ? 'text-protect' : 'text-ink/80'}>{s.text}</span>
            {s.value && (
              <span className={`ml-auto shrink-0 ${s.protect ? 'text-protect' : 'text-signal'}`}>
                {s.value}
              </span>
            )}
          </motion.li>
        ))}
        {phase === 'running' && step < stages.length && (
          <li className="font-mono text-[11.5px] text-hush">
            <span className="animate-pulse">_</span>
          </li>
        )}
        {phase === 'done' && !protectedSample && (
          <li className="pt-2 font-mono text-[11.5px] text-signal">
            ✓ compressed — forwarded to model
          </li>
        )}
        {phase === 'done' && protectedSample && (
          <li className="pt-2 font-mono text-[11.5px] text-protect">
            ⊘ compression declined — forwarded unchanged
          </li>
        )}
      </ol>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="px-5 py-5">
      <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-hush">{label}</div>
      <div className="mt-2 font-mono text-[clamp(1rem,1.8vw,1.35rem)]">{value}</div>
    </div>
  );
}
