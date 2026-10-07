import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { finePointer, prefersReduced } from '@/lib/motion/variants';

/**
 * Cursor states.
 *
 *   default  small dot, trailing ring
 *   hover    expands slightly over interactive chrome
 *   link     ring only — reads as a target over text links
 *   target   crosshair/radar indicator over the live visualisations
 *   copy     over code blocks, carries a COPY label
 *   read     over architecture nodes, carries a contextual label
 */
export type CursorState = 'default' | 'hover' | 'link' | 'target' | 'copy' | 'read';

interface Ctx {
  set: (s: CursorState, label?: string) => void;
  reset: () => void;
}

const CursorCtx = createContext<Ctx>({ set: () => {}, reset: () => {} });

/** Attach to any element to drive the cursor on hover. */
export function useCursorState(state: CursorState, label?: string) {
  const { set, reset } = useContext(CursorCtx);
  return useMemo(
    () => ({
      onMouseEnter: () => set(state, label),
      onMouseLeave: () => reset(),
    }),
    [set, reset, state, label],
  );
}

/**
 * Custom cursor — desktop fine pointers only.
 *
 * Never rendered on touch devices, and suppressed under prefers-reduced-motion
 * where a trailing ring is exactly the kind of motion the visitor asked us to
 * stop making.
 */
export function CursorProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>('default');
  const [label, setLabel] = useState<string | undefined>();
  // The cursor is positioned from the viewport centre until a real pointer
  // position arrives, so it must not be painted before one does — otherwise
  // every fresh load shows a ring parked in the middle of the page. It is
  // revealed on the first mousemove, not on mount.
  const [seen, setSeen] = useState(false);

  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEnabled(finePointer() && !prefersReduced());
  }, []);

  const set = useCallback((s: CursorState, l?: string) => {
    setState(s);
    setLabel(l);
  }, []);
  const reset = useCallback(() => {
    setState('default');
    setLabel(undefined);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('no-cursor');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let first = true;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      // The ring trails the dot; on the very first move it would otherwise
      // streak in from the centre, so it is snapped to the pointer instead.
      if (first) {
        rx = e.clientX;
        ry = e.clientY;
        first = false;
        setSeen(true);
      }
      mx = e.clientX;
      my = e.clientY;
    };

    const loop = () => {
      // The ring trails the dot slightly — reads as weight, not lag.
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.classList.remove('no-cursor');
    };
  }, [enabled]);

  const value = useMemo(() => ({ set, reset }), [set, reset]);

  // Geometry per state. `d` is the dot, `r` the ring.
  const sizes: Record<CursorState, { d: number; r: number }> = {
    default: { d: 5, r: 30 },
    hover: { d: 5, r: 46 },
    link: { d: 0, r: 52 },
    target: { d: 3, r: 64 },
    copy: { d: 0, r: 60 },
    read: { d: 5, r: 74 },
  };
  const g = sizes[state];
  const isTarget = state === 'target';
  const hasLabel = state === 'copy' || state === 'read';

  return (
    <CursorCtx.Provider value={value}>
      {children}
      {enabled && (
        <div
          aria-hidden="true"
          className={`pointer-events-none fixed inset-0 z-[200] hidden mix-blend-difference transition-opacity duration-200 md:block ${
            seen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            ref={dot}
            className="absolute left-0 top-0 rounded-full bg-white transition-[width,height] duration-300 ease-calm"
            style={{ width: g.d, height: g.d }}
          />
          <div
            ref={ring}
            className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-white/70 transition-[width,height,background-color,border-color] duration-300 ease-calm"
            style={{
              width: g.r,
              height: g.r,
              backgroundColor: hasLabel ? 'rgba(255,255,255,0.12)' : 'transparent',
            }}
          >
            {/* Radar ticks — only over the live visualisations. */}
            {isTarget && (
              <>
                <span className="absolute left-1/2 top-0 h-1.5 w-px -translate-x-1/2 bg-white/80" />
                <span className="absolute bottom-0 left-1/2 h-1.5 w-px -translate-x-1/2 bg-white/80" />
                <span className="absolute left-0 top-1/2 h-px w-1.5 -translate-y-1/2 bg-white/80" />
                <span className="absolute right-0 top-1/2 h-px w-1.5 -translate-y-1/2 bg-white/80" />
              </>
            )}
            {hasLabel && label && (
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white">{label}</span>
            )}
          </div>
        </div>
      )}
    </CursorCtx.Provider>
  );
}
