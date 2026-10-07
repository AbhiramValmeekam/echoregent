import { Link } from 'react-router-dom';
import { PageHero } from '@/components/layout/PageHero';
import { PageBand, SubHead, ItemGrid, PageClose } from '@/components/layout/PageParts';
import { about } from '@/lib/content/about';
import { principles, site, mail, SUBJECTS } from '@/lib/content/site';

/**
 * /about.
 *
 * Three parts: why the product exists, what it is for, and who to write to. The
 * four principles come from `site.ts` rather than from this page, because the
 * landing page renders the same four — one list, two places, no drift.
 *
 * The contact block is the close, so it reuses the close band rather than
 * inventing a third layout for "three ways to reach us".
 */
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.eyebrow}
        lines={about.heading.split('\n')}
        lede={about.lede}
        meta={[
          { label: 'Team', value: 'Yudi Labs' },
          { label: 'Based in', value: 'Hyderabad, India' },
          { label: 'Status', value: 'In development' },
        ]}
      />

      <PageBand tone="teal">
        <SubHead label={about.origin.label} heading={about.origin.heading.split('\n')} />
        <div className="mt-10 max-w-text space-y-6">
          {about.origin.paragraphs.map((p) => (
            <p key={p} className="text-[16px] leading-[1.75] text-ink/75">
              {p}
            </p>
          ))}
        </div>
      </PageBand>

      <PageBand id="mission" tone="ink">
        <SubHead label={about.mission.label} heading={about.mission.heading.split('\n')} tone="ink" />
        <p className="t-lede mt-7 max-w-text text-paper/70">{about.mission.body}</p>
        <p className="mt-6 max-w-text border-l-2 border-signal/50 pl-5 text-[15px] leading-relaxed text-paper/60">
          {about.mission.goal}
        </p>
      </PageBand>

      <PageBand id="principles">
        <SubHead
          label={principles.label}
          heading={principles.heading.split('\n')}
          body={principles.intro}
        />
        <ItemGrid items={principles.items} columns={2} className="mt-12" />
        <p className="mt-10 max-w-text border-t border-[var(--line)] pt-6 text-[14.5px] leading-relaxed text-ink/70">
          {principles.attribution}
        </p>
      </PageBand>

      <PageClose
        heading={about.contact.heading.split('\n')}
        body={`${about.contact.location.label} — ${about.contact.location.value}.`}
      >
        <div className="mt-10 flex flex-col gap-6 border-y border-white/20 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">Email us</p>
            <a
              href={mail(SUBJECTS.general)}
              className="link-underline mt-2 inline-block font-display text-[clamp(1.4rem,3.2vw,2.4rem)] font-bold tracking-[-0.02em] text-paper"
            >
              {site.contactEmail}
            </a>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/70">
              {about.contact.location.label} — {about.contact.location.value}
            </p>
          </div>
          <a href={mail(SUBJECTS.general)} className="btn shrink-0 self-start bg-paper text-ink hover:bg-signal md:self-center">
            Send an email →
          </a>
        </div>

        <div className="mt-2 grid gap-px md:grid-cols-3">
          {about.contact.items.map((item) => (
            <div key={item.title} className="border-b border-white/20 py-7 md:border-b-0 md:pr-8">
              <h3 className="font-mono text-[12px] uppercase tracking-[0.16em] text-paper">{item.title}</h3>
              <p className="mt-3 max-w-[38ch] text-[14.5px] leading-relaxed text-paper/75">{item.body}</p>
              {'to' in item.action ? (
                <Link
                  to={item.action.to}
                  className="link-underline mt-5 inline-block font-mono text-[11px] uppercase tracking-[0.12em] text-signal"
                >
                  {item.action.label} →
                </Link>
              ) : (
                <a
                  href={mail(SUBJECTS.general)}
                  className="link-underline mt-5 inline-block font-mono text-[11px] tracking-[0.06em] text-signal"
                >
                  {item.action.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </PageClose>
    </>
  );
}
