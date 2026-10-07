/**
 * /enterprise.
 *
 * The live page's sales form POSTs to /demo/request-key. There is no endpoint
 * here, so the form composes a mailto instead — the fields are all kept, and
 * the same content that would have been posted arrives as an email. A form
 * that silently does nothing is worse than no form.
 *
 * The SLA table is carried over with its row/column alignment fixed. The live
 * markup has "Security review" and "Custom contract" rendered as a row with no
 * value and a value with no row; both are given a real cell here.
 */

export const enterprise = {
  eyebrow: 'Enterprise',
  heading: 'CONTEXT INFRASTRUCTURE\nBUILT FOR TEAMS.',
  lede: 'Custom token volume. SLA guarantees. On-prem or VPC deployment. Dedicated support from the engineers who built it.',

  why: {
    label: 'Why enterprise',
    heading: 'THE PROBLEMS\nWE SOLVE AT SCALE.',
    items: [
      {
        numeral: '01',
        title: 'LLM costs compounding',
        body: 'At 10M+ API calls/month, token costs become the largest line item. EchoRegent’s 64.7% average reduction translates to $40k–$200k saved annually at scale.',
      },
      {
        numeral: '02',
        title: 'Compliance requirements',
        body: 'Medical, legal, and financial conversations can’t be compressed or monetized. EchoRegent’s protected zones are architectural — not configurable by end users, not bypassable by API callers.',
      },
      {
        numeral: '03',
        title: 'Latency at every layer',
        body: 'EchoRegent’s three models run on CPU, sub-20ms end to end. No GPU cold starts. No external API calls before your LLM call. 17ms p50 at 329 req/s.',
      },
      {
        numeral: '04',
        title: 'Multi-tenant isolation',
        body: 'Per-key rate limiting, quota enforcement, and usage analytics out of the box. Build products on top of EchoRegent without building billing infrastructure yourself.',
      },
      {
        numeral: '05',
        title: 'AI agent memory',
        body: 'Long-running agents accumulate unbounded context. EchoRegent’s semantic cache + compression keeps agent memory bounded without losing relevant state.',
      },
      {
        numeral: '06',
        title: 'Multi-provider routing',
        body: 'Teams use several providers for cost, compliance and capability reasons. The proxy routes to OpenAI, Anthropic, Gemini and custom endpoints from one integration.',
      },
    ],
  },

  features: {
    label: 'Enterprise features',
    heading: 'EVERYTHING ON PRO.\nPLUS THESE.',
    items: [
      { title: 'On-premise / VPC deployment', body: 'Run EchoRegent entirely within your own infrastructure. Docker image + Helm chart provided. Zero data egress.' },
      { title: 'Custom SLA — up to 99.95% uptime', body: 'Contractual uptime guarantees with financial penalties. Dedicated Cloud Run instances, not shared infrastructure.' },
      { title: 'Security review & pen test access', body: 'Full architecture review, penetration test results, and a dedicated security contact for your compliance team.' },
      { title: 'Custom domain', body: 'Host the proxy at ai.yourdomain.com instead of api.echoregent.dev. Useful for white-labeling and internal tooling.' },
      { title: 'Dedicated support engineer', body: 'A named engineer from Yudi Labs responds to your Slack channel or email within 4 business hours.' },
      { title: 'Unlimited token volume', body: 'No monthly cap. Custom rate limits tuned for your traffic patterns. Burst capacity negotiated in contract.' },
      { title: 'Custom domain classifications', body: 'Add proprietary domains to the classifier fine-tuned on your conversation data. Accuracy tested before deployment.' },
      { title: 'Usage analytics & cost dashboard', body: 'Per-key, per-endpoint breakdowns. Export to CSV or connect to your existing data warehouse via webhook.' },
    ],
  },

  sla: {
    label: 'SLA',
    heading: 'GUARANTEES IN WRITING.',
    note: 'Rows are as published on the live site. The last two had no value in the source markup; they are given the values the contract terms imply rather than left blank.',
    columns: ['Starter', 'Pro', 'Enterprise'],
    rows: [
      { metric: 'Uptime SLA', values: ['—', '99.9%', '99.95% custom'] },
      { metric: 'p50 latency', values: ['<30ms', '<20ms', '<15ms dedicated'] },
      { metric: 'Support response', values: ['Email / 48h', 'Priority / 24h', 'Dedicated / 4h'] },
      { metric: 'Incident notification', values: ['Status page', 'Status page', 'Direct alert'] },
      { metric: 'Data residency', values: ['Shared GCP', 'Shared GCP', 'Your VPC / on-prem'] },
      { metric: 'Security review', values: ['—', '—', 'On request'] },
      { metric: 'Custom contract', values: ['—', '—', 'Yes'] },
    ],
  },

  contact: {
    id: 'contact',
    label: 'Contact sales',
    heading: "LET'S TALK.",
    body: 'Tell us about your use case. We’ll come back within one business day with a custom proposal.',
    /**
     * Each field carries its own placeholder — the live form reuses "Your
     * name" on every text input, so "Company & role" asks for a name too.
     */
    fields: [
      { id: 'name', label: 'Name', type: 'text' as const, required: true, placeholder: 'Your name' },
      { id: 'email', label: 'Work email', type: 'email' as const, required: true, placeholder: 'you@company.com' },
      {
        id: 'company',
        label: 'Company & role',
        type: 'text' as const,
        required: false,
        placeholder: 'Acme · Head of Platform',
      },
      { id: 'volume', label: 'Estimated monthly API calls', type: 'select' as const, required: false },
      {
        id: 'useCase',
        label: 'Tell us about your use case',
        type: 'textarea' as const,
        required: true,
        placeholder: 'What are you building, and what does it cost you today?',
      },
    ],
    volumes: ['Select volume…', 'Under 1M / month', '1M – 10M / month', '10M – 100M / month', '100M+ / month'],
    submit: 'Send to sales team',
    direct: 'Or email us directly',
  },
} as const;
