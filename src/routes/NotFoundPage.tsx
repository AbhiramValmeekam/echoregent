import { Link } from 'react-router-dom';
import { PageHero } from '@/components/layout/PageHero';
import { PageBand, SubHead } from '@/components/layout/PageParts';
import { IA } from '@/lib/content/ia';
import { cta, site, mail, SUBJECTS } from '@/lib/content/site';

/**
 * 404.
 *
 * The route list is the whole point of the page: a wrong URL is usually a near
 * miss, and a page that offers every real destination turns a dead end into the
 * navigation the reader was reaching for.
 *
 * **It listed the areas' sections under each area, and does not any more.** That
 * was the right reflex while the sections had anchors — a near miss like
 * `/product/clasify` landed here and found `Classify` one hop from its target.
 * The anchors are gone, so a row for `Classify` would now be a link to
 * `/product` under a second link to `/product`: two doors into one room, the
 * second of them promising something it cannot deliver. The near miss is served
 * better by the area row alone, which is where the classifier is documented.
 *
 * What the freed space carries is the page's own `blurb` from `ia.ts` — so a
 * lost reader gets nine routes and nine lines saying where each one goes,
 * rather than nine names.
 *
 * It keeps the `PageHero`, so the h1 is still the focus target and the title
 * still animates — a 404 that behaves differently from every other page reads
 * as a crash rather than as a page.
 */
export default function NotFoundPage() {
  // Top-level pages in IA order. `/` is excluded: offering the home page to
  // someone who is already lost is not an offer.
  const pages = IA.filter((p) => p.path !== '/').sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHero
        eyebrow="Error 404"
        lines={['THIS PAGE', 'DOES NOT EXIST.']}
        lede="The address resolved, but there is nothing here. It may have moved, or it may never have existed — every page this site actually has is listed below."
        meta={[
          { label: 'Site', value: site.name },
          { label: 'Status', value: site.status },
        ]}
      />

      <PageBand tone="wash">
        <SubHead
          label="Every page on this site"
          meta={`${pages.length} destinations`}
          heading={['TRY ONE', 'OF THESE.']}
        />

        <div className="mt-12 border-t border-[var(--line)]">
          {pages.map((page, i) => (
            <div
              key={page.path}
              className="border-b border-[var(--line)] py-6 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-baseline md:gap-12"
            >
              <Link to={page.path} className="group flex items-baseline gap-4">
                <span className="font-mono text-[11px] text-signal">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-[clamp(1.1rem,2vw,1.5rem)] font-bold uppercase leading-none tracking-[-0.025em] text-ink transition-colors duration-300 group-hover:text-signal">
                  {page.label}
                </span>
                <span aria-hidden="true" className="ml-auto font-mono text-[11px] text-ink/70 md:hidden">
                  →
                </span>
              </Link>

              <p className="mt-3 text-[13.5px] leading-relaxed text-ink/60 md:mt-0">{page.blurb}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink/70">
          Looking for something else?{' '}
          <a href={cta.primary.href} className="link-underline text-ink">
            {cta.primary.label}
          </a>{' '}
          ·{' '}
          <a href={mail(SUBJECTS.general)} className="link-underline text-ink">
            {site.contactEmail}
          </a>
        </p>
      </PageBand>
    </>
  );
}
