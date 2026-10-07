/** EchoRegent — design tokens.
 *
 *  Arkadhi Labs' brand palette, adopted verbatim:
 *
 *    Core Navy    #0B1F3C  headings, body text, primary buttons, dark sections
 *    Pure White   #FFFFFF  main background, cards, text on navy
 *    Tech Teal    #14999C  highlights, focus borders, selected states
 *    Cool Gray    #8F949B  rules, grid lines, quiet decorative labels
 *    Insight Coral#FC7A5C  one small marker per section — never a second CTA
 *
 *  The field leads with white, as Arkadhi's does, and navy is spent on whole
 *  sections rather than everywhere. Teal is structural (state, focus, data) and
 *  coral is a single point of attention per section — the two are never
 *  interchangeable, and neither is ever a second call to action.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── The five ────────────────────────────────────────────
        paper: '#FFFFFF', // Pure White — the field
        ink: '#0B1F3C', // Core Navy — type on paper, and dark sections
        signal: '#14999C', // Tech Teal — state, focus, data
        // `muted` is an object so shadcn's `text-muted-foreground` resolves;
        // plain `text-muted` / `bg-muted` still give Cool Gray.
        muted: { DEFAULT: '#8F949B', foreground: '#8F949B' },
        // shadcn semantic tokens, mapped onto the five.
        background: '#FFFFFF',
        foreground: '#0B1F3C',
        primary: { DEFAULT: '#0B1F3C', foreground: '#FFFFFF' },
        secondary: { DEFAULT: 'rgba(11,31,60,0.055)', foreground: '#0B1F3C' },
        accent: { DEFAULT: 'rgba(11,31,60,0.055)', foreground: '#0B1F3C' },
        destructive: { DEFAULT: '#FC7A5C', foreground: '#0B1F3C' },
        input: 'rgba(11,31,60,0.3)',
        ring: '#14999C',
        hush: '#8F949B', // Cool Gray, same value, quieter role
        protect: '#FC7A5C', // Insight Coral — the one marker

        // ── Surfaces that sit on paper ──────────────────────────
        // Navy at 3–6%, so a panel reads as a raised surface rather than as
        // a second colour. Anything heavier turns the page grey.
        wash: 'rgba(11,31,60,0.028)',
        'wash-strong': 'rgba(11,31,60,0.055)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        // Arkadhi's hero face: Bebas Neue for the one big line, Cormorant for the italic aside.
        bebas: ['"Bebas Neue"', '"Space Grotesk"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // The metadata : display ratio is Arkadhi's. Mono is promoted here
        // from label type to a lead voice, so it carries two display sizes.
        meta: ['0.6875rem', { lineHeight: '1.7', letterSpacing: '0.14em' }],
        'meta-lg': ['0.75rem', { lineHeight: '1.7', letterSpacing: '0.12em' }],
        // Sized so the longest authored hero line ("REMEMBER EVERYTHING.",
        // 20 characters) still fits the shell at every width — authored lines
        // never wrap from `md` up, so an oversized clamp clips instead of
        // breaking. Verified by _research/echoregent-masks.mjs.
        hero: ['clamp(3.25rem, 12.5vw, 12.5rem)', { lineHeight: '0.9', letterSpacing: '0.005em' }],
        section: ['clamp(2.25rem, 5.6vw, 5.25rem)', { lineHeight: '0.96', letterSpacing: '-0.04em' }],
        sub: ['clamp(1.375rem, 2.2vw, 2rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        lede: ['clamp(1.1rem, 1.5vw, 1.3rem)', { lineHeight: '1.6' }],
        // Telemetry numerals — the readouts. Mono, tight, large.
        readout: ['clamp(2.25rem, 5.5vw, 4.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'readout-sm': ['clamp(1.5rem, 2.8vw, 2.25rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        shell: '1600px',
        text: '62ch',
      },
      transitionTimingFunction: {
        // Arkadhi's easing family. No bounce, no overshoot.
        calm: 'cubic-bezier(0.22, 1, 0.36, 1)',
        precise: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        'fade-rise': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
        // The console's scanning hairline.
        scan: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '25%': { opacity: '1' },
          '100%': { transform: 'translateY(1000%)', opacity: '0' },
        },
        marquee: {
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-rise': 'fade-rise .7s cubic-bezier(0.22,1,0.36,1) both',
        pulse: 'pulse 2.4s cubic-bezier(0.22,1,0.36,1) infinite',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
};
