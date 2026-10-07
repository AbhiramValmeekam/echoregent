import { Navigate, useLocation } from 'react-router-dom';
import { LEGACY, normalisePath } from '@/lib/content/ia';
import NotFoundPage from '@/routes/NotFoundPage';

/**
 * The receiver for `/product/classify` and the seventeen other retired paths.
 *
 * Mounted on the four `/area/:topic` patterns. It exists because a
 * parameterised route matches *anything*, so if these paths fell through to
 * `*` the reader would get the 404 — and if they were redirected from an effect
 * instead, they would get a painted frame of the 404 first. `<Navigate>` renders
 * during the same commit, so the redirect is invisible.
 *
 * **A miss is a real 404, not a redirect into nowhere.** `/product/clasify` is a
 * valid `/product/:topic` that names no retired address, so it renders
 * `NotFoundPage` at the address the reader typed rather than being rewritten to
 * the area page. That is the difference between a page that explains itself and
 * a page that silently pretends the reader asked for something else.
 *
 * The lookup is normalised for the same reason `useRouteScroll`'s is: a trailing
 * slash and a stray capital are both things a reader can type, and neither
 * should cost them the page.
 */
export default function LegacyRedirect() {
  const { pathname, hash } = useLocation();
  const to = LEGACY[`${normalisePath(pathname)}${hash}`];

  if (!to) return <NotFoundPage />;
  return <Navigate to={to} replace />;
}
