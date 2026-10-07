/**
 * Pricing.
 *
 * The figures below are the live site's published plans, carried over
 * unchanged: $0 / $199 / $499 / $999 with the token allowances that go with
 * them. What changes is the action — the live site hands out API keys, and
 * nothing here is purchasable, so every key CTA is the waitlist and the paid
 * tiers carry the live site's own "Coming Soon" state rather than a Start
 * button that leads nowhere.
 */

export const pricing = {
  index: '12',
  label: 'Pricing',
  heading: 'START FREE.\nSCALE WHEN YOU GROW.',
  intro: '10M tokens free every month. No credit card. Join the waitlist and your key is ready when we open.',
  /** Rendered as a label wherever the tiers appear. */
  qualifier: 'Published plans — not yet purchasable',

  tiers: [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      billing: 'forever · no card',
      allowance: '10M',
      unit: 'tokens / month',
      features: ['All 10 domains', 'Protected zones', 'MCP server', 'OpenAI proxy'],
      support: 'Community support',
      note: 'Everything the pipeline does, at the volume a single application needs.',
      cta: { label: 'Join the waitlist', action: 'waitlist' as const },
      featured: false,
    },
    {
      id: 'starter',
      name: 'Starter',
      price: '$199',
      billing: 'per month',
      allowance: '50M',
      unit: 'tokens / month',
      features: ['All 10 domains', 'Protected zones', 'MCP server', 'OpenAI proxy'],
      support: 'Email support',
      note: 'For a single application in production, with room to grow.',
      cta: { label: 'Coming soon', action: 'soon' as const },
      featured: true,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$499',
      billing: 'per month',
      allowance: '250M',
      unit: 'tokens / month',
      features: ['All 10 domains', 'Protected zones', 'MCP server', 'OpenAI proxy'],
      support: 'Priority support',
      note: 'Multiple applications, higher rate limit, priority queue.',
      cta: { label: 'Coming soon', action: 'soon' as const },
      featured: false,
    },
    {
      id: 'agency',
      name: 'Agency',
      price: '$999',
      billing: 'per month',
      allowance: 'Unlimited',
      unit: 'tokens',
      features: ['All 10 domains', 'Protected zones', 'MCP server', 'OpenAI proxy'],
      support: 'Dedicated support',
      note: 'Self-hosted and VPC deployment, with a custom rate limit.',
      cta: { label: 'Coming soon', action: 'soon' as const },
      featured: false,
    },
  ],

  /** Every row the live site's compare table carries. */
  compare: {
    label: 'Compare plans',
    heading: 'Everything in every plan.',
    note: 'No feature is held back by tier. The tiers differ in volume, rate limit and support — not in what the pipeline will do for you.',
    columns: ['Free', 'Starter', 'Pro', 'Agency'],
    rows: [
      { feature: 'Monthly tokens', values: ['10M', '50M', '250M', 'Unlimited'] },
      { feature: 'Rate limit (req/min)', values: ['60', '200', '500', 'Custom'] },
      { feature: 'Context Classifier', values: ['✓', '✓', '✓', '✓'] },
      { feature: 'History Compressor', values: ['✓', '✓', '✓', '✓'] },
      { feature: 'Semantic Cache', values: ['✓', '✓', '✓', '✓'] },
      { feature: 'Protected Zones', values: ['✓', '✓', '✓', '✓'] },
      { feature: 'MCP Server', values: ['✓', '✓', '✓', '✓'] },
      { feature: 'OpenAI Proxy', values: ['✓', '✓', '✓', '✓'] },
      { feature: 'All 10 domains', values: ['✓', '✓', '✓', '✓'] },
      { feature: 'Usage analytics', values: ['✓', '✓', '✓', '✓'] },
      { feature: 'Support', values: ['Community', 'Email', 'Priority', 'Dedicated'] },
      { feature: 'SLA', values: ['—', '—', '99.9%', '99.95% custom'] },
      { feature: 'Custom domain', values: ['—', '—', '—', '✓'] },
      { feature: 'On-prem / VPC', values: ['—', '—', '—', '✓'] },
    ],
  },

  faq: {
    label: 'FAQ',
    heading: 'Common questions.',
    items: [
      {
        q: 'What counts as a “token”?',
        a: 'Tokens saved — not tokens processed. We count the difference between your original context length and the compressed length. If you send 2,000 tokens and EchoRegent reduces it to 680, you’re charged for 1,320 saved tokens.',
      },
      {
        q: 'Do you store my conversation data?',
        a: 'No. Conversations are processed in memory and discarded immediately after compression. Your LLM provider key is never stored. Protected-zone conversations — medical, legal, crisis — are never touched by the compression pipeline at all.',
      },
      {
        q: 'What if I exceed my monthly token limit?',
        a: 'Your API key returns 402 responses until the next billing cycle. You won’t be automatically charged. Upgrade your plan from the dashboard or email us for an immediate increase.',
      },
      {
        q: 'Can I use this with any LLM provider?',
        a: 'Yes. The OpenAI proxy supports OpenAI, Anthropic, Gemini, Mistral, Groq, Together, and any OpenAI-compatible endpoint. For direct API calls, you handle routing yourself.',
      },
      {
        q: 'Is there an enterprise plan?',
        a: 'Yes. Custom token volume, SLAs, on-prem/VPC deployment, dedicated support, and security review. See the Enterprise page or email team@yudi.co.in.',
      },
    ],
  },

  /** Stated plainly rather than buried under the table. */
  notes: [
    'No tier is purchasable yet. Every plan above is a published intention, not an offer.',
    'Prices are as published on the live site and may change before release.',
    'SLA figures appear only against the tiers that actually carry one.',
  ],

  cta: { label: 'Join the waitlist', action: 'waitlist' as const },
  secondary: { label: 'Request a token audit', action: 'audit' as const },
  contact: { label: 'Need higher limits or a custom plan?', to: '/enterprise' },
} as const;
