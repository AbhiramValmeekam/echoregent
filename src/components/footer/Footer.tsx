import { Link } from 'react-router-dom';
import { Logo } from '@/components/navigation/Logo';
import { footer, site, mail, SUBJECTS } from '@/lib/content/site';

/**
 * Footer.
 *
 * The wordmark block, three short columns, the entity line and the status.
 *
 * The columns are routes and anchors. The Research column lists the six parts
 * of the evidence and the Product column lists the six systems, so the footer
 * is a contents list for the site rather than a set of jumps into one long
 * document. It said `#methodology` and `#classify` when the areas were single
 * pages, then `/research/methodology` and `/product/classify` while they were
 * split; it says `#methodology` and `#classify` again, and the paths it used in
 * between still resolve through the legacy map in `ia.ts`.
 *
 * A link is one of two things: an internal route (`to`) or a `mailto:` (`href`).
 * They are told apart by the presence of `to`, not by sniffing the string for
 * a protocol — a route that happened to contain "http" would be a silly bug.
 */
export function Footer() {
  return (
    <footer className="relative bg-protect text-ink">
      <div className="shell py-8 md:py-10">
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,0.9fr))]">
          <div>
            <Link to="/" aria-label={`${site.name} — back to top`}>
              <Logo tone="ink" />
            </Link>
            <p className="mt-3 max-w-[34ch] text-[12.5px] leading-relaxed text-ink/80">{footer.tagline}</p>
            <a
              href={mail(SUBJECTS.general)}
              className="link-underline mt-3 inline-block font-mono text-[9.5px] tracking-[0.06em] text-ink"
            >
              {site.contactEmail}
            </a>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/70">{col.title}</h3>
              <ul className="mt-3 space-y-1.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {'to' in link ? (
                      <Link
                        to={link.to}
                        className="link-underline inline-block text-[12.5px] text-ink/85 transition-colors duration-300 hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="link-underline inline-block text-[12.5px] text-ink/85 transition-colors duration-300 hover:text-ink"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-ink/25 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink/70">{footer.legal}</p>
          <dl className="flex flex-wrap gap-x-8 gap-y-2">
            {footer.meta.map((m) => (
              <div key={m.label} className="flex items-center gap-2.5">
                <dt className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink/70">{m.label}</dt>
                <dd className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </footer>
  );
}
