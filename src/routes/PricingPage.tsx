import { PageHero } from '@/components/layout/PageHero';
import { PageBand, PageIntro, PageClose, SubHead } from '@/components/layout/PageParts';
import { AreaSections } from '@/routes/areas';
import { TierSpecs } from '@/components/pricing/Pricing';
import { pricing } from '@/lib/content/pricing';

/**
 * /pricing — the plans, then the two things that qualify them.
 *
 * The four tiers lead, because a pricing page that does not show prices is not a
 * pricing page. The comparison table and the FAQ follow on the same page rather
 * than as pages of their own: they are the two things that make a pricing page
 * long, and they are also the two things a reader wants *next to the prices*,
 * not one navigation away from them. The comparison is where the "which plan"
 * question gets answered, and a reader who has to leave the prices to answer it
 * comes back having forgotten them.
 *
 * They were `#compare` and `#faq` with a `↓` list between them and the tiers.
 * The list is gone with the anchors; what is left is the sentence below, which
 * says what follows without offering to take you there.
 *
 * The qualifier is repeated rather than stated once: four prices in one column
 * is exactly the shape that reads as an offer, and none of them is purchasable.
 */
export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow={pricing.label}
        lines={pricing.heading.split('\n')}
        lede={pricing.intro}
        meta={[
          { label: 'Free tier', value: '10M tokens / month' },
          { label: 'Status', value: pricing.qualifier },
          { label: 'Card required', value: 'No' },
        ]}
      />

      <PageBand tone="teal">
        <SubHead label={pricing.qualifier} meta="Four plans" />
        <div className="mt-10">
          <TierSpecs />
        </div>
      </PageBand>

      <PageIntro label="Before you choose">
        Two things follow the prices: the full comparison, every row of every plan with the notes
        that qualify it, and the five questions the table does not answer — what counts as a token,
        what is stored, and what happens at the limit.
      </PageIntro>

      <AreaSections area="/pricing" />

      <PageClose flip
        heading={['CHANGES WHEN', 'IT SHIPS.']}
        body="The prices on this page are the live site's published plans, carried over unchanged. None of them can be bought yet, and the numbers may move before any of them can."
        primary={pricing.cta}
        secondary={{ label: 'Talk to us about volume', to: '/enterprise' }}
      />
    </>
  );
}
