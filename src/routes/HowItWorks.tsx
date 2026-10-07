import { ContextCollapse } from '@/components/collapse/ContextCollapse';
import { PipelineTrack } from '@/components/collapse/PipelineTrack';
import { PageHero } from '@/components/layout/PageHero';
import { PageClose } from '@/components/layout/PageParts';
import { SystemDiagram } from '@/components/pipeline/SystemDiagram';
import { LayerDiagram } from '@/components/architecture/LayerDiagram';
import { CodeSwap } from '@/components/integration/CodeSwap';

/**
 * /how-it-works — the three movements the landing page used to carry.
 *
 * The pipeline, the layer it sits in, and the one line you change to reach it.
 * All three are the same components the home page rendered, given their own
 * page and their own section numbers: the indices used to count sections on a
 * fifteen-section landing page (04, 06, 10), and renumbering them 01–03 is what
 * makes this read as one argument rather than three fragments.
 *
 * The hero does not reuse the pipeline's headline. It states the page, and the
 * pipeline states itself underneath — two headings saying the same thing with a
 * band boundary between them is the one thing this split had to avoid.
 */
export default function HowItWorks() {
  return (
    <>
      <PageHero
        tone="ink"
        eyebrow="How it works"
        lines={['ONE TURN,', 'START TO FINISH.']}
        lede="Three movements: the pipeline that runs on every request, the layer it sits in between your application and your model, and the single line of your code that changes."
        meta={[
          { label: 'Sections', value: '3' },
          { label: 'Hardware', value: 'CPU · no GPU' },
          { label: 'Status', value: 'As designed — not yet deployed' },
        ]}
      />

      <ContextCollapse />
      <PipelineTrack />

      <SystemDiagram index="01" />
      <LayerDiagram index="02" />
      <CodeSwap index="03" />

      <PageClose flip
        heading={['THE PIPELINE,', 'SYSTEM BY SYSTEM.']}
        body="Each stage above is a page of its own — what it does, what it runs on, and the exact response it returns."
        secondary={{ label: 'See the six systems', to: '/product' }}
      />
    </>
  );
}
