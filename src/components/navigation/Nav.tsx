import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '@/components/navigation/Logo';
import { MobileNav } from '@/components/navigation/MobileNav';
import { Magnetic } from '@/components/motion/Magnetic';
import { HEADER } from '@/lib/content/ia';
import { site, cta } from '@/lib/content/site';
import { EASE } from '@/lib/motion/variants';

/**
 * Fixed navigation.
 *
 * Transparent over the hero, then a faint blurred plate with a hairline once
 * you leave it — no colour change, just enough separation to keep the type
 * legible over content. Hides on downward scroll, returns immediately on any
 * upward movement.
 *
 * Seven flat links, one per area. They were four dropdowns and three links
 * while the areas were split into eighteen topic pages; with each area back to
 * a single page there is no second level to open, and a caret over an item that
 * goes exactly where it says is a promise the header cannot keep. The second
 * level is the area's own section rail, which sits where the reader already is
 * when they want it.
 *
 * The row stays `xl:flex`. Removing the dropdowns brought the labels in by
 * about 240px, but seven items plus a 155px logo and a 210px CTA still need
 * more than the ~880px the shell leaves at 1024px, and a multi-word label does
 * not shrink when it runs out of room — it wraps, inside a header with a fixed
 * 72px height. So 1024–1280 keeps the drawer, which is the one range where the
 * drawer is genuinely the better control anyway.
 *
 * The items come from `ia.ts`, so the header cannot promise a page that does
 * not exist.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Only retract after the hero, and only while travelling down.
      setHidden(y > 460 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // A route change always returns the reader to the top, so the header cannot
  // be left retracted from the previous page's scroll depth.
  useEffect(() => {
    setHidden(false);
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[90]"
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.45, ease: EASE.calm }}
      >
        <div
          className={`transition-[background-color,border-color,backdrop-filter] duration-500 ease-calm ${
            scrolled || open
              ? 'border-b border-[var(--line-soft)] bg-paper/80 backdrop-blur-md'
              : 'border-b border-transparent'
          }`}
        >
          <div className="shell flex h-[72px] items-center justify-between gap-6">
            <Link to="/" aria-label={`${site.name} — home`} className="shrink-0">
              <Logo />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
              {HEADER.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  aria-current={pathname === item.to ? 'page' : undefined}
                  className="group relative font-mono text-meta uppercase text-muted transition-colors duration-300 hover:text-ink"
                >
                  <span className={pathname === item.to ? 'text-ink' : undefined}>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1.5 left-0 h-px bg-signal transition-transform duration-500 ease-calm ${
                      pathname === item.to
                        ? 'w-full origin-left scale-x-100'
                        : 'w-full origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Magnetic className="hidden sm:inline-block">
                <a href={cta.primary.href} className="btn !px-5 !py-3">
                  {cta.primary.label}
                  <span aria-hidden="true">→</span>
                </a>
              </Magnetic>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                className="flex h-10 items-center gap-2 font-mono text-meta uppercase text-ink xl:hidden"
              >
                <span className="flex h-3 w-4 flex-col justify-between" aria-hidden="true">
                  <span
                    className={`h-px w-full bg-current transition-transform duration-300 ease-calm ${
                      open ? 'translate-y-[5.5px] rotate-45' : ''
                    }`}
                  />
                  <span className={`h-px w-full bg-current transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
                  <span
                    className={`h-px w-full bg-current transition-transform duration-300 ease-calm ${
                      open ? '-translate-y-[5.5px] -rotate-45' : ''
                    }`}
                  />
                </span>
                {open ? 'Close' : 'Index'}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileNav open={open} onNavigate={() => setOpen(false)} />
    </>
  );
}
