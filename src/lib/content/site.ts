/**
 * Site constants.
 *
 * Carried from the live EchoRegent site (echoregent-yudi-pub.web.app). The
 * live site brands the product "Prexi" while every code sample, header and the
 * repository use "EchoRegent" — the rename runs one way here, to EchoRegent,
 * because that is the name the product actually ships under.
 *
 * The company named on the live site is Yudi Labs, Hyderabad, and team@yudi.co.in
 * is its published contact. Both are carried over verbatim.
 */

export const site = {
  name: 'EchoRegent',
  byline: 'EchoRegent by Yudi Labs',
  parent: 'Yudi Labs',
  parentLocation: 'Hyderabad, India',

  /** The live site's own footer one-liner. */
  tagline: 'The context management layer that gives LLMs what remains.',

  description:
    'Drop-in context management for LLMs. Compress, cache, and protect every conversation — one API call.',

  contactEmail: 'team@yudi.co.in',

  /** No tier is purchasable yet; every key CTA is the waitlist. */
  status: 'In development',

  year: '2026',
} as const;

/** mailto: with a subject. */
export const mail = (subject: string) =>
  `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}`;

export const SUBJECTS = {
  audit: 'EchoRegent token audit',
  waitlist: 'EchoRegent early access',
  enterprise: 'EchoRegent enterprise enquiry',
  disclosure: 'EchoRegent security disclosure',
  general: 'EchoRegent enquiry',
} as const;

/**
 * Nav items live in `lib/content/ia.ts`, not here.
 *
 * A nav item is a promise that the page exists, and the header, the drawer, the
 * footer, the index cards and the 404 all make that promise from the same list.
 * A second hand-maintained list here is the drift this file used to cause.
 */

export const cta = {
  primary: { label: 'Join the waitlist', href: mail(SUBJECTS.waitlist) },
  audit: { label: 'Request a token audit', href: mail(SUBJECTS.audit) },
} as const;

export const hero = {
  eyebrow: 'Context management for LLMs',
  index: '01',
  /**
   * The live headline is "Stop paying for tokens / you don't need." Split into
   * three masked lines so no authored line exceeds the 20-character width the
   * `t-hero` clamp was verified against — see _research/echoregent-masks.mjs.
   */
  lines: ['STOP PAYING', 'FOR TOKENS', "YOU DON'T NEED."],
  headline: "Stop paying for tokens you don't need.",
  lede: 'Drop-in context management for GPT-4o, Claude, Gemini, and any OpenAI-compatible model. Compress, cache, and protect every conversation — one API call.',
  primary: { label: 'Join the waitlist', href: mail(SUBJECTS.waitlist) },
  secondary: { label: 'See the benchmark', to: '/research' },
  /** Telemetry strip under the hero. Facts about the design, not results. */
  readouts: [
    { label: 'Layer', value: 'App ↔ Model' },
    { label: 'Runs on', value: 'CPU' },
    { label: 'Status', value: site.status },
  ],
} as const;

export const statement = {
  index: '02',
  label: 'The shift',
  lines: ['CONTEXT IS BECOMING', 'THE MOST EXPENSIVE', 'PART OF INTELLIGENCE.'],
  /** The chain that animates on scroll. */
  chain: ['Conversation', 'History', 'Redundancy', 'Context window', 'Token cost'],
  note: 'Every turn resends the turns before it. The bill compounds; the signal does not.',
} as const;

export const problem = {
  index: '03',
  label: 'The problem',
  heading: 'Every conversation carries baggage.',
  /** The live site's own framing of the problem, from its About → Origin. */
  body: "By turn 10 of a conversation, you're sending thousands of tokens to the LLM — most of which is noise from earlier turns. The model's attention dilutes. Costs climb. Quality drops.",
  support:
    'EchoRegent compresses the way a person recalls a conversation: keeping signal, discarding noise — and knowing when to leave a conversation alone.',
  /**
   * The shrinking-context visual.
   *
   * Two points, because two points are what was measured. The live site draws
   * the same collapse as a five-step gradient — "deduplicated", "summarised",
   * "signal only" — and those three intermediate token counts exist nowhere in
   * its own benchmark data. They are not reproduced here: a proportional bar
   * chart of invented numbers is a fabricated measurement, whatever it is
   * captioned.
   */
  collapse: [
    { tokens: 18679, note: 'Full context' },
    { tokens: 259, note: 'EchoRegent' },
  ],
  collapseSource: 'LoCoMo mean tokens per query — 18,679 in, 259 out. See benchmarks',
} as const;

export const pipeline = {
  index: '04',
  label: 'Core system',
  heading: 'EVERY TURN.\nCLASSIFIED.\nPROTECTED.',
  intro:
    'A purpose-built context pipeline between your application and your model. No extra LLM calls, and no data shared with third parties. This is the pipeline as designed — it is not yet deployed.',
  stages: [
    {
      key: 'input',
      name: 'Incoming',
      role: 'Arrival',
      summary: 'The message and the history attached to it.',
      body: 'Prompt, prior turns, tool output, retrieved documents and system instructions arrive together and undifferentiated.',
      metrics: [
        { label: 'Carries', value: 'Prompt · history · tools' },
        { label: 'State', value: 'Uncompressed' },
      ],
    },
    {
      key: 'classify',
      name: 'Classifier',
      role: 'Understanding',
      summary: 'Intent, domain and risk — before anything is removed.',
      body: 'A fine-tuned DistilBERT reads domain, intent, risk level and emotional state per turn. Compression is only safe once the system knows what it is looking at.',
      metrics: [
        { label: 'Model', value: 'DistilBERT' },
        { label: 'Domains', value: '10' },
        { label: 'Budget', value: '<10ms' },
      ],
    },
    {
      key: 'compress',
      name: 'Compressor',
      role: 'Reduction',
      summary: 'Remove the noise. Preserve the meaning.',
      body: 'T5 summarises rather than truncates, and the strategy follows the domain it classified — stack traces compress aggressively, medical history does not compress at all.',
      metrics: [
        { label: 'Model', value: 'T5' },
        { label: 'Strategy', value: 'Domain-aware' },
      ],
    },
    {
      key: 'cache',
      name: 'Cache',
      role: 'Memory',
      summary: 'Cache meaning, not text.',
      body: 'MiniLM generates 384-dimensional embeddings for each query, so a semantically equivalent question hits the same cached context as the original — across users, not just within a session.',
      metrics: [
        { label: 'Model', value: 'MiniLM' },
        { label: 'Embedding', value: '384-d' },
        { label: 'Lookup', value: '<5ms' },
      ],
    },
    {
      key: 'protect',
      name: 'Protected zones',
      role: 'Refusal',
      summary: 'Some context is never compressed.',
      body: 'Medical, legal and crisis conversations bypass compression entirely — an architectural boundary inside compressHistory(), not a filter an API caller can switch off.',
      protected: true,
      metrics: [
        { label: 'Zones', value: 'Medical · Legal · Crisis' },
        { label: 'Behaviour', value: 'Bypass' },
      ],
    },
    {
      key: 'model',
      name: 'Your LLM',
      role: 'Delivery',
      summary: 'Clean, compressed context.',
      body: 'What reaches the model is the part of the context that carried signal — not everything that happened to be in the window.',
      metrics: [
        { label: 'Compatible', value: 'Any OpenAI-style API' },
        { label: 'Change required', value: 'One base URL' },
      ],
    },
  ],
} as const;

export const architecture = {
  index: '06',
  label: 'Architecture',
  heading: 'THE CONTEXT LAYER\nBETWEEN YOUR APP\nAND YOUR MODEL.',
  body: 'EchoRegent runs as a proxy in front of the model you already use. Your application keeps its shape; the request that reaches the model does not.',
  layers: [
    { key: 'app', name: 'Your application', note: 'Unchanged', items: ['Chat', 'Agent', 'Pipeline', 'MCP client'] },
    {
      key: 'echo',
      name: 'EchoRegent',
      note: 'The layer',
      items: ['Classifier', 'Compressor', 'Cache', 'Protected zones'],
    },
    { key: 'model', name: 'Your model', note: 'Unchanged', items: ['GPT', 'Claude', 'Gemini', 'OpenAI-compatible'] },
  ],
  /**
   * The two volumes on the spine, and the one line that qualifies them.
   *
   * They were string literals in `LayerDiagram` until the route sweep ran, and
   * the sweep is what caught it: numerals drawn into a diagram carried no
   * provenance at all, on the one page whose whole argument is that the
   * payload narrows. The figures are the same LoCoMo measurement the problem
   * section draws, so they carry the same statement of scope — and they are
   * content now rather than markup, because a number written in a component is
   * a number nothing can check.
   */
  payload: [
    { label: 'full history', volume: '18,679 tokens' },
    { label: 'signal only', volume: '259 tokens' },
  ],
  payloadSource:
    'LoCoMo mean tokens per query, measured here — the same collapse the problem section draws. Not the load-test figure.',
  policies: [
    { label: 'Deployment', value: 'Proxy · self-hostable' },
    { label: 'Hardware', value: 'CPU · no GPU required' },
    { label: 'Cloud dependency', value: 'None' },
    { label: 'Failure mode', value: 'Pass-through' },
  ],
} as const;

export const features = {
  index: '07',
  label: 'Features',
  heading: 'INFRASTRUCTURE THAT\nREMEMBERS WHAT COUNTS.',
  intro: 'Four systems in one API. Each one invisible to your LLM. Each one critical to your bill.',
  items: [
    {
      numeral: '01',
      key: 'classify',
      name: 'Classify',
      line: 'Domain and intent detection, with no LLM call.',
      body: 'Fine-tuned classifier across 10 domains — coding, medical, legal, sales, customer support, and more. Returns domain, intent, risk level, and emotional state per turn. No LLM call.',
      visual: 'matrix' as const,
      facts: [
        { label: 'Domains', value: '10' },
        { label: 'Returns', value: 'Domain · Intent · Risk' },
      ],
    },
    {
      numeral: '02',
      key: 'compress',
      name: 'Compress',
      line: 'Remove the noise. Preserve the meaning.',
      body: 'Removes noise while preserving semantic meaning. Stack traces compress well. Medical history doesn’t — by design. Compression is domain-aware, not uniform. Measured on LoCoMo: 259 tokens vs 18,679 for full context.',
      visual: 'collapse' as const,
      facts: [
        { label: 'Measure', value: 'Tokens and output quality' },
        { label: 'Strategy', value: 'Domain-aware' },
      ],
    },
    {
      numeral: '03',
      key: 'cache',
      name: 'Cache',
      line: 'Semantically equivalent questions skip the work.',
      body: 'Catches semantically equivalent questions before they reach the compressor. Returning users skip reprocessing entirely. Savings compound with usage.',
      visual: 'nodes' as const,
      facts: [
        { label: 'Embedding', value: '384-d' },
        { label: 'Lookup', value: 'Sub-5ms' },
      ],
    },
    {
      numeral: '04',
      key: 'protect',
      name: 'Protect',
      line: 'Not a filter — an architectural boundary.',
      body: 'Medical, legal, and crisis conversations are never compressed. Not a filter — an architectural boundary. If the classifier returns medical, compression is disabled at the function level.',
      visual: 'zones' as const,
      protected: true,
      facts: [
        { label: 'Zones', value: 'Medical · Legal · Crisis' },
        { label: 'Enforcement', value: 'Function level' },
      ],
    },
  ],
} as const;

export const ecosystem = {
  index: '10',
  label: 'Compatibility',
  heading: 'ONE LINE.\nANY MODEL.',
  body: 'Drop-in OpenAI-compatible proxy. Change your baseURL — nothing else. Works with GPT-4o, Claude, Gemini, or any OpenAI-compatible endpoint.',
  models: ['GPT-4o', 'Claude', 'Gemini', 'Mistral', 'Groq', 'Together'],
  surfaces: ['MCP clients', 'Claude Desktop', 'Cursor', 'Windsurf', 'Your own agent'],
  note: 'Compatibility describes the intended interface. Integrations are not yet available.',
} as const;

export const principles = {
  index: '11',
  label: 'Research',
  heading: 'BUILT AROUND\nFOUR IDEAS.',
  intro:
    'How we think about context, taken from the principles the product was designed against.',
  items: [
    {
      numeral: '01',
      title: 'First principles, not benchmarks',
      body: 'We start by asking what the brain does, then ask if that’s what we should do. Benchmarks validate — they don’t design.',
    },
    {
      numeral: '02',
      title: 'Hard floors, not soft guardrails',
      body: 'Protected zones are architectural, not configurable. Some decisions should not be delegatable to end users or API callers.',
    },
    {
      numeral: '03',
      title: 'Fewer tokens is not the goal',
      body: 'Compression is only worth anything if the answer survives it. We measure both, and report both.',
    },
    {
      numeral: '04',
      title: 'Sparse, local, continual',
      body: 'Our broader research agenda at Yudi Labs. AI systems should be sparse in what they attend to, local in how they learn, and continual in how they improve. EchoRegent is one expression of these principles.',
    },
  ],
  attribution:
    'EchoRegent is built by Yudi Labs, a small AI research team in Hyderabad focused on making LLMs structurally better, not just faster.',
} as const;

export const closing = {
  index: '13',
  lines: ['READY TO CUT', 'YOUR TOKEN BILL?'],
  body: 'One API call. Every conversation classified, compressed, cached, and protected.',
  primary: { label: 'Join the waitlist', href: mail(SUBJECTS.waitlist) },
  secondary: { label: 'Read the benchmarks', to: '/research' },
} as const;

export const footer = {
  tagline: site.tagline,
  /**
   * **The Product and Research columns are a site map now, and that was a
   * decision rather than a cleanup.**
   *
   * They used to be the areas' tables of contents: eight rows each, every one of
   * them a `#anchor` into `/product` or `/research` — `Context Classifier`,
   * `History Compressor`, `Benchmarks`, `Methodology`. That worked while the
   * sections had anchors. When the user removed them (*"make it as one page and
   * inside add all of that information, no #classify or other things"*) those
   * sixteen rows had nowhere to go, and the question was whether to delete them
   * or repoint them. Asked, the user chose the site map: every row is a page,
   * and the nine non-home pages are each listed exactly once across the three
   * columns.
   *
   * This is a better footer than the one it replaces, and not only because the
   * links resolve. A footer whose middle column is a list of section names is a
   * second navigation for the page you are already on; a footer that lists the
   * site is the thing a footer is for. What it loses is the search-engine and
   * bookmark surface the old spellings had — but those URLs are `LEGACY`
   * redirects, not 404s, so the surface is intact where it matters.
   *
   * The two variants are kept literal rather than generated from `ia.ts`: the
   * footer is the one place that mixes an internal route with a `mailto:`, and
   * narrowing on `'to' in link` is what keeps `href={undefined}` off the DOM.
   */
  columns: [
    {
      title: 'Product',
      links: [
        { label: 'Product', to: '/product' },
        { label: 'How it works', to: '/how-it-works' },
        { label: 'Playground', to: '/playground' },
        { label: 'Features', to: '/features' },
      ],
    },
    {
      title: 'Research',
      links: [
        { label: 'Research', to: '/research' },
        { label: 'Pricing', to: '/pricing' },
        { label: 'Enterprise', to: '/enterprise' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', to: '/about' },
        { label: 'Security', to: '/security' },
        { label: site.contactEmail, href: mail(SUBJECTS.general) },
      ],
    },
  ],
  legal: `© ${site.year} ${site.name} · A product by Yudi Labs, Hyderabad, India`,
  meta: [
    { label: 'Status', value: site.status },
    { label: 'Built by', value: site.parent },
  ],
} as const;
