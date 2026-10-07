# ECHOREGENT CONTENT PACK
**Source:** https://echoregent-yudi-pub.web.app/ (extracted 2026-10-07 from the live site, including raw HTML and inline JavaScript so hidden/interactive content is captured)

## EXTRACTION NOTES (read first)
- The site is a **14-page multi-site**, not a single page: `/`, `/product`, `/solutions/customer-support`, `/solutions/coding-assistants`, `/solutions/ai-agents`, `/enterprise`, `/research`, `/docs`, `/pricing`, `/blog/`, `/changelog`, `/login`, `/security`, `/about`. All are captured below.
- **The on-site brand name is "Prexi"** (page titles, nav, footer, copyright). "EchoRegent" appears only in the domain/URL, in code samples (`x-echoregent-key`, `ECHOREGENT_KEY`, `@echoregent/mcp-server`, `your-echoregent-key`), and in the GitHub repo name (`ashy5454/echoregent`). The company named on-site is **Yudi Labs, Hyderabad**. Everything is preserved exactly as written; nothing was renamed.
- Inconsistencies in the source are preserved verbatim and flagged under "SOURCE INCONSISTENCIES" at the end (not corrected).
- Text styled in uppercase via CSS is given here in its source casing where known.

---

## 1. BRAND / PRODUCT NAME
- Product: **Prexi**
- Tagline label (hero eyebrow): **Context Management for LLMs**
- Page `<title>` (home): "Prexi — Stop Paying for Tokens You Don't Need"
- Meta description: "Drop-in context management for LLMs. 26x more token-efficient than mem0. Compress, cache, and protect every conversation — one API call."
- og:title: "Prexi — LLM Context Management"
- og:description: "Cut LLM API costs by 65%. Drop-in middleware for GPT-4o, Claude, Gemini. One API call."
- Other page titles: "Product — Prexi", "Customer Support — Prexi", "Coding Assistants — Prexi", "AI Agents — Prexi", "Enterprise — Prexi", "Research — Prexi Benchmarks", "Docs — Prexi Integration Guide", "Pricing — Prexi", "Blog — Prexi", "Changelog — Prexi", "Get Started — Prexi", "Security — Prexi", "About — Prexi"
- Maker: "Yudi Labs, Hyderabad" / "Yudi Labs — a small AI research team focused on making LLMs structurally better, not just faster."
- Footer one-liner: "The context management layer that gives LLMs what remains. Built by Yudi Labs, Hyderabad."

---

## 2. NAVIGATION (global, all pages)
Logo: **Prexi** → `/`

| Item | Destination |
|---|---|
| **Product ▾** (dropdown) | |
| – Context Classifier | /product |
| – History Compressor | /product#compress |
| – Semantic Cache | /product#cache |
| – Protected Zones | /product#protect |
| – MCP Server | /product#mcp |
| – OpenAI Proxy | /product#proxy |
| **Solutions ▾** (dropdown) | |
| – Customer Support | /solutions/customer-support |
| – Coding Assistants | /solutions/coding-assistants |
| – AI Agents | /solutions/ai-agents |
| – Enterprise | /enterprise |
| Research | /research |
| Docs | /docs |
| Pricing | /pricing |
| Blog | /blog/ |
| Changelog | /changelog |

**Nav CTA buttons:** "Sign In" → /login · "Enterprise" → /enterprise · "Get API Key" → /pricing#get-key (appears twice in the DOM, i.e. desktop + mobile menu)

---

## 3. HERO (home)
- Eyebrow: **CONTEXT MANAGEMENT FOR LLMS**
- Headline: **Stop paying for tokens / you don't need.**
- Description: "Drop-in context management for GPT-4o, Claude, Gemini, and any OpenAI-compatible model. Compress, cache, and protect every conversation — one API call."
- CTAs: **Get Started Free** (→ /pricing#get-key) · **See the Benchmark →** (→ /research)
- Hero statistics (counter animations; targets: 26 "x", 65 "%", 14 prefix "F1 +" suffix "%"):
  - **26x** — TOKEN EFFICIENCY VS MEM0
  - **65%** — AVG TOKEN REDUCTION
  - **<10ms** — PER-TURN OVERHEAD
  - **F1 +14%** — QUALITY VS FULL CONTEXT
- **BACKED & SUPPORTED BY** (scrolling logo marquee, set duplicated for loop): Google for Startups · NVIDIA Inception · T-Hub Hyderabad · Microsoft for Startups (image alt text: "Google for Startups", "T-Hub Hyderabad", "Microsoft for Startups"; NVIDIA Inception is an SVG badge rendered as "N / NVIDIA / INCEPTION")

---

## 4. PRODUCT OVERVIEW
(Home page: Architecture + Features sections; /product page intro)

### 4.1 Home — Architecture section
- Label: ARCHITECTURE
- Headline: **Every turn. Classified. / Compressed. Protected.**
- Sub: "Purpose-built context pipeline. No extra LLM calls. No data shared with third parties."
- Pipeline diagram (left→right):
  1. **INCOMING** — message + history
  2. **CLASSIFIER** — intent · domain · risk
  3. **COMPRESSOR** — 65% reduction avg
  4. **CACHE** — semantic · <5ms
  5. **YOUR LLM** — clean, compressed context

### 4.2 /product page intro
- Label: Product
- Headline: **Four systems. / One API.**
- Sub: "Everything runs on CPU in your infrastructure. No GPU, no external embedding calls, no data egress."

### 4.3 Problem being solved (from /about "Origin")
"Every AI product we built hit the same wall. By turn 10 of a conversation, you're sending thousands of tokens to the LLM — most of which is noise from earlier turns. The model's attention dilutes. Costs climb. Quality drops."

"The existing solutions were either too broad (truncate everything after N tokens) or too opinionated (extract facts into a graph, then re-inject them). Neither approach preserved conversational meaning well. Neither knew when to leave a conversation alone."

"Prexi started from a simple question: what does the brain do here? Humans don't replay full conversation transcripts to recall context. They compress — keeping signal, discarding noise. The key insight is that compression is domain-specific. You compress a casual chat aggressively. You compress a legal document not at all."

### 4.4 Positioning
- "Drop-in context management…" / "The context management layer that gives LLMs what remains."
- Mission (/about): "Make context management invisible infrastructure. The same way you don't think about TCP/IP when you send an email — you shouldn't have to think about context compression when you build an AI product."
- Long-term goal: "Prexi becomes the default layer between applications and LLMs — the thing that makes AI applications cheaper to run, better in quality, and safer by default."
- Docs positioning: "Prexi sits between your application and any LLM. Three integration paths: OpenAI-compatible proxy (recommended), native MCP server, or direct REST API."

---

## 5. PRODUCT FEATURES

### 5.1 Home — Features section
- Label: FEATURES
- Headline: **Infrastructure that / remembers what counts.**
- Sub: "Four systems in one API. Each one invisible to your LLM. Each one critical to your bill."

**CLASSIFY — Domain & Intent Detection**
"Fine-tuned classifier across 10 domains — coding, medical, legal, sales, customer support, and more. Returns domain, intent, risk level, and emotional state per turn. No LLM call."
Metric: **<10ms** per classification

**COMPRESS — History Compression**
"Removes noise while preserving semantic meaning. Stack traces compress well. Medical history doesn't — by design. Compression is domain-aware, not uniform. Measured on LoCoMo: 259 tokens vs 18,679 for full context."
Metric: **64.7%** avg token reduction

**CACHE — Semantic Similarity Cache**
"Catches semantically equivalent questions before they reach the compressor. Returning users skip reprocessing entirely. Savings compound with usage."
Metric: **Sub-5ms** cache lookup per turn

**PROTECT — Protected Zones**
"Medical, legal, and crisis conversations are never compressed. Not a filter — an architectural boundary. If the classifier returns medical, compression is disabled at the function level."
Metric: **Hard floor** — no compression · no leakage

### 5.2 /product — detailed feature sections

**Classify — Context Classifier**
"DistilBERT fine-tuned on 10 conversation domains. Runs entirely on CPU. Returns domain, intent, risk level, and emotional state per turn in under 10ms. No LLM call required."
"The classifier is the foundation of everything else — it determines whether to compress, which compression strategy to apply, and whether the conversation is protected."
Bullets:
- 10 domains: coding, medical, legal, sales, support, finance, education, creative, crisis, general
- Intent detection (debugging, planning, explaining, etc.)
- Risk level 0–3 per turn
- <10ms on CPU · no GPU · no external calls

Code panel "Response — /compress":
```
{
"domain":
"coding",
"intent":
"debugging",
"riskLevel":
0,
"state":
"frustrated",
"protected":
false
}
```
(Rendered as a JSON object with keys domain, intent, riskLevel, state, protected.)
Stat: **<10ms** per classification on CPU

**Compress — History Compressor**
Visual stat block: **18,679** original tokens → **6,601** compressed tokens · **64.7%** Average token reduction
"T5 removes conversational noise while preserving semantic meaning. Not a truncation — a summarisation. Previous turns get compressed; the current turn is always left untouched."
"Compression is domain-aware. Medical history doesn't compress. Legal transcripts don't compress. Stack traces compress aggressively. The same model, different strategies per domain."
Bullets:
- T5 sequence-to-sequence summarisation
- Domain-aware strategy selection
- Last N turns always preserved uncompressed
- 64.7% average reduction · 87% quality match

**Cache — Semantic Cache**
"MiniLM generates 384-dimensional embeddings for each incoming query. If a semantically equivalent query has been processed before, the cached compressed context is returned — skipping compression entirely."
"Works across users: if two different users ask semantically similar questions in the same session type, the second user benefits from the first user's compression. Cache savings compound over time."
Bullets:
- MiniLM embeddings · 384 dimensions
- Cosine similarity threshold (configurable)
- Sub-5ms cache lookup before compression
- Cache hit returned as `x-cts-cache-hit: true`
Stat: **Sub-5ms** cache lookup per turn
Callout: "Cache hits return immediately — compression and LLM calls are skipped. For high-repetition workloads (customer support, FAQ bots), cache hit rates above 40% are typical."

**Protect — Protected Zones**
Badge: ARCHITECTURAL BOUNDARY — "Protected zones cannot be disabled by API callers, subscription tier, or configuration. The check happens inside compressHistory() before any other processing."
Tags: MEDICAL · LEGAL · CRISIS
Note: "Protected conversations are not counted toward token quota."
"Medical, legal, and crisis conversations are never compressed, never monetized, and never cached. Not a filter you can turn off. An architectural boundary at the function level."
"If the classifier returns medical, legal, or crisis, compression is disabled. The full context is forwarded to your LLM unchanged. The response header returns `x-cts-protected: true`."
- ● Medical: symptoms, diagnoses, prescriptions, procedures
- ● Legal: contracts, litigation, regulatory, compliance
- ● Crisis: mental health, self-harm, emergency services

**MCP Server — "Works inside your AI IDE."**
"Native MCP server with 4 tools. Add Prexi to Claude Desktop, Cursor, or Windsurf in under 2 minutes."
- **compress** — "Compress a conversation history. Returns the compressed messages array plus classification metadata."
- **classify** — "Classify a single message or conversation turn. Returns domain, intent, risk level, emotional state."
- **remember / recall** — "Store and retrieve facts semantically. Persistent across sessions. Works as long-term memory for agents."
- Link: **Setup guide →**

**OpenAI Proxy — "Drop-in. Any model."**
"Prexi exposes a fully OpenAI-compatible /v1/chat/completions endpoint. Change baseURL in your client — nothing else changes."
Link: **Integration docs →**
Label: 3-line integration
```js
const client = new OpenAI({
 apiKey: process.env.OPENAI_KEY,
 baseURL: 'https://api.Prexi.ai/v1',
 defaultHeaders: {
'x-cts-key': process.env.ECHOREGENT_KEY
 }
})
```

### 5.3 Solutions pages (feature-level content)

#### /solutions/customer-support
- Label: Solutions · Customer Support
- Headline: **Your support bot remembers. / Your bill doesn't grow.**
- Sub: "Long support threads bloat your context window every turn. Prexi compresses the history before each LLM call — same quality, 60% fewer tokens."
- CTAs: **Get API Key →** · **Integration Docs**
- Stats: **60%** avg cost reduction · **<15ms** compression overhead · **87%** quality match-or-beat · **0** code changes to integrate
- **The Problem — "Support threads are LLM cost traps."**
  "A ticket that runs 15 turns sends the full transcript to the LLM on every reply. Turn 15 might be 4,000 tokens of context — 70% of which is greetings, re-explanations, and resolved sub-issues from earlier in the conversation."
  "You pay for all of it. The model's attention dilutes. Response quality quietly drops. And you have no visibility into why."
  WITHOUT Prexi: Turn 1 → 120 tokens · Turn 5 → 780 tokens · Turn 10 → 2,100 tokens · Turn 15 → 3,940 tokens · "Cost grows linearly with conversation length"
- **How It Works — "Compress. Cache. Forward."**
  1. **Classify the ticket** — "DistilBERT reads the conversation and detects domain (customer support), intent, sentiment, and escalation risk. Runs on CPU in <10ms. No external API call."
  2. **Compress the history** — "T5 summarises resolved earlier turns while preserving unresolved issues, account details, and escalation context. Average 60% reduction for support threads."
  3. **Cache repeated queries** — "MiniLM catches semantically identical questions ("where is my order?", "order status?", "track my package"). Cache hits skip LLM entirely. Savings compound across all users."
- **Integration — "One URL change. That's it."**
  "Works with any support platform that calls an OpenAI-compatible endpoint — Intercom, Zendesk AI, custom bots, in-house tooling."
  Before → After:
  ```js
  // Before
  const client = new OpenAI({ apiKey: "sk-..." })
  // with Prexi
  const client = new OpenAI({
   apiKey: "sk-...",
   baseURL: "https://api.Prexi.ai/v1",
   defaultHeaders: { "x-echoregent-key": "your-key" }
  })
  ```
- Closing CTA: **Integrate in under 60 seconds.** "Free tier — 10M tokens. No credit card. Works today." → **Get a free API key →** · **Read the docs**

#### /solutions/coding-assistants
- Label: Solutions · Coding Assistants
- Headline: **Stack traces compress. / Code context doesn't.**
- Sub: "Coding sessions accumulate fast — error loops, refactor attempts, dead ends. Prexi strips the noise while keeping every live code block and unresolved error intact."
- CTAs: **Get API Key →** · **MCP Setup Guide**
- Stats: **72%** reduction on debug sessions · **4** MCP tools (compress, classify, remember, recall) · **Native** Cursor · Windsurf · Claude Desktop · **CPU** no GPU · no external calls
- **Domain-Aware Compression — "Coding gets its own compression strategy."**
  "Generic summarizers treat code like prose. They compress indiscriminately — and lose the exact stack frame that caused the error, or the function signature that was changed three turns ago."
  "Prexi's T5 model uses a coding-specific compression strategy: stack traces and error messages compress aggressively (they're noisy). Live code blocks, file names, and unresolved errors are preserved verbatim."
  - **COMPRESSES HARD:** Resolved error messages · Successful run logs · "Let me try..." attempts · Repeated explanations · Dead-end branches
  - **PRESERVED VERBATIM:** Active code blocks · Unresolved errors · File paths · Function signatures · The current task goal
- **MCP Integration — "Works inside Cursor, Windsurf, Claude Desktop."**
  "The Prexi MCP server exposes 4 tools your AI IDE can call directly. No proxy layer needed."
  - **compress** — "Compress the current conversation history. Returns compressed messages + tokens saved + domain classification."
  - **classify** — "Classify the conversation domain and intent. Returns domain, risk level, emotional state, intent."
  - **remember** — "Store a key fact or decision for this session. Persists across context window resets."
  - **recall** — "Retrieve stored facts by keyword. Use at the start of a new session to restore context."
  Code "Cursor — mcp.json":
  ```json
  {
  "mcpServers": {
  "Prexi": {
  "command": "npx",
  "args": ["-y", "@echoregent/mcp-server"],
  "env": { "ECHOREGENT_KEY": "your-key" }
   }
  }
  }
  ```
- **OpenAI Proxy — "Or just change your baseURL."**
  "If your coding assistant uses the OpenAI client (Cursor, custom tools, anything built on the SDK), one URL swap wires in compression for every call automatically."
  JavaScript / TypeScript:
  ```js
  const client = new OpenAI({
   apiKey: "sk-...",
   baseURL: "https://api.Prexi.ai/v1",
   defaultHeaders: { "x-echoregent-key": "your-key" }
  })
  ```
- Closing CTA: **Make your coding assistant cheaper and sharper.** "Free tier — 10M tokens, no card required." → **Get a free API key →** · **Full MCP setup guide**

#### /solutions/ai-agents
- Label: Solutions · AI Agents
- Headline: **Agents that run for hours / shouldn't cost like it.**
- Sub: "Long-running agents accumulate context debt. Every tool call, every sub-task, every retry adds tokens. Prexi compresses the trajectory so agents stay within budget — and stay sharp."
- CTAs: **Get API Key →** · **API Reference**
- Stats: **26x** token efficiency vs naive context · **1000+** turns without context overflow · **329/s** requests/second (load tested) · **0** message content stored
- **The Problem — "Context debt is the silent agent killer."**
  "A research agent that runs 200 turns sends the full trajectory to the LLM at turn 200. Most of that trajectory is completed sub-tasks, failed attempts, and intermediate reasoning that's no longer relevant."
  "The model's attention dilutes across the noise. It starts repeating itself, losing track of the goal, or hitting the context limit and crashing mid-run."
  "And you pay for every token in that bloated trajectory — every turn, every call."
  - WITHOUT Prexi: "Token cost grows linearly with agent turns. A 200-turn run costs 200x more than turn 1. Attention degrades. Context limits crash long runs."
  - with Prexi: "Completed sub-tasks compress. Active goals stay intact. Context window stays bounded. The agent runs indefinitely on a predictable per-turn cost."
- **Architecture — "Drop in before the LLM call. Nothing else changes."**
  - **Intent tracking** — "DistilBERT classifies each turn's intent, domain, and risk. The compressor uses this to decide what's safe to summarise vs. what must be preserved verbatim."
  - **Trajectory compression** — "Completed tool calls, resolved sub-tasks, and dead-end branches compress aggressively. Active goals, current state, and unresolved errors are kept in full."
  - **Session memory** — "Use the remember and recall MCP tools to store key facts outside the context window entirely. The agent retrieves them on demand — zero tokens until needed."
- **Integration — "Works with any agent framework."**
  "LangChain, LlamaIndex, AutoGen, CrewAI, custom loops — if it calls an OpenAI-compatible endpoint, you change one URL."
  Python — LangChain example:
  ```python
  from langchain_openai import ChatOpenAI
  llm = ChatOpenAI(
   api_key="sk-...",
   base_url="https://api.Prexi.ai/v1",
   default_headers={"x-echoregent-key": "your-key"}
  )
  # Every agent call now compresses history automatically
  ```
  Direct /compress API — custom agent loops:
  ```js
  const result = await fetch('https://api.Prexi.ai/compress', {
   method: 'POST',
   headers: {
  'Authorization': 'Bearer your-key',
  'Content-Type': 'application/json'
   },
   body: JSON.stringify({ messages: agentHistory })
  })
  // result.compressed → drop into next LLM call
  // result.tokensSaved → track cost reduction
  ```
- **Privacy — "Agent trajectories never leave the pipeline."**
  - **No message storage** — "Agent trajectories are processed in memory. Nothing is stored after compression completes. No logs of message content, no buffers, no training data collection."
  - **Response header proof** — "Every call returns x-echoregent-tokens-saved, x-echoregent-domain, and x-echoregent-protected so you can verify behaviour at the application level."
- Closing CTA: **Build agents that run longer for less.** "Free tier — 10M tokens. No credit card. Works today." → **Get a free API key →** · **See the benchmark numbers**

---

## 6. PLAYGROUND / DEMO (home, "Interactive Playground")
- Label: INTERACTIVE PLAYGROUND
- Headline: **See it compress in real-time.**
- Sub: "Select a conversation type, hit compress, and watch our context pipeline classify and compress the text."
- Tabs: **Developer Logs** · **Customer Support** · **Medical Query**
- Left panel: editable textarea (id `demo-input-text`) pre-filled with the selected sample input.
- Button: **Compress & Classify →** (during run: "Processing turn...")
- Right panel label: **PIPELINE OUTPUT**; status badge initial: **IDLE**; initial output text: "Press 'Compress & Classify' to start the pipeline..."
- Metric labels (initial value "—"): **DOMAIN** · **INTENT** · **RISK LEVEL** · **TOKEN SAVINGS**
- Run sequence (state text): badge "CLASSIFYING" with text "Running turn classification and context matching..." (0.7s) → badge "COMPRESSING" with text "Compresing context history turns..." (sic; 0.5s) → final output.

### Tab 1 — Developer Logs
**Input:**
```
[2026-06-20 10:14:22] INFO: Starting query database operation for userSession_9832
[2026-06-20 10:14:22] DEBUG: Connecting to postgresql://prod-db.yudi.internal:5432/main
[2026-06-20 10:14:23] INFO: Connection established successfully. Pool size: 20
[2026-06-20 10:14:23] DEBUG: Executing query: SELECT * FROM users WHERE email = 'ashmith@yudi.co.in'
[2026-06-20 10:14:23] WARN: Query returned 0 rows. User not found.
[2026-06-20 10:14:24] ERROR: Authentication failed for user 'ashmith@yudi.co.in'. Invalid credentials.
[2026-06-20 10:14:24] DEBUG: Closing database connection. Pool active connections: 19
```
**Output:** "Database connection established to PostgreSQL. Query for user 'ashmith@yudi.co.in' returned 0 rows. Authentication failed due to invalid credentials."
Badge: COMPRESSED (green) · Domain: Sysadmin / Code · Intent: DB Query Debug · Risk Level: Low (Safe) · Token Savings: 77%

### Tab 2 — Customer Support
**Input:**
```
User: Hello, I bought a subscription yesterday and it says my account is still free. I paid $19.99. Can you help?
Agent: I am very sorry to hear that. Let me look up your account. Could you please give me your email address?
User: Yes, it is user@example.com. Here is my receipt number: #REC-9823-1A. Please hurry, I need this for work today.
Agent: Thank you. I see the payment went through but the database transaction failed to provision the user plan. I am manually updating your role to 'Starter' now.
User: Great, it works now! Thanks for the fast response. Have a nice day!
```
**Output:** "User paid $19.99 for subscription but plan was free. Receipt: #REC-9823-1A. Agent resolved by manually updating role to 'Starter' in database."
Badge: COMPRESSED (green) · Domain: Customer Support · Intent: Billing Issue · Risk Level: Low (Safe) · Token Savings: 75%

### Tab 3 — Medical Query
**Input:**
```
User: I've been feeling extremely dizzy since morning. My chest feels slightly tight. I also have a history of hypertension. What should I do?
Agent: I am an AI, not a doctor. If you are experiencing chest tightness, please seek emergency medical assistance immediately.
User: I know, but is it safe to take my regular blood pressure medication right now?
Agent: You must consult a healthcare professional. Do not take or change dosages of hypertension medication without medical advice.
```
**Output:** "[PROTECTED ZONE ENFORCED - COMPRESSION BYPASSED]" (gold, bold) followed by the full input text unchanged.
Badge: PROTECTED (gold) · Domain: Medical / Crisis · Intent: Symptom Query · Risk Level: CRITICAL (shown in red) · Token Savings: 0% (Floor)

---

## 7. ARCHITECTURE
- Home pipeline: INCOMING (message + history) → CLASSIFIER (intent · domain · risk) → COMPRESSOR (65% reduction avg) → CACHE (semantic · <5ms) → YOUR LLM (clean, compressed context)
- "Purpose-built context pipeline. No extra LLM calls. No data shared with third parties."

### /research — "Under the Hood"
- Headline: **Three models. / No cloud dependencies.**
- Sub: "Every model runs on CPU. No GPU required, no external embedding calls, no data leaving your stack."
  - **Classify — DistilBERT:** "Fine-tuned on 10 conversation domains. Returns domain, intent, risk level, and emotional state. Runs in under 10ms on CPU."
  - **Compress — T5:** "Sequence-to-sequence compression. Removes conversational noise while preserving semantic meaning. Domain-aware — medical conversations skip compression entirely."
  - **Cache — MiniLM:** "384-dimensional semantic embeddings. Detects semantically equivalent queries before compression. Cache lookup under 5ms."

### Enterprise architecture statements
- "Prexi's three models run on CPU, sub-20ms end to end. No GPU cold starts. No external API calls before your LLM call. 17ms p50 at 329 req/s."
- Proxy "routes to OpenAI, Anthropic, Gemini, and custom endpoints from one integration."

### /security — Infrastructure (data flow/hosting)
- **Google Cloud Run:** "Serverless containers, auto-scaling, 4GiB memory, min-instances=1 for consistent latency. No shared state between instances."
- **GCP region: asia-south1:** "Default region is Hyderabad (asia-south1). Enterprise customers can request US-East, EU-West, or bring their own VPC."
- **TLS 1.3 everywhere:** "All traffic encrypted in transit via TLS 1.3. HSTS headers enforced. No HTTP fallback on any production endpoint."
- **Firebase Firestore:** "API key metadata stored in Firestore (hashed keys, quota counters, usage metadata). No conversation content ever reaches the database."
- **Rate limiting per key:** "Per-key rate limits enforced in memory per Cloud Run instance. DDoS protection via GCP Load Balancer. Burst capacity handled via Cloud Armor."
- **Dependency audit:** "Open source dependency manifest available on request. We run npm audit on every build. Critical CVEs block deployments."

---

## 8. BENCHMARKS

### 8.1 Home — Benchmark section
- Label: BENCHMARK · LOCOMO
- Headline: **26x fewer tokens. / Better quality.**
- Sub: "Measured on LoCoMo — the same benchmark mem0 uses in their published results. Same dataset. Different architecture."

| APPROACH | MEMORY TOKENS | QUALITY (F1) | ON-DEVICE | PROTECTED ZONES |
|---|---|---|---|---|
| Prexi | 259 | 0.079 +14% | Yes | Yes |
| mem0 | 6,956 | N/A* | — | — |
| Full context (baseline) | ~18,679 | 0.069 | — | — |

Footnote: "* mem0 quality reported via LLM-as-judge (different scale). Prexi F1 uses token-overlap on LoCoMo QA pairs. mem0's 6,956 figure is their own published number."
Link: **Full methodology →** (→ /research)

### 8.2 /research — Research & Benchmarks
- Label: Research & Benchmarks
- Headline: **26× fewer tokens. / Better quality.**
- Sub: "Measured on LoCoMo — the same benchmark mem0 uses in their published paper. Every number on this page is reproducible. Every claim is cited."
- Headline stats: **26.8×** Token efficiency vs mem0 on LoCoMo · **259** Mean tokens per query (Prexi) · **6,956** Mean tokens per query (mem0)* · **87%** Quality match-or-beat rate · **329/s** Throughput · 0 errors
- Footnote: "* mem0's 6,956 token figure is their own published number from the mem0 blog ("mem0: The Token-Efficient Memory Algorithm," 2024)."

**LoCoMo Benchmark — "Same dataset. Different architecture."**
"LoCoMo (Long-term Conversational Memory) is a benchmark for evaluating how well memory systems retain and retrieve information from long conversations. It's the benchmark mem0 chose for their published evaluation — we ran the same test."

| System | Mean tokens / query | F1 score | Efficiency ratio | On-device | Protected zones |
|---|---|---|---|---|---|
| Prexi | 259 | 0.079 | 26.8× fewer | (✓ on page; text not captured—see note) | (✓) |
| mem0 | 6,956 * | N/A † | 1× (baseline) | — | — |
| Full context (no memory) | ~18,679 | 0.069 | 0.37× (worse) | — | — |

(Note: the Prexi row's On-device / Protected zones cells are not text in the raw extraction — they render as icons/empty cells on /research; the home table states "Yes / Yes".)

Footnotes: "* mem0 token figure from mem0.ai/blog (2024). † mem0 quality measured via LLM-as-judge on a 0–100 scale — not directly comparable to token-overlap F1. We report F1 because it's dataset-verifiable."

**KEY FINDING:** "Prexi compresses 26.8× harder than mem0 while achieving a higher F1 score (0.079 vs full-context baseline of 0.069). Compression preserved more relevant signal than no compression at all."

**WHAT THIS MEANS:** "At 259 tokens vs mem0's 6,956 — if you're running 1M queries/month, Prexi saves ~6.7B tokens per month versus mem0's approach. At $0.50/1M input tokens, that's $3,350/month saved."

**Quality Evaluation — "Compressed context. Uncompromised answers."**
"120 conversations across three datasets, scored by Gemini-as-judge on a 1–10 scale. Prexi vs full context — who answers better?"
- Panel "Quality / Gemini-as-Judge Scores": Prexi avg score **9.0 / 10** · Full context avg score **8.7 / 10** · Prexi match-or-beat rate **87%** · Conversations evaluated **120**

**Datasets — Evaluation Corpus**
- **SQuAD 2.0** — Reading comprehension · factual recall · multi-turn
- **Stack Overflow (coding)** — Code debugging · long error traces · step-by-step solutions
- **Medical QA (excluded from compression)** — Protected zone · full context preserved · control group

**Load Test — "Production-grade. Day one."**
"10M token load test at scale. Prexi runs on Cloud Run with min-instances=1 — no cold starts on critical paths."
**329** Requests / second · **17ms** p50 latency · **64.7%** Token reduction · **0** Errors

**Reproducibility — "Every number is reproducible."**
"All evaluation code is open source. Run the same benchmarks yourself."
**Run the LoCoMo eval** — "The evaluation harness, datasets, and scoring scripts are all in the open repo. Requires an Prexi API key (free tier works)."
```
git clone https://github.com/ashy5454/echoregent
cd Prexi
npm run eval:dataset
```

### 8.3 Other benchmark-related figures
- Product page: 18,679 original tokens → 6,601 compressed tokens = 64.7% average reduction; "64.7% average reduction · 87% quality match"
- Blog: "We beat mem0 by 26× on their own benchmark." (see §13/§15)

---

## 9. INTEGRATIONS / COMPATIBILITY
- Home — **INTEGRATION** — Headline: **One line. / Any model.**
  "Drop-in OpenAI-compatible proxy. Change your baseURL — nothing else. Works with GPT-4o, Claude, Gemini, or any OpenAI-compatible endpoint."
  Link: **Integration Docs →**
  "Also works natively with:" **Claude Desktop · Cursor · Windsurf · Any MCP client**
  Code BEFORE:
  ```js
  const openai = new OpenAI({
    apiKey: "sk-..."
  })
  ```
  Code "WITH PREXI — 3 LINES ADDED":
  ```js
  const openai = new OpenAI({
    apiKey: "sk-...",
    baseURL: "https://api.Prexi.ai/v1",
    defaultHeaders: {
      "x-cts-key": "your-echoregent-key"
    }
  })
  // Every call is now classified, compressed,
  // cached, and protected automatically.
  ```
- **Supported providers via proxy** (/docs):
  - OpenAI (GPT-4o, GPT-4o-mini, o1, o3)
  - Anthropic (Claude 3.5, Claude Sonnet 4.6)
  - Google (Gemini 2.0 Flash, Gemini 1.5 Pro)
  - Mistral, Groq, Together, or any OpenAI-compatible endpoint
- **Support platforms** (/solutions/customer-support): Intercom, Zendesk AI, custom bots, in-house tooling
- **Agent frameworks** (/solutions/ai-agents): LangChain, LlamaIndex, AutoGen, CrewAI, custom loops
- **AI IDEs / MCP clients:** Claude Desktop, Cursor, Windsurf, any MCP client
- **Enterprise multi-provider routing:** "Enterprise teams use multiple LLM providers for cost, compliance, and capability reasons. Prexi's proxy routes to OpenAI, Anthropic, Gemini, and custom endpoints from one integration."
- Pricing FAQ: "The OpenAI proxy supports OpenAI, Anthropic, Gemini, Mistral, Groq, Together, and any OpenAI-compatible endpoint. For direct API calls, you handle routing yourself."

---

## 10. DEVELOPER INFORMATION (/docs — "Docs — Prexi Integration Guide")

### 10.1 Docs sidebar (verbatim)
**Getting Started:** Quick Start · Authentication · Free Tier & Limits
**Integration:** OpenAI Proxy · MCP Server · Direct API · Python SDK
**API Reference:** POST /compress · POST /v1/chat/completions · GET /usage
**Configuration:** Response Headers · Protected Zones · Rate Limits · Supported Domains
**Guides:** Cursor Setup · Claude Desktop · Windsurf Setup
(Note: "Python SDK" and "GET /usage" appear in the sidebar but no corresponding content sections exist in the page text; the Python snippet appears under Quick Start. Breadcrumb: Prexi › Documentation.)

### 10.2 Intro
- Title: **Integration Guide**
- "Prexi sits between your application and any LLM. Three integration paths: OpenAI-compatible proxy (recommended), native MCP server, or direct REST API."
- Banner: **FREE TIER ACTIVE** — "10M tokens/month at no cost. No credit card required." Link: **Get your API key →**

### 10.3 Quick Start
"The fastest path: change one URL in your existing OpenAI client. Your code stays exactly the same — Prexi intercepts, classifies, compresses, and forwards to your LLM."
**Step 1 — Get your API key:** "Request a free key at Prexi.ai/pricing. It arrives by email within 60 seconds."
**Step 2 — Point your client at Prexi**
JavaScript / TypeScript:
```js
import OpenAI from 'openai'
const client = new OpenAI({
 apiKey: process.env.OPENAI_API_KEY, // your existing LLM key
 baseURL: 'https://api.Prexi.ai/v1',
 defaultHeaders: {
'x-echoregent-key': process.env.ECHOREGENT_KEY, // your EchoRegent key
 }
})
// Everything else stays identical
const response = await client.chat.completions.create({
 model: 'gpt-4o',
 messages: conversationHistory // Prexi compresses this automatically
})
```
Python:
```python
from openai import OpenAI
client = OpenAI(
 api_key="sk-...", # your existing LLM key
 base_url="https://api.Prexi.ai/v1",
 default_headers={
"x-echoregent-key": "your-echoregent-key"
 }
)
# Your calls stay identical
response = client.chat.completions.create(
 model="gpt-4o",
 messages=conversation_history
)
```
**Step 3 — Read what was saved:** "Every response includes Prexi headers showing exactly what happened:"
```
x-echoregent-tokens-saved: 1,842
x-echoregent-domain: coding
x-echoregent-intent: debugging
x-echoregent-compression-pct: 67
x-echoregent-cache-hit: false
x-echoregent-protected: false
```

### 10.4 Authentication
"Prexi uses two separate keys: your Prexi key for billing and rate limiting, and your LLM provider key which is forwarded to the upstream model."

| Header | Value | Purpose |
|---|---|---|
| x-echoregent-key | Your Prexi API key | Billing, rate limit, quota |
| x-llm-key | Your LLM provider key (OpenAI, etc.) | Forwarded to upstream model |
| x-llm-provider | openai · anthropic · gemini | Which provider to route to |

"When using the OpenAI-compatible proxy, your LLM key is passed as Authorization: Bearer sk-... and Prexi forwards it transparently to the upstream model. It is never stored."

### 10.5 Free Tier & Limits

| Tier | Monthly tokens | Rate limit | Price |
|---|---|---|---|
| Free | 10M | 60 req/min | $0 |
| Starter | 50M | 200 req/min | $199/mo |
| Pro | 250M | 500 req/min | $499/mo |
| Agency | Unlimited | Custom | $999/mo |

"Token counts refer to tokens saved, not tokens processed. The demo endpoint (/demo/compress) allows up to 20 requests/minute per IP without an API key — for testing only."

### 10.6 OpenAI Proxy
"The recommended integration. Prexi exposes a fully OpenAI-compatible /v1/chat/completions endpoint. Change your baseURL — nothing else changes in your codebase."
`POST /v1/chat/completions` — "Prexi intercepts the request, runs the classify + compress pipeline on messages, then forwards the compressed payload to your upstream model. The response you receive is identical to what your LLM returns — Prexi adds its headers and steps aside."
Supported providers via proxy: (list in §9)
**Specifying a non-OpenAI provider — Route to Anthropic via proxy:**
```js
const client = new OpenAI({
 apiKey: process.env.ANTHROPIC_KEY,
 baseURL: 'https://api.Prexi.ai/v1',
 defaultHeaders: {
'x-echoregent-key': process.env.ECHOREGENT_KEY,
'x-llm-provider': 'anthropic',
 }
})
```

### 10.7 MCP Server
"Prexi ships a native MCP (Model Context Protocol) server. Four tools are available immediately — compress, classify, remember, and recall. Works with Claude Desktop, Cursor, Windsurf, and any MCP client."
**Cursor Setup** — "Add to your ~/.cursor/mcp.json:"
```json
{
  "mcpServers": {
    "Prexi": {
      "url": "https://api.Prexi.ai/mcp",
      "headers": {
        "x-echoregent-key": "your-echoregent-key"
      }
    }
  }
}
```
**Claude Desktop Setup** (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "Prexi": {
      "command": "npx",
      "args": ["-y", "@echoregent/mcp-server"],
      "env": { "ECHOREGENT_KEY": "your-key" }
    }
  }
}
```
**Available MCP Tools**

| Tool | Description | Input |
|---|---|---|
| compress | Compress conversation history | messages array |
| classify | Classify domain, intent, risk | message text |
| remember | Store a fact in semantic memory | key, value, session |
| recall | Retrieve semantically similar facts | query, session |

**Windsurf Setup** — "Add to your Windsurf MCP configuration file at ~/.windsurf/mcp_config.json:"
```json
{
"servers": {
"Prexi": {
"serverUrl": "https://api.Prexi.ai/mcp",
"auth": {
"type": "header",
"header": "x-echoregent-key",
"value": "your-echoregent-key"
 }
 }
 }
}
```

### 10.8 Direct API
"Call Prexi directly without going through the proxy. Useful when you want to pre-process context before assembling your LLM request."
**POST /compress** — `POST https://api.Prexi.ai/compress` — "Requires Authorization: Bearer <your-echoregent-key> header."
Request body:
```json
{
  "messages": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ],
  "options": {
    "maxTokens": 4096, // optional target window
    "preserveLast": 2 // always keep last N turns uncompressed
  }
}
```
Response:
```json
{
  "compressed": [ /* compressed messages array */ ],
  "domain": "coding",
  "intent": "debugging",
  "tokensSaved": 1842,
  "compressionPct": 67,
  "protected": false,
  "cacheHit": false
}
```
**POST /v1/chat/completions** — `POST https://api.Prexi.ai/v1/chat/completions` — "Fully OpenAI-compatible. Accepts the exact same body as openai.chat.completions.create(). Prexi compresses the messages field, then forwards to your upstream model. Returns the upstream response unmodified plus Prexi headers."
"Additional headers required:"
- `x-echoregent-key` — your EchoRegent key
- `x-llm-key` — your upstream LLM API key (optional if using Authorization: Bearer)
- `x-llm-provider` — openai (default) · anthropic · gemini

### 10.9 Response Headers

| Header | Type | Description |
|---|---|---|
| x-echoregent-tokens-saved | integer | Tokens removed from context |
| x-echoregent-compression-pct | integer 0–100 | % reduction in context length |
| x-echoregent-domain | string | Detected conversation domain |
| x-echoregent-intent | string | Detected intent |
| x-echoregent-cache-hit | boolean | Whether response came from semantic cache |
| x-echoregent-protected | boolean | True if compression was disabled (medical/legal/crisis) |

### 10.10 Protected Zones (docs)
"Three conversation types are architecturally protected from compression:"
Label: Protected — compression disabled. "When the classifier detects one of these domains, the compression step is skipped entirely. The full context is forwarded. These zones cannot be overridden by API callers."
Tags: MEDICAL · LEGAL · CRISIS
"Protected conversations return x-echoregent-protected: true and are not counted toward your quota."

### 10.11 Rate Limits
"Rate limits are per API key, per minute. Exceeding the limit returns HTTP 429 with a Retry-After header."

| Tier | Requests/min | Burst |
|---|---|---|
| Demo (no key) | 20 / IP | — |
| Free | 60 | 80 |
| Starter | 200 | 300 |
| Pro | 500 | 700 |
| Agency | Custom | Custom |

### 10.12 Supported Domains
"The classifier returns one of these domain values per conversation turn:"
- `coding` — software development, debugging, code review
- `medical` — health, symptoms, medications ⬥ Protected
- `legal` — contracts, compliance, advice ⬥ Protected
- `crisis` — mental health, emergency ⬥ Protected
- `customer_support` — tickets, complaints, returns
- `sales` — outreach, negotiation, CRM
- `finance` — budgeting, investing, accounting
- `education` — tutoring, explanations
- `creative` — writing, brainstorming, ideation
- `general` — catch-all for uncategorized

### 10.13 Help
"Need help? Email team@yudi.co.in — we respond within 24 hours. For enterprise support and SLAs, see the Enterprise page."

### 10.14 Changelog (/changelog) — "What's new."
Sub: "Every release, documented. No dark patterns, no buried breaking changes."

**v0.4 — June 2024 — Latest — "OpenAI proxy, MCP server, SaaS billing"**
- + OpenAI-compatible proxy — /v1/chat/completions endpoint. Change baseURL, nothing else.
- + Native MCP server — 4 tools: compress, classify, remember, recall. Claude Desktop, Cursor, Windsurf.
- + SaaS billing layer — API key management, per-key quotas, usage logging, admin dashboard.
- + Demo endpoints — /demo/compress and /demo/request-key, no auth required, 20 req/min per IP.
- + Resend integration — automated API key delivery emails.
- + Cloud Run deployment — 4GiB memory, min-instances=1, no cold starts.

**v0.3 — May 2024 — "Protected zones, eval harness, load test"**
- + Protected zones — medical, legal, crisis detection. Compression disabled at function level.
- + LoCoMo eval harness — npm run eval:dataset. Reproducible benchmark results.
- + Load test — 329 req/s, 17ms p50, 0 errors on 10M token run.
- + Quality eval — Gemini-as-judge on 120 conversations. 87% match-or-beat rate vs full context.
- ! Breaking — /classify removed. Classification is now part of /compress response.

**v0.2 — April 2024 — "T5 compression + semantic cache"**
- + T5 compression — sequence-to-sequence summarisation. Domain-aware strategy selection.
- + MiniLM semantic cache — 384-dim embeddings, cosine similarity threshold, sub-5ms lookup.
- + Response headers — x-cts-tokens-saved, x-cts-domain, x-cts-compression-pct, x-cts-cache-hit.

**v0.1 — March 2024 — "DistilBERT classifier, initial API"**
- + DistilBERT domain classifier — 10 domains, intent detection.
- + Initial REST API — POST /compress with Bearer auth.
- + JSON file fallback — works without a database in local development.

---

## 11. PRICING

### 11.1 Home pricing section
- Label: PRICING · Headline: **Start free. / Scale when you grow.**
- Sub: "10M tokens free every month. No credit card. API key in under 60 seconds."

| Plan | Price | Billing | Features | CTA |
|---|---|---|---|---|
| FREE | $0 | forever | 10M tokens / month · All 10 domains · Protected zones · MCP server | Get API Key |
| STARTER (badge: POPULAR) | $199 | per month | 50M tokens / month · All 10 domains · Protected zones · Email support | Start |
| PRO | $499 | per month | 250M tokens / month · All 10 domains · Protected zones · Priority support | Start |
| AGENCY | $999 | per month | Unlimited tokens · All 10 domains · Protected zones · Dedicated support | Contact Us |

Link: **See full pricing →**

### 11.2 /pricing page
- Label: Simple Pricing · Headline: **Start free. / Scale when you grow.**
- Sub: "10M tokens free every month. No credit card. Sign in with Google — your API key is ready instantly."

| Plan | Price | Billing | Features | Support | CTA / badge |
|---|---|---|---|---|---|
| Free | $0 | forever · no card | 10M tokens / month · All 10 domains · Protected zones · MCP server · OpenAI proxy | Community support | **Get API Key →** |
| Starter (badge: Most Popular) | $199 | per month | 50M tokens / month · All 10 domains · Protected zones · MCP server · OpenAI proxy | Email support | **Coming Soon** |
| Pro | $499 | per month | 250M tokens / month · All 10 domains · Protected zones · MCP server · OpenAI proxy | Priority support | **Coming Soon** |
| Agency | $999 | per month | Unlimited tokens · All 10 domains · Protected zones · MCP server · OpenAI proxy | Dedicated support | **Coming Soon** |

"Need higher limits or a custom plan?" → **Contact us →**

**Compare Plans — "Everything in every plan."**

| Feature | Free | Starter | Pro | Agency |
|---|---|---|---|---|
| Monthly tokens | 10M | 50M | 250M | Unlimited |
| Rate limit (req/min) | 60 | 200 | 500 | Custom |
| Context Classifier | ✓ | ✓ | ✓ | ✓ |
| History Compressor | ✓ | ✓ | ✓ | ✓ |
| Semantic Cache | ✓ | ✓ | ✓ | ✓ |
| Protected Zones | ✓ | ✓ | ✓ | ✓ |
| MCP Server | ✓ | ✓ | ✓ | ✓ |
| OpenAI Proxy | ✓ | ✓ | ✓ | ✓ |
| All 10 domains | ✓ | ✓ | ✓ | ✓ |
| Usage analytics | ✓ | ✓ | ✓ | ✓ |
| Support | Community | Email | Priority | Dedicated |
| SLA | — | — | 99.9% | 99.95% custom |
| Custom domain | — | — | — | ✓ |
| On-prem / VPC | — | — | — | ✓ |

**Free Tier block (id get-key):** "Get your API key instantly." — "10M tokens free every month. No credit card. Sign in with Google and your key is ready on the next screen." Button: **Sign in with Google — get your key** · "Already have a key?" **Go to dashboard →**

### 11.3 Pricing FAQ — see §13.

---

## 12. CALLS TO ACTION

| CTA text | Where | Destination |
|---|---|---|
| Get Started Free | Home hero | /pricing#get-key |
| See the Benchmark → | Home hero | /research |
| Compress & Classify → | Home playground | runs demo |
| Full methodology → | Home benchmark | /research |
| Integration Docs → | Home integration; customer-support hero | /docs |
| Get API Key | Nav (x2), Free plan card, home pricing | /pricing#get-key |
| Start | Home Starter / Pro cards | /pricing#get-key |
| Contact Us | Home Agency card | /enterprise |
| See full pricing → | Home pricing | /pricing |
| Get API Key — Free | Home bottom CTA banner | /pricing#get-key |
| Read the Docs | Home bottom CTA banner; customer-support closing | /docs |
| Sign In | Nav | /login |
| Enterprise | Nav | /enterprise |
| Get API Key → | Solutions heroes | /pricing#get-key |
| MCP Setup Guide / Full MCP setup guide | Coding assistants | docs (MCP) |
| API Reference | AI agents hero | docs |
| Get a free API key → | Solutions closing CTAs | pricing |
| See the benchmark numbers | AI agents closing | /research |
| Setup guide → | Product MCP section | docs |
| Integration docs → | Product OpenAI Proxy | /docs |
| Request a Demo | Enterprise hero | contact form (#contact) |
| Email Us Directly → | Enterprise hero | mailto team@yudi.co.in |
| Send to Sales Team → | Enterprise form | POST /demo/request-key |
| Contact us → | Pricing | /enterprise |
| Sign in with Google — get your key | Pricing | auth |
| Go to dashboard → | Pricing | dashboard |
| Report a vulnerability → | Security | mailto team@yudi.co.in |
| Run the LoCoMo eval | Research | repo |
| Create Free Account → / Sign In → / Continue with Google | Login | auth |

Home bottom CTA banner: **Ready to cut your token bill?** — "One API call. Every conversation classified, compressed, cached, and protected." — buttons **Get API Key — Free** · **Read the Docs**

---

## 13. FAQ (/pricing — accordion, "Common questions.")
Label: FAQ

**What counts as a "token"?**
"Tokens saved — not tokens processed. We count the difference between your original context length and the compressed length. If you send 2,000 tokens and Prexi reduces it to 680, you're charged for 1,320 saved tokens."

**Do you store my conversation data?**
"No. Prexi processes conversations in-memory and discards them immediately after compression. Your LLM provider key is never stored. Protected zone conversations (medical/legal/crisis) are never touched by the compression pipeline at all."

**What if I exceed my monthly token limit?**
"Your API key returns 402 responses until the next billing cycle. You won't be automatically charged. Upgrade your plan from the dashboard or email us for an immediate increase."

**Can I use this with any LLM provider?**
"Yes. The OpenAI proxy supports OpenAI, Anthropic, Gemini, Mistral, Groq, Together, and any OpenAI-compatible endpoint. For direct API calls, you handle routing yourself."

**Is there an enterprise plan?**
"Yes. Custom token volume, SLAs, on-prem/VPC deployment, dedicated support, and security review. See the Enterprise page or email team@yudi.co.in."

---

## 14. FOOTER (all pages)
- Brand: **Prexi**
- Description: "The context management layer that gives LLMs what remains. Built by Yudi Labs, Hyderabad."
- **PRODUCT:** Overview (/product) · Classifier (/product#classify) · Compressor (/product#compress) · Cache (/product#cache) · Protected Zones (/product#protect) · MCP Server (/product#mcp)
- **SOLUTIONS:** Customer Support · Coding Assistants · AI Agents · Enterprise
- **RESOURCES:** Research (/research) · Documentation (/docs) · Blog (/blog/) · Changelog (/changelog) · Security (/security) · GitHub ↗ (https://github.com/ashy5454/echoregent)
- **COMPANY:** About (/about) · Enterprise (/enterprise) · Security (/security) · Contact (mailto:team@yudi.co.in)
- Contact email shown: team@yudi.co.in
- Copyright: "© 2026 Prexi · A product by Yudi Labs, Hyderabad, India"
- Legal links: Privacy (→ /security) · Terms (→ /security) · Security (→ /security)
- Social links: none other than GitHub

---

## 15. OTHER CONTENT

### 15.1 /enterprise
- Headline: **Context infrastructure / built for teams.**
- Sub: "Custom token volume. SLA guarantees. On-prem or VPC deployment. Dedicated support from the engineers who built it."
- CTAs: **Request a Demo** · **Email Us Directly →**
- **Why Enterprise — "The problems we solve at scale."**
  - **LLM costs compounding** — "At 10M+ API calls/month, token costs become the largest line item. Prexi's 64.7% average reduction translates to $40k–$200k saved annually at scale."
  - **Compliance requirements** — "Medical, legal, and financial conversations can't be compressed or monetized. Prexi's protected zones are architectural — not configurable by end users, not bypassable by API callers."
  - **Latency at every layer** — "Prexi's three models run on CPU, sub-20ms end to end. No GPU cold starts. No external API calls before your LLM call. 17ms p50 at 329 req/s."
  - **Multi-tenant isolation** — "Per-key rate limiting, quota enforcement, and usage analytics out of the box. Build products on top of Prexi without building billing infrastructure yourself."
  - **AI agent memory** — "Long-running agents accumulate unbounded context. Prexi's semantic cache + compression keeps agent memory bounded without losing relevant state."
  - **Multi-provider routing** — "Enterprise teams use multiple LLM providers for cost, compliance, and capability reasons. Prexi's proxy routes to OpenAI, Anthropic, Gemini, and custom endpoints from one integration."
- **Enterprise Features — "Everything on Pro, plus these."**
  - **On-premise / VPC deployment** — "Run Prexi entirely within your own infrastructure. Docker image + Helm chart provided. Zero data egress."
  - **Custom SLA — up to 99.95% uptime** — "Contractual uptime guarantees with financial penalties. Dedicated Cloud Run instances, not shared infrastructure."
  - **Security review & pen test access** — "Full architecture review, penetration test results, and a dedicated security contact for your compliance team."
  - **Custom domain** — "Host the proxy at ai.yourdomain.com instead of api.Prexi.ai. Useful for white-labeling and internal tooling."
  - **Dedicated support engineer** — "A named engineer from Yudi Labs responds to your Slack channel or email within 4 business hours."
  - **Unlimited token volume** — "No monthly cap. Custom rate limits tuned for your traffic patterns. Burst capacity negotiated in contract."
  - **Custom domain classifications** — "Add proprietary domains to the classifier fine-tuned on your conversation data. Accuracy tested before deployment."
  - **Usage analytics & cost dashboard** — "Per-key, per-endpoint breakdowns. Export to CSV or connect to your existing data warehouse via webhook."
- **SLA — "Guarantees in writing."**

| Metric | Starter | Pro | Enterprise |
|---|---|---|---|
| Uptime SLA | — | 99.9% | 99.95% custom |
| p50 latency | <30ms | <20ms | <15ms dedicated |
| Support response | Email / 48h | Priority / 24h | Dedicated / 4h |
| Incident notification | Status page | Status page | Direct alert |
| Data residency | Shared GCP | Shared GCP | Your VPC / on-prem |
| Security review | — | — | (Enterprise cell is empty in markup) |
| Custom contract | — | — | (Enterprise cell is empty in markup) |

(Source markup note: the last two rows render as "Security review — — [blank]" and "Custom contract — — [blank]"; text "Custom contract" appears to be intended as the Enterprise value for "Security review". Preserved as found.)
- **Contact Sales — "Let's talk."** "Tell us about your use case. We'll come back within one business day with a custom proposal."
  Form fields: Name · Work email · Company & role · Estimated monthly API calls (select: "Select volume..." / Under 1M / month / 1M – 10M / month / 10M – 100M / month / 100M+ / month) · Tell us about your use case
  Button: **Send to Sales Team →** (sending state: "Sending...")
  Validation error: "Please fill in name, email, and use case."
  Success message: "Got it. We'll reach out to [email] within one business day."
  Fallback error: "Something went wrong — email team@yudi.co.in directly."
  "Or email us directly: team@yudi.co.in"

### 15.2 /security — "Security & Privacy"
- Headline: **Built with hard floors, / not soft promises.**
- Sub: "Prexi processes data in-flight, stores nothing, and protects sensitive conversations at the architecture level — not the policy level."
- **Data Handling — "Zero persistence."**
  - **No conversation storage** — "Conversations are processed entirely in memory. After the compress → forward pipeline completes, no message content is retained. No logs, no buffers, no backups."
  - **API keys never stored in logs** — "Your LLM provider API key (x-llm-key) is forwarded to the upstream model and immediately discarded. It never touches our database. Prexi keys are stored as SHA-256 hashes — not plaintext."
  - **Semantic cache — anonymised** — "The semantic cache stores embedding vectors, not text. A cache hit returns a compressed context by similarity — the original conversation text is never stored."
  - **Usage logs — metadata only** — "We log: timestamp, key ID, endpoint, tokens saved, domain, cache hit status. No message content, no user identifiers, no IP addresses beyond rate-limiting (discarded after 1 minute)."
- **Protected Zones — "Architectural, not configurable."**
  Badge: HARD FLOORS — CANNOT BE DISABLED · Tags: MEDICAL · LEGAL · CRISIS
  "When DistilBERT classifies a conversation as medical, legal, or crisis — compression is disabled at the function call level. The check happens inside compressHistory() before any other processing. This cannot be overridden by API callers, admin keys, subscription tier, or configuration."
  - **No monetization of protected zones** — "Protected conversations are not counted toward your token quota. We do not run ads, sell insights, or use protected conversation data for any purpose."
  - **Response header evidence** — "Every response includes x-cts-protected: true/false and x-cts-domain so you can verify the classification at the application level."
- **Infrastructure — "Where your data runs."** (see §7)
- **Responsible Disclosure — "Found a vulnerability?"**
  "We take security reports seriously. Email team@yudi.co.in with a description of the issue and steps to reproduce. We'll acknowledge within 24 hours and work to resolve within 7 days for critical issues."
  "Please do not publicly disclose the vulnerability until we've had a chance to address it. We don't have a formal bug bounty program yet — but we'll acknowledge your contribution publicly if you'd like."
  Button: **Report a vulnerability →**

### 15.3 /about — "About"
- Headline: **Built in Hyderabad. / Thinking from first principles.**
- Sub: "Prexi is built by Yudi Labs — a small AI research team focused on making LLMs structurally better, not just faster."
- **Origin — "Why we built this."** (three paragraphs quoted in §4.3)
- **Mission — "What we're trying to do."** (quoted in §4.4)
- **Principles — "How we think."**
  - **First principles, not benchmarks** — "We start by asking what the brain does, then ask if that's what we should do. Benchmarks validate — they don't design."
  - **Hard floors, not soft guardrails** — "Protected zones are architectural, not configurable. Some decisions should not be delegatable to end users or API callers."
  - **Reproducibility is the claim** — "Every number we publish comes with a command you can run. If you can't verify it, we won't claim it."
  - **Sparse, local, continual** — "Our broader research agenda at Yudi Labs. AI systems should be sparse in what they attend to, local in how they learn, and continual in how they improve. Prexi is one expression of these principles."
- **Contact — "Get in touch."**
  - **General** — "Questions, feedback, or press inquiries: team@yudi.co.in"
  - **Enterprise & Partnerships** — "Custom deployments, white-labeling, reseller partnerships: see the Enterprise page or email us directly."
  - **GitHub** — "Open eval harness and issue tracker: github.com/ashy5454/echoregent"
  - **Location** — "Yudi Labs, Hyderabad, India."

### 15.4 /blog/ — "Blog" — "From the team."
Sub: "Research findings, product updates, and thinking about context management for AI."
1. **Research · June 2024** — "We beat mem0 by 26× on their own benchmark." — "LoCoMo is the benchmark mem0 uses in their published paper. We ran the same test. Prexi uses 259 tokens per query. mem0 uses 6,956 — their own published number. Here's how." — stat: **26×** Token efficiency vs mem0
2. **Product · June 2024** — "Introducing Prexi: the context management layer LLMs were missing." — "What remains after compression should be the signal — not the noise. We built a three-model pipeline that classifies, compresses, and protects every conversation before it reaches your LLM."
3. **Architecture · Coming soon** — "Why medical conversations should never be compressed." — "Protected zones aren't a feature — they're an architectural decision. The case for hard floors in AI infrastructure."
4. **Guide · Coming soon** — "Add Prexi to Cursor in 2 minutes." — "Step-by-step setup for the MCP server — Claude Desktop, Cursor, and Windsurf. Four tools, one config file."
5. **Research · Ongoing** — "Full benchmark methodology and reproducibility guide." — "All evaluation code is open source. Run the LoCoMo eval yourself. Every number on the research page is reproducible."

### 15.5 /login — "Get Started — Prexi"
- Logo: Prexi · Tabs: **Create Account** · **Sign In**
- Badge: "Free · 10M tokens/month · No credit card"
- **Create your account** — "Sign up with Google and your API key is ready instantly." Fields: Your name · [Continue with Google] · "or sign up with email" · Email address · Password · Confirm password · Button **Create Free Account →** · success check ✓ · "Already have an account? Sign in →"
- **Welcome back** — "Sign in to your Prexi account." [Continue with Google] · "or sign in with email" · Email address · Password · Button **Sign In →** · state "Signing you in…" · "New here? Create a free account →"
- **Admin access:** "Use your admin email and password above. The form above handles admin login too — just enter your credentials."

---

## 16. DEDICATED LIST OF EVERY NUMERICAL CLAIM (copied exactly)

**Hero / home**
- 26x token efficiency vs mem0 · 65% avg token reduction · <10ms per-turn overhead · F1 +14% quality vs full context
- Playground savings: 77% (Developer Logs) · 75% (Customer Support) · 0% (Floor) (Medical)
- Pipeline: "65% reduction avg" · "semantic · <5ms"
- Classify: <10ms per classification · "10 domains"
- Compress: 64.7% avg token reduction · "259 tokens vs 18,679 for full context"
- Cache: Sub-5ms cache lookup per turn
- Benchmark table: 259 · 6,956 · ~18,679 · F1 0.079 +14% · 0.069
- Pricing: $0 / 10M tokens/month · $199/month / 50M · $499/month / 250M · $999/month / Unlimited
- "API key in under 60 seconds"

**Product**
- 18,679 original tokens → 6,601 compressed tokens · 64.7% · 87% quality match · "Risk level 0–3 per turn" · "384-dimensional embeddings" / "384 dimensions" · "cache hit rates above 40% are typical" · "under 2 minutes" (MCP setup) · "4 tools" · "<10ms" · "Sub-5ms"

**Customer Support**
- 60% avg cost reduction · <15ms compression overhead · 87% quality match-or-beat · 0 code changes · "same quality, 60% fewer tokens" · "15 turns" · "4,000 tokens … 70%" · Turn 1 → 120 · Turn 5 → 780 · Turn 10 → 2,100 · Turn 15 → 3,940 tokens · "Average 60% reduction for support threads" · "<10ms" · "under 60 seconds" · "10M tokens"

**Coding Assistants**
- 72% reduction on debug sessions · 4 MCP tools · "10M tokens"

**AI Agents**
- 26x token efficiency vs naive context · 1000+ turns without context overflow · 329/s requests/second (load tested) · 0 message content stored · "200 turns" · "200x more than turn 1" · "10M tokens"

**Research**
- 26.8× · 259 · 6,956 · 87% · 329/s · 0 errors · ~18,679 · F1 0.079 · 0.069 · 0.37× (worse) · "1× (baseline)" · 9.0 / 10 · 8.7 / 10 · 87% · 120 conversations · 3 datasets · scale 1–10 · mem0 scale 0–100 · ~6.7B tokens/month saved @ 1M queries/month · $0.50/1M input tokens · $3,350/month · 10M token load test · 329 requests/second · 17ms p50 · 64.7% · 0 errors · 384-dimensional · under 10ms · under 5ms · min-instances=1

**Enterprise**
- 10M+ API calls/month · 64.7% · $40k–$200k saved annually · sub-20ms end to end · 17ms p50 at 329 req/s · up to 99.95% uptime · within 4 business hours · SLA table: 99.9% / 99.95% custom · <30ms / <20ms / <15ms dedicated · Email / 48h / Priority / 24h / Dedicated / 4h · "within one business day" · volume brackets Under 1M / 1M – 10M / 10M – 100M / 100M+ per month

**Docs**
- 10M tokens/month · within 60 seconds · 1,842 tokens saved · compression-pct 67 · 60 / 200 / 500 / Custom req/min · burst 80 / 300 / 700 / Custom · Demo 20 / IP (20 requests/minute per IP) · `maxTokens: 4096` · `preserveLast: 2` · `tokensSaved: 1842` · `compressionPct: 67` · HTTP 429 · "respond within 24 hours" · compression-pct integer 0–100 · 2,000 → 680 tokens = 1,320 saved (FAQ) · HTTP 402

**Security / Changelog / About**
- SHA-256 · TLS 1.3 · 4GiB memory · min-instances=1 · IP discarded after 1 minute · acknowledge within 24 hours · resolve within 7 days (critical) · asia-south1 · v0.1 March 2024 / v0.2 April 2024 / v0.3 May 2024 / v0.4 June 2024 · 329 req/s · 17ms p50 · 120 conversations · 87% · 384-dim · 20 req/min per IP · © 2026

---

## 17. TECHNICAL / PRODUCT TERMINOLOGY (exact)
Prexi · Yudi Labs · Context Classifier · History Compressor · Semantic Cache · Protected Zones · MCP Server · OpenAI Proxy · "context management layer" · "Drop-in context management" · "Classified. Compressed. Protected." · "hard floor" / "Hard floors" · "architectural boundary" · "ARCHITECTURAL BOUNDARY" · "HARD FLOORS — CANNOT BE DISABLED" · "domain-aware" compression · "domain-aware strategy selection" · "last N turns always preserved uncompressed" · `compressHistory()` · "protected zone(s)" (MEDICAL · LEGAL · CRISIS) · "tokens saved — not tokens processed" · DistilBERT (classifier) · T5 (sequence-to-sequence summarisation) · MiniLM (384-dimensional embeddings) · cosine similarity threshold · risk level 0–3 · emotional state / "state" · intent · domain · LoCoMo (Long-term Conversational Memory) · F1 (token-overlap) · Gemini-as-judge / LLM-as-judge · match-or-beat rate · mem0 · full context (baseline / no memory) · efficiency ratio · on-device · "context debt" · "trajectory compression" · "intent tracking" · "session memory" · remember / recall · compress / classify · `/compress`, `/v1/chat/completions`, `/usage`, `/demo/compress`, `/demo/request-key` · Cloud Run · min-instances=1 · asia-south1 · Firebase Firestore · Cloud Armor · Resend · Helm chart · VPC / on-prem · custom domain classifications · "Sparse, local, continual" · "first principles" · "Reproducibility is the claim".

Header / key names: `x-cts-key`, `x-cts-protected`, `x-cts-cache-hit`, `x-cts-tokens-saved`, `x-cts-domain`, `x-cts-compression-pct`, `x-echoregent-key`, `x-echoregent-tokens-saved`, `x-echoregent-domain`, `x-echoregent-intent`, `x-echoregent-compression-pct`, `x-echoregent-cache-hit`, `x-echoregent-protected`, `x-llm-key`, `x-llm-provider`, `ECHOREGENT_KEY`, `@echoregent/mcp-server`.
URLs/endpoints: `https://api.Prexi.ai/v1`, `https://api.Prexi.ai/compress`, `https://api.Prexi.ai/mcp`, `ai.yourdomain.com`, https://github.com/ashy5454/echoregent.

---

## SOURCE INCONSISTENCIES (preserved as found; not corrected)
1. Brand is "Prexi" on-site, but code/headers use "echoregent"/"cts", and the domain is `echoregent-yudi-pub`.
2. Header prefix varies: home & product code use `x-cts-key`; docs/solutions use `x-echoregent-key`; changelog v0.2 lists `x-cts-*` response headers while docs list `x-echoregent-*`.
3. Dates: changelog/blog use 2024 (March–June 2024) while footer says © 2026 and playground logs are dated 2026-06-20.
4. Quality claims: home says "F1 +14%" while the table shows 0.079 vs 0.069; research text says "87% quality match-or-beat".
5. Token claims: Customer Support "60% avg" and Coding "72%" vs global "64.7%/65%".
6. Pricing page marks Starter/Pro/Agency "Coming Soon" while home page shows "Start"/"Contact Us" CTAs.
7. Docs: Free plan "Community support" (pricing page) vs "MCP server" only (home card). Home "Latency <20ms / 17ms p50" etc. are as listed.
8. Docs sidebar lists "Python SDK" and "GET /usage" with no content; Anthropic model list reads "Claude 3.5, Claude Sonnet 4.6".
9. Typos in source preserved: "Compresing context history turns..."; "Requires an Prexi API key"; `cd Prexi` after cloning `echoregent`.
10. Enterprise SLA table last two rows have misaligned/empty cells.
11. Playground sample contains the email `ashmith@yudi.co.in` and host `prod-db.yudi.internal` as example data.
12. Privacy / Terms footer links both point to /security (no separate legal pages).
