import { partners } from '@/lib/content/logos';

/**
 * The partner marquee.
 *
 * The live home page carries this directly under the four headline figures:
 * "Backed & supported by" and a scrolling row of four marks, each rendered
 * twice so the loop has no seam.
 *
 * Two things about the assets are worth knowing. They have genuinely different
 * shapes — T-Hub is square where the others are wide — so each sits in a fixed
 * box and is contained rather than stretched to a common width. And NVIDIA
 * Inception is not an image on the live site at all: it is an inline SVG
 * badge, which is why a text-only scrape of that page reports three logos.
 *
 * The marks are desaturated at rest. They are four differently-branded logos
 * dropped into a strictly five-colour page, and at full chroma they would be
 * the loudest thing above the fold; the colour returns on hover. The animation
 * is stopped entirely under reduced motion — see `.marquee-track` in index.css.
 */
export function PartnerMarquee() {
  const track = [...partners.items, ...partners.items];

  return (
    <section
      aria-label={partners.label}
      className="relative border-t border-[var(--line)] bg-paper py-12 md:py-14"
    >
      <div className="shell">
        <p className="flex items-center gap-3 font-mono text-meta uppercase tracking-[0.24em] text-signal">
          <span className="h-px w-8 bg-ink/20" aria-hidden="true" />
          {partners.label}
        </p>
      </div>

      <div className="relative mt-8 overflow-hidden">
        {/* The edges fade rather than cut — a hard crop reads as a layout bug. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent md:w-28"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent md:w-28"
        />

        <ul className="marquee-track flex w-max items-center gap-14 pr-14 md:gap-24 md:pr-24">
          {track.map((p, i) => (
            <li
              key={`${p.id}-${i}`}
              className="group flex h-14 w-[132px] shrink-0 items-center justify-center md:w-[168px]"
            >
              <img
                src={p.src}
                alt={p.name}
                width={p.w}
                height={p.h}
                loading="lazy"
                decoding="async"
                className="max-h-full max-w-full object-contain transition-transform duration-500 ease-calm group-hover:scale-105"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* The marquee duplicates every mark for the loop; a screen reader gets
          the list once, in order, rather than eight items. */}
      <p className="sr-only">
        {partners.items.map((p) => p.name).join(', ')}
      </p>
    </section>
  );
}
