import { PageHero } from '@/components/layout/PageHero';
import { PageBand, PageIntro, PageClose, SubHead } from '@/components/layout/PageParts';
import { AreaSections } from '@/routes/areas';
import { research } from '@/lib/content/research';

/**
 * /research — the mechanism, then the evidence.
 *
 * The page opens with the models rather than the numbers: three models, all on
 * CPU, described before anything they produced is quoted. That block sits above
 * the evidence on purpose — it is the one part of the page that reads as
 * reference to someone arriving cold, and a reader who does not know what
 * produced the numbers has no reason to go looking for them.
 *
 * The six sections after it are the evidence itself: the comparison and its
 * limits, the method, the arithmetic, the corpora, what none of it proves, and
 * the audit of the published claims. They were six `#anchors` with a `↓` list
 * between them and the models; the list is gone, and the sentence that replaces
 * it says how many there are and what they cover, which is the part of a
 * contents list that was information.
 *
 * **The headline is deliberately not the benchmark's.** The benchmark's own
 * headline opens the first evidence section, and a page that opened on the same
 * sentence would make the two look like duplicates of each other rather than an
 * argument and its evidence.
 */
export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow={research.eyebrow}
        lines={['WHAT WAS', 'MEASURED.']}
        lede={research.lede}
        meta={[
          { label: 'Dataset', value: 'LoCoMo' },
          { label: 'Independent verification', value: 'None' },
          { label: 'Status', value: 'Internal measurements' },
        ]}
      />

      <PageBand tone="teal">
        <SubHead
          label={research.underTheHood.label}
          heading={research.underTheHood.heading.split('\n')}
          body={research.underTheHood.body}
        />

        <div className="mt-12 grid gap-px border-t border-[var(--line)] md:grid-cols-3">
          {research.underTheHood.models.map((m) => (
            <div key={m.name} className="border-b border-[var(--line)] py-7 md:border-b-0 md:pr-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-[clamp(1.15rem,2vw,1.5rem)] font-bold uppercase leading-none tracking-[-0.025em] text-ink">
                  {m.name}
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal">
                  {m.model}
                </span>
              </div>
              <p className="mt-4 max-w-[42ch] text-[14.5px] leading-relaxed text-ink/70">{m.body}</p>
              <dl className="mt-6 flex gap-x-8 border-t border-[var(--line-soft)] pt-4">
                {m.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/70">
                      {f.label}
                    </dt>
                    <dd className="tnum mt-1.5 font-mono text-[14px] text-ink/85">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </PageBand>

      <PageIntro label="The evidence" tone="paper">
        Six parts: what the token comparison and the quality scores actually say, how the run was
        conducted, what the saving works out to per month, which corpora the figures came from,
        what none of it establishes, and which published claims were dropped rather than carried.
      </PageIntro>

      <AreaSections area="/research" />

      <PageClose flip
        heading={research.cta.heading.split('\n')}
        body={research.cta.body}
        primary={research.cta.primary}
        secondary={research.cta.secondary}
      />
    </>
  );
}
