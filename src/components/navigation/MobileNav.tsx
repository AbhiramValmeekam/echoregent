import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import { Logo } from '@/components/navigation/Logo';
import { HEADER } from '@/lib/content/ia';
import { site, cta, mail, SUBJECTS } from '@/lib/content/site';
import { EASE } from '@/lib/motion/variants';

/**
 * Mobile navigation — a full-field index rather than a stacked menu.
 *
 * The brief asks for the mobile treatment to feel as considered as the desktop
 * one, so this is an editorial contents page: numbered rows, the page label,
 * and the closing panel carrying the single call to action.
 *
 * **The rows are flat, and that is the change.** Each area's row used to open a
 * nested list of its topic pages, because there were eighteen of them and the
 * drawer was the only place with the height to show them. There is nothing to
 * nest now: seven rows, seven destinations, and the sub-level lives on the page
 * it belongs to as a section rail.
 *
 * The active marker keeps its `startsWith` branch even though every path is now
 * top level. It costs a comparison and it is what makes the marker survive a
 * future second level, which is exactly the shape that was missing the last
 * time this file was flat.
 *
 * It is `xl:hidden` because the desktop row is `xl:flex` — the two are one
 * breakpoint and have to stay one, or 1024–1280 gets neither control.
 */
export function MobileNav({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const { pathname } = useLocation();
  const here = (to: string) => pathname === to || pathname.startsWith(`${to}/`);

  // Stop the smooth scroller behind the panel — a scrolling page under a
  // full-screen overlay reads as a bug.
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
    return () => {
      lenis.start();
    };
  }, [open]);

  // Escape closes it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onNavigate();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onNavigate]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav"
          className="fixed inset-0 z-[85] overflow-y-auto bg-paper xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE.calm }}
        >
          <div className="shell relative flex min-h-full flex-col justify-between pb-10 pt-[92px]">
            <nav aria-label="Primary">
              <ol>
                {HEADER.map((item, i) => {
                  const active = here(item.to);

                  return (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, y: 26 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASE.calm, delay: 0.06 + i * 0.055 }}
                      className="border-b border-[var(--line-soft)]"
                    >
                      <Link
                        to={item.to}
                        onClick={onNavigate}
                        aria-current={active ? 'page' : undefined}
                        className="flex items-baseline gap-5 py-5"
                      >
                        <span className="font-mono text-meta text-signal">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`font-display text-[clamp(1.75rem,8vw,2.75rem)] font-bold uppercase leading-none tracking-[-0.03em] ${
                            active ? 'text-signal' : 'text-ink'
                          }`}
                        >
                          {item.label}
                        </span>
                        <span aria-hidden="true" className="ml-auto font-mono text-meta text-hush">
                          →
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ol>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE.calm, delay: 0.36 }}
              className="mt-10 space-y-5"
            >
              <a href={cta.primary.href} className="btn w-full justify-center">
                {cta.primary.label} <span aria-hidden="true">→</span>
              </a>
              <div className="flex items-center justify-between gap-4">
                <Logo tone="ink" showWord={false} />
                <a href={mail(SUBJECTS.general)} className="font-mono text-meta uppercase text-muted">
                  {site.contactEmail}
                </a>
              </div>
              <p className="font-mono text-meta uppercase text-hush">{site.status}</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
