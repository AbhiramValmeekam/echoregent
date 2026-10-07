/**
 * /security.
 *
 * Carried over from the live site's Security & Privacy page. Two normalisations:
 * the response-header name (the live page uses `x-cts-protected` here and
 * `x-echoregent-protected` everywhere else — one name is kept), and the
 * "dependency audit" claim, which offered a manifest "on request" against a
 * repository that is not public.
 */

export const security = {
  eyebrow: 'Security & privacy',
  heading: 'BUILT WITH\nHARD FLOORS, NOT\nSOFT PROMISES.',
  lede: 'EchoRegent processes data in-flight, stores nothing, and protects sensitive conversations at the architecture level — not the policy level.',

  dataHandling: {
    label: 'Data handling',
    heading: 'ZERO PERSISTENCE.',
    items: [
      {
        title: 'No conversation storage',
        body: 'Conversations are processed entirely in memory. After the compress → forward pipeline completes, no message content is retained. No logs, no buffers, no backups.',
      },
      {
        title: 'API keys never stored in logs',
        body: 'Your LLM provider API key (x-llm-key) is forwarded to the upstream model and immediately discarded. It never touches our database. EchoRegent keys are stored as SHA-256 hashes — not plaintext.',
      },
      {
        title: 'Semantic cache — anonymised',
        body: 'The semantic cache stores embedding vectors, not text. A cache hit returns a compressed context by similarity — the original conversation text is never stored.',
      },
      {
        title: 'Usage logs — metadata only',
        body: 'We log: timestamp, key ID, endpoint, tokens saved, domain, cache hit status. No message content, no user identifiers, no IP addresses beyond rate-limiting (discarded after 1 minute).',
      },
    ],
  },

  protectedZones: {
    label: 'Protected zones',
    heading: 'ARCHITECTURAL,\nNOT CONFIGURABLE.',
    badge: 'Hard floors — cannot be disabled',
    tags: ['Medical', 'Legal', 'Crisis'],
    body: 'When DistilBERT classifies a conversation as medical, legal, or crisis — compression is disabled at the function call level. The check happens inside compressHistory() before any other processing. This cannot be overridden by API callers, admin keys, subscription tier, or configuration.',
    items: [
      {
        title: 'No monetization of protected zones',
        body: 'Protected conversations are not counted toward your token quota. We do not run ads, sell insights, or use protected conversation data for any purpose.',
      },
      {
        title: 'Response header evidence',
        body: 'Every response includes x-echoregent-protected: true/false and x-echoregent-domain so you can verify the classification at the application level.',
      },
    ],
  },

  infrastructure: {
    label: 'Infrastructure',
    heading: 'WHERE YOUR DATA RUNS.',
    items: [
      { title: 'Google Cloud Run', body: 'Serverless containers, auto-scaling, 4GiB memory, min-instances=1 for consistent latency. No shared state between instances.' },
      { title: 'Region — asia-south1', body: 'Default region is Hyderabad (asia-south1). Enterprise customers can request US-East, EU-West, or bring their own VPC.' },
      { title: 'TLS 1.3 everywhere', body: 'All traffic encrypted in transit via TLS 1.3. HSTS headers enforced. No HTTP fallback on any production endpoint.' },
      { title: 'Firebase Firestore', body: 'API key metadata stored in Firestore (hashed keys, quota counters, usage metadata). No conversation content ever reaches the database.' },
      { title: 'Rate limiting per key', body: 'Per-key rate limits enforced in memory per Cloud Run instance. DDoS protection via GCP Load Balancer. Burst capacity handled via Cloud Armor.' },
      { title: 'Dependency audit', body: 'npm audit runs on every build and critical CVEs block deployment. The dependency manifest is not published, because the repository it builds from is not public.' },
    ],
  },

  disclosure: {
    label: 'Responsible disclosure',
    heading: 'FOUND A VULNERABILITY?',
    body: 'We take security reports seriously. Email team@yudi.co.in with a description of the issue and steps to reproduce. We’ll acknowledge within 24 hours and work to resolve within 7 days for critical issues.',
    ask: 'Please do not publicly disclose the vulnerability until we’ve had a chance to address it. We don’t have a formal bug bounty program yet — but we’ll acknowledge your contribution publicly if you’d like.',
    cta: { label: 'Report a vulnerability', action: 'disclosure' as const },
    response: [
      { label: 'Acknowledgement', value: 'within 24 hours' },
      { label: 'Critical fix target', value: 'within 7 days' },
      { label: 'Bug bounty', value: 'None yet' },
    ],
  },
} as const;
