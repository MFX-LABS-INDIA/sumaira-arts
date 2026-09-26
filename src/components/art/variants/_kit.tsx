/** Shared palette and drawing helpers for the placeholder artworks. */
export const c = {
  brand: "var(--color-brand)",
  deep: "var(--color-deep)",
  steel: "var(--color-steel)",
  mist: "var(--color-mist)",
  soft: "var(--color-soft)",
  light: "var(--color-light)",
  ice: "var(--color-ice)",
  white: "var(--color-white)",
} as const;

export const palette = c;

export const W = 400;
export const H = 500;

/** Deterministic PRNG so server and client render identical artwork. */
export function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const r1 = (v: number) => Math.round(v * 10) / 10;

export const Ground = ({ fill }: { fill: string }) => <rect width={W} height={H} fill={fill} />;

type Stop = [offset: number, color: string, opacity?: number];

export function Gradient({ id, stops, vertical = true }: { id: string; stops: Stop[]; vertical?: boolean }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={vertical ? 0 : 1} y2={vertical ? 1 : 0}>
      {stops.map(([offset, color, opacity = 1]) => (
        <stop key={offset} offset={offset} stopColor={color} stopOpacity={opacity} />
      ))}
    </linearGradient>
  );
}

export function Blur({ id, deviation }: { id: string; deviation: number }) {
  return (
    <filter id={id} x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation={deviation} />
    </filter>
  );
}

/** Organic, hand-made edge: noise-driven displacement. */
export function Rough({ id, scale, freq, seed }: { id: string; scale: number; freq: number; seed: number }) {
  return (
    <filter id={id} x="-15%" y="-15%" width="130%" height="130%">
      <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves="3" seed={seed} result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale={scale} />
    </filter>
  );
}
