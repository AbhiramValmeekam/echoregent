/**
 * /research — the evidence page.
 *
 * The live page opens with three claims that do not survive contact with the
 * evidence underneath them: "Every number on this page is reproducible", "All
 * evaluation code is open source", and a `git clone` for a repository that
 * returns 404. The numbers themselves are transcribed; the reproducibility
 * assertion is not — see benchmark.reproducibility, which this page renders in
 * place of the live site's claim.
 *
 * The economics paragraph is kept because it is the one figure on the live
 * page with a complete published derivation, and it is reproduced here with
 * that derivation attached rather than as a bare dollar amount.
 */

export const research = {
  eyebrow: 'Research & benchmarks',
  heading: '26.8× FEWER TOKENS.\nBETTER QUALITY.',
  lede: 'Measured on LoCoMo — the same benchmark mem0 uses in their published paper. Every figure below carries the test it came from.',

  /** The three models, from the live page's "Under the Hood". */
  underTheHood: {
    label: 'Under the hood',
    heading: 'THREE MODELS.\nNO CLOUD DEPENDENCIES.',
    body: 'Every model runs on CPU. No GPU required, no external embedding calls, no data leaving your stack.',
    models: [
      {
        name: 'Classify',
        model: 'DistilBERT',
        body: 'Fine-tuned on 10 conversation domains. Returns domain, intent, risk level, and emotional state. Runs in under 10ms on CPU.',
        facts: [
          { label: 'Domains', value: '10' },
          { label: 'Budget', value: '<10ms' },
        ],
      },
      {
        name: 'Compress',
        model: 'T5',
        body: 'Sequence-to-sequence compression. Removes conversational noise while preserving semantic meaning. Domain-aware — medical conversations skip compression entirely.',
        facts: [
          { label: 'Strategy', value: 'Domain-aware' },
          { label: 'Reduction', value: '64.7%' },
        ],
      },
      {
        name: 'Cache',
        model: 'MiniLM',
        body: '384-dimensional semantic embeddings. Detects semantically equivalent queries before compression. Cache lookup under 5ms.',
        facts: [
          { label: 'Embedding', value: '384-d' },
          { label: 'Lookup', value: '<5ms' },
        ],
      },
    ],
  },

  /** Key finding + what it means, kept together so the derivation travels with the number. */
  finding: {
    label: 'Key finding',
    heading: 'Compression preserved more signal than no compression at all.',
    body: 'EchoRegent compresses 26.8× harder than mem0 while scoring a higher F1 than the full-context baseline — 0.079 against 0.069. That is the whole result: less context in, no quality lost on the measure we can verify.',
    caveat:
      'Both F1 scores are low in absolute terms. Read this as “compression did not damage the result”, not as a statement about answer quality. The 26.8× depends on mem0’s published token figure, which we did not reproduce.',
  },

  /**
   * The one dollar figure on the live site with a published derivation.
   * Kept, with the arithmetic shown rather than the conclusion alone.
   */
  economics: {
    label: 'What this means',
    heading: 'The arithmetic, shown.',
    steps: [
      { label: 'mem0 mean tokens per query', value: '6,956' },
      { label: 'EchoRegent mean tokens per query', value: '259' },
      { label: 'Difference per query', value: '6,697' },
      { label: 'At 1M queries / month', value: '~6.7B tokens' },
      { label: 'At $0.50 / 1M input tokens', value: '$3,350 / month' },
    ],
    note: 'Every input to this calculation is on this page. The $0.50 per million input tokens is a representative published price, not one we control — at a different rate the saving scales with it.',
    caveat:
      'This compares against mem0’s published token figure, not against your current workload. Your own reduction will depend on your conversation shape.',
  },

  /** The evaluation corpus. */
  datasets: {
    label: 'Evaluation corpus',
    heading: 'Three datasets.',
    items: [
      {
        name: 'SQuAD 2.0',
        body: 'Reading comprehension, factual recall, multi-turn.',
        note: 'General-purpose control',
      },
      {
        name: 'Stack Overflow',
        body: 'Code debugging, long error traces, step-by-step solutions.',
        note: 'Where compression does the most work',
      },
      {
        name: 'Medical QA',
        body: 'Protected zone. Full context preserved.',
        note: 'Control group — never compressed',
        protected: true,
      },
    ],
  },

  /** Where the two live claims diverge from what is checkable. */
  integrity: {
    label: 'On the published claims',
    heading: 'What we are not repeating.',
    items: [
      {
        claim: '“All evaluation code is open source.”',
        status: 'Not carried over',
        body: 'The repository named on the live site is not public. Until it is, this page cannot offer a command to reproduce anything on it.',
      },
      {
        claim: '“26× fewer tokens, better quality.”',
        status: 'Carried over, with limits',
        body: 'Both halves hold on LoCoMo as measured. The token ratio depends on a figure mem0 published, and the quality axis is a token-overlap score with a small absolute gap.',
        },
      {
        claim: '“65% average token reduction.”',
        status: 'Scoped',
        body: 'A load-test result, not a LoCoMo one. The LoCoMo reduction is 18,679 → 259, which is a much larger number and a different measurement entirely.',
      },
    ],
  },

  cta: {
    heading: 'READ THE METHODOLOGY.\nTHEN DISCOUNT IT.',
    body: 'Every figure on this page has a scope and a caveat attached. The limits section is not a footnote — it is the point.',
    primary: { label: 'Talk to us about your workload', action: 'audit' as const },
    secondary: { label: 'See the product', to: '/product' },
  },
} as const;
