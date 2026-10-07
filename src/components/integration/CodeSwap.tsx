import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { SectionHead, Title } from '@/components/ui/parts';
import { integration } from '@/lib/content/integration';
import { EASE, prefersReduced } from '@/lib/motion/variants';
import { useCursorState } from '@/components/cursor/Cursor';

/**
 * Integration.
 *
 * The brief asks for a baseURL swap animation. This is that animation and
 * nothing more: the code is held still, and the one line that changes slides
 * into place while the two comments it affects swap their text in place. No
 * diff viewer, no typing effect.
 *
 * The section is labelled a preview throughout. There is no package to install
 * and no endpoint to point at yet, so the button applies a change to a
 * code block rather than anything real.
 */

type Line = (typeof integration.before.code)[number];
type AfterLine = (typeof integration.after.code)[number];

/** Split a source line into its code and a trailing `//` comment. */
function splitComment(text: string): { code: string; comment: string | null } {
  const at = text.indexOf('//');
  if (at === -1) return { code: text, comment: null };
  return { code: text.slice(0, at), comment: text.slice(at + 2).trimStart() };
}

export function CodeSwap({ index = integration.index }: { index?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' });
  const [applied, setApplied] = useState(false);
  const [copied, setCopied] = useState(false);

  // The change applies itself once, the first time the block is on screen.
  useEffect(() => {
    if (inView) setApplied(true);
  }, [inView]);

  const copyCursor = useCursorState('copy', 'Copy');
  const readCursor = useCursorState('read', 'Code');

  const copy = async () => {
    const text = integration.after.code.map((l) => l.text).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard is unavailable (insecure origin, denied permission). The
      // snippet is on screen and selectable, so this is not worth an error UI.
      setCopied(false);
    }
  };

  const { addIndex, addLine, dimAfter, markAfter } = derive();
  const lines = buildLines({ applied, addIndex, addLine, dimAfter, markAfter });
  // Someone who asked for less motion gets the applied state without the
  // height transition; the code still changes, it just does not slide.
  const slide = prefersReduced() ? 0 : 0.45;

  return (
    <section id="integration" className="relative bg-ink text-paper">
      <div aria-hidden="true" className="tech-grid-dark pointer-events-none absolute inset-0 opacity-30" />
      <div className="shell relative py-24 md:py-32 lg:py-40">
        <SectionHead
          index={index}
          label={integration.label}
          chip={integration.qualifier}
          chipTone="idle"
        />
        <Title lines={integration.heading.split('\n')} className="t-section mt-12 max-md:max-w-[16ch] text-paper" />
        <p className="t-lede mt-8 max-w-text text-paper/65">{integration.intro}</p>

        {/* `minmax(0,1fr)` rather than the default `auto`: an implicit auto
            column takes its minimum from its content, so the `min-w-[30rem]`
            code block below would widen the column past the viewport at 390px
            instead of scrolling inside its own box. Same reason for the `lg`
            track's `minmax(0,…)`. */}
        <div ref={ref} className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
          {/* Code */}
          <div className="border border-white/15 bg-[#071730]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/12 px-5 py-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">
                client.ts
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
                openai-compatible
              </span>
              <span className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setApplied((v) => !v)}
                  aria-pressed={applied}
                  className="min-h-[32px] border border-white/15 px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60 transition-colors duration-300 hover:border-signal/60 hover:text-paper"
                >
                  {applied ? 'Revert' : 'Apply the change'}
                </button>
                <button
                  type="button"
                  onClick={copy}
                  {...copyCursor}
                  className="min-h-[32px] border border-white/15 px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60 transition-colors duration-300 hover:border-signal/60 hover:text-paper"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </span>
            </div>

            <div {...readCursor} className="overflow-x-auto px-5 py-5">
              <ol className="min-w-[30rem] font-mono text-[12.5px] leading-[1.75]">
                <AnimatePresence initial={false}>
                  {lines.map((l, i) => (
                    <motion.li
                      key={l.key}
                      initial={l.inserted && slide > 0 ? { height: 0, opacity: 0 } : false}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={l.inserted ? { height: 0, opacity: 0 } : undefined}
                      transition={{ duration: slide, ease: EASE.calm }}
                      className={`flex gap-4 ${l.inserted ? 'overflow-hidden' : ''}`}
                    >
                      <span className="w-[1.4rem] shrink-0 select-none text-right text-white/30">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="whitespace-pre">
                        <span className={toneClass(l.tone)}>{l.code}</span>
                        {l.comment !== null && (
                          <>
                            <span className="text-white/25">// </span>
                            <AnimatePresence mode="wait" initial={false}>
                              <motion.span
                                key={l.comment}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2, ease: EASE.precise }}
                                className={l.tone === 'mark' && applied ? 'text-signal' : 'text-white/40'}
                              >
                                {l.comment}
                              </motion.span>
                            </AnimatePresence>
                          </>
                        )}
                      </span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ol>
            </div>

            <p className="border-t border-white/12 px-5 py-4 font-mono text-[10.5px] leading-relaxed tracking-[0.06em] text-white/40">
              {applied ? integration.after.caption : integration.before.caption}
            </p>

            {/* Rendered in both states, because the figure it qualifies is in
                both states — `18,679` before the change and `259` after it. */}
            <p className="border-t border-white/12 px-5 py-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-white/35">
              {integration.payloadSource}
            </p>
          </div>

          {/* Response + facts */}
          <div>
            <div className="border border-white/15">
              <div className="border-b border-white/12 px-5 py-3">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper">
                  {integration.response.label}
                </h3>
              </div>
              <dl className="divide-y divide-white/[0.09]">
                {integration.response.rows.map((r) => (
                  <div key={r.key} className="flex items-baseline justify-between gap-4 px-5 py-3">
                    <dt className="font-mono text-[11px] text-white/45">{r.key}</dt>
                    <dd className="tnum font-mono text-[11.5px] text-signal">{r.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="border-t border-white/[0.09] px-5 py-3 text-[12.5px] leading-relaxed text-white/55">
                {integration.response.note}
              </p>
            </div>

            <dl className="mt-8 grid gap-px border-t border-white/15 sm:grid-cols-2">
              {integration.facts.map((f) => (
                <div key={f.label} className="border-b border-white/15 py-4 sm:border-b-0 sm:border-r sm:pr-5 sm:last:border-r-0">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">{f.label}</dt>
                  <dd className="mt-2 text-[13.5px] leading-snug text-paper/85">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <p className="mt-10 max-w-[80ch] border-l-2 border-white/20 pl-4 font-mono text-[10.5px] leading-relaxed tracking-[0.06em] text-white/45">
          {integration.note}
        </p>
      </div>
    </section>
  );
}

/* ── derivation ───────────────────────────────────────────────────────── */

/**
 * The `after` snippet is the `before` snippet plus one inserted line and two
 * rewritten comments. Rather than hard-coding that here, it is derived from
 * the two arrays in lib/content/integration.ts so the content stays the only
 * place the code is written down.
 */
function derive() {
  const before = integration.before.code;
  const after = integration.after.code;

  const addIndex = after.findIndex((l) => l.tone === 'add');
  return {
    addIndex: addIndex === -1 ? before.length : addIndex,
    addLine: addIndex === -1 ? null : after[addIndex],
    dimAfter: after.find((l) => l.tone === 'dim')?.text ?? null,
    markAfter: after.find((l) => l.tone === 'mark')?.text ?? null,
  };
}

interface Rendered {
  key: string;
  code: string;
  comment: string | null;
  tone: 'plain' | 'dim' | 'mark' | 'add';
  inserted: boolean;
}

function buildLines({
  applied,
  addIndex,
  addLine,
  dimAfter,
  markAfter,
}: {
  applied: boolean;
  addIndex: number;
  addLine: AfterLine | null;
  dimAfter: string | null;
  markAfter: string | null;
}): Rendered[] {
  const out: Rendered[] = integration.before.code.map((l: Line, i) => {
    const { code, comment } = splitComment(l.text);
    return { key: `b${i}`, code, comment, tone: l.tone, inserted: false };
  });

  if (applied) {
    if (addLine) {
      const { code, comment } = splitComment(addLine.text);
      out.splice(addIndex, 0, { key: 'added', code, comment, tone: 'add', inserted: true });
    }
    // The two comments that describe what the change does.
    if (dimAfter) {
      const i = out.findIndex((l) => l.tone === 'dim');
      if (i !== -1) out[i] = { ...out[i], comment: splitComment(dimAfter).comment };
    }
    if (markAfter) {
      const i = out.findIndex((l) => l.tone === 'mark');
      if (i !== -1) out[i] = { ...out[i], comment: splitComment(markAfter).comment };
    }
  }

  return out;
}

function toneClass(tone: Rendered['tone']): string {
  switch (tone) {
    case 'dim':
      return 'text-white/35';
    case 'mark':
      return 'text-paper/90';
    case 'add':
      return 'text-signal';
    default:
      return 'text-paper/80';
  }
}
