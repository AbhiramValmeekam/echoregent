/**
 * The benchmarks, as five separately-renderable blocks.
 *
 * The evidence used to be one section on the landing page, then three pages
 * (`/research/benchmarks`, `/research/methodology`, `/research/limits`). It is
 * three *sections* again — `#benchmarks` takes the comparison, the figures, the
 * quality scores and the two panels, `#methodology` takes the method alone, and
 * `#limits` takes the limits — and the exports stayed split, because the
 * sections are still composed separately and joining them back into one
 * component would put the method back above the numbers it is meant to qualify.
 *
 * **Every export checks `benchmark.enabled` for itself.** The flag used to be
 * read once, inside the one component that rendered all five. Splitting the
 * section without moving the gate would have quietly turned one guard into five
 * unguarded doors — the numbers would survive the flag that exists to remove
 * them.
 *
 * Every number here is rendered beside its provenance, for the same reason.
 */
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Kind } from '@/components/ui/Kind';
import { benchmark } from '@/lib/content/benchmark';
import { EASE } from '@/lib/motion/variants';
import { useCursorState } from '@/components/cursor/Cursor';

const MAX_TOKENS = 18679;
/** The quality axis is truncated and stated, rather than normalised to the top
 *  row — normalising 0.079 to a full-width bar would overstate a 0.010 gap. */
const QUALITY_AXIS = 0.1;

/* ── methodology, rendered first ──────────────────────────────────────── */

export function BenchmarkMethodology() {
  if (!benchmark.enabled) return null;
  const m = benchmark.methodology;
  // No `id` here. This block carried `id={m.id}` — `#methodology` — while it was
  // a page of its own; the section that renders it now supplies that anchor
  // from `AREAS`, and keeping both would put two elements with one id in the
  // document. `getElementById` would still resolve (to the outer one, which is
  // the one you want) but nothing about that is worth relying on.
  return (
    <div className="mt-16 scroll-mt-24 border border-[var(--line)] md:mt-20">
      <div className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] px-5 py-3">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">{m.label}</h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-hush">
          read before the numbers
        </span>
      </div>
      <dl className="grid gap-px sm:grid-cols-2 lg:grid-cols-5">
        {m.rows.map((r) => (
          <div key={r.label} className="border-b border-[var(--line-soft)] px-5 py-5 sm:border-b-0 lg:border-r lg:last:border-r-0">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-hush">{r.label}</dt>
            <dd className="mt-2 text-[13.5px] leading-snug text-ink/85">{r.value}</dd>
          </div>
        ))}
      </dl>
      <p className="border-t border-[var(--line-soft)] px-5 py-4 text-[13.5px] leading-relaxed text-ink/70">
        {m.note}
      </p>
    </div>
  );
}

/* ── the head-to-head ─────────────────────────────────────────────────── */

type TokenRow = (typeof benchmark.tokens.rows)[number];

export function BenchmarkComparison() {
  const [selected, setSelected] = useState<string>('echo');
  if (!benchmark.enabled) return null;
  const current = (benchmark.tokens.rows.find((r) => r.id === selected) ??
    benchmark.tokens.rows[0]) as TokenRow;

  return (
    <div className="mt-16 md:mt-20">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="font-display text-[clamp(1.3rem,2.4vw,1.9rem)] font-bold uppercase leading-none tracking-[-0.025em] text-ink">
          {benchmark.tokens.label}
        </h3>
        <span className="font-mono text-meta uppercase text-hush">
          scope · {benchmark.tokens.scope} · axis 0–{MAX_TOKENS.toLocaleString('en-US')}
        </span>
      </div>

      <ul className="mt-8">
        {benchmark.tokens.rows.map((row) => {
          const isSelected = row.id === selected;
          const highlight = 'highlight' in row && row.highlight;
          const caveat = 'caveat' in row ? row.caveat : undefined;
          const pct = (row.raw / MAX_TOKENS) * 100;

          return (
            <li key={row.id} className="border-t border-[var(--line)] last:border-b">
              <button
                type="button"
                onClick={() => setSelected(row.id)}
                aria-pressed={isSelected}
                className={`group flex w-full flex-col gap-3 py-5 text-left transition-colors duration-300 ${
                  isSelected ? 'bg-wash-strong' : 'hover:bg-wash'
                }`}
              >
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 px-5">
                  <span
                    className={`w-[9.5rem] shrink-0 font-mono text-[12.5px] uppercase tracking-[0.1em] ${
                      highlight ? 'text-signal' : 'text-ink/85'
                    }`}
                  >
                    {row.name}
                  </span>
                  <span
                    className={`tnum font-mono text-[clamp(1.1rem,2vw,1.6rem)] leading-none ${
                      highlight ? 'text-signal' : 'text-ink/80'
                    }`}
                  >
                    {row.value}
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-hush">
                    {row.note}
                  </span>
                  <span className="ml-auto hidden sm:block">
                    <Kind kind={row.provenance.kind} />
                  </span>
                </div>

                {/* Proportional to the real figure. The 2px floor is a rendering
                    floor, not a data floor — 259 tokens is 1.4% of 18,679. */}
                <div className="mx-5 h-[5px] w-[calc(100%-2.5rem)] bg-ink/[0.08]">
                  <motion.span
                    className={`block h-full origin-left ${highlight ? 'bg-signal' : 'bg-ink/40'}`}
                    style={{ minWidth: 2 }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: pct / 100 }}
                    viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                    transition={{ duration: 1.0, ease: EASE.calm, delay: 0.1 }}
                  />
                </div>
              </button>

              {/* The caveat stays rendered whether or not the row is selected —
                  a claim and its limit are one object here. */}
              <AnimatePresence initial={false}>
                {isSelected && (
                  <motion.div
                    key={row.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: EASE.calm }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-[var(--line-soft)] px-5 py-4">
                      <p className="font-mono text-[10.5px] tracking-[0.06em] text-hush">
                        {row.provenance.source}
                      </p>
                      {/* The live table's capability columns, which are not part
                          of the measurement and so are not scored with one. */}
                      {'flags' in row && (
                        <p className="mt-2 font-mono text-[10.5px] tracking-[0.06em] text-hush">
                          {row.flags.join(' · ')}
                        </p>
                      )}
                      {caveat && (
                        <p className="mt-2 max-w-[62ch] text-[13.5px] leading-relaxed text-ink/70">{caveat}</p>
                      )}
                      <p className="mt-3 font-mono text-[10.5px] tracking-[0.06em] text-hush sm:hidden">
                        {row.provenance.kind}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.1em] text-hush">
        selected · {current.name} · {current.provenance.kind} · {current.provenance.source}
      </p>
    </div>
  );
}

/* ── the three headline figures ───────────────────────────────────────── */

export function BenchmarkFigures() {
  const cursor = useCursorState('read', 'Figure');
  if (!benchmark.enabled) return null;
  return (
    <div className="mt-16 grid gap-px border-t border-[var(--line)] md:mt-20 sm:grid-cols-2 lg:grid-cols-4">
      {benchmark.figures.map((f) => (
        <motion.div
          key={f.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
          transition={{ duration: 0.7, ease: EASE.calm }}
          {...cursor}
          className="border-b border-[var(--line)] py-8 lg:border-b-0 lg:border-r lg:pr-8 lg:last:border-r-0"
        >
          <div className="flex items-baseline gap-3">
            <span className="tnum font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-none tracking-[-0.04em] text-ink">
              {f.value}
            </span>
            <Kind kind={f.provenance.kind} />
          </div>
          <p className="mt-4 text-[15px] leading-snug text-ink/85">{f.label}</p>
          <p className="mt-2 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.1em] text-hush">
            {f.scope}
          </p>
          <p className="mt-4 font-mono text-[10.5px] leading-relaxed tracking-[0.06em] text-hush">
            {f.provenance.source}
          </p>
          {'caveat' in f && f.caveat ? (
            <p className="mt-2 max-w-[44ch] text-[12.5px] leading-relaxed text-ink/70">{f.caveat}</p>
          ) : null}
        </motion.div>
      ))}
    </div>
  );
}

/* ── quality ──────────────────────────────────────────────────────────── */

export function BenchmarkQuality() {
  if (!benchmark.enabled) return null;
  const q = benchmark.quality;

  return (
    <div className="mt-16 grid gap-x-16 gap-y-10 md:mt-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div>
        <h3 className="font-display text-[clamp(1.5rem,3vw,2.3rem)] font-bold uppercase leading-[1.02] tracking-[-0.03em] text-ink">
          {q.heading}
        </h3>
        <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed text-ink/60">{q.body}</p>
        <p className="mt-5 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.1em] text-hush">
          source · measured on LoCoMo · token-overlap F1 · axis 0–{QUALITY_AXIS.toFixed(2)}
        </p>
      </div>

      <div>
        {q.rows.map((r, i) => {
          const v = Number(r.value);
          return (
            <div key={r.name} className="border-b border-[var(--line-soft)] py-5 first:border-t">
              <div className="flex items-baseline justify-between gap-4">
                <span
                  className={`font-mono text-[12.5px] uppercase tracking-[0.1em] ${
                    r.better ? 'text-signal' : 'text-ink/70'
                  }`}
                >
                  {r.name}
                </span>
                <span className={`tnum font-mono text-[clamp(1.05rem,1.8vw,1.5rem)] ${r.better ? 'text-signal' : 'text-ink/75'}`}>
                  {r.value}
                </span>
              </div>
              <div className="mt-3 h-[3px] w-full bg-ink/[0.09]">
                <motion.span
                  className={`block h-full origin-left ${r.better ? 'bg-signal' : 'bg-ink/35'}`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: v / QUALITY_AXIS }}
                  viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                  transition={{ duration: 1.0, ease: EASE.calm, delay: 0.1 + i * 0.12 }}
                />
              </div>
              <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-hush">{r.note}</p>
            </div>
          );
        })}

        <p className="mt-6 text-[15.5px] leading-relaxed text-ink/85">{q.finding}</p>
        <p className="mt-3 max-w-[56ch] border-l-2 border-[var(--line)] pl-4 text-[13px] leading-relaxed text-ink/70">
          {q.caveat}
        </p>
      </div>
    </div>
  );
}

/* ── the judge panel and the load test ────────────────────────────────── */

/**
 * The two "panel" blocks on the live research page — a judge run and a load
 * test. They share a shape: a label, a run of large values, one scope line and
 * one caveat. Rendered together so the numbers cannot be lifted out of their
 * context without the caveat coming along.
 */
function Panels() {
  return (
    <div className="mt-16 grid gap-x-14 gap-y-12 md:mt-20 lg:grid-cols-2">
      <Panel block={benchmark.judge} />
      <Panel block={benchmark.load} />
    </div>
  );
}

function Panel({
  block,
}: {
  block: {
    label: string;
    heading: string;
    body: string;
    rows: readonly { label: string; value: string; raw: number }[];
    scope: string;
    provenance: { source: string; kind: 'measured' | 'cited' | 'derived' };
    caveat?: string;
  };
}) {
  return (
    <div className="border border-[var(--line)]">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[var(--line)] px-5 py-3">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">{block.label}</h3>
        <Kind kind={block.provenance.kind} />
      </div>

      <div className="px-5 py-6">
        <h4 className="font-display text-[clamp(1.3rem,2.4vw,1.85rem)] font-bold uppercase leading-[1.05] tracking-[-0.03em] text-ink">
          {block.heading}
        </h4>
        <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-ink/60">{block.body}</p>

        <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5">
          {block.rows.map((r) => (
            <div key={r.label}>
              <dd className="tnum font-mono text-[clamp(1.4rem,2.6vw,2rem)] font-medium leading-none tracking-[-0.03em] text-ink">
                {r.value}
              </dd>
              <dt className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-hush">
                {r.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>

      <div className="border-t border-[var(--line-soft)] px-5 py-4">
        <p className="font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.1em] text-hush">
          scope · {block.scope}
        </p>
        <p className="mt-2 font-mono text-[10.5px] leading-relaxed tracking-[0.06em] text-hush">
          {block.provenance.source}
        </p>
        {block.caveat && (
          <p className="mt-3 max-w-[54ch] text-[13px] leading-relaxed text-ink/70">{block.caveat}</p>
        )}
      </div>
    </div>
  );
}

export function BenchmarkJudgeLoad() {
  if (!benchmark.enabled) return null;
  return <Panels />;
}

/* ── limits ───────────────────────────────────────────────────────────── */

export function BenchmarkLimits() {
  if (!benchmark.enabled) return null;
  const l = benchmark.limits;
  const r = benchmark.reproducibility;
  return (
    <div className="mt-16 grid gap-x-16 gap-y-10 border-t border-[var(--line)] pt-10 md:mt-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div>
        <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">{l.label}</h3>
        <ol className="mt-5 space-y-3">
          {l.items.map((item, i) => (
            <li key={i} className="flex gap-4 text-[14.5px] leading-relaxed text-ink/70">
              <span className="shrink-0 select-none font-mono text-[11px] text-hush">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="border border-protect/30 bg-protect/[0.05] p-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-protect">{r.label}</h3>
          <span className="chip !border-protect/40">
            <span className="chip-dot chip-dot--protect" />
            {r.status}
          </span>
        </div>
        <p className="mt-4 text-[14.5px] leading-relaxed text-ink/75">{r.body}</p>
        <p className="mt-4 text-[14px] leading-relaxed text-protect/90">{r.note}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
