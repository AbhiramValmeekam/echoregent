/**
 * Integration — the intended interface.
 *
 * The brief asks for "ONE CHANGE. EVERYTHING CHANGES." with a baseURL swap.
 * That is the real design, but the product is in development, so this section
 * is labelled a preview rather than an install instruction: no package exists
 * to install and no endpoint is live.
 */

export const integration = {
  index: '09',
  label: 'Integration',
  heading: 'ONE CHANGE.\nEVERYTHING CHANGES.',
  intro:
    'EchoRegent sits behind the client you already use. The interface is the one you have — a base URL. Everything else about your application stays as it is.',
  qualifier: 'Preview — not yet installable',

  before: {
    label: 'Before',
    caption: 'Your application talks to the model directly. Every turn sends the whole history.',
    code: [
      { text: 'const client = new OpenAI({', tone: 'plain' },
      { text: "  apiKey: process.env.OPENAI_API_KEY,", tone: 'plain' },
      { text: '});', tone: 'plain' },
      { text: '', tone: 'plain' },
      { text: '// every call carries the full history', tone: 'dim' },
      { text: 'await client.chat.completions.create({', tone: 'plain' },
      { text: '  model: "gpt-4o",', tone: 'plain' },
      { text: '  messages: fullHistory,   // 18,679 tokens', tone: 'mark' },
      { text: '});', tone: 'plain' },
    ],
  },

  after: {
    label: 'After',
    caption: 'One line moves. The request that reaches the model is the part that carried signal.',
    code: [
      { text: 'const client = new OpenAI({', tone: 'plain' },
      { text: "  apiKey: process.env.OPENAI_API_KEY,", tone: 'plain' },
      { text: '  baseURL: "https://api.echoregent.dev/v1",', tone: 'add' },
      { text: '});', tone: 'plain' },
      { text: '', tone: 'plain' },
      { text: '// the call site does not change', tone: 'dim' },
      { text: 'await client.chat.completions.create({', tone: 'plain' },
      { text: '  model: "gpt-4o",', tone: 'plain' },
      { text: '  messages: fullHistory,   // 259 tokens on the wire', tone: 'mark' },
      { text: '});', tone: 'plain' },
    ],
  },

  /**
   * The scope of the two payload comments above.
   *
   * `18,679` and `259` are drawn into a code sample, which is the most
   * convincing place a number can appear and the easiest place for one to go
   * unqualified — it reads as a log line rather than as a claim. The route
   * sweep flagged both on `/how-it-works`, where nothing within eight levels
   * of the comment said where the figures came from.
   */
  payloadSource:
    'Payload figures are the LoCoMo mean per query, measured here — not the load-test result. See the evidence.',

  /**
   * What the developer actually gets back — surfaced as response headers.
   *
   * The names are the ones on /product, not the set the live landing page used.
   * The live site documents two different vocabularies for one interface
   * (`x-echoregent-compressed` / `-tokens-in` / `-tokens-out` here,
   * `x-echoregent-tokens-saved` / `-compression-pct` on its product page); a
   * header name is a contract, so this page shows four rows of the canonical
   * set rather than a second spelling of it. The values are the example the
   * code panel above walks through — 18,679 in, 259 out, so 18,420 saved.
   */
  response: {
    label: 'Response headers',
    rows: [
      { key: 'x-echoregent-domain', value: '"coding"' },
      { key: 'x-echoregent-tokens-saved', value: '18420' },
      { key: 'x-echoregent-cache-hit', value: 'false' },
      { key: 'x-echoregent-protected', value: 'false' },
    ],
    note: 'Header names are the intended interface, not a live contract. The complete set is on the product page.',
  },

  facts: [
    { label: 'Change to your code', value: 'One line' },
    { label: 'Model compatibility', value: 'Any OpenAI-style API' },
    { label: 'Failure behaviour', value: 'Pass-through, never block' },
    { label: 'Data retention', value: 'None — in-memory only' },
  ],

  note: 'For a product in development, the honest version of this section is a preview of the interface rather than a quickstart. The quickstart arrives with the release.',
} as const;
