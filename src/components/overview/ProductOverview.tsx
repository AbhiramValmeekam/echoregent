import { Link } from 'react-router-dom';
import { pipeline, features, architecture } from '@/lib/content/site';
import { playground, samples } from '@/lib/content/playground';
import { product } from '@/lib/content/product';
import { research } from '@/lib/content/research';
import { pricing } from '@/lib/content/pricing';
import { enterprise } from '@/lib/content/enterprise';
import { security } from '@/lib/content/security';
import { about } from '@/lib/content/about';

const first = (t: string) => {
  const m = t.match(/^.*?[.!?](?=\s|$)/);
  return m ? m[0] : t;
};
const flat = (t: string) => t.replace(/\n/g, ' ');

/**
 * Landing-page overview. Each row summarises one detail page using that page's
 * own content, then links to it — the landing page says what is there, the
 * page itself says all of it.
 */
type Row = {
  numeral: string;
  to: string;
  label: string;
  heading: string;
  body: string;
  listTitle: string;
  list: { name: string; note: string }[];
  cta: string;
};

export const PRODUCT_ROWS: Row[] = [
  {
    numeral: '01',
    to: '/how-it-works',
    label: 'How it works',
    heading: pipeline.heading.replace(/\n/g, ' '),
    body: `${architecture.body} ${pipeline.intro}`,
    listTitle: 'The pipeline',
    list: pipeline.stages.map((s) => ({ name: s.name, note: s.summary })),
    cta: 'See how it works',
  },
  {
    numeral: '02',
    to: '/playground',
    label: 'Playground',
    heading: playground.heading,
    body: playground.intro,
    listTitle: 'Three sample conversations',
    list: samples.map((s) => ({ name: s.label, note: s.blurb })),
    cta: 'Open the playground',
  },
  {
    numeral: '03',
    to: '/features',
    label: 'Features',
    heading: features.heading.replace(/\n/g, ' '),
    body: features.intro,
    listTitle: 'The four decisions',
    list: features.items.map((f) => ({ name: f.name, note: f.line })),
    cta: 'See the features',
  },
  {
    numeral: '04',
    to: '/product',
    label: 'Product',
    heading: product.heading.replace(/\n/g, ' '),
    body: product.lede,
    listTitle: 'The systems',
    list: product.systems.map((s) => ({ name: s.name, note: s.lead })),
    cta: 'Explore the product',
  },
];

export function ProductOverview({ rows = PRODUCT_ROWS, onColor = false }: { rows?: Row[]; onColor?: boolean }) {
  return (
    <div className="mt-14 border-t border-[var(--line)]">
      {rows.map((r) => (
        <article
          key={r.to}
          className="grid gap-10 border-b border-[var(--line)] py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-16"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
              <span className={onColor ? 'text-ink' : 'text-signal'}>{r.numeral}</span> · {r.label}
            </p>
            <h3 className="mt-5 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold uppercase leading-[0.98] tracking-[-0.025em] text-ink">
              {r.heading}
            </h3>
            <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-ink/75">{r.body}</p>
            <Link to={r.to} className="btn mt-8">
              {r.cta}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div>
            <p className={`font-mono text-[10.5px] uppercase tracking-[0.18em] ${onColor ? 'text-ink/70' : 'text-muted'}`}>{r.listTitle}</p>
            <ul className="mt-4 border-t border-[var(--line)]">
              {r.list.map((i) => (
                <li key={i.name} className="grid gap-1 border-b border-[var(--line)] py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <span className="font-display text-[15px] font-bold uppercase tracking-[-0.01em] text-ink">{i.name}</span>
                  <span className="text-[14.5px] leading-snug text-ink/70">{i.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

export const MORE_ROWS: Row[] = [
  {
    numeral: '01',
    to: '/research',
    label: 'Research',
    heading: flat(research.heading),
    body: research.lede,
    listTitle: 'Three models, all on CPU',
    list: research.underTheHood.models.map((m) => ({ name: `${m.name} · ${m.model}`, note: first(m.body) })),
    cta: 'Read the research',
  },
  {
    numeral: '02',
    to: '/pricing',
    label: 'Pricing',
    heading: flat(pricing.heading),
    body: pricing.intro,
    listTitle: pricing.qualifier,
    list: pricing.tiers.map((t) => ({ name: t.name, note: `${t.price} · ${t.allowance} ${t.unit}. ${t.note}` })),
    cta: 'See the plans',
  },
  {
    numeral: '03',
    to: '/enterprise',
    label: 'Enterprise',
    heading: flat(enterprise.heading),
    body: enterprise.lede,
    listTitle: 'The problems we solve at scale',
    list: enterprise.why.items.map((i) => ({ name: i.title, note: first(i.body) })),
    cta: 'Talk to us',
  },
  {
    numeral: '04',
    to: '/security',
    label: 'Security',
    heading: flat(security.heading),
    body: security.lede,
    listTitle: 'Zero persistence',
    list: security.dataHandling.items.map((i) => ({ name: i.title, note: first(i.body) })),
    cta: 'Read the security page',
  },
  {
    numeral: '05',
    to: '/about',
    label: 'About',
    heading: flat(about.heading),
    body: about.lede,
    listTitle: 'Get in touch',
    list: about.contact.items.map((i) => ({ name: i.title, note: i.body })),
    cta: 'Meet the team',
  },
];
