/**
 * The information architecture — ten pages, and nothing between them.
 *
 * One list. The header, the mobile drawer, the index cards, the 404's route
 * list and `document.title` all read from it — so a page cannot exist in the
 * router without appearing in the navigation, and cannot appear in the
 * navigation without a title.
 *
 * **This file used to describe twenty-eight pages.** The four reference areas
 * were split into an index plus eighteen topic pages, each reached through a
 * `/product/:system`-style parameter, and `document.title` was derived from the
 * same list. The split was reversed by decision: seven dropdown rows over one
 * bulleted index is more navigation than the material earns, and the pages it
 * produced were thin — the median leaf was under three viewports, and a reader
 * who wanted the classifier and the compressor had to make two round trips
 * through an index to get them.
 *
 * So each area is one page again. The split's own addition — a `#classify`
 * anchor per part, with a contents list pointing at them — is gone too, by the
 * user's decision: the parts are simply sections of the page, in order, with
 * nothing to click between them. `src/routes/areas.tsx` owns the sections; this
 * file owns the pages. The old deep links — `/product/classify` and friends —
 * still resolve, to the page rather than to an anchor, through `LEGACY` below,
 * so nothing that was ever published 404s.
 *
 * Titles are derived rather than hand-maintained. Titles used to be a
 * `Record<string, string>` where a forgotten entry fell back to the 404's
 * title: a loud failure when there were seven routes and a quiet one at
 * twenty-eight. Derived, a page cannot exist without one.
 */

export type IaPage = {
  path: string;
  /** Short name: header rows, index cards, the 404's list. */
  label: string;
  /** `document.title`. */
  title: string;
  /** One line for the index card. */
  blurb: string;
  /** Card order on the home page, and the 404's list order. */
  order: number;
};

export const IA: IaPage[] = [
  {
    path: '/',
    label: 'Home',
    title: "EchoRegent — Stop paying for tokens you don't need",
    blurb: 'The front door.',
    order: 0,
  },

  /* ── the showcase pages the home page's body became ───────────────────── */
  {
    path: '/how-it-works',
    label: 'How it works',
    title: 'How it works — EchoRegent',
    blurb: 'One turn, start to finish — the pipeline, the layer it sits in, and the single line you change.',
    order: 1,
  },
  {
    path: '/playground',
    label: 'Playground',
    title: 'Playground — EchoRegent',
    blurb: 'Run a real conversation through the pipeline and watch the context shrink.',
    order: 2,
  },
  {
    path: '/features',
    label: 'Features',
    title: 'Features — EchoRegent',
    blurb: 'The four decisions the pipeline is built on.',
    order: 3,
  },

  /* ── the four reference areas — one page each, sections inside ────────── */
  {
    path: '/product',
    label: 'Product',
    title: 'Product — EchoRegent',
    blurb: 'Six systems behind one OpenAI-compatible endpoint.',
    order: 4,
  },
  {
    path: '/research',
    label: 'Research',
    title: 'Research & Benchmarks — EchoRegent',
    blurb: 'What was measured, how it was measured, and what it does not prove.',
    order: 5,
  },
  {
    path: '/pricing',
    label: 'Pricing',
    title: 'Pricing — EchoRegent',
    blurb: 'Four published plans, and the full comparison between them.',
    order: 6,
  },
  {
    path: '/enterprise',
    label: 'Enterprise',
    title: 'Enterprise — EchoRegent',
    blurb: 'The six problems scale actually creates.',
    order: 7,
  },

  /* ── single pages, by decision ────────────────────────────────────────── */
  {
    path: '/about',
    label: 'About',
    title: 'About — EchoRegent',
    blurb: 'Who built this, and why.',
    order: 8,
  },
  {
    path: '/security',
    label: 'Security',
    title: 'Security & Privacy — EchoRegent',
    blurb: 'Data handling, protected zones and responsible disclosure.',
    order: 9,
  },
];

export const byPath = (path: string) => IA.find((p) => p.path === path);

/**
 * A pathname as the IA spells it: no trailing slash, lower case.
 *
 * `/Product/Classify/` and `/product/classify` are the same address to a reader
 * and have to be the same key to the redirect map — otherwise a retired link
 * survives the lookup and lands on the 404 instead of the section it names.
 */
export const normalisePath = (pathname: string) =>
  (pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname).toLowerCase();

/** Every page except the home page, in card order. */
export const topLevel = () => IA.filter((p) => p.path !== '/').sort((a, b) => a.order - b.order);

/** Derived, so a route without an entry is impossible rather than merely unlikely. */
export const ROUTE_TITLES: Record<string, string> = Object.fromEntries(IA.map((p) => [p.path, p.title]));

/**
 * The header row — seven plain links, no dropdowns.
 *
 * The dropdowns existed to hold the topic pages the split produced. With those
 * gone each area is a single destination, and there is no second level to open:
 * the areas' sections were briefly a rail, and the rail is gone as well. Seven
 * links, each of which is a page.
 *
 * `Playground` sits in the top row rather than under Product because it is a
 * demonstration, not reference material, and it is the fastest way to
 * understand the product.
 */
export const HEADER: { label: string; to: string }[] = [
  { label: 'Product', to: '/product' },
  { label: 'How it works', to: '/how-it-works' },
  { label: 'Playground', to: '/playground' },
  { label: 'Research', to: '/research' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Enterprise', to: '/enterprise' },
  { label: 'About', to: '/about' },
];

/**
 * Retired addresses → where they live now.
 *
 * **This map has now been reversed twice, and the second reversal is the one
 * that matters here.** When the areas were split, a bare anchor like
 * `/product#classify` was the retired address and a path was its replacement.
 * The split was then undone, so every `/product/classify`-style path was retired
 * and every anchor became real again. Now the anchors are gone too — the user's
 * instruction was *"make it as one page and inside add all of that information,
 * no #classify or other things"* — so **every entry here lands on a page with no
 * fragment at all**.
 *
 * That makes the map simpler rather than weaker: eighteen retired topic paths
 * used to resolve to eighteen different scroll positions, and now they resolve
 * to four pages. The distinction between them survives as a redirect rather than
 * as a landing point, which is the honest version — a reader who follows a
 * two-year-old link to `/product/compress` gets the page where that system is
 * documented, not a stale fragment that scrolls nowhere.
 *
 * The home page's band anchors (`/#benchmarks`, `/#ecosystem`, …) are unchanged
 * in kind: those sections left the home page for good and their ids are gone
 * with them, so they were always page redirects. The one entry that still ends
 * in a fragment is `/#research` → `/about#principles`, because About's
 * `#principles` is a band id on a page that was never split.
 *
 * Two callers read this, for two different shapes of the same problem:
 *
 *  - `routes/LegacyRedirect.tsx`, mounted on the four `/area/:topic` patterns,
 *    catches the path form *during render* and issues a `<Navigate>`. Doing it
 *    here rather than in an effect is the difference between a redirect and a
 *    flash of the 404 — the parameter swallows `/product/classify`, and without
 *    this route it would match nothing and paint the 404 for a frame.
 *  - `useRouteScroll` catches the hash form, which no route pattern can match,
 *    because a fragment never reaches the router's matcher from a fresh load.
 *    It stays keyed on `pathname + hash` even though the *targets* no longer
 *    carry hashes: the keys are the retired addresses, and those still have
 *    them.
 *
 * A dead hash is worse than a dead link: with the hash honoured blindly the
 * reader lands mid-scroll, unfocused, on a page whose anchor does not exist,
 * with nothing logged. Hence the map, consulted before any hash is honoured.
 */
export const LEGACY: Record<string, string> = {
  /* the eighteen retired topic paths → the area page that absorbed them */
  '/product/classify': '/product',
  '/product/compress': '/product',
  '/product/cache': '/product',
  '/product/protect': '/product',
  '/product/mcp': '/product',
  '/product/proxy': '/product',
  '/product/interface': '/product',

  '/research/benchmarks': '/research',
  '/research/methodology': '/research',
  '/research/economics': '/research',
  '/research/datasets': '/research',
  '/research/limits': '/research',
  '/research/integrity': '/research',

  '/pricing/compare': '/pricing',
  '/pricing/faq': '/pricing',

  '/enterprise/platform': '/enterprise',
  '/enterprise/sla': '/enterprise',
  '/enterprise/contact': '/enterprise',

  /* the home page's bands, which are pages now */
  '/#benchmarks': '/research',
  '/#product': '/how-it-works',
  '/#architecture': '/how-it-works',
  '/#integration': '/how-it-works',
  '/#playground': '/playground',
  '/#features': '/features',
  '/#ecosystem': '/product',
  '/#research': '/about#principles',
  '/#pricing': '/pricing',
};
