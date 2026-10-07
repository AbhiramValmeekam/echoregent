/**
 * Partner logos.
 *
 * The live site's "Backed & supported by" marquee carries four marks, each
 * rendered twice in a duplicated track so the loop has no seam. The assets are
 * the live site's own, copied into public/partners/.
 *
 * NVIDIA Inception is an inline <svg> badge on the live site rather than an
 * <img> — which is why a DOM walk that skips <svg> subtrees reports three
 * logos and not four. It is shipped here as a file like the rest.
 *
 * The aspect ratios are genuinely different (T-Hub is square, the others are
 * wide), so the marquee constrains by height and lets the width follow.
 */

export const partners = {
  label: 'Backed & supported by',
  items: [
    { id: 'google', name: 'Google for Startups', src: '/partners/google-for-startups.svg', w: 824, h: 100 },
    { id: 'nvidia', name: 'NVIDIA Inception', src: '/partners/nvidia.png', w: 281, h: 230 },
    { id: 'thub', name: 'T-Hub Hyderabad', src: '/partners/t-hub-hyderabad.png', w: 1080, h: 1080 },
    { id: 'microsoft', name: 'Microsoft for Startups', src: '/partners/microsoft.png', w: 399, h: 89 },
  ],
} as const;
