import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eyebrow } from '@/components/arkadhi/Motion';
import { statement, problem, pipeline } from '@/lib/content/site';

gsap.registerPlugin(ScrollTrigger);

/**
 * The token stream — the landing page's pinned sequence.
 *
 * Tokens pour in from your app on the left as a dense stream of blocks. As you
 * scroll they cross the EchoRegent gates, and the stream thins at each one:
 *
 *   · Classify  — every block is tagged: signal darkens, a protected group
 *                 turns white and takes its own lane, the rest stays faint;
 *   · Compress  — most of the noise folds away at the gate;
 *   · Cache     — repeats peel off upward, because the answer is already known;
 *   · the protected lane passes every gate untouched.
 *
 * What reaches the LLM is a thin line of blocks, and the counter on the right
 * ends on the measured figure — 259 tokens, against the 18,679 that were sent.
 * Then a navy curtain rises with the answer.
 *
 * The blocks are a diagram of the mechanism: each stands for a bundle of
 * tokens and the proportions are illustrative. The two counters are the LoCoMo
 * figures the problem section already carries, and no per-gate count is shown
 * because none was measured.
 */
const N = 300; // blocks
const SURVIVE = 20;
const PROTECT = 8; // of the survivors
const FULL = problem.collapse[0].tokens;
const SMALL = problem.collapse[1].tokens;
const LANES = 12;
const PROTECT_LANES = 2; // the bottom two lanes
const GATES = [
  { key: 'classify', label: 'Classify', at: 0.3 },
  { key: 'compress', label: 'Compress', at: 0.52 },
  { key: 'cache', label: 'Cache', at: 0.72 },
] as const;
const TRAVEL = 0.3; // in scroll progress

function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

type Fate = 'noise-compress' | 'noise-cache' | 'signal' | 'protect';
type Block = { lane: number; spawn: number; fate: Fate; jitter: number };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const sentence = (t: string) => t.charAt(0) + t.slice(1).toLowerCase();
const headline = sentence(statement.lines.join(' ').replace(/\s+/g, ' '));
const stage = (k: string) => pipeline.stages.find((x) => x.key === k)?.summary ?? '';
const CAPTIONS = [stage('input'), stage('classify'), stage('compress'), stage('cache'), stage('protect')];
const LABELS = ['tokens enter', 'classifying', 'folding noise away', 'repeats drop out', 'reaches the LLM'];
const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function buildBlocks(): Block[] {
  const r = rand(11);
  const blocks: Block[] = [];
  const openLanes = LANES - PROTECT_LANES;
  for (let i = 0; i < N; i++) {
    let fate: Fate;
    if (i < PROTECT) fate = 'protect';
    else if (i < SURVIVE) fate = 'signal';
    else fate = r() < 0.58 ? 'noise-compress' : 'noise-cache';
    const late = fate === 'signal' || fate === 'protect';
    blocks.push({
      fate,
      lane: fate === 'protect' ? openLanes + Math.floor(r() * PROTECT_LANES) : Math.floor(r() * openLanes),
      spawn: late ? 0.05 + r() * 0.4 : 0.04 + r() * 0.5,
      jitter: r(),
    });
  }
  return blocks;
}

export function ContextCollapse() {
  const [animated] = useState(() => !reduced());
  const root = useRef<HTMLElement | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const blocks = useMemo(buildBlocks, []);
  const smallDigits = SMALL.toLocaleString('en-US').split('');

  // Layout effect, so this pin is registered before the later sections' pins
  // measure the page — otherwise their start positions ignore its spacer.
  useLayoutEffect(() => {
    if (!animated || !root.current || !canvas.current) return;
    const el = root.current;
    const cv = canvas.current;
    const ctx2d = cv.getContext('2d')!;
    const sentEl = el.querySelector<HTMLElement>('[data-sent]')!;
    const gotEl = el.querySelector<HTMLElement>('[data-got]')!;
    const bEl = el.querySelector<HTMLElement>('[data-b]')!;
    const digits = Array.from(el.querySelectorAll<HTMLElement>('[data-digit]'));
    const answers = Array.from(el.querySelectorAll<HTMLElement>('[data-answer]'));
    const labels = Array.from(el.querySelectorAll<HTMLElement>('[data-ph]'));
    const caps = Array.from(el.querySelectorAll<HTMLElement>('[data-cap]'));
    const bar = el.querySelector<HTMLElement>('[data-progress]')!;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let shown = 0;
    let target = 0;
    let raf = 0;
    let lastPhase = -1;

    const size = () => {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width;
      H = r.height;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const NAVY = '#0B1F3C';

    const draw = (p: number) => {
      const c = ctx2d;
      c.clearRect(0, 0, W, H);
      const padX = 8;
      const x0 = padX + W * 0.035; // the source edge
      const x1 = W - padX - W * 0.075; // the LLM node
      const top = H * 0.16;
      const bottom = H * 0.96;
      const laneH = (bottom - top) / LANES;
      const bs = Math.max(3, Math.min(laneH * 0.78, W / 75));
      const laneY = (l: number) => top + laneH * (l + 0.5);

      // protected lane: a dashed band that runs the whole length, untouched
      const pTop = top + laneH * (LANES - PROTECT_LANES) + 2;
      c.save();
      c.strokeStyle = NAVY;
      c.globalAlpha = 0.55;
      c.setLineDash([5, 5]);
      c.lineWidth = 1.25;
      c.strokeRect(x0 - 6, pTop, x1 - x0 + 12 + 24, bottom - pTop);
      c.restore();
      c.fillStyle = NAVY;
      c.font = '500 10px "JetBrains Mono", ui-monospace, monospace';
      c.textBaseline = 'alphabetic';
      c.globalAlpha = 0.8;
      c.fillText('PROTECTED LANE · PASSES EVERY GATE UNTOUCHED', x0, pTop - 5);
      c.globalAlpha = 1;

      // gates
      GATES.forEach((g) => {
        const gx = x0 + (x1 - x0) * g.at;
        c.save();
        c.strokeStyle = NAVY;
        c.globalAlpha = 0.5;
        c.lineWidth = 1.5;
        c.beginPath();
        c.moveTo(gx, top - 12);
        c.lineTo(gx, pTop - 18);
        c.stroke();
        c.restore();
        c.fillStyle = NAVY;
        c.font = '500 11px "JetBrains Mono", ui-monospace, monospace';
        c.textAlign = 'center';
        c.fillText(g.label.toUpperCase(), gx, top - 20);
        c.textAlign = 'start';
      });

      // endpoints
      c.fillStyle = NAVY;
      c.font = '500 11px "JetBrains Mono", ui-monospace, monospace';
      c.fillText('YOUR APP', x0 - 4, top - 20);
      c.textAlign = 'right';
      c.fillText('LLM', x1 + 42, top - 20);
      c.textAlign = 'start';

      // LLM node: a navy plate the survivors feed into
      let arrived = 0;
      let spawned = 0;
      let flash = 0;

      for (const b of blocks) {
        if (p >= b.spawn) spawned++;
        const t = (p - b.spawn) / TRAVEL;
        if (t < 0) continue;
        const ty = laneY(b.lane) + (b.jitter - 0.5) * laneH * 0.2;

        // where does it die?
        let death = 2;
        if (b.fate === 'noise-compress') death = GATES[1].at;
        if (b.fate === 'noise-cache') death = GATES[2].at;

        if (b.fate === 'signal' || b.fate === 'protect') {
          if (t >= 1) {
            arrived++;
            if (t < 1.08) flash = Math.max(flash, 1 - (t - 1) / 0.08);
            continue;
          }
        }

        const tt = Math.min(t, death);
        const x = x0 + (x1 - x0) * clamp(tt);
        let y = ty;
        let s = bs;
        let alpha = 1;

        if (t > death) {
          const dp = clamp((t - death) / 0.07);
          if (dp >= 1) continue;
          if (b.fate === 'noise-cache') {
            y = ty - dp * H * 0.14; // peel up and out: the answer is already cached
            alpha = 1 - dp;
          } else {
            s = bs * (1 - dp); // folded away at the gate
            alpha = 1 - dp * 0.6;
          }
        }

        // colour: faint until classified, then by fate
        const classified = t > GATES[0].at;
        if (classified && b.fate === 'signal') c.fillStyle = NAVY;
        else if (classified && b.fate === 'protect') c.fillStyle = '#FFFFFF';
        else if (b.fate === 'protect') c.fillStyle = 'rgba(255,255,255,0.7)';
        else c.fillStyle = 'rgba(11,31,60,0.38)';
        c.globalAlpha = alpha;
        c.fillRect(x - s / 2, y - s / 2, s, s);
      }
      c.globalAlpha = 1;

      // the LLM plate
      const plateX = x1 + 8;
      const plateH = bottom - top;
      c.fillStyle = NAVY;
      c.fillRect(plateX, top, 26, plateH);
      if (flash > 0) {
        c.fillStyle = `rgba(20,153,156,${0.9 * flash})`;
        c.fillRect(plateX - 4, top - 4, 34, plateH + 8);
      }
      return { spawned, arrived };
    };

    const render = (p: number) => {
      const { spawned, arrived } = draw(p);
      sentEl.textContent = Math.round(FULL * (spawned / N)).toLocaleString('en-US');
      gotEl.textContent = Math.round(SMALL * (arrived / SURVIVE)).toLocaleString('en-US');

      const phase = p < 0.1 ? 0 : p < 0.3 ? 1 : p < 0.5 ? 2 : p < 0.68 ? 3 : 4;
      if (phase !== lastPhase) {
        lastPhase = phase;
        labels.forEach((l, i) => gsap.to(l, { opacity: i === phase ? 1 : 0, duration: 0.3, overwrite: true }));
        caps.forEach((l, i) => gsap.to(l, { opacity: i === phase ? 1 : 0, duration: 0.3, overwrite: true }));
      }

      // the curtain, then the answer (driven by the same progress)
      const q = clamp((p - 0.8) / 0.1);
      const e = q * q * (3 - 2 * q);
      bEl.style.clipPath = `inset(${(1 - e) * 100}% 0% 0% 0%)`;
      digits.forEach((d, i) => {
        const k = clamp((p - 0.88 - i * 0.012) / 0.05);
        const ek = 1 - Math.pow(1 - k, 3);
        d.style.transform = `translateY(${(1 - ek) * 118}%) rotate(${(1 - ek) * 4}deg)`;
      });
      answers.forEach((a, i) => {
        const k = clamp((p - 0.93 - i * 0.012) / 0.05);
        a.style.opacity = String(k);
        a.style.transform = `translateY(${(1 - k) * 24}px)`;
      });
      bar.style.transform = `scaleX(${p})`;
    };

    const loop = () => {
      shown += (target - shown) * 0.12;
      if (Math.abs(target - shown) < 0.0004) shown = target;
      render(shown);
      raf = requestAnimationFrame(loop);
    };

    size();
    const ro = new ResizeObserver(size);
    ro.observe(cv);

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: '+=420%',
      pin: '[data-stage]',
      anticipatePin: 1,
      onUpdate: (self) => {
        target = self.progress;
      },
      onRefresh: (self) => {
        target = self.progress;
      },
    });
    shown = target = st.progress;
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      st.kill();
    };
  }, [animated, blocks]);

  if (!animated) {
    return (
      <section id="mission" aria-label="Token stream" className="bg-protect text-ink">
        <div className="shell py-20 md:py-32">
          <Eyebrow index="01" label={statement.label} />
          <p className="mt-10 max-w-[19ch] font-display text-[clamp(1.6rem,4.2vw,4.2rem)] font-bold leading-[1.04] tracking-[-0.03em] md:mt-14">
            {headline}
          </p>
          <p className="mt-10 font-mono text-[clamp(2.4rem,6vw,4.5rem)] leading-none">
            {FULL.toLocaleString('en-US')} → {SMALL}
          </p>
          <p className="mt-6 max-w-[60ch] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-relaxed">{problem.support}</p>
          <p className="mt-6 max-w-[60ch] text-[15px] leading-relaxed text-ink/80">{statement.note}</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={root} id="mission" aria-label="Token stream" className="bg-protect text-ink">
      <div data-stage className="relative h-[100svh] min-h-[620px] overflow-hidden">
        <div className="shell relative flex h-full flex-col justify-center pb-6 pt-20 md:pt-24">
          <Eyebrow index="01" label={statement.label} />
          <p className="mt-4 max-w-[26ch] font-display text-[clamp(1.4rem,min(3.2vw,5svh),3rem)] font-bold leading-[1.05] tracking-[-0.03em] md:mt-6">
            {headline}
          </p>

          <canvas
            ref={canvas}
            aria-hidden="true"
            className="mt-4 h-[min(42svh,380px)] w-full md:mt-6"
          />

          <div className="mt-4 grid grid-cols-[1fr_auto] items-end gap-6 md:mt-5">
            <div>
              <p className="font-mono text-[clamp(1.8rem,min(4vw,7svh),3.6rem)] font-medium leading-none tracking-[-0.03em] tabular-nums">
                <span data-sent>0</span>
              </p>
              <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em]">tokens sent</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[clamp(1.8rem,min(4vw,7svh),3.6rem)] font-medium leading-none tracking-[-0.03em] tabular-nums">
                <span data-got>0</span>
              </p>
              <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em]">tokens reach the LLM</p>
            </div>
          </div>

          <div className="relative mt-4 h-[3.2rem] md:mt-5">
            {LABELS.map((l, i) => (
              <div key={l} data-ph className="absolute inset-0" style={{ opacity: i === 0 ? 1 : 0 }}>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em]">{l}</p>
                <p data-cap className="mt-1 max-w-[46ch] text-[14.5px] leading-snug" style={{ opacity: 1 }}>
                  {CAPTIONS[i]}
                </p>
              </div>
            ))}
          </div>
          <p className="max-w-[60ch] pt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/70">
            Each block stands for a bundle of tokens; proportions are illustrative. Counters are the measured LoCoMo figures.
          </p>
        </div>

        {/* the answer, raised from the bottom */}
        <div data-b className="absolute inset-0 flex flex-col justify-center overflow-hidden bg-ink text-paper" style={{ clipPath: 'inset(100% 0 0 0)' }}>
          <div aria-hidden="true" className="tech-grid-dark pointer-events-none absolute inset-0 opacity-60" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[8vw] top-1/2 aspect-square w-[min(60vmin,560px)] -translate-y-1/2"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="echo-ring absolute inset-0 rounded-full border border-signal/70"
                style={{ animationDelay: `${i * 1.6}s` }}
              />
            ))}
            <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-protect" />
          </div>
          <div className="shell relative pt-16">
            <Eyebrow index="02" label="The answer" tone="ink" />
            <p className="mt-6 flex font-mono text-[clamp(5rem,20vw,16rem)] font-medium leading-[0.9] tracking-[-0.05em] md:mt-8">
              {smallDigits.map((d, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em]">
                  <span data-digit className="inline-block will-change-transform" style={{ transform: 'translateY(118%)' }}>
                    {d}
                  </span>
                </span>
              ))}
            </p>
            <p data-answer style={{ opacity: 0 }} className="mt-4 font-mono text-[12px] uppercase tracking-[0.2em] text-paper/75">
              tokens per query · down from {FULL.toLocaleString('en-US')}
            </p>
            <p data-answer style={{ opacity: 0 }} className="mt-8 max-w-[34ch] font-display text-[clamp(1.2rem,2.2vw,1.9rem)] font-bold leading-[1.15] tracking-[-0.02em]">
              {problem.support}
            </p>
            <p data-answer style={{ opacity: 0 }} className="mt-5 max-w-[60ch] border-t border-paper/25 pt-4 text-[15px] leading-relaxed text-paper/85">
              {statement.note} <span className="text-paper/60">{problem.collapseSource}</span>
            </p>
          </div>
        </div>

        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-ink/10">
          <div data-progress className="h-full origin-left bg-signal" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
    </section>
  );
}
