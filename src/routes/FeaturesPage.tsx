import { PageHero } from '@/components/layout/PageHero';
import { PageClose } from '@/components/layout/PageParts';
import { Features } from '@/components/features/Features';
import { features, principles } from '@/lib/content/site';

/**
 * /features — the four decisions.
 *
 * These four bands were the landing page's seventh section. They are the
 * argument for how the pipeline was built rather than a list of what it does,
 * which is why they are not four of the six product pages: `/product` documents
 * the systems, and this explains the choices behind them.
 *
 * The section renders with `head={false}` — its eyebrow, headline and intro are
 * the hero above it, printed once.
 */
export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow={features.label}
        lines={features.heading.split('\n')}
        lede={features.intro}
        meta={[
          { label: 'Decisions', value: String(features.items.length) },
          { label: 'Applies to', value: 'Every request' },
        ]}
      />

      <Features head={false} />

      {/* The close's secondary is **the one internal link on the site that still
          carries a fragment**, and deliberately. About is not one of the four
          areas the user asked to be flattened — it was never split,
          `#principles` is the id of one of its bands, and no contents list ever
          offered it. The CTA says "Read the principles", so landing at the top
          of About instead would be a link that promises a destination and
          delivers a page. */}
      <PageClose
        heading={['THE IDEAS', 'BEHIND THEM.']}
        body={principles.intro}
        secondary={{ label: 'Read the principles', to: '/about#principles' }}
      />
    </>
  );
}
