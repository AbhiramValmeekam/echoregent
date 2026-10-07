import { PageHero } from '@/components/layout/PageHero';
import { PageClose } from '@/components/layout/PageParts';
import { Playground } from '@/components/playground/Playground';
import { playground } from '@/lib/content/playground';

/**
 * /playground.
 *
 * The console had a home on the landing page between the pipeline and the
 * architecture. It has one here instead, where it is the whole page and a
 * reader who arrives has already decided they want to watch it run.
 *
 * The section renders with `head={false}`: the hero carries that section's
 * eyebrow, headline and intro verbatim, and printing them twice either side of
 * a band boundary is not a page, it is a stutter.
 */
export default function PlaygroundPage() {
  return (
    <>
      <PageHero
        eyebrow={playground.label}
        lines={['WATCH CONTEXT', 'DISAPPEAR.']}
        lede={playground.intro}
        meta={[
          { label: 'Samples', value: '3' },
          { label: 'Request sent', value: 'None — scripted in your browser' },
        ]}
      />

      <Playground head={false} />

      {/* The close's secondary is `/research`, not `/research#benchmarks` — the
          benchmark stopped being a section of that page and became the whole of
          it. The label is unchanged, because it is still describing what the
          reader will find. */}
      <PageClose
        heading={['WANT THIS ON', 'YOUR OWN CONTEXT?']}
        body="Nothing on this page left your browser. On real traffic the same pipeline runs between your application and your model — and the audit below is how you find out what it would remove."
        primary={{ label: playground.cta.label, action: 'audit' }}
        secondary={{ label: 'Read the benchmarks', to: '/research' }}
      />
    </>
  );
}
