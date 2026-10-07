import { PipelineTrack } from '@/components/collapse/PipelineTrack';
import { PageHero } from '@/components/layout/PageHero';
import { PageIntro, PageClose } from '@/components/layout/PageParts';
import { AreaSections } from '@/routes/areas';
import { product } from '@/lib/content/product';

/**
 * /product — all seven parts on one page.
 *
 * This page has been three things. It was six systems stacked one under another
 * with a `#classify` anchor each; then an index of cards linking to seven pages;
 * then the six systems again with the anchors back; now it is the six systems
 * with nothing between them at all. The user's instruction was *"make it as one
 * page and inside add all of that information, no #classify or other things"* —
 * so the page keeps every word it had and loses the `↓` contents list that
 * pointed into it.
 *
 * **"Four systems" is the live site's own headline, carried verbatim, and the
 * page below it describes seven things.** That is not a mistake to paper over
 * with a count: the four are the pipeline stages — classify, compress, cache,
 * protect — and the other three are not stages. MCP and the proxy are the two
 * ways a request gets in, and the interface is what comes back out. The line
 * under the hero says exactly that, which is where it lives now that there is no
 * rail label to carry it.
 */
export default function ProductPage() {
  return (
    <>
      <PageHero
        eyebrow={product.eyebrow}
        lines={product.heading.split('\n')}
        lede={product.lede}
        meta={[
          { label: 'Runtime', value: 'CPU · no GPU' },
          { label: 'Interface', value: 'OpenAI-compatible' },
        ]}
      />

      <PipelineTrack />

      <PageIntro label="On this page">
        Four systems, two ways in, one interface. The four are the pipeline stages — classify,
        compress, cache and protect — and the last three are not stages: MCP and the proxy are how a
        request arrives, and the interface is what comes back.
      </PageIntro>

      <AreaSections area="/product" />

      <PageClose flip
        heading={product.cta.heading.split('\n')}
        body={product.cta.body}
        primary={product.cta.primary}
        secondary={product.cta.secondary}
      />
    </>
  );
}
