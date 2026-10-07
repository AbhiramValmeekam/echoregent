/**
 * The EchoRegent mark.
 *
 * Three echo rings arriving at a core — the same idea as the hero's Context
 * Flow, reduced to a glyph. Stroke-only and monochrome-friendly so it holds on
 * both fields; the core carries the signal colour.
 */
export function Logo({
  className = '',
  tone = 'ink',
  showWord = true,
}: {
  className?: string;
  /** The colour of the mark itself: navy for paper, white for navy. */
  tone?: 'ink' | 'paper';
  showWord?: boolean;
}) {
  const stroke = tone === 'paper' ? '#FFFFFF' : '#0B1F3C';
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {!showWord && (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
        className="shrink-0 overflow-visible"
      >
        {/* Echo rings, opening outward from the core. */}
        <path d="M6 6a9.9 9.9 0 0 0 0 14" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" opacity="0.35" />
        <path d="M10 8.4a6.2 6.2 0 0 0 0 9.2" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
        <path d="M14 10.8a2.6 2.6 0 0 0 0 4.4" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
        {/* The core — what survives. */}
        <circle cx="20.5" cy="13" r="2.4" fill="#14999C" />
      </svg>
      )}
      {showWord && (
        <span
          className="font-display text-[15px] font-bold uppercase tracking-[0.16em]"
          style={{ color: stroke }}
        >
          EchoRegent
        </span>
      )}
    </span>
  );
}
