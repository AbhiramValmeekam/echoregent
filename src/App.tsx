import { Routes, Route, useLocation } from 'react-router-dom';
import { Nav } from '@/components/navigation/Nav';
import { CursorProvider } from '@/components/cursor/Cursor';
import { ScrollProgress } from '@/components/navigation/ScrollProgress';
import { Footer } from '@/components/footer/Footer';
import { useLenis } from '@/lib/motion/useLenis';
import { useRouteScroll } from '@/lib/motion/useRouteScroll';

import Home from '@/routes/Home';
import HowItWorks from '@/routes/HowItWorks';
import PlaygroundPage from '@/routes/PlaygroundPage';
import FeaturesPage from '@/routes/FeaturesPage';
import ProductPage from '@/routes/ProductPage';
import ResearchPage from '@/routes/ResearchPage';
import PricingPage from '@/routes/PricingPage';
import EnterprisePage from '@/routes/EnterprisePage';
import LegacyRedirect from '@/routes/LegacyRedirect';
import AboutPage from '@/routes/AboutPage';
import SecurityPage from '@/routes/SecurityPage';
import NotFoundPage from '@/routes/NotFoundPage';

/**
 * EchoRegent.
 *
 * A persistent shell around a routed main. The nav, the footer, the custom
 * cursor and the Lenis smooth scroller all sit outside `<Routes>` so they
 * survive a navigation — remounting the scroller on every route change would
 * destroy and rebuild the GSAP ticker each time, and remounting the cursor
 * would make it re-attach to a document that has not changed.
 *
 * Only `<main>` swaps. Everything that makes a page transition legible —
 * scroll position, focus, document title, ScrollTrigger's cached positions —
 * is handled in one place, in useRouteScroll().
 *
 * **The routes are keyed on `pathname`.** `Title`'s reveal effect depends on
 * `[animate, delay]` and nothing else, so without a key React reuses the same
 * component instance across a navigation that only changes the hash. An
 * in-page anchor must *not* remount — that is the whole point of an anchor —
 * but a change of page must, or the new page's headings keep the previous
 * page's `gsap.context`, their `ScrollTrigger({ once: true })` never fires, and
 * every masked line sits at `y: 112%` inside its mask, permanently invisible.
 *
 * The four `:topic` routes are not pages. They are the receivers for the
 * eighteen topic pages this site used to have, and they render
 * `LegacyRedirect`, which forwards to the page that absorbed the section or
 * shows the 404 — see `routes/LegacyRedirect.tsx`.
 */
export default function App() {
  useLenis();
  useRouteScroll();
  const { pathname } = useLocation();

  return (
    <CursorProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[300] focus:border focus:border-signal focus:bg-paper focus:px-5 focus:py-3 focus:font-mono focus:text-[12px] focus:uppercase focus:tracking-[0.14em] focus:text-ink"
      >
        Skip to content
      </a>

      {pathname !== '/' && <ScrollProgress key={pathname} />}
      <Nav />

      <main id="main">
        <Routes key={pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/features" element={<FeaturesPage />} />

          {/* The areas. One page each, with nothing between the sections. */}
          <Route path="/product" element={<ProductPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/enterprise" element={<EnterprisePage />} />

          {/* Retired topic paths — `/product/classify` and its seventeen
              siblings. A parameter matches anything, so each of these needs a
              route to catch it rather than falling through to `*`. */}
          <Route path="/product/:topic" element={<LegacyRedirect />} />
          <Route path="/research/:topic" element={<LegacyRedirect />} />
          <Route path="/pricing/:topic" element={<LegacyRedirect />} />
          <Route path="/enterprise/:topic" element={<LegacyRedirect />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </CursorProvider>
  );
}
