/**
 * The provenance chip.
 *
 * How a number came to exist: `measured` is ours, `cited` is someone else's
 * figure used with attribution, `derived` is arithmetic on top of either.
 *
 * Lives here rather than inside <Benchmark> because the hero stat row, the
 * product page and the research page all render figures too — and a chip that
 * is redefined per page is a chip that drifts.
 *
 * Colours are deliberately not coral: coral is the section's one marker, and
 * a chip is metadata, not the point of attention.
 */
export function Kind({
  kind,
  tone = 'paper',
}: {
  kind: 'measured' | 'cited' | 'derived';
  tone?: 'paper' | 'ink';
}) {
  const onDark = tone === 'ink';
  const skin = onDark
    ? kind === 'measured'
      ? 'border-signal/50 text-signal'
      : kind === 'cited'
        ? 'border-white/30 text-white/70'
        : 'border-white/20 text-white/50'
    : kind === 'measured'
      ? 'border-signal/40 text-signal'
      : kind === 'cited'
        ? 'border-ink/25 text-ink/70'
        : 'border-ink/20 text-ink/70';

  return (
    <span className={`shrink-0 border px-2 py-[3px] font-mono text-[9.5px] uppercase tracking-[0.14em] ${skin}`}>
      {kind}
    </span>
  );
}
