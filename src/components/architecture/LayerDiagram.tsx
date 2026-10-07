import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHead, Title } from '@/components/ui/parts';
import { architecture } from '@/lib/content/site';
import { EASE } from '@/lib/motion/variants';

/**
 * The architecture.
 *
 * Three slabs — your application, this layer, your model — assembling on
 * scroll, with the payload visibly narrowing as it passes through. The middle
 * slab is drawn as a machine with four modules rather than as a logo, because
 * the modules are the product.
 */
export function LayerDiagram({ index = architecture.index }: { index?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px -12% 0px' });

  const [app, echo, model] = architecture.layers;
  const [inbound, outbound] = architecture.payload;

  return (
    <section id="architecture" data-tone="coral" className="relative bg-protect text-ink">
      <div className="shell relative py-24 md:py-32 lg:py-40">
        <SectionHead index={index} label={architecture.label} chip="Proxy · pass-through" chipTone="idle" />
        <Title
          lines={architecture.heading.split('\n')}
          className="t-section mt-12 max-md:max-w-[18ch] text-ink"
        />
        <p className="t-lede mt-8 max-w-text text-ink/60">{architecture.body}</p>

        <div ref={ref} className="mt-16 md:mt-20">
          <Slab layer={app} index={0} inView={inView} />
          <Connector inView={inView} delay={0.25} label={inbound.label} volume={inbound.volume} />
          <EchoSlab layer={echo} inView={inView} />
          <Connector inView={inView} delay={0.55} label={outbound.label} volume={outbound.volume} accent />
          <Slab layer={model} index={2} inView={inView} />

          {/* The scope line, inside the diagram rather than under it. Two
              numerals drawn into a spine are a claim being made visually, and a
              claim made in a picture is still a claim — this is the sentence
              that stops the picture from being the only thing said. */}
          <p className="mt-10 max-w-[80ch] border-l-2 border-[var(--line)] pl-4 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.1em] text-hush">
            {architecture.payloadSource}
          </p>
        </div>

        <dl className="mt-14 grid gap-px border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {architecture.policies.map((p) => (
            <div key={p.label} className="border-b border-[var(--line)] py-5 sm:border-b-0 sm:border-r sm:pr-6 sm:last:border-r-0">
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-hush">{p.label}</dt>
              <dd className="mt-2 font-mono text-[12.5px] text-ink/90">{p.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Slab({
  layer,
  index,
  inView,
}: {
  layer: (typeof architecture.layers)[number];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE.calm, delay: 0.08 * index }}
      className="border border-[var(--line)] bg-wash px-6 py-7 md:px-8 md:py-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="font-display text-[clamp(1.2rem,2.4vw,1.9rem)] font-bold uppercase leading-none tracking-[-0.025em] text-ink">
          {layer.name}
        </h3>
        <span className="font-mono text-meta uppercase text-hush">{layer.note}</span>
      </div>
      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
        {layer.items.map((it) => (
          <li key={it} className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-muted">
            {it}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/** The middle slab — the machine itself. */
function EchoSlab({
  layer,
  inView,
}: {
  layer: (typeof architecture.layers)[number];
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0.9 }}
      animate={inView ? { opacity: 1, scaleY: 1 } : {}}
      transition={{ duration: 0.9, ease: EASE.calm, delay: 0.15 }}
      style={{ originY: 0.5 }}
      className="relative border border-signal/35 bg-signal/[0.04] px-6 py-8 md:px-8 md:py-10"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="font-display text-[clamp(1.4rem,3vw,2.4rem)] font-bold uppercase leading-none tracking-[-0.03em] text-signal">
          {layer.name}
        </h3>
        <span className="font-mono text-meta uppercase text-signal/70">{layer.note}</span>
      </div>

      <div className="mt-7 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
        {layer.items.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE.calm, delay: 0.3 + i * 0.09 }}
            className="border border-signal/20 bg-paper/40 px-4 py-4"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-signal/60">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="mt-2 font-mono text-[12.5px] uppercase tracking-[0.06em] text-ink">{item}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/** The connecting spine, with the payload narrowing across it. */
function Connector({
  inView,
  delay,
  label,
  volume,
  accent = false,
}: {
  inView: boolean;
  delay: number;
  label: string;
  volume: string;
  accent?: boolean;
}) {
  return (
    <div className="relative flex items-center gap-5 py-4 pl-6 md:pl-8">
      <svg width="2" height="44" viewBox="0 0 2 44" aria-hidden="true" className="shrink-0 overflow-visible">
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2="44"
          stroke={accent ? '#14999C' : 'rgba(11,31,60,0.28)'}
          strokeWidth="1"
          strokeDasharray="3 5"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE.calm, delay }}
        />
      </svg>
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE.calm, delay: delay + 0.2 }}
        className="flex items-baseline gap-3"
      >
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-hush">{label}</span>
        <span className={`font-mono text-[11.5px] ${accent ? 'text-signal' : 'text-muted'}`}>{volume}</span>
      </motion.div>
    </div>
  );
}
