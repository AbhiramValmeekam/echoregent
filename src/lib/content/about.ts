/**
 * /about.
 *
 * The Origin section is the live site's own account of why the product exists,
 * carried over with the brand renamed. The four principles are the same ones
 * the landing page's Research section renders — they live in site.ts and are
 * imported here rather than transcribed twice, so the two pages cannot drift.
 *
 * One live entry is deliberately not carried: the contact block's "GitHub —
 * open eval harness and issue tracker", pointing at the same repository that
 * /research cannot clone. A contact route to a 404 is worse than a shorter
 * contact list, so the three that work are the three that are here. If the
 * repository is published, this is one item to add back.
 */

export const about = {
  eyebrow: 'About',
  heading: 'BUILT IN HYDERABAD.\nFIRST PRINCIPLES.',
  lede: 'EchoRegent is built by Yudi Labs — a small AI research team focused on making LLMs structurally better, not just faster.',

  origin: {
    label: 'Origin',
    heading: 'WHY WE BUILT THIS.',
    paragraphs: [
      "Every AI product we built hit the same wall. By turn 10 of a conversation, you’re sending thousands of tokens to the LLM — most of which is noise from earlier turns. The model’s attention dilutes. Costs climb. Quality drops.",
      'The existing solutions were either too broad (truncate everything after N tokens) or too opinionated (extract facts into a graph, then re-inject them). Neither approach preserved conversational meaning well. Neither knew when to leave a conversation alone.',
      'EchoRegent started from a simple question: what does the brain do here? Humans don’t replay full conversation transcripts to recall context. They compress — keeping signal, discarding noise. The key insight is that compression is domain-specific. You compress a casual chat aggressively. You compress a legal document not at all.',
    ],
  },

  mission: {
    label: 'Mission',
    heading: 'MAKE CONTEXT\nINVISIBLE.',
    body: 'Make context management invisible infrastructure. The same way you don’t think about TCP/IP when you send an email — you shouldn’t have to think about context compression when you build an AI product.',
    goal: 'The long-term goal: EchoRegent becomes the default layer between applications and LLMs — the thing that makes AI applications cheaper to run, better in quality, and safer by default.',
  },

  contact: {
    label: 'Contact',
    heading: 'GET IN TOUCH.',
    items: [
      {
        title: 'General',
        body: 'Questions, feedback or press enquiries.',
        action: { label: 'team@yudi.co.in', kind: 'mail' as const },
      },
      {
        title: 'Enterprise & partnerships',
        body: 'Custom deployments, white-labeling, reseller partnerships: see the Enterprise page or email us directly.',
        action: { label: 'See the Enterprise page', to: '/enterprise' },
      },
      {
        title: 'Security',
        body: 'Vulnerability reports and compliance questions.',
        action: { label: 'Read the security page', to: '/security' },
      },
    ],
    location: { label: 'Location', value: 'Yudi Labs, Hyderabad, India' },
  },
} as const;
