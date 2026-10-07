import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHead, Title } from '@/components/ui/parts';
import { ecosystem } from '@/lib/content/site';
import { EASE, prefersReduced } from '@/lib/motion/variants';
import { useCursorState } from '@/components/cursor/Cursor';

/**
 * Compatibility.
 *
 * A request flows from the client on the left, through the layer, to whichever
 * model is behind it on the right. The diagram is drawn rather than illustrated
 * because the topology is the claim: the layer is not bound to a model.
 *
 * Above `md` the three columns are laid out horizontally with an SVG behind
 * them. Below it, the same three groups stack vertically and the SVG is
 * removed — a 400px-wide fan of curves is decoration, not information.
 */

const MID = '50';
/** The layer panel is `w-[17%]` centred on 50%, so its edges are at 41.5 and
 *  58.5. The curves must meet those edges, not some rounder number — a
 *  connector that stops short of the box reads as a broken diagram. */
const LAYER_L = 41.5;
const LAYER_R = 58.5;

/** "ONE LAYER. ANY MODEL." → one masked line per sentence. */
const headingLines = (ecosystem.heading.match(/[^.]+\./g) ?? [ecosystem.heading]).map((s) => s.trim());

/**
 * `head={false}` drops the band's own `SectionHead` + `Title` + intro.
 *
 * It is used inside the proxy's block on `/product`, where the section
 * immediately above has already said "Drop-in. Any model." as its lead —
 * rendering this band's heading as well would put the same claim on the page
 * twice, once at `t-section` and once at `t-section` again a screen apart. What
 * replaces it is a one-word label, because a diagram with no name above it reads
 * as an orphan.
 *
 * The trailing `ecosystem.note` is not part of the head and renders either way:
 * it is the caveat that says compatibility describes an interface and not a
 * shipped integration, and a page that shows the fan without it is making a
 * claim the project has not earned.
 */
export function ModelNetwork({ head = true }: { head?: boolean } = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-18% 0px -18% 0px' });
  const reduced = prefersReduced();
  const cursor = useCursorState('target', 'Network');

  const surfaces = ecosystem.surfaces;
  const models = ecosystem.models;

  /** Evenly distributed centres for n nodes, in percent of container height. */
  const centres = (n: number) => Array.from({ length: n }, (_, i) => ((i + 0.5) / n) * 100);

  const surfaceY = centres(surfaces.length);
  const modelY = centres(models.length);

  return (
    <section className="relative bg-paper">
      <div className="shell py-24 md:py-32 lg:py-40">
        {head ? (
          <>
            <SectionHead
              index={ecosystem.index}
              label={ecosystem.label}
              chip="Intended interface"
              chipTone="idle"
            />
            <Title lines={headingLines} className="t-section mt-12 text-ink" />
            <p className="t-lede mt-8 max-w-text text-ink/60">{ecosystem.body}</p>
          </>
        ) : (
          <p className="font-mono text-meta uppercase text-muted">{ecosystem.label}</p>
        )}

        <div ref={ref} {...cursor} className="mt-16">
          {/* ── desktop: the fan ─────────────────────────────────────── */}
          <div className="relative hidden h-[460px] md:block">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {surfaceY.map((y, i) => (
                <Flow key={`s${i}`} d={`M 0 ${y} C 20 ${y}, 22 ${MID}, ${LAYER_L} ${MID}`} inView={inView} delay={0.05 * i} reduced={reduced} />
              ))}
              {modelY.map((y, i) => (
                <Flow key={`m${i}`} d={`M ${LAYER_R} ${MID} C 78 ${MID}, 80 ${y}, 100 ${y}`} inView={inView} delay={0.05 * i} reduced={reduced} />
              ))}
            </svg>

            {/* Clients */}
            <ul className="absolute left-0 top-0 h-full w-[27%]">
              {surfaces.map((s, i) => (
                <li key={s} className="absolute left-0 w-full -translate-y-1/2" style={{ top: `${surfaceY[i]}%` }}>
                  <span className="block border border-[var(--line)] bg-paper px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                    {s}
                  </span>
                </li>
              ))}
            </ul>

            {/* The layer.
                The positioning classes live on a plain `div` and the animation
                on an inner one: framer writes `transform` inline, which would
                overwrite the `-translate-x-1/2 -translate-y-1/2` centring and
                drop the panel half its own width down and to the right. */}
            <div className="absolute left-1/2 top-1/2 w-[17%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                initial={{ opacity: 0, scaleY: 0.86 }}
                animate={inView ? { opacity: 1, scaleY: 1 } : {}}
                transition={{ duration: 0.8, ease: EASE.calm, delay: 0.15 }}
                className="border border-signal/40 bg-signal/[0.06] px-3 py-6 text-center"
              >
                <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-signal/70">
                  layer
                </span>
                <span className="mt-2 block font-display text-[clamp(0.8rem,1.4vw,1.05rem)] font-bold uppercase leading-tight tracking-[-0.02em] text-signal">
                  EchoRegent
                </span>
                <span className="mt-3 block font-mono text-[9.5px] uppercase tracking-[0.14em] text-hush">
                  openai format
                </span>
              </motion.div>
            </div>

            {/* Models */}
            <ul className="absolute right-0 top-0 h-full w-[27%]">
              {models.map((m, i) => (
                <li key={m} className="absolute right-0 w-full -translate-y-1/2" style={{ top: `${modelY[i]}%` }}>
                  <span className="block border border-[var(--line)] bg-paper px-3 py-2 text-right font-mono text-[11px] uppercase tracking-[0.08em] text-ink/80">
                    {m}
                  </span>
                </li>
              ))}
            </ul>

            <span className="absolute bottom-0 left-0 font-mono text-[10px] uppercase tracking-[0.16em] text-hush">
              your client
            </span>
            <span className="absolute bottom-0 right-0 font-mono text-[10px] uppercase tracking-[0.16em] text-hush">
              your model
            </span>
          </div>

          {/* ── mobile: the stack ────────────────────────────────────── */}
          <div className="md:hidden">
            <Column title="Your client" items={surfaces} tone="muted" />
            <div className="my-5 border border-signal/40 bg-signal/[0.06] px-4 py-4 text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal/70">layer</span>
              <span className="ml-3 font-display text-[15px] font-bold uppercase tracking-[-0.02em] text-signal">
                EchoRegent
              </span>
              <span className="mt-2 block font-mono text-[9.5px] uppercase tracking-[0.14em] text-hush">
                openai format
              </span>
            </div>
            <Column title="Your model" items={models} tone="bright" />
          </div>
        </div>

        <p className="mt-10 max-w-[80ch] border-l-2 border-[var(--line)] pl-4 font-mono text-[10.5px] leading-relaxed tracking-[0.06em] text-hush">
          {ecosystem.note}
        </p>
      </div>
    </section>
  );
}

/** One connector, with dashes travelling along it. */
function Flow({
  d,
  inView,
  delay,
  reduced,
}: {
  d: string;
  inView: boolean;
  delay: number;
  reduced: boolean;
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="#14999C"
      strokeWidth="1"
      strokeDasharray="4 6"
      vectorEffect="non-scaling-stroke"
      initial={{ opacity: 0 }}
      animate={
        inView
          ? reduced
            ? { opacity: 0.35 }
            : { opacity: 0.45, strokeDashoffset: [0, -20] }
          : { opacity: 0 }
      }
      transition={
        reduced
          ? { duration: 0.4, ease: EASE.calm, delay }
          : {
              opacity: { duration: 0.6, ease: EASE.calm, delay },
              strokeDashoffset: {
                duration: 1.6,
                ease: 'linear',
                repeat: Infinity,
                delay,
              },
            }
      }
    />
  );
}

function Column({
  title,
  items,
  tone,
}: {
  title: string;
  items: readonly string[];
  tone: 'muted' | 'bright';
}) {
  return (
    <div>
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-hush">{title}</div>
      <ul className="grid grid-cols-2 gap-[6px]">
        {items.map((it) => (
          <li
            key={it}
            className={`border border-[var(--line)] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.06em] ${
              tone === 'bright' ? 'text-ink/80' : 'text-ink/70'
            }`}
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
