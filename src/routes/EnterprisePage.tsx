import { CompoundingTurns } from '@/components/collapse/CompoundingTurns';
import { PageHero } from '@/components/layout/PageHero';
import { PageBand, PageIntro, PageClose, SubHead, ItemGrid } from '@/components/layout/PageParts';
import { AreaSections } from '@/routes/areas';
import { enterprise } from '@/lib/content/enterprise';

/**
 * /enterprise — the problem, then everything that answers it.
 *
 * The six problems scale creates lead, because they are the argument for the
 * page existing at all. Then the answers: the eight platform additions, the SLA
 * table, and the form.
 *
 * **The form is the last section rather than a page.** It used to be
 * `/enterprise/contact`, which meant a reader who wanted to read the SLA terms
 * had to know not to click "contact". Here the order is the order of the
 * questions — what does it cost, what is guaranteed, how do I start — and the
 * form is simply the last of them.
 *
 * The close has a primary button and no secondary, which it did have. It used to
 * point at `#sla`, and the point of that link was that the terms are a scroll
 * away rather than a navigation away — but the anchor is gone, and a secondary
 * button that scrolls the page you are already at the bottom of is not a link,
 * it is furniture. What the reader needs at the close is the form's mailto, and
 * the footer arrives immediately below.
 */
export default function EnterprisePage() {
  return (
    <>
      <PageHero
        eyebrow={enterprise.eyebrow}
        lines={enterprise.heading.split('\n')}
        lede={enterprise.lede}
        meta={[
          { label: 'Deployment', value: 'Cloud · VPC · on-prem' },
          { label: 'Uptime', value: 'Up to 99.95% contractual' },
          { label: 'Support', value: 'Dedicated engineer' },
        ]}
      />

      <CompoundingTurns />

      <PageBand tone="teal">
        <SubHead label={enterprise.why.label} heading={enterprise.why.heading.split('\n')} />
        <ItemGrid items={enterprise.why.items} columns={3} className="mt-12" />
      </PageBand>

      <PageIntro label="What enterprise buys">
        Three things: the platform additions on top of Pro, the contractual terms for uptime,
        latency, support and data residency, and a way to tell us the volume.
      </PageIntro>

      <AreaSections area="/enterprise" />

      <PageClose
        heading={['TELL US THE', 'VOLUME.']}
        body="Custom token volume, SLAs, on-prem or VPC deployment and a dedicated support engineer. We come back within one business day."
        primary={{ label: 'Talk to us about volume', action: 'enterprise' }}
      />
    </>
  );
}
