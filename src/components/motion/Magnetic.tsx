import { useRef, type ReactNode } from 'react';

/**
 * Magnetic button. The element follows the pointer a short distance and settles
 * back on leave. Strength is intentionally low — this should register as
 * responsiveness, not as a gimmick. A no-op on touch.
 */
export function Magnetic({
  children,
  strength = 0.22,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = 'translate3d(0,0,0)';
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block transition-transform duration-500 ease-calm ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Magnetic anchor. Handles both in-page hashes (routed through Lenis by the
 * caller) and external/mailto links.
 */
export function MagneticLink({
  href,
  children,
  variant = 'primary',
  className = '',
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'ink' | 'ink-ghost';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const cls = {
    primary: 'btn',
    ghost: 'btn-ghost',
    ink: 'btn-ink',
    'ink-ghost': 'btn-ink-ghost',
  }[variant];
  const external = /^https?:|^mailto:/.test(href);
  return (
    <Magnetic>
      <a
        href={href}
        className={`${cls} ${className}`}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {children}
      </a>
    </Magnetic>
  );
}
