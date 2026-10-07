import { Link } from 'react-router-dom';
import { Block, Eyebrow, Reveal } from '@/components/arkadhi/Motion';
import { Title } from '@/components/ui/parts';
import { Kind } from '@/components/ui/Kind';
import { Counter } from '@/components/motion/Counter';
import { benchmark } from '@/lib/content/benchmark';
import { research } from '@/lib/content/research';

const LEDE = 'max-w-[60ch] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-[1.6]';
const BIG =
  'font-display font-bold uppercase text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em]';

/* ── TEAL — the evidence: figures on one white card ──────────────────────── */

export function EvidenceCard() {
  return (
    <Block id="evidence" tone="teal">
      <Eyebrow index="05" label="The evidence" />
      <div className="mt-10 md:mt-14">
        <Title lines={['MEASURED', 'BEFORE CLAIMED.']} className={BIG} />
      </div>
      <Reveal className="mt-10">
        <p className={LEDE}>{research.lede}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <article className="mt-14 max-w-[960px] bg-paper p-7 text-ink md:p-12">
          <dl className="divide-y divide-ink/15 border-y border-ink/15">
            {benchmark.figures.map((f) => (
              <div key={f.id} className="grid gap-3 py-6 sm:grid-cols-[minmax(0,12rem)_1fr_auto] sm:items-baseline sm:gap-8">
                <dt className="font-mono text-[clamp(1.8rem,3.4vw,2.6rem)] font-medium leading-none tracking-[-0.03em] whitespace-nowrap">
                  {f.count ? (
                    <Counter
                      to={f.count.to}
                      decimals={'decimals' in f.count ? f.count.decimals : 0}
                      prefix={'prefix' in f.count ? f.count.prefix : undefined}
                      suffix={'suffix' in f.count ? f.count.suffix : undefined}
                    />
                  ) : (
                    f.value
                  )}
                </dt>
                <dd>
                  <p className="text-[16.5px] leading-snug">{f.label}</p>
                  <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/70">{f.scope}</p>
                </dd>
                <Kind kind={f.provenance.kind} />
              </div>
            ))}
          </dl>
          <Link to="/research" className="btn mt-8">
            Method, scope and limits
            <span aria-hidden="true">→</span>
          </Link>
        </article>
      </Reveal>
    </Block>
  );
}
