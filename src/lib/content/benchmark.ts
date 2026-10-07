/**
 * Benchmark figures.
 *
 * The rule this file exists to enforce: a number cannot be rendered without
 * its provenance. Every figure below carries the scope it was measured in and
 * a caveat where one applies, and <Benchmark> renders both beside the value.
 *
 * Context: the live site presents "26×", "65%", "<10ms" and "F1 +14%" as one
 * story in its hero. They are four different measurements — one of them
 * derived from a competitor's published number, one of them from a load test
 * that never touched the benchmark dataset. They are kept separate here for
 * that reason, and the hero reads its tiles from `figures` below so a claim
 * has exactly one value across the whole site.
 *
 * `scope` is not decoration. The live site renders the same 18,679 baseline
 * against two different results — 259 on LoCoMo, 6,601 on the load test — and
 * without its scope beside it each reads as a contradiction of the other.
 *
 * Set `enabled: false` to drop every numeric claim from the site and leave the
 * mechanism description alone.
 */

export interface Provenance {
  /** Where the number came from. */
  source: string;
  /** Whether we measured it ourselves or are citing someone else's figure. */
  kind: 'measured' | 'cited' | 'derived';
}

export interface Figure {
  id: string;
  value: string;
  raw: number;
  unit?: string;
  label: string;
  /** The scope the number is valid within — always rendered. */
  scope: string;
  provenance: Provenance;
  caveat?: string;
  /**
   * Count-up metadata for the hero tiles. It lives beside `value` rather than
   * in the component so the number that animates and the number that is
   * displayed cannot be two different numbers.
   */
  count?: { to: number; decimals?: number; prefix?: string; suffix?: string };
}

export const benchmark = {
  index: '08',
  label: 'Benchmarks',
  /**
   * Master switch. These are internal measurements that have not been
   * independently verified; the decision was to publish them
   * methodology-first, with the limits stated on the page.
   */
  enabled: true,

  heading: '26.8× FEWER TOKENS.\nBETTER QUALITY.',
  intro:
    'Measured on LoCoMo, the long-conversation memory benchmark mem0 also uses in its published work. The figures come from three different tests — kept separate because they measure different things.',

  methodology: {
    /**
     * Kept as the record of what this block's anchor is called, and read by
     * nothing. The element itself is the `#methodology` section on `/research`,
     * which takes its id from `AREAS` in `routes/areas.tsx` — the one place an
     * anchor can be changed. This field is documentation, not wiring.
     */
    id: 'methodology',
    label: 'Methodology',
    rows: [
      { label: 'Dataset', value: 'LoCoMo — long-conversation memory QA' },
      { label: 'Measured here', value: 'Mean tokens per query; token-overlap F1' },
      { label: 'Measured elsewhere', value: 'mem0 token figure — their published number' },
      { label: 'Not measured', value: "mem0's output quality on our harness" },
      { label: 'Comparison', value: 'Full context, unmodified' },
    ],
    note: 'mem0 reports quality on an LLM-as-judge 0–100 scale, which is not directly comparable to the token-overlap F1 reported here. We report F1 because it is verifiable from the dataset.',
  },

  /** The head-to-head token comparison. */
  tokens: {
    label: 'Mean tokens per query',
    scope: 'LoCoMo',
    /**
     * Each row's `note` also carries the live site's efficiency-ratio column
     * (mem0 = 1×, full context 0.37× worse, EchoRegent 26.8×) — it is the same
     * arithmetic as the headline ratio, so it is stated on the same line as the
     * token figure rather than as a second, unattached number.
     */
    rows: [
      {
        id: 'full',
        name: 'Full context',
        value: '18,679',
        raw: 18679,
        note: 'Nothing removed · 0.37× mem0',
        provenance: { source: 'Measured on LoCoMo', kind: 'measured' as const },
      },
      {
        id: 'mem0',
        name: 'mem0',
        value: '6,956',
        raw: 6956,
        note: "mem0's own published figure · 1× baseline",
        provenance: { source: 'mem0, "The Token-Efficient Memory Algorithm" (2024)', kind: 'cited' as const },
        caveat: 'Not reproduced on our harness. We take this figure from mem0’s published blog post.',
      },
      {
        id: 'echo',
        name: 'EchoRegent',
        value: '259',
        raw: 259,
        note: 'Compressed · 26.8× fewer',
        /** The live table's two remaining columns, which are properties of the
         *  product rather than of the comparison — the classifier, the
         *  compressor and the cache are on-device by construction, and the
         *  protected zones are what stops the medical and legal rows being
         *  compressed at all. */
        flags: ['On-device', 'Protected zones enforced'],
        provenance: { source: 'Measured on LoCoMo', kind: 'measured' as const },
        highlight: true,
      },
    ],
  },

  /**
   * The four headline figures — and the hero's stat row.
   *
   * The live site rounds these to 26×, 65% and F1 +14% in the hero while its
   * research page shows 26.8× and 64.7%. One number per claim here: the hero
   * and this section read from the same array, so they cannot drift apart.
   */
  figures: [
    {
      id: 'ratio',
      value: '26.8×',
      raw: 26.8,
      label: 'Token efficiency vs mem0',
      scope: 'LoCoMo, mean tokens per query',
      count: { to: 26.8, decimals: 1, suffix: '×' },
      provenance: {
        source: 'Derived: 6,956 ÷ 259',
        kind: 'derived',
      },
      caveat:
        'Inherits the dependency on mem0’s published figure. Against the full-context baseline measured here, the reduction is larger — 18,679 → 259.',
    },
    {
      id: 'reduction',
      value: '64.7%',
      raw: 64.7,
      unit: '%',
      label: 'Average token reduction',
      scope: '10M-token load test — a different test from LoCoMo',
      count: { to: 64.7, decimals: 1, suffix: '%' },
      provenance: { source: 'Internal load test', kind: 'measured' },
      caveat:
        'Measured under sustained load on a 10M-token run, not on the LoCoMo conversations. The same load test compresses 18,679 → 6,601 per query; the 259 above is the LoCoMo result and is a different figure entirely.',
    },
    {
      id: 'overhead',
      value: '<10ms',
      raw: 10,
      label: 'Per-turn overhead',
      scope: 'CPU inference, classifier stage only',
      count: { to: 10, prefix: '<', suffix: 'ms' },
      provenance: { source: 'Classifier design budget', kind: 'derived' },
      caveat: 'A budget for the classification stage, not an end-to-end latency measurement for the full pipeline.',
    },
    {
      id: 'quality',
      value: 'F1 +14%',
      raw: 14,
      label: 'Quality vs full context',
      scope: 'LoCoMo token-overlap F1 — 0.079 against 0.069',
      count: { to: 14, prefix: 'F1 +', suffix: '%' },
      provenance: { source: 'Derived from measured F1: (0.079 − 0.069) ÷ 0.069', kind: 'derived' },
      caveat:
        'A difference between two low F1 scores, not a measure of answer quality. mem0’s quality was scored on a different scale (LLM-as-judge, 0–100) and is not compared here.',
    },
  ] as const satisfies readonly Figure[],

  /** Quality — the part that stops this being a tokens-only story. */
  quality: {
    label: 'Quality',
    heading: 'Do the answers survive?',
    body: 'Token-overlap F1 on LoCoMo. Compression is only worth anything if this holds up — so it is reported here rather than in a footnote.',
    rows: [
      { name: 'EchoRegent', value: '0.079', note: '259 tokens per query', better: true },
      { name: 'Full context', value: '0.069', note: '18,679 tokens per query', better: false },
    ],
    finding: 'The compressed context scored slightly above the full context, not below it.',
    caveat:
      'Both scores are low in absolute terms. The comparison is between two low F1 scores, and should be read as “compression did not damage the result” rather than as a measure of overall answer quality.',
  },

  /** The Gemini-as-judge run — a second, independent quality axis. */
  judge: {
    label: 'Quality evaluation',
    heading: 'Compressed context. Uncompromised answers.',
    body: '120 conversations across three datasets, scored by Gemini-as-judge on a 1–10 scale. EchoRegent vs full context — who answers better?',
    rows: [
      { label: 'EchoRegent average', value: '9.0 / 10', raw: 9.0 },
      { label: 'Full context average', value: '8.7 / 10', raw: 8.7 },
      { label: 'Match-or-beat rate', value: '87%', raw: 87 },
      { label: 'Conversations evaluated', value: '120', raw: 120 },
    ],
    scope: '120 conversations · SQuAD 2.0, Stack Overflow, Medical QA',
    provenance: { source: 'Gemini-as-judge, 1–10 scale', kind: 'measured' as const },
    caveat:
      'The judge is a language model scoring conversations produced by a language model. It is a useful signal and not a neutral one; the medical conversations in this corpus are a protected-zone control group and were never compressed.',
  },

  /** Load test. */
  load: {
    label: 'Load test',
    heading: 'Production-grade. Day one.',
    body: 'A 10M-token run against a single instance, min-instances=1 so no cold start sits in front of a critical path — the shape of the deployment, not a synthetic burst.',
    rows: [
      { label: 'Requests / second', value: '329', raw: 329 },
      { label: 'p50 latency', value: '17ms', raw: 17 },
      { label: 'Token reduction', value: '64.7%', raw: 64.7 },
      { label: 'Errors', value: '0', raw: 0 },
    ],
    scope: '10M-token load test · classifier, compressor and cache in path',
    provenance: { source: 'Internal load test', kind: 'measured' as const },
    caveat:
      'Throughput and latency are properties of the test machine and the workload, not of the design alone. p50 only — the tail is not reported.',
  },

  limits: {
    label: 'Limits',
    items: [
      'These are internal measurements. They have not been independently verified.',
      'mem0’s token figure is cited from their published work and was not reproduced here; the 26.8× ratio depends on it.',
      'The 64.7% reduction comes from a load test, not from LoCoMo.',
      'F1 is a token-overlap measure. It does not capture whether an answer is useful, well-written or correct.',
      'The 87% match-or-beat rate is an LLM judging LLM output, on 120 conversations.',
      'The same 18,679 full-context baseline appears against two different results — 259 on LoCoMo and 6,601 on the load test. They are different tests, not two versions of the same number.',
      'Results on one benchmark do not establish performance on your workload.',
    ],
  },

  /**
   * Reproducibility.
   *
   * The live site asserts here that every number is reproducible and prints a
   * `git clone` for the evaluation harness. That repository returns a 404 — it
   * is not among the public repositories on the account it names. The section
   * stays, because a reader who came here to verify a figure is owed the
   * reason they cannot; the assertion goes.
   */
  reproducibility: {
    label: 'Reproducibility',
    body: 'The evaluation harness that produced these figures is not currently published, so none of the numbers on this page can be checked independently.',
    status: 'Claim withdrawn — harness not public',
    note: 'The published claim was that the harness is open source and the runs can be repeated. Until that repository is available, treat every figure here as provisional.',
  },
} as const;
