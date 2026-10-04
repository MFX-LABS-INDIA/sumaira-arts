import { r1 } from "./_kit";

/**
 * A flat-nib pen, simulated. A stroke is a hand-set centreline (cubic Béziers); the nib is swept
 * along it at a fixed angle, so strokes are thick where they cross the nib and hairline where they
 * run along it. That contrast is what makes lettering read as calligraphy, not as outlined shapes.
 *
 * Pure geometry, no filters: the paths are computed once, when the sprite renders.
 */
export type Pt = readonly [number, number];
type Curve = readonly [Pt, Pt, Pt];

export interface Stroke {
  from: Pt;
  curves: readonly Curve[];
  /** Nib width multiplier; a dot or a hairline is a stroke with a different weight. */
  weight?: number;
}

/** Shorthand: `s([x, y], [c1, c2, end], …)`. */
export const s = (from: Pt, ...curves: Curve[]): Stroke => ({ from, curves });
export const weighted = (weight: number, stroke: Stroke): Stroke => ({ ...stroke, weight });

const STEPS = 8;
const NIB_ANGLE = (28 * Math.PI) / 180;

const bezier = (a: Pt, b: Pt, c: Pt, d: Pt, t: number): Pt => {
  const u = 1 - t;
  const k0 = u * u * u;
  const k1 = 3 * u * u * t;
  const k2 = 3 * u * t * t;
  const k3 = t * t * t;
  return [k0 * a[0] + k1 * b[0] + k2 * c[0] + k3 * d[0], k0 * a[1] + k1 * b[1] + k2 * c[1] + k3 * d[1]];
};

/** Full pressure through the stroke, easing in over the first 7% and out over the last 14%. */
const pressure = (t: number) => Math.max(0.18, Math.min(1, t / 0.07, (1 - t) / 0.14));

function sample(stroke: Stroke): Pt[] {
  const points: Pt[] = [];
  let start = stroke.from;
  for (const [c1, c2, end] of stroke.curves) {
    for (let i = points.length ? 1 : 0; i <= STEPS; i++) points.push(bezier(start, c1, c2, end, i / STEPS));
    start = end;
  }
  return points;
}

/** Whole pixels: the sprite ships in the page HTML, so every digit counts (PERFORMANCE). */
const point = (p: Pt) => `${Math.round(p[0])} ${Math.round(p[1])}`;

/** The filled shape a nib of `nib` px sweeps along each stroke, and the hairline spine of each. */
export function nibPaths(strokes: readonly Stroke[], nib: number) {
  let shapes = "";
  let spines = "";
  for (const stroke of strokes) {
    const points = sample(stroke);
    const half = (nib * (stroke.weight ?? 1)) / 2;
    const left: Pt[] = [];
    const right: Pt[] = [];
    points.forEach((p, i) => {
      const k = pressure(i / (points.length - 1)) * half;
      const dx = Math.cos(NIB_ANGLE) * k;
      const dy = -Math.sin(NIB_ANGLE) * k;
      left.push([p[0] + dx, p[1] + dy]);
      right.push([p[0] - dx, p[1] - dy]);
    });
    shapes += `M${left.map(point).join("L")}L${right.reverse().map(point).join("L")}Z`;
    spines += `M${point(stroke.from)}${stroke.curves.map(([a, b, d]) => `C${point(a)} ${point(b)} ${point(d)}`).join("")}`;
  }
  return { shapes, spines };
}

interface InkProps {
  strokes: readonly Stroke[];
  nib: number;
  color: string;
  opacity?: number;
}

/** Wet ink: the swept nib, a hairline spine so no stroke ever vanishes, and a round join for soft edges. */
export function Ink({ strokes, nib, color, opacity = 1 }: InkProps) {
  const { shapes, spines } = nibPaths(strokes, nib);
  return (
    <g opacity={opacity}>
      <path d={shapes} fill={color} stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
      <path d={spines} fill="none" stroke={color} strokeWidth={r1(Math.max(1.6, nib * 0.1))} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}
