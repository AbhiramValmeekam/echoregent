import { PageHero } from '@/components/layout/PageHero';
import { PageBand, SubHead, ItemGrid, PageClose } from '@/components/layout/PageParts';
import { security } from '@/lib/content/security';

/**
 * /security.
 *
 * Three claims, in the order they have to be read: what happens to your data,
 * what never happens to it, and where it runs. The protected-zone band is on
 * navy because it is the page's one absolute — everything else describes a
 * policy, and that one describes an architectural boundary.
 *
 * The dependency-audit line is the live site's, with its "available on request"
 * removed: it offered a manifest against a repository that is not public, which
 * is a request that cannot be fulfilled.
 */
export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow={security.eyebrow}
        lines={security.heading.split('\n')}
        lede={security.lede}
        meta={[
          { label: 'Persistence', value: 'None' },
          { label: 'Encryption', value: 'TLS 1.3' },
          { label: 'Region', value: 'asia-south1' },
        ]}
      />

      <PageBand tone="teal">
        <SubHead label={security.dataHandling.label} heading={security.dataHandling.heading.split('\n')} />
        <ItemGrid items={security.dataHandling.items} columns={2} className="mt-12" />
      </PageBand>

      <PageBand id="protected-zones" tone="ink">
        <SubHead label={security.protectedZones.label} meta={security.protectedZones.badge} tone="ink" />
        <h2 className="mt-8 max-w-[20ch] font-display text-[clamp(1.75rem,3.6vw,3rem)] font-bold uppercase leading-[1.03] tracking-[-0.03em] text-paper">
          {security.protectedZones.heading.replace('\n', ' ')}
        </h2>

        <ul className="mt-8 flex flex-wrap gap-3">
          {security.protectedZones.tags.map((t) => (
            <li key={t} className="chip-dark !text-signal">
              <span className="chip-dot" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>

        <p className="t-lede mt-8 max-w-text text-paper/70">{security.protectedZones.body}</p>
        <ItemGrid items={security.protectedZones.items} columns={2} tone="ink" className="mt-12" />
      </PageBand>

      <PageBand id="infrastructure">
        <SubHead label={security.infrastructure.label} heading={security.infrastructure.heading.split('\n')} />
        <ItemGrid items={security.infrastructure.items} columns={3} className="mt-12" />
      </PageBand>

      <PageBand id="disclosure" tone="teal">
        <SubHead label={security.disclosure.label} meta="Responsible disclosure" />
        <p className="t-lede mt-8 max-w-text text-ink/70">{security.disclosure.body}</p>
        <p className="mt-6 max-w-text text-[15px] leading-relaxed text-ink/70">{security.disclosure.ask}</p>

        <dl className="mt-10 grid gap-px border-t border-[var(--line)] sm:grid-cols-3">
          {security.disclosure.response.map((r) => (
            <div key={r.label} className="border-b border-[var(--line)] py-5 sm:pr-8">
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/70">{r.label}</dt>
              <dd className="mt-2 font-mono text-[14px] text-ink/85">{r.value}</dd>
            </div>
          ))}
        </dl>
      </PageBand>

      <PageClose
        heading={['NO BOUNTY YET.', 'STILL OUR PROBLEM.']}
        body="There is no bug bounty programme to pay you, and that does not change what a report is worth to us: a fix, credited if you want it."
        primary={security.disclosure.cta}
        secondary={{ label: 'Read the product page', to: '/product' }}
      />
    </>
  );
}
