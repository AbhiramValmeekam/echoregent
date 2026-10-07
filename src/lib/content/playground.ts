/**
 * Playground sample data.
 *
 * Every conversation here is written for this page — it is illustrative sample
 * data, not a recording of a real request, and the playground says so on the
 * page. Nothing is sent anywhere: the reveal is scripted client-side. There is
 * no API call, and therefore no latency figure is shown.
 *
 * The three samples exist to show three different decisions, not three
 * versions of the same one:
 *   - Developer logs   → heavy redundancy, large reduction
 *   - Support thread   → moderate redundancy, moderate reduction
 *   - Medical query    → protected zone, no compression at all
 */

export interface SampleStage {
  /** Console line, printed in order. */
  text: string;
  /** Optional trailing value, right-aligned in the console. */
  value?: string;
  /** Renders in the protected (coral) tone. */
  protect?: boolean;
}

export interface Sample {
  id: string;
  label: string;
  blurb: string;
  domain: string;
  intent: string;
  risk: string;
  protected: boolean;
  beforeTokens: number;
  afterTokens: number;
  /** Context as it arrives, one line per row. */
  before: string[];
  /** Context as it leaves. Empty for protected samples. */
  after: string[];
  stages: SampleStage[];
  verdict: string;
}

export const samples: Sample[] = [
  {
    id: 'logs',
    label: 'Developer logs',
    blurb: 'A debugging session where the same stack trace has been pasted four times.',
    domain: 'coding',
    intent: 'debug',
    risk: 'none',
    protected: false,
    beforeTokens: 14280,
    afterTokens: 412,
    before: [
      'system: You are a senior engineer. Be concise. Prefer code over prose.',
      'user: getting a 500 on the checkout route after deploy',
      'assistant: Can you share the stack trace?',
      'user: Traceback (most recent call last): File "api/checkout.py", line 88 ...',
      'assistant: That looks like a null session. Is the middleware running?',
      'user: Traceback (most recent call last): File "api/checkout.py", line 88 ...',
      'assistant: Same trace. Let us check the middleware order.',
      'user: Traceback (most recent call last): File "api/checkout.py", line 88 ...',
      'tool: read_file("api/middleware.py") → 214 lines',
      'tool: read_file("api/checkout.py") → 96 lines',
      'user: Traceback (most recent call last): File "api/checkout.py", line 88 ...',
      'user: still broken. run the tests',
      'tool: pytest → 3 failed, 41 passed',
    ],
    after: [
      'system: You are a senior engineer. Be concise.',
      'issue: 500 on checkout after deploy; null session in checkout.py:88',
      'attempted: middleware order checked — not the cause',
      'artifacts: middleware.py, checkout.py, pytest 3 failed / 41 passed',
      'state: unresolved, tests failing',
    ],
    stages: [
      { text: 'reading payload', value: '13 blocks' },
      { text: 'classify → domain', value: 'coding' },
      { text: 'classify → intent', value: 'debug' },
      { text: 'classify → risk', value: 'none' },
      { text: 'duplicate scan', value: '4 identical traces' },
      { text: 'compress → drop redundant stack traces', value: '−9,140' },
      { text: 'compress → collapse resolved attempts', value: '−3,208' },
      { text: 'cache → lookup session state', value: 'miss' },
      { text: 'emit', value: '412 tokens' },
    ],
    verdict: 'Nine tenths of this conversation was the same trace repeated. The failure, the attempts and the current state all survive.',
  },
  {
    id: 'support',
    label: 'Customer support',
    blurb: 'A billing thread where the policy paragraph is resent on every reply.',
    domain: 'customer_support',
    intent: 'billing_dispute',
    risk: 'low',
    protected: false,
    beforeTokens: 9640,
    afterTokens: 731,
    before: [
      'system: You are a support agent for Northwind. Refunds within 30 days. Pro-rated for annual plans. Escalate after two failed attempts. Never promise a refund you cannot issue. Always confirm the account email before discussing billing.',
      'user: I was charged twice this month',
      'assistant: I am sorry about that. Refunds within 30 days. Pro-rated for annual plans. Escalate after two failed attempts. Never promise a refund you cannot issue. Always confirm the account email before discussing billing.',
      'user: it is the annual plan',
      'assistant: Understood. Refunds within 30 days. Pro-rated for annual plans. Escalate after two failed attempts. Never promise a refund you cannot issue. Always confirm the account email before discussing billing.',
      'user: can you just fix it',
      'assistant: I will need the account email first. Refunds within 30 days. Pro-rated for annual plans. Escalate after two failed attempts. Never promise a refund you cannot issue. Always confirm the account email before discussing billing.',
      'user: a.morgan@example.com',
    ],
    after: [
      'system: Support agent, Northwind. Policy: 30-day refund window; annual plans pro-rated; escalate after 2 failed attempts; never promise an unissuable refund; confirm account email before discussing billing.',
      'issue: duplicate charge, annual plan',
      'customer: a.morgan@example.com',
      'state: awaiting refund decision; policy allows pro-rated refund',
    ],
    stages: [
      { text: 'reading payload', value: '9 blocks' },
      { text: 'classify → domain', value: 'customer_support' },
      { text: 'classify → intent', value: 'billing_dispute' },
      { text: 'classify → risk', value: 'low' },
      { text: 'duplicate scan', value: '4 identical policy blocks' },
      { text: 'compress → hoist policy to system once', value: '−7,842' },
      { text: 'compress → keep account email verbatim', value: 'pinned' },
      { text: 'cache → lookup prior thread', value: 'miss' },
      { text: 'emit', value: '731 tokens' },
    ],
    verdict: 'The policy survives once instead of four times, and the account email is pinned rather than summarised — identifiers are never rewritten.',
  },
  {
    id: 'medical',
    label: 'Medical query',
    blurb: 'A clinical conversation that the pipeline declines to compress.',
    domain: 'medical',
    intent: 'symptom_description',
    risk: 'high',
    protected: true,
    beforeTokens: 5180,
    afterTokens: 5180,
    before: [
      'system: You are a clinical information assistant. You do not diagnose. You do not give dosing advice. Escalate anything involving chest pain, breathing difficulty or loss of consciousness.',
      'user: my father has been short of breath since yesterday evening',
      'assistant: Shortness of breath that began suddenly needs urgent assessment. Please contact emergency services or go to an emergency department now.',
      'user: he is 71 and takes warfarin',
      'assistant: Warfarin with new shortness of breath is an emergency. Call emergency services now.',
      'user: he says it is getting worse when he lies down',
      'assistant: Worsening breathlessness when lying flat is a red flag. Emergency assessment is required immediately.',
    ],
    after: [],
    stages: [
      { text: 'reading payload', value: '7 blocks' },
      { text: 'classify → domain', value: 'medical' },
      { text: 'classify → intent', value: 'symptom_description' },
      { text: 'classify → risk', value: 'high' },
      { text: 'protected zone matched', value: 'medical', protect: true },
      { text: 'compression declined by policy', value: 'bypass', protect: true },
      { text: 'emit', value: '5,180 tokens — unchanged', protect: true },
    ],
    verdict: 'This conversation is passed through whole. No tokens are saved, and that is the correct outcome.',
  },
];

export const playground = {
  index: '05',
  label: 'Playground',
  heading: 'WATCH CONTEXT DISAPPEAR.',
  intro:
    'Pick a conversation. The pipeline classifies it, then decides what to remove. The third sample is protected, and the pipeline refuses to touch it.',
  disclaimer:
    'Illustrative. These three conversations are written for this page and the reveal is scripted in your browser — no request is sent anywhere, and no latency figure is shown because nothing is being measured.',
  cta: { label: 'Request a token audit', subject: 'EchoRegent token audit' },
} as const;
