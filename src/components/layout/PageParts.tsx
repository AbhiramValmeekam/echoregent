import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Title } from '@/components/ui/parts';
import { mail, SUBJECTS } from '@/lib/content/site';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * The blocks the inner pages are built from.
 *
 * The landing page hand-authors all thirteen of its sections because each one
 * is a different argument. The six inner pages are reference material, and
 * reference material that is hand-authored six times drifts — so it is
 * assembled from these instead, and the design survives because the skeleton
 * (band → shell → head → body) is the same one the landing sections use.
 */

/* ── a full-bleed band ─────────────────────────────────────────────────── */

const FIELD = {
  paper: 'bg-paper',
  wash: 'bg-wash',
  ink: 'bg-ink text-paper',
  teal: 'bg-signal text-ink',
  coral: 'bg-protect text-ink',
  gray: 'bg-signal text-ink',
} as const;

export function PageBand({
  id,
  tone: toneIn = 'paper',
  className = '',
  children,
}: {
  id?: string;
  tone?: keyof typeof FIELD;
  className?: string;
  children: ReactNode;
}) {
  // Inner pages stay white and navy; teal and coral are accents, not fields.
  const autoable = toneIn === 'paper' || toneIn === 'teal' || toneIn === 'coral' || toneIn === 'gray';
  const [auto, setAuto] = useState(false);
  const self = useRef<HTMLElement | null>(null);
  // Bands that are not fixed navy alternate white / navy by looking at their
  // neighbours, so a page reads as white and navy blocks without every call
  // site choosing a side. A band never goes navy next to a navy band.
  useLayoutEffect(() => {
    const el = self.current;
    if (!el || !autoable) return;
    // Count the run of alternating bands directly above this one; odd = navy.
    let n = 0;
    let p = el.previousElementSibling as HTMLElement | null;
    while (p && p.dataset.auto === '1') {
      n += 1;
      p = p.previousElementSibling as HTMLElement | null;
    }
    const next = el.nextElementSibling as HTMLElement | null;
    const nextForcedDark = next?.dataset.forced === '1' || (next?.tagName === 'SECTION' && next.className.includes('bg-ink'));
    setAuto(n % 2 === 1 && !nextForcedDark);
  }, [autoable]);
  const tone: keyof typeof FIELD = toneIn === 'ink' || auto ? 'ink' : toneIn === 'wash' ? 'wash' : 'paper';
  const shell = useRef<HTMLDivElement | null>(null);
  const wipe = useRef<HTMLDivElement | null>(null);
  const coloured = tone === 'ink';
  const [bg, fg] = FIELD[tone].split(' text-');

  useEffect(() => {
    const el = shell.current;
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      // The colour rises into the band like a curtain, scrubbed by the scroll,
      // as the navy answer does on the landing page.
      if (wipe.current) {
        gsap.fromTo(
          wipe.current,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 96%', end: 'top 50%', scrub: 0.6 },
          },
        );
      }
    }, el);

    // Each top-level block rises into place, once. This watches the viewport
    // rather than measuring scroll positions, so it cannot be thrown off by the
    // pinned sections above it adding height after this band has mounted — a
    // measured trigger that lands in the wrong place leaves the block hidden.
    const kids = Array.from(el.children) as HTMLElement[];
    kids.forEach((k) => {
      k.style.opacity = '0';
      k.style.transform = 'translateY(28px)';
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const t = e.target as HTMLElement;
          io.unobserve(t);
          gsap.to(t, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', clearProps: 'transform' });
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    );
    kids.forEach((k) => io.observe(k));
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      io.disconnect();
      window.clearTimeout(refresh);
      kids.forEach((k) => {
        k.style.opacity = '';
        k.style.transform = '';
      });
      ctx.revert();
    };
  }, []);

  return (
    <section
      id={id}
      ref={self as React.RefObject<HTMLElement>}
      data-dark={tone === 'ink' ? 'true' : undefined}
      data-auto={autoable ? '1' : undefined}
      data-forced={toneIn === 'ink' ? '1' : undefined}
      className={`relative scroll-mt-24 ${''} ${coloured ? '' : bg} ${fg ? `text-${fg}` : ''} ${className}`}
    >
      {coloured && (
        <div ref={wipe} data-wipe aria-hidden="true" className={`pointer-events-none absolute inset-0 ${bg}`}>
          {tone === 'ink' && <div className="tech-grid-dark absolute inset-0 opacity-60" />}
        </div>
      )}
      <span aria-hidden="true" className="pointer-events-none absolute right-6 top-6 z-10 h-2 w-2 rounded-full bg-protect md:right-10 md:top-10" />
      <div ref={shell} className="shell relative z-10 py-20 md:py-28 lg:py-32">{children}</div>
    </section>
  );
}

/* ── a subsection head ─────────────────────────────────────────────────── */

export function SubHead({
  label,
  heading,
  body,
  meta,
  tone = 'paper',
  className = '',
}: {
  label: string;
  heading?: readonly string[];
  body?: string;
  /** A right-aligned mono line — the console's habit of labelling the frame. */
  meta?: string;
  tone?: 'paper' | 'ink';
  className?: string;
}) {
  const onDark = tone === 'ink';
  return (
    <div className={className}>
      <div
        className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b pb-3 ${
          onDark ? 'border-white/15' : 'border-[var(--line)]'
        }`}
      >
        <h2 className={`font-mono text-[11px] uppercase tracking-[0.18em] ${onDark ? 'text-paper' : 'text-ink'}`}>
          {label}
        </h2>
        {meta && (
          <span className={`font-mono text-[10px] uppercase tracking-[0.14em] ${onDark ? 'text-white/40' : 'text-ink/70'}`}>
            {meta}
          </span>
        )}
      </div>
      {heading && (
        <Title
          lines={heading}
          className={`t-section mt-8 ${onDark ? 'text-paper' : 'text-ink'}`}
        />
      )}
      {body && (
        <p className={`t-lede mt-6 max-w-text ${onDark ? 'text-paper/70' : 'text-ink/60'}`}>{body}</p>
      )}
    </div>
  );
}

/* ── the sentence an area page opens its body with ─────────────────────── */

/**
 * What replaced the rail.
 *
 * The four area pages each carried a contents list between the hero and the
 * first section — seven `#anchors` on `/product`, six on `/research`, and so on.
 * The user removed the anchors, which left a heading and a list of links with
 * nothing to link to. What is here instead is the one thing about that band that
 * was ever information rather than navigation: a sentence saying what the page
 * contains.
 *
 * It is worth keeping rather than deleting outright, and `/product` is why. The
 * live site's headline says *four* systems and the page then describes *seven*
 * things, and the difference is real — four are pipeline stages, and MCP, the
 * proxy and the interface are not stages. That has to be said somewhere, and
 * this is the only place on the page it can be said without interrupting a
 * section. The other three areas use it for the same job at lower stakes.
 *
 * It takes prose, not a list. A page whose opening band enumerates its sections
 * is a table of contents whether or not the rows are clickable, and a table of
 * contents for a document you are already inside is the thing that was removed.
 *
 * `tone` is a prop because the band it replaces was not always the same one:
 * `/product`, `/pricing` and `/enterprise` put a wash band after a paper one,
 * while `/research` put a paper band after the wash models block. Two adjacent
 * bands of the same tone have no seam, so getting this wrong turns two sections
 * into one long one — which is a thing only a screenshot shows.
 */
export function PageIntro({
  label,
  tone = 'wash',
  children,
}: {
  label: string;
  /** Matches the band it replaces — see the note above. */
  tone?: 'paper' | 'wash';
  children: ReactNode;
}) {
  return (
    <PageBand tone={tone}>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70">{label}</p>
      <p className="t-lede mt-5 max-w-text text-ink/70">{children}</p>
    </PageBand>
  );
}

/* ── the contents list: nine cards on the home page ────────────────────── */

export type IndexItem = {
  /** A route — `/research`, `/pricing`. Always a page, never a `#anchor`. */
  href: string;
  label: string;
  blurb: string;
};

/**
 * The home page's table of contents: nine cards, each a `<Link>` to a page.
 *
 * It has been more than that. On an area page it was the same list with a `↓`
 * instead of a `→`, pointing at the seven `#anchors` below it — and the user
 * removed that: *"make it as one page and inside add all of that information, no
 * #classify or other things."* An area page now has no list of its own, because
 * a list whose every row moves you down the page you are already on is a table
 * of contents for a document that fits in one scroll.
 *
 * So there are two things it no longer does, and both are deletions rather than
 * restrictions. `glyph` is gone: every row now leaves the page, so the arrow is
 * a constant and a prop that can only take one value is a prop that lies. And it
 * takes its items from `ia.ts` rather than from `routes/areas.tsx`, which is
 * what let the two callers coexist — `IndexItem.href` is now a route or it is
 * nothing.
 */
export function PageIndex({
  items,
  label,
  className = '',
}: {
  items: readonly IndexItem[];
  label?: string;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div className={className}>
      {label && (
        <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">{label}</h2>
      )}

      <ol className="mt-8 grid gap-px border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <li key={p.href} className="border-b border-[var(--line)] sm:pr-8">
            <Link to={p.href} className="group flex h-full flex-col gap-3 py-6">
              <span className="flex items-baseline gap-4">
                <span className="font-mono text-[11px] text-signal">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-[clamp(1.1rem,2vw,1.5rem)] font-bold uppercase leading-none tracking-[-0.025em] text-ink transition-colors duration-300 group-hover:text-signal">
                  {p.label}
                </span>
                <span aria-hidden="true" className="ml-auto font-mono text-[11px] text-ink/70">
                  →
                </span>
              </span>
              <span className="text-[13.5px] leading-relaxed text-ink/60">{p.blurb}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── a monospace panel: code, JSON, or a measurement ───────────────────── */

type Line = { text: string; tone: 'plain' | 'dim' | 'add' | 'mark' };

export function CodePanel({
  label,
  code,
  note,
  className = '',
  tone = 'paper',
}: {
  label: string;
  code: readonly Line[];
  note?: string;
  className?: string;
  tone?: 'paper' | 'ink';
}) {
  const onDark = tone === 'ink';
  const skin = (t: Line['tone']) =>
    t === 'add'
      ? onDark
        ? 'text-signal'
        : 'text-signal'
      : t === 'mark'
        ? onDark
          ? 'text-protect'
          : 'text-ink'
        : t === 'dim'
          ? onDark
            ? 'text-white/35'
            : 'text-ink/70'
          : onDark
            ? 'text-white/80'
            : 'text-ink/80';

  return (
    <div className={`min-w-0 border ${onDark ? 'border-white/15 bg-white/[0.03]' : 'border-[var(--line)] bg-wash'} ${className}`}>
      <div
        className={`flex items-center gap-3 border-b px-4 py-2.5 ${
          onDark ? 'border-white/15' : 'border-[var(--line)]'
        }`}
      >
        <span className="chip-dot chip-dot--idle" aria-hidden="true" />
        <span className={`font-mono text-[10px] uppercase tracking-[0.16em] ${onDark ? 'text-white/50' : 'text-ink/70'}`}>
          {label}
        </span>
      </div>

      <pre className="overflow-x-auto px-4 py-4">
        <code className="block font-mono text-[12px] leading-[1.75]">
          {code.map((line, i) => (
            <span key={i} className={`block whitespace-pre ${skin(line.tone)}`}>
              {line.text || ' '}
            </span>
          ))}
        </code>
      </pre>

      {note && (
        <p
          className={`border-t px-4 py-3 text-[12.5px] leading-relaxed ${
            onDark ? 'border-white/15 text-white/55' : 'border-[var(--line-soft)] text-ink/70'
          }`}
        >
          {note}
        </p>
      )}
    </div>
  );
}

/* ── bullets ───────────────────────────────────────────────────────────── */

export function Bullets({
  items,
  tone = 'paper',
  className = '',
}: {
  items: readonly string[];
  tone?: 'paper' | 'ink';
  className?: string;
}) {
  const onDark = tone === 'ink';
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3.5">
          <span
            aria-hidden="true"
            className={`mt-[9px] h-px w-3.5 shrink-0 ${onDark ? 'bg-white/30' : 'bg-ink/25'}`}
          />
          <span className={`text-[14.5px] leading-relaxed ${onDark ? 'text-paper/70' : 'text-ink/70'}`}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ── a numbered/lettered item grid ─────────────────────────────────────── */

export function ItemGrid({
  items,
  columns = 2,
  tone = 'paper',
  className = '',
}: {
  items: readonly { title: string; body: string; numeral?: string; protected?: boolean }[];
  columns?: 2 | 3;
  tone?: 'paper' | 'ink';
  className?: string;
}) {
  const onDark = tone === 'ink';
  return (
    <div
      className={`grid gap-px border-t ${onDark ? 'border-white/15' : 'border-[var(--line)]'} ${
        columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'
      } ${className}`}
    >
      {items.map((item, i) => (
        <div
          key={item.title}
          className={`border-b py-7 md:pr-8 ${onDark ? 'border-white/15' : 'border-[var(--line)]'}`}
        >
          <div className="flex items-baseline gap-3">
            <span className={`font-mono text-[11px] ${onDark ? 'text-white/40' : 'text-ink/70'}`}>
              {item.numeral ?? String(i + 1).padStart(2, '0')}
            </span>
            {item.protected && <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-protect" aria-hidden="true" />}
          </div>
          <h3
            className={`mt-3 font-display text-[clamp(1.15rem,2vw,1.5rem)] font-bold uppercase leading-[1.08] tracking-[-0.025em] ${
              onDark ? 'text-paper' : 'text-ink'
            }`}
          >
            {item.title}
          </h3>
          <p className={`mt-3 max-w-[46ch] text-[14.5px] leading-relaxed ${onDark ? 'text-paper/65' : 'text-ink/70'}`}>
            {item.body}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ── a key/value table ─────────────────────────────────────────────────── */

export function DataTable({
  columns,
  rows,
  label,
  tone = 'paper',
  className = '',
}: {
  /** First column is the row label; the rest are the value columns. */
  columns: readonly string[];
  rows: readonly { label: string; values: readonly string[] }[];
  label: string;
  tone?: 'paper' | 'ink';
  className?: string;
}) {
  const onDark = tone === 'ink';
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full min-w-[640px] border-collapse text-left">
        <caption className="sr-only">{label}</caption>
        <thead>
          <tr className={`border-b ${onDark ? 'border-white/20' : 'border-[var(--line)]'}`}>
            <th
              scope="col"
              className={`py-3 pr-6 font-mono text-[10px] uppercase tracking-[0.16em] ${
                onDark ? 'text-white/45' : 'text-ink/70'
              }`}
            >
              {label}
            </th>
            {columns.map((c) => (
              <th
                key={c}
                scope="col"
                className={`py-3 pr-6 font-mono text-[10px] uppercase tracking-[0.16em] ${
                  onDark ? 'text-paper' : 'text-ink'
                }`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className={`border-b ${onDark ? 'border-white/12' : 'border-[var(--line-soft)]'}`}>
              <th
                scope="row"
                className={`py-3.5 pr-6 text-[14px] font-normal leading-snug ${
                  onDark ? 'text-paper/85' : 'text-ink/85'
                }`}
              >
                {row.label}
              </th>
              {row.values.map((v, i) => (
                <td
                  key={i}
                  className={`py-3.5 pr-6 font-mono text-[13px] ${
                    v === '✓'
                      ? 'text-signal'
                      : v === '—'
                        ? onDark
                          ? 'text-white/35'
                          : 'text-ink/70'
                        : onDark
                          ? 'text-paper/70'
                          : 'text-ink/75'
                  }`}
                >
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── the close every inner page ends on ────────────────────────────────── */

export function PageClose({
  heading,
  body,
  primary,
  secondary,
  children,
  flip,
}: {
  heading: readonly string[];
  body: string;
  primary?: { label: string; action: 'waitlist' | 'audit' | 'disclosure' | 'enterprise' };
  secondary?: { label: string; to: string };
  /** A page whose close *is* an object — the enterprise form, the contact
   *  index — passes it here rather than re-implementing this band. */
  children?: ReactNode;
  flip?: boolean;
}) {
  const light = false && (Boolean(children) || Boolean(flip));
  return (
    <section
      data-tone={light ? 'coral' : undefined}
      className={`relative overflow-hidden ${light ? 'bg-protect text-ink' : 'bg-ink text-paper'}`}
    >
      {!light && (
        <div aria-hidden="true" className="tech-grid-dark pointer-events-none absolute inset-0 opacity-60" />
      )}
      <span aria-hidden="true" className="absolute right-6 top-6 h-2 w-2 rounded-full bg-protect md:right-10 md:top-10" />
      <div className="shell relative py-20 md:py-28">
        {/* No `ch` cap here: from `md` up a mask line is `nowrap`, so a cap
            narrower than the authored line clips it silently instead of
            measuring it. The authored line breaks are the measure — see the
            note on <Title>. */}
        <Title lines={heading} className={`t-section ${light ? 'text-ink' : 'text-paper'}`} />
        <p className={`t-lede mt-7 max-w-text ${light ? 'text-ink/80' : 'text-paper/75'}`}>{body}</p>

        {(primary || secondary) && (
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {primary && (
              <a href={mail(SUBJECTS[primary.action])} className={light ? 'btn' : 'btn bg-paper text-ink hover:bg-signal'}>
                {primary.label}
                <span aria-hidden="true">→</span>
              </a>
            )}
            {secondary && (
              <Link to={secondary.to} className={light ? 'btn-ghost' : 'btn-dark'}>
                {secondary.label}
              </Link>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
