import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EASE } from '@/lib/motion/variants';

/**
 * The four feature visuals.
 *
 * Each one is a different shape on purpose — a feature section whose diagram
 * looks like its neighbour's is just a card with extra steps. All four are SVG
 * or DOM, all are decorative (the surrounding copy carries the meaning the
 * visual encodes), and all collapse to a composed end-state under reduced
 * motion because framer resolves `whileInView` without animating.
 */

/* ── 01 Understand — the classification matrix ────────────────────────── */

const DOMAINS = [
  'coding',
  'customer_support',
  'medical',
  'legal',
  'crisis',
  'sales',
  'finance',
  'education',
  'creative',
  'general',
];
const MATCHED = 0;

export function MatrixVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });

  return (
    <div ref={ref} className="border border-[var(--line)] bg-wash p-5">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-hush">classifier</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-hush">
          domain · intent · risk
        </span>
      </div>
      <ul className="mt-4 space-y-[3px]">
        {DOMAINS.map((d, row) => {
          const isMatch = row === MATCHED;
          return (
            <li key={d} className="flex items-center gap-3">
              <span
                className={`w-[124px] shrink-0 font-mono text-[10.5px] uppercase tracking-[0.08em] transition-colors duration-500 ${
                  isMatch && inView ? 'text-ink' : 'text-ink/70'
                }`}
              >
                {d}
              </span>
              <span className="flex flex-1 gap-[3px]">
                {[0, 1, 2].map((col) => (
                  <motion.span
                    key={col}
                    className={`h-[9px] flex-1 ${isMatch ? 'bg-signal' : 'bg-ink/10'}`}
                    initial={{ opacity: 0, scaleX: 0.3 }}
                    animate={inView ? { opacity: isMatch ? 1 : 0.85, scaleX: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      ease: EASE.calm,
                      delay: 0.02 * (row * 3 + col),
                    }}
                    style={{ originX: 0 }}
                  />
                ))}
              </span>
            </li>
          );
        })}
      </ul>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: EASE.calm, delay: 0.75 }}
        className="mt-5 flex flex-wrap gap-x-6 gap-y-1 border-t border-[var(--line-soft)] pt-4"
      >
        {[
          { k: 'domain', v: 'coding' },
          { k: 'intent', v: 'debug' },
          { k: 'risk', v: 'none' },
        ].map((r) => (
          <span key={r.k} className="font-mono text-[11px]">
            <span className="text-ink/70">{r.k}=</span>
            <span className="text-signal">{r.v}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── 02 Compress — the token stream collapsing ────────────────────────── */

const TOKEN_ROWS = 14;
const SURVIVORS = [0, 4, 9, 13];

export function CollapseVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });

  return (
    <div ref={ref} className="border border-[var(--line)] bg-wash p-5">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-hush">compressor</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-hush">14 → 4 blocks</span>
      </div>
      <div className="mt-4 space-y-[5px]">
        {Array.from({ length: TOKEN_ROWS }, (_, i) => {
          const survives = SURVIVORS.includes(i);
          return (
            <motion.div
              key={i}
              // The dropped blocks keep a visible stub rather than fading out
              // entirely: the picture has to show fourteen rows becoming four,
              // and at `bg-white/12` plus a deep opacity they vanished, leaving
              // four bars and no evidence of the ten that went.
              className={`h-[11px] origin-left ${survives ? 'bg-signal' : 'bg-ink/40'}`}
              style={{ width: survives ? '100%' : `${58 + ((i * 37) % 40)}%` }}
              initial={{ opacity: 1, scaleX: 1 }}
              animate={
                inView
                  ? survives
                    ? { opacity: 1, scaleX: 1 }
                    : { opacity: 0.22, scaleX: 0.14 }
                  : {}
              }
              transition={{
                duration: 0.7,
                ease: EASE.calm,
                delay: survives ? 0.1 + i * 0.05 : 0.5 + i * 0.045,
              }}
            />
          );
        })}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: EASE.calm, delay: 1.15 }}
        className="mt-5 border-t border-[var(--line-soft)] pt-4 font-mono text-[11px] text-hush"
      >
        <span className="text-signal">4 blocks kept</span> — the ones carrying the failure, the attempts
        and the current state
      </motion.p>
    </div>
  );
}

/* ── 03 Remember — semantic memory nodes ──────────────────────────────── */

export function NodesVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });

  // Left: this conversation. Right: what is already remembered.
  const query = { x: 34, y: 62 };
  const memories = [
    { x: 210, y: 26 },
    { x: 214, y: 62 },
    { x: 208, y: 98 },
  ];
  const match = memories[1];

  return (
    <div ref={ref} className="border border-[var(--line)] bg-wash p-5">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-hush">semantic cache</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-hush">384-d</span>
      </div>
      <svg viewBox="0 0 260 124" className="mt-4 h-[150px] w-full" aria-hidden="true">
        {/* String-match attempt — the thing that fails. */}
        <motion.line
          x1={query.x}
          y1={query.y}
          x2={memories[0].x}
          y2={memories[0].y}
          stroke="rgba(11,31,60,0.30)"
          strokeWidth="1"
          strokeDasharray="2 4"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE.calm, delay: 0.35 }}
        />
        {/* The semantic match — paraphrased, still found. */}
        <motion.line
          x1={query.x}
          y1={query.y}
          x2={match.x}
          y2={match.y}
          stroke="#14999C"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE.calm, delay: 0.6 }}
        />

        {/* Query node */}
        <motion.circle
          cx={query.x}
          cy={query.y}
          fill="#FFFFFF"
          stroke="#0B1F3C"
          strokeWidth="1.5"
          initial={{ r: 0, opacity: 0 }}
          animate={inView ? { r: 6, opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: EASE.calm }}
        />
        <text x={query.x} y={query.y + 22} textAnchor="middle" fill="#8F949B" fontSize="8" fontFamily="JetBrains Mono, monospace">
          THIS TURN
        </text>

        {/* Memory nodes */}
        {memories.map((m, i) => {
          const isMatch = m === match;
          return (
            <g key={i}>
              <motion.circle
                cx={m.x}
                cy={m.y}
                fill={isMatch ? '#14999C' : '#FFFFFF'}
                stroke={isMatch ? '#14999C' : 'rgba(11,31,60,0.40)'}
                strokeWidth="1.5"
                initial={{ r: 0, opacity: 0 }}
                animate={inView ? { r: isMatch ? 7 : 5, opacity: 1 } : {}}
                transition={{ duration: 0.4, ease: EASE.calm, delay: 0.15 + i * 0.08 }}
              />
              <motion.circle
                cx={m.x}
                cy={m.y}
                fill="none"
                stroke="#14999C"
                strokeWidth="1"
                initial={{ r: 0, opacity: 0 }}
                animate={inView ? { r: isMatch ? 14 : 0, opacity: isMatch ? 0.4 : 0 } : {}}
                transition={{ duration: 0.5, ease: EASE.calm, delay: 0.85 }}
              />
            </g>
          );
        })}
        <text x={214} y={118} textAnchor="middle" fill="#8F949B" fontSize="8" fontFamily="JetBrains Mono, monospace">
          REMEMBERED
        </text>

        <motion.text
          x={140}
          y={44}
          textAnchor="middle"
          fill="#14999C"
          fontSize="10"
          fontFamily="JetBrains Mono, monospace"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE.calm, delay: 1.05 }}
        >
          sim 0.94
        </motion.text>
      </svg>
      <p className="border-t border-[var(--line-soft)] pt-4 font-mono text-[11px] leading-relaxed text-hush">
        A rephrased question hits the same cache entry. The <span className="text-ink/70">dashed</span> edge is
        the string match that would have missed it.
      </p>
    </div>
  );
}

/* ── 04 Protect — locked zones ────────────────────────────────────────── */

export function ZonesVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });

  const zones = [
    { name: 'general', locked: false, w: '30%' },
    { name: 'medical', locked: true, w: '34%' },
    { name: 'coding', locked: false, w: '30%' },
  ];

  return (
    <div ref={ref} className="border border-[var(--line)] bg-wash p-5">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-hush">policy boundary</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-protect">1 zone locked</span>
      </div>

      <div className="relative mt-4 flex gap-[6px]">
        {zones.map((z) => (
          <div
            key={z.name}
            className={`relative h-[104px] border px-3 py-3 ${
              z.locked ? 'border-protect bg-protect/[0.07]' : 'border-[var(--line)] bg-wash'
            }`}
            style={{ width: z.w }}
          >
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.12em] ${
                z.locked ? 'text-protect' : 'text-ink/70'
              }`}
            >
              {z.name}
            </span>
            {z.locked ? (
              <>
                {/* The lock — a padlock reduced to two strokes. */}
                <svg viewBox="0 0 20 22" className="mt-5 h-6 w-6" aria-hidden="true">
                  <path d="M5 9V6.5a5 5 0 0 1 10 0V9" stroke="#FC7A5C" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <rect x="2.5" y="9" width="15" height="11" stroke="#FC7A5C" strokeWidth="1.5" fill="none" />
                </svg>
                <span className="absolute bottom-3 left-3 font-mono text-[9.5px] uppercase tracking-[0.12em] text-protect/80">
                  bypass
                </span>
              </>
            ) : (
              <div className="mt-5 space-y-[5px]">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-[7px] bg-ink/12"
                    style={{ width: `${64 + i * 12}%` }}
                    initial={{ opacity: 1 }}
                    animate={inView ? { opacity: 0.3 } : {}}
                    transition={{ duration: 0.6, ease: EASE.calm, delay: 0.5 + i * 0.08 }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        {/* The optimiser travelling right and stopping at the boundary.
            Transform-only: the bar is authored at its final width and scaled,
            so the animation never touches layout. */}
        <motion.span
          aria-hidden="true"
          className="absolute left-0 top-1/2 h-[2px] w-[30%] origin-left bg-signal"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: [0, 1, 1, 0] } : {}}
          transition={{ duration: 1.5, ease: EASE.precise, delay: 0.3, times: [0, 0.12, 0.85, 1] }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: EASE.calm, delay: 1.0 }}
        className="mt-4 border-t border-[var(--line-soft)] pt-4 font-mono text-[11px] leading-relaxed text-hush"
      >
        The optimiser stops at the boundary. <span className="text-protect">Medical, legal and crisis</span>{' '}
        conversations are forwarded whole.
      </motion.p>
    </div>
  );
}
