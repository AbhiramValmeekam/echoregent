/**
 * /product — the four systems, one API.
 *
 * Transcribed from the live site's product page, with "Prexi" replaced by
 * "EchoRegent" throughout. The live page's own code samples disagree with
 * themselves on the header name (`x-cts-key` on some panels,
 * `x-echoregent-key` on others) and print `https://api.Prexi.ai` — both are
 * normalised here to the EchoRegent spelling, since a header name is a
 * contract and there should be exactly one of it.
 *
 * Anchor ids match the footer's Product column.
 */

export const product = {
  eyebrow: 'Product',
  heading: 'FOUR SYSTEMS.\nONE API.',
  lede: 'Everything runs on CPU in your infrastructure. No GPU, no external embedding calls, no data egress.',

  systems: [
    {
      id: 'classify',
      numeral: '01',
      label: 'Classify',
      name: 'Context Classifier',
      lead: 'Know what the conversation is about before compressing it.',
      body: [
        'DistilBERT fine-tuned on 10 conversation domains. Runs entirely on CPU. Returns domain, intent, risk level, and emotional state per turn in under 10ms. No LLM call required.',
        'The classifier is the foundation of everything else — it determines whether to compress, which compression strategy to apply, and whether the conversation is protected.',
      ],
      bullets: [
        '10 domains — coding, medical, legal, sales, support, finance, education, creative, crisis, general',
        'Intent detection — debugging, planning, explaining, and so on',
        'Risk level 0–3 per turn',
        '<10ms on CPU — the classifier stage budget, not end-to-end latency',
      ],
      panel: {
        label: 'Response — /compress',
        code: [
          { text: '{', tone: 'plain' },
          { text: '  "domain":    "coding",', tone: 'mark' },
          { text: '  "intent":    "debugging",', tone: 'mark' },
          { text: '  "riskLevel": 0,', tone: 'plain' },
          { text: '  "state":     "frustrated",', tone: 'plain' },
          { text: '  "protected": false', tone: 'add' },
          { text: '}', tone: 'plain' },
        ],
      },
      stat: { value: '<10ms', label: 'per classification on CPU', kind: 'derived' as const },
    },
    {
      id: 'compress',
      numeral: '02',
      label: 'Compress',
      name: 'History Compressor',
      lead: 'Remove the noise while preserving the meaning.',
      body: [
        'T5 removes conversational noise while preserving semantic meaning. Not a truncation — a summarisation. Previous turns get compressed; the current turn is always left untouched.',
        'Compression is domain-aware. Medical history doesn’t compress. Legal transcripts don’t compress. Stack traces compress aggressively. The same model, different strategies per domain.',
      ],
      bullets: [
        'T5 sequence-to-sequence summarisation',
        'Domain-aware strategy selection',
        'Last N turns always preserved uncompressed',
        '64.7% average reduction on the load test · 87% quality match-or-beat',
      ],
      panel: {
        label: 'Measured — LoCoMo and load test',
        code: [
          { text: 'LoCoMo, mean tokens per query', tone: 'dim' },
          { text: '  18,679  →  259', tone: 'mark' },
          { text: '', tone: 'plain' },
          { text: '10M-token load test', tone: 'dim' },
          { text: '  18,679  →  6,601    64.7%', tone: 'mark' },
        ],
        note: 'Two different tests, one shared baseline. The 259 is LoCoMo; the 6,601 is the load test. They are not two versions of the same number.',
      },
      stat: { value: '64.7%', label: 'average token reduction', kind: 'measured' as const },
    },
    {
      id: 'cache',
      numeral: '03',
      label: 'Cache',
      name: 'Semantic Cache',
      lead: 'Cache meaning, not text.',
      body: [
        'MiniLM generates 384-dimensional embeddings for each incoming query. If a semantically equivalent query has been processed before, the cached compressed context is returned — skipping compression entirely.',
        'Works across users: if two different users ask semantically similar questions in the same session type, the second user benefits from the first user’s compression. Cache savings compound over time.',
      ],
      bullets: [
        'MiniLM embeddings · 384 dimensions',
        'Cosine similarity threshold, configurable',
        'Sub-5ms cache lookup before compression',
        'Cache hit returned as x-echoregent-cache-hit: true',
      ],
      panel: {
        label: 'Typical for high-repetition workloads',
        code: [
          { text: 'customer support  ·  FAQ bots', tone: 'dim' },
          { text: '  cache hit rate  > 40%', tone: 'mark' },
          { text: '', tone: 'plain' },
          { text: '// a hit returns immediately —', tone: 'dim' },
          { text: '// compression and the LLM call are skipped', tone: 'dim' },
        ],
      },
      stat: { value: '<5ms', label: 'cache lookup per turn', kind: 'measured' as const },
    },
    {
      id: 'protect',
      numeral: '04',
      label: 'Protect',
      name: 'Protected Zones',
      lead: 'Not a filter you can turn off. An architectural boundary.',
      protected: true,
      body: [
        'Medical, legal, and crisis conversations are never compressed, never monetized, and never cached. Not a filter you can turn off. An architectural boundary at the function level.',
        'The full context is forwarded to your LLM unchanged, and the response header returns x-echoregent-protected: true. This cannot be overridden by API callers, admin keys, subscription tier or configuration.',
      ],
      zones: [
        { name: 'Medical', detail: 'Symptoms, diagnoses, prescriptions, procedures' },
        { name: 'Legal', detail: 'Contracts, litigation, regulatory, compliance' },
        { name: 'Crisis', detail: 'Mental health, self-harm, emergency services' },
      ],
      bullets: [
        'Badge — ARCHITECTURAL BOUNDARY · cannot be disabled',
        'Protected conversations are not counted toward your token quota',
        'Bypass happens before any other processing',
      ],
      panel: {
        label: 'Response — protected turn',
        code: [
          { text: '{', tone: 'plain' },
          { text: '  "domain":     "medical",', tone: 'mark' },
          { text: '  "riskLevel":  3,', tone: 'mark' },
          { text: '  "compressed": false,', tone: 'plain' },
          { text: '  "protected":  true', tone: 'add' },
          { text: '}', tone: 'plain' },
        ],
      },
      stat: { value: 'Hard floor', label: 'no compression · no leakage', kind: 'measured' as const },
    },
    {
      id: 'mcp',
      numeral: '05',
      label: 'MCP Server',
      name: 'Works inside your AI IDE',
      lead: 'A native MCP server with four tools.',
      body: [
        'Native MCP server with 4 tools. Add EchoRegent to Claude Desktop, Cursor, or Windsurf in under 2 minutes. No proxy layer needed.',
      ],
      tools: [
        { name: 'compress', detail: 'Compress a conversation history. Returns the compressed messages array plus classification metadata.' },
        { name: 'classify', detail: 'Classify a single message or conversation turn. Returns domain, intent, risk level, emotional state.' },
        { name: 'remember', detail: 'Store a key fact or decision for this session. Persists across context window resets.' },
        { name: 'recall', detail: 'Retrieve stored facts by keyword. Use at the start of a new session to restore context.' },
      ],
      panel: {
        label: 'Claude Desktop — mcp.json',
        code: [
          { text: '{', tone: 'plain' },
          { text: '  "mcpServers": {', tone: 'plain' },
          { text: '    "echoregent": {', tone: 'mark' },
          { text: '      "command": "npx",', tone: 'plain' },
          { text: '      "args": ["-y", "@echoregent/mcp-server"],', tone: 'add' },
          { text: '      "env": { "ECHOREGENT_KEY": "your-key" }', tone: 'add' },
          { text: '    }', tone: 'plain' },
          { text: '  }', tone: 'plain' },
          { text: '}', tone: 'plain' },
        ],
      },
      stat: { value: '4 tools', label: 'compress · classify · remember · recall', kind: 'measured' as const },
    },
    {
      id: 'proxy',
      numeral: '06',
      label: 'OpenAI Proxy',
      name: 'Drop-in. Any model.',
      lead: 'Change baseURL. Nothing else changes.',
      body: [
        'EchoRegent exposes a fully OpenAI-compatible /v1/chat/completions endpoint. Change baseURL in your client — nothing else changes.',
      ],
      bullets: [
        'OpenAI, Anthropic, Gemini, Mistral, Groq, Together, or any compatible endpoint',
        'Route to a non-OpenAI provider with the x-llm-provider header',
        'Your LLM provider key is forwarded transparently and never stored',
      ],
      panel: {
        label: 'Three-line integration',
        code: [
          { text: 'const client = new OpenAI({', tone: 'plain' },
          { text: '  apiKey: process.env.OPENAI_API_KEY,', tone: 'plain' },
          { text: '  baseURL: "https://api.echoregent.dev/v1",', tone: 'add' },
          { text: '  defaultHeaders: {', tone: 'add' },
          { text: '    "x-echoregent-key": process.env.ECHOREGENT_KEY,', tone: 'add' },
          { text: '  },', tone: 'add' },
          { text: '})', tone: 'plain' },
        ],
      },
      stat: { value: 'One line', label: 'the only change to your code', kind: 'measured' as const },
    },
  ],

  /** The response headers the live site documents. */
  headers: {
    label: 'Response headers',
    note: 'Header names are the intended interface, not a live contract — no endpoint is serving them yet.',
    rows: [
      { key: 'x-echoregent-tokens-saved', value: 'integer · tokens removed from context' },
      { key: 'x-echoregent-compression-pct', value: 'integer 0–100 · reduction in context length' },
      { key: 'x-echoregent-domain', value: 'string · detected conversation domain' },
      { key: 'x-echoregent-intent', value: 'string · detected intent' },
      { key: 'x-echoregent-cache-hit', value: 'boolean · served from the semantic cache' },
      { key: 'x-echoregent-protected', value: 'boolean · compression disabled for this turn' },
    ],
  },

  cta: {
    heading: 'SEE IT RUN ON\nYOUR OWN CONTEXT.',
    body: 'The free tier is 10M tokens a month, and the waitlist is how you get one.',
    primary: { label: 'Join the waitlist', action: 'waitlist' as const },
    secondary: { label: 'Read the benchmarks', to: '/research' },
  },
} as const;
