import type { ReactNode } from 'react';
import { PageBand, SubHead, CodePanel, Bullets, DataTable, ItemGrid } from '@/components/layout/PageParts';
import {
  BenchmarkMethodology,
  BenchmarkComparison,
  BenchmarkFigures,
  BenchmarkQuality,
  BenchmarkJudgeLoad,
  BenchmarkLimits,
} from '@/components/benchmark/Benchmark';
import { ContactForm } from '@/components/enterprise/ContactForm';
import { ModelNetwork } from '@/components/ecosystem/ModelNetwork';
import { Kind } from '@/components/ui/Kind';
import { Title } from '@/components/ui/parts';
import { product } from '@/lib/content/product';
import { research } from '@/lib/content/research';
import { pricing } from '@/lib/content/pricing';
import { enterprise } from '@/lib/content/enterprise';
import { benchmark } from '@/lib/content/benchmark';
import { mail, SUBJECTS } from '@/lib/content/site';

/**
 * The sections of the four reference areas.
 *
 * **This file has been on both sides of the same argument.** It was
 * `topics.tsx` and registered eighteen topic pages; then it became the four
 * areas' section lists, each carrying an `id` so that `#classify` and
 * `#benchmarks` existed as anchors; and the anchors are now gone too. The user's
 * instruction was to the point: *"make it as one page and inside add all of that
 * information, no #classify or other things."*
 *
 * So what is left is an ordered list of bodies per area. No ids, no rail, no
 * in-page navigation — a section is a block of the page, and the page is the
 * only thing a link can address.
 *
 * The bodies themselves are unchanged markup, and that is the point of both
 * moves: the split was structural and so was the un-split. What was deleted
 * each time is what existed only to serve navigation.
 *
 * The four legacy paths (`/product/classify` and its siblings) still resolve —
 * to the page rather than to an anchor now, because there is no longer an
 * anchor to resolve to. See `LEGACY` in `ia.ts`.
 */

export type AreaSection = {
  /**
   * A stable React key, not an anchor.
   *
   * It has to be a string rather than the array index: a body is a component
   * with a masked `Title` and its own `gsap.context`, and reordering the list
   * must not make React reuse one section's instance for another's content.
   */
  key: string;
  Body: () => ReactNode;
};

/* ── product ───────────────────────────────────────────────────────────── */

type ProductSystem = (typeof product.systems)[number];

/** The stat line every product section ends its prose column on. */
function SystemStat({ stat }: { stat: ProductSystem['stat'] }) {
  return (
    <div className="mt-8 flex flex-wrap items-baseline gap-4 border-t border-[var(--line)] pt-6">
      <span className="tnum font-display text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-none tracking-[-0.03em] text-ink">
        {stat.value}
      </span>
      <span className="font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.1em] text-ink/70">
        {stat.label}
      </span>
      <Kind kind={stat.kind} />
    </div>
  );
}

/**
 * One system, as a section.
 *
 * This is the block that was the sixth-of-six on `/product`, then a page of its
 * own, and is a section again. Its heading sits at `h2` — the page hero owns the
 * only `h1`, which is what `useRouteScroll` focuses on arrival.
 */
const SYSTEM_TONES = ['paper', 'paper', 'paper', 'paper', 'paper', 'paper'] as const;

function SystemBody({ system: s }: { system: ProductSystem }) {
  const tone = SYSTEM_TONES[Math.max(0, product.systems.findIndex((x) => x.id === s.id)) % SYSTEM_TONES.length];
  return (
    <PageBand tone={tone}>
      <SubHead label={`${s.numeral} — ${s.label}`} meta={s.name} />

      <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div>
          {/* The lead sentence is the heading; it is not a `Title`, because a
              sentence at `t-section` size is exactly what the mask constraint
              forbids. */}
          <h2 className="max-w-[24ch] font-display text-[clamp(1.5rem,3vw,2.35rem)] font-bold uppercase leading-[1.05] tracking-[-0.03em] text-ink">
            {s.lead}
          </h2>

          <div className="mt-7 space-y-5">
            {s.body.map((p) => (
              <p key={p} className="max-w-text text-[15.5px] leading-relaxed text-ink/70">
                {p}
              </p>
            ))}
          </div>

          {'zones' in s && (
            <ul className="mt-8 grid gap-px border-t border-[var(--line)] sm:grid-cols-3">
              {s.zones.map((z) => (
                <li key={z.name} className="border-b border-[var(--line)] py-4 sm:pr-6">
                  <div className="flex items-center gap-2.5">
                    <span className="chip-dot" aria-hidden="true" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
                      {z.name}
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink/70">{z.detail}</p>
                </li>
              ))}
            </ul>
          )}

          {'tools' in s && (
            <ul className="mt-8 space-y-4 border-t border-[var(--line)] pt-6">
              {s.tools.map((t) => (
                <li key={t.name} className="flex flex-col gap-1 sm:flex-row sm:gap-5">
                  <span className="w-[7.5rem] shrink-0 font-mono text-[12px] text-signal">
                    {t.name}()
                  </span>
                  <span className="max-w-[52ch] text-[14px] leading-relaxed text-ink/70">{t.detail}</span>
                </li>
              ))}
            </ul>
          )}

          {'bullets' in s && (
            <Bullets items={s.bullets} className="mt-8 border-t border-[var(--line)] pt-6" />
          )}

          <SystemStat stat={s.stat} />
        </div>

        <div className="lg:pt-2">
          <CodePanel
            label={s.panel.label}
            code={s.panel.code}
            note={'note' in s.panel ? s.panel.note : undefined}
          />
        </div>
      </div>
    </PageBand>
  );
}

/** The interface — the one product section that is a table, not a system. */
function InterfaceBody() {
  return (
    <PageBand tone="ink">
      <SubHead label="Interface" meta={product.headers.label} tone="ink" />
      <p className="mt-8 max-w-text text-[15.5px] leading-relaxed text-paper/70">
        {product.headers.note}
      </p>

      <dl className="mt-10 border-t border-white/15">
        {product.headers.rows.map((r) => (
          <div
            key={r.key}
            className="flex flex-col gap-1.5 border-b border-white/12 py-4 sm:flex-row sm:items-baseline sm:gap-8"
          >
            <dt className="w-[19rem] shrink-0 font-mono text-[12.5px] text-signal">{r.key}</dt>
            <dd className="font-mono text-[12.5px] leading-relaxed text-white/65">{r.value}</dd>
          </div>
        ))}
      </dl>
    </PageBand>
  );
}

const productSections: AreaSection[] = [
  ...product.systems.map((s): AreaSection => ({
    key: s.id,
    Body: () => (
      <>
        <SystemBody system={s} />
        {/* Routing is the proxy's whole subject, so the any-model fan sits inside
            the proxy's block rather than after it. */}
        {s.id === 'proxy' && <ModelNetwork head={false} />}
      </>
    ),
  })),
  { key: 'headers', Body: InterfaceBody },
];

/* ── research ──────────────────────────────────────────────────────────── */

function BenchmarksBody() {
  // The gate is repeated here, at section level, because the heading above the
  // blocks reads a number. Gating only the blocks would leave the claim
  // standing at the top of a section that no longer supports it.
  if (!benchmark.enabled) {
    return (
      <PageBand>
        <SubHead label="Benchmarks" meta="Withdrawn" />
        <p className="mt-8 max-w-text text-[15.5px] leading-relaxed text-ink/70">
          The numeric results in this section have been withdrawn pending independent verification.
          The method and the limits are unaffected — they are at <em>#methodology</em> and{' '}
          <em>#limits</em> on this page.
        </p>
      </PageBand>
    );
  }

  return (
    <>
      <PageBand tone="teal">
        <SubHead
          label="Benchmarks"
          heading={benchmark.heading.split('\n')}
          body={benchmark.intro}
          meta="Read the methodology first"
        />
        <BenchmarkComparison />
        <BenchmarkFigures />
        <BenchmarkQuality />
        <BenchmarkJudgeLoad />
      </PageBand>

      {/* The finding, stated once, with the limit attached to it. */}
      <PageBand tone="ink">
        <SubHead label={research.finding.label} tone="ink" />
        <h2 className="mt-8 max-w-[26ch] font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-bold uppercase leading-[1.03] tracking-[-0.03em] text-paper">
          {research.finding.heading}
        </h2>
        <p className="t-lede mt-7 max-w-text text-paper/70">{research.finding.body}</p>
        <p className="mt-6 max-w-text border-l-2 border-signal pl-5 text-[14px] leading-relaxed text-paper/60">
          {research.finding.caveat}
        </p>
      </PageBand>
    </>
  );
}

function MethodologyBody() {
  return (
    <PageBand tone="coral">
      <SubHead
        label={benchmark.methodology.label}
        heading={['HOW IT WAS', 'MEASURED.']}
        meta="Read before the numbers"
      />
      <BenchmarkMethodology />
    </PageBand>
  );
}

function EconomicsBody() {
  return (
    <PageBand>
      <SubHead
        label={research.economics.label}
        heading={['THE ARITHMETIC,', 'SHOWN.']}
        meta={research.economics.heading}
      />

      <dl className="mt-10 border-t border-[var(--line)]">
        {research.economics.steps.map((s, i) => (
          <div
            key={s.label}
            className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-[var(--line)] py-5"
          >
            <dt className="flex items-baseline gap-5 text-[15px] text-ink/80">
              <span className="font-mono text-[11px] text-ink/70">{String(i + 1).padStart(2, '0')}</span>
              {s.label}
            </dt>
            <dd
              className={`tnum font-mono ${
                i === research.economics.steps.length - 1
                  ? 'text-[clamp(1.25rem,2.4vw,1.9rem)] text-signal'
                  : 'text-[15px] text-ink/85'
              }`}
            >
              {s.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-8 max-w-text text-[14.5px] leading-relaxed text-ink/70">{research.economics.note}</p>
      <p className="mt-4 max-w-text text-[14px] leading-relaxed text-ink/60">
        {research.economics.caveat}
      </p>
    </PageBand>
  );
}

function DatasetsBody() {
  return (
    <PageBand tone="paper">
      <SubHead
        label={research.datasets.label}
        heading={['THREE', 'DATASETS.']}
        meta={research.datasets.heading}
      />
      <div className="mt-12 grid gap-px border-t border-[var(--line)] md:grid-cols-3">
        {research.datasets.items.map((d) => (
          <div
            key={d.name}
            className="flex flex-col border-b border-[var(--line)] py-7 md:border-b-0 md:pr-8"
          >
            <div className="flex items-center gap-2.5">
              {'protected' in d && <span className="chip-dot" aria-hidden="true" />}
              <h2 className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-ink">{d.name}</h2>
            </div>
            <p className="mt-4 max-w-[40ch] text-[14.5px] leading-relaxed text-ink/70">{d.body}</p>
            <p className="mt-6 border-t border-[var(--line-soft)] pt-4 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink/70">
              {d.note}
            </p>
          </div>
        ))}
      </div>
    </PageBand>
  );
}

function LimitsBody() {
  return (
    <PageBand tone="teal">
      <SubHead
        label={benchmark.limits.label}
        heading={['WHAT THIS', 'DOES NOT PROVE.']}
        meta="Read with the numbers"
      />
      <BenchmarkLimits />
    </PageBand>
  );
}

function IntegrityBody() {
  return (
    <PageBand tone="ink">
      <SubHead
        label={research.integrity.label}
        heading={['WHAT WE ARE', 'NOT REPEATING.']}
        meta={research.integrity.heading}
        tone="ink"
      />
      <ul className="mt-10 border-t border-white/15">
        {research.integrity.items.map((item) => (
          <li
            key={item.claim}
            className="border-b border-white/12 py-7 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12"
          >
            <div>
              <p className="font-display text-[clamp(1.05rem,1.9vw,1.4rem)] font-bold leading-[1.15] tracking-[-0.02em] text-paper">
                {item.claim}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span className="chip-dark">
                  <span className="chip-dot chip-dot--idle" aria-hidden="true" />
                  {item.status}
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-text text-[14.5px] leading-relaxed text-paper/65 md:mt-0">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </PageBand>
  );
}

const researchSections: AreaSection[] = [
  { key: 'benchmarks', Body: BenchmarksBody },
  { key: 'methodology', Body: MethodologyBody },
  { key: 'economics', Body: EconomicsBody },
  { key: 'datasets', Body: DatasetsBody },
  { key: 'limits', Body: LimitsBody },
  { key: 'integrity', Body: IntegrityBody },
];

/* ── pricing ───────────────────────────────────────────────────────────── */

function CompareBody() {
  return (
    <>
      <PageBand tone="teal">
        <SubHead
          label={pricing.compare.label}
          heading={['EVERY PLAN,', 'EVERY ROW.']}
          meta={`${pricing.compare.rows.length} rows`}
        />
        <p className="t-lede mt-7 max-w-text text-ink/60">{pricing.compare.heading}</p>
        <p className="mt-4 max-w-text text-[14.5px] leading-relaxed text-ink/70">{pricing.compare.note}</p>

        <DataTable
          className="mt-10"
          label="Feature"
          columns={pricing.compare.columns}
          rows={pricing.compare.rows.map((r) => ({ label: r.feature, values: r.values }))}
        />
      </PageBand>

      <PageBand>
        <SubHead label="Notes" meta="Read with the table" />
        <ol className="mt-8 max-w-text space-y-4">
          {pricing.notes.map((note, i) => (
            <li key={note} className="flex gap-4 text-[15px] leading-relaxed text-ink/70">
              <span className="shrink-0 select-none font-mono text-[11px] text-ink/70">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{note}</span>
            </li>
          ))}
        </ol>
      </PageBand>
    </>
  );
}

function FaqBody() {
  return (
    <PageBand tone="ink">
      <SubHead
        label={pricing.faq.label}
        heading={['COMMON', 'QUESTIONS.']}
        meta={pricing.faq.heading}
        tone="ink"
      />
      <dl className="mt-10 border-t border-white/15">
        {pricing.faq.items.map((item) => (
          <div
            key={item.q}
            className="border-b border-white/12 py-6 md:grid md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] md:gap-12"
          >
            <dt className="font-display text-[clamp(1.05rem,1.9vw,1.4rem)] font-bold uppercase leading-[1.1] tracking-[-0.02em] text-paper">
              {item.q}
            </dt>
            <dd className="mt-3 max-w-text text-[15px] leading-relaxed text-paper/65 md:mt-0">{item.a}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-10 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/45">
        {pricing.contact.label}{' '}
        <a href={mail(SUBJECTS.enterprise)} className="link-underline text-signal">
          Get in touch
        </a>
      </p>
    </PageBand>
  );
}

const pricingSections: AreaSection[] = [
  { key: 'compare', Body: CompareBody },
  { key: 'faq', Body: FaqBody },
];

/* ── enterprise ────────────────────────────────────────────────────────── */

function PlatformBody() {
  return (
    <PageBand tone="teal">
      <SubHead label={enterprise.features.label} heading={['EVERYTHING ON PRO.', 'PLUS EIGHT.']} />
      <ItemGrid items={enterprise.features.items} columns={2} className="mt-12" />
    </PageBand>
  );
}

function SlaBody() {
  return (
    <PageBand tone="ink">
      <SubHead
        label={enterprise.sla.label}
        heading={['GUARANTEES', 'IN WRITING.']}
        meta={enterprise.sla.heading}
        tone="ink"
      />
      <p className="mt-7 max-w-text text-[15px] leading-relaxed text-paper/65">
        Row by row, the terms each tier carries. Everything below is a commitment rather than a
        capability — the numbers in the Enterprise column are the ones negotiable in a contract.
      </p>

      <DataTable
        className="mt-10"
        tone="ink"
        label="Metric"
        columns={enterprise.sla.columns}
        rows={enterprise.sla.rows.map((r) => ({ label: r.metric, values: r.values }))}
      />

      <p className="mt-6 max-w-text text-[13.5px] leading-relaxed text-white/55">{enterprise.sla.note}</p>
    </PageBand>
  );
}

/** The contact form is a section like any other, and it is the last one. */
function ContactBody() {
  return (
    <PageBand tone="coral">
      <div className="relative">
        <SubHead label={enterprise.contact.label} meta="One business day" />
        <Title lines={enterprise.contact.heading.split('\n')} className="t-section mt-10 text-ink" />
        <p className="t-lede mt-7 max-w-text text-ink/65">{enterprise.contact.body}</p>
        <ContactForm />

        <p className="mt-12 border-t border-[var(--line)] pt-6 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink/70">
          Prefer email?{' '}
          <a href={mail(SUBJECTS.enterprise)} className="link-underline text-ink">
            Talk to the team
          </a>
        </p>
      </div>
    </PageBand>
  );
}

const enterpriseSections: AreaSection[] = [
  { key: 'features', Body: PlatformBody },
  { key: 'sla', Body: SlaBody },
  { key: 'contact', Body: ContactBody },
];

/* ── the registry ──────────────────────────────────────────────────────── */

/**
 * The sections of each area page, in order. Keyed by the area's `path` as
 * `ia.ts` spells it — a key that matches no page is an area whose sections are
 * never rendered, which shows up as a page of unbroken hero in the sweep.
 */
export const AREAS: Record<string, AreaSection[]> = {
  '/product': productSections,
  '/research': researchSections,
  '/pricing': pricingSections,
  '/enterprise': enterpriseSections,
};

export const sections = (area: string): AreaSection[] => AREAS[area] ?? [];

/**
 * Every section of an area, in order, one after another with nothing between.
 *
 * This is what stood in for `<Routes>` when the areas were four indexes with
 * eighteen pages hanging off them, and then for a rail when each section was an
 * anchor. Both are gone and the body of the function did not change: the
 * sections were always the same blocks in the same order, and everything that
 * got deleted along the way was interface around them.
 */
export function AreaSections({ area }: { area: string }) {
  return (
    <>
      {sections(area).map(({ key, Body }) => (
        <Body key={key} />
      ))}
    </>
  );
}