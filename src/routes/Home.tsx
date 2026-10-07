import { Hero } from '@/components/hero/Hero';
import { HeroStats } from '@/components/hero/HeroStats';
import { PartnerMarquee } from '@/components/hero/PartnerMarquee';
import { PageBand, SubHead } from '@/components/layout/PageParts';
import { ProductOverview, MORE_ROWS } from '@/components/overview/ProductOverview';
import { ContextCollapse } from '@/components/collapse/ContextCollapse';
import { CompoundingTurns } from '@/components/collapse/CompoundingTurns';
import { PipelineTrack } from '@/components/collapse/PipelineTrack';
import { EvidenceCard } from '@/components/arkadhi/Sections';
import { Block, Eyebrow, Reveal } from '@/components/arkadhi/Motion';
import { Title } from '@/components/ui/parts';
import { Closing } from '@/components/closing/Closing';

/**
 * The front door, and the index behind it.
 *
 * This page used to be fifteen sections — the whole argument, end to end, with
 * two canvases and an interactive playground in the middle of it. The showcase
 * sections became `/how-it-works`, `/playground` and `/features`, and the
 * reference material went back to being the four areas it belongs to. What is
 * left here is the promise, the four figures that back it, the partners, the
 * problem stated once, a grid of links to everything else, and the close.
 *
 * **Nine cards, not twenty-eight.** For a while this grid listed every topic
 * page the split had produced, which made it a sitemap rather than a front door
 * — a reader who wanted the product was shown seven ways to want it. The four
 * areas own their own contents lists now; this page only has to get someone to
 * the right area.
 *
 * The problem band is the one piece of the old argument that stayed. A reader
 * who has not understood that context is the expensive part has no reason to
 * click anything, and a card grid does not make that argument — so `Statement`
 * and `Baggage` remain, and everything after them is a link.
 *
 * The cards come from `ia.ts`, not from a list typed here. A page added to the
 * router appears on this page without anyone remembering to add it.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <HeroStats />
      <PartnerMarquee />

      {/* The shift, and the collapse that answers it. Two sections rather than
          one band, because each owns its own full-bleed field — but one
          argument. `Statement` opens with no bottom pad and `Baggage` has no
          top pad, so the seam between them costs nothing. */}
      <ContextCollapse />
      <CompoundingTurns />
      <PipelineTrack />

      <PageBand>
        <SubHead
          label="Overview"
          heading={['WHAT ECHOREGENT DOES,', 'AT A GLANCE.']}
          body="A context management layer that sits between your client and your model. Here is each part in brief; every page goes deep on its own."
        />
        <ProductOverview />
      </PageBand>

      <EvidenceCard />

      <Block id="further" tone="coral">
        <Eyebrow index="06" label="Go further" />
        <div className="mt-10 md:mt-14">
          <Title
            lines={['GO DEEPER ON', 'EVERY PART.']}
            className="font-display font-bold uppercase text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em]"
          />
        </div>
        <Reveal>
          <ProductOverview rows={MORE_ROWS} onColor />
        </Reveal>
      </Block>

      <Closing />
    </>
  );
}
