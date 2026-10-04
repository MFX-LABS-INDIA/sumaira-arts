import type { ReactNode } from "react";
import { Blur, Gradient, Ground, H, W, c, r1, rng } from "./_kit";
import { Ink, s, weighted, type Stroke } from "./pen";

/**
 * Hand-lettered Arabic: الله, نور and سلام, drawn with the flat-nib pen in ./pen.tsx.
 * The letterforms are our own drawings of the words, not a font, so there is no licence to carry
 * and no webfont to load.
 */

/** Paper: warm-cool ground, faint fibres, a soft vignette. `id` namespaces the pattern and gradient. */
function Paper({ id }: { id: string }) {
  const rand = rng(31);
  const fibres: ReactNode[] = [];
  for (let i = 0; i < 14; i++) {
    const x = r1(rand() * 90);
    const y = r1(rand() * 90);
    fibres.push(<path key={i} d={`M${x} ${y}l${r1((rand() - 0.5) * 16)} ${r1((rand() - 0.5) * 7)}`} />);
  }
  return (
    <>
      <defs>
        <pattern id={`${id}-fibre`} width="90" height="90" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={c.soft} strokeWidth=".7" strokeLinecap="round" opacity=".5">
            {fibres}
          </g>
        </pattern>
        <radialGradient id={`${id}-vignette`} cx=".5" cy=".46" r=".78">
          <stop offset=".55" stopColor={c.deep} stopOpacity="0" />
          <stop offset="1" stopColor={c.steel} stopOpacity=".2" />
        </radialGradient>
        <Gradient id={`${id}-sheet`} stops={[[0, c.white], [1, c.ice]]} />
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-sheet)`} />
      <rect width={W} height={H} fill={`url(#${id}-fibre)`} />
      <rect width={W} height={H} fill={`url(#${id}-vignette)`} />
    </>
  );
}

/** Round seal, the way a calligrapher signs: a ring, a smaller dot. */
const Seal = ({ x, y, color }: { x: number; y: number; color: string }) => (
  <g fill="none" stroke={color} strokeWidth="1.6">
    <circle cx={x} cy={y} r="13" />
    <circle cx={x} cy={y} r="4" fill={color} />
  </g>
);

const ALLAH: Stroke[] = [
  // alif
  s([300, 118], [[300, 190], [302, 262], [303, 334]]),
  // first lam: stem, then the long base that sweeps left into the ha
  s([254, 92], [[253, 180], [254, 262], [254, 326]], [[254, 366], [196, 380], [158, 352]]),
  // second lam, rising from that base
  s([206, 92], [[205, 190], [206, 280], [207, 352]]),
  // ha: a loop that closes back on the base
  weighted(0.72, s([166, 354], [[112, 362], [78, 300], [112, 270]], [[150, 244], [192, 282], [166, 318]], [[148, 340], [118, 328], [124, 304]])),
  // shadda: three teeth above the ha
  weighted(0.42, s([96, 218], [[104, 184], [132, 184], [136, 216]], [[140, 184], [168, 184], [172, 216]], [[176, 192], [188, 192], [194, 208]])),
];

export const allah = (id: string) => (
  <>
    <Paper id={id} />
    <circle cx="200" cy="262" r="168" fill="none" stroke={c.light} strokeWidth="1" />
    <Ink strokes={ALLAH} nib={30} color={c.deep} />
    <Ink strokes={[s([84, 408], [[156, 430], [262, 430], [330, 398]])]} nib={9} color={c.brand} opacity={0.85} />
    <Seal x={350} y={452} color={c.brand} />
  </>
);

const NOOR: Stroke[] = [
  // nun: an open bowl
  s([316, 236], [[318, 312], [250, 342], [206, 268]]),
  // waw: a closed head and a long tail
  weighted(0.62, s([184, 250], [[190, 208], [138, 200], [136, 238]], [[134, 274], [186, 280], [184, 250]])),
  s([181, 262], [[184, 330], [146, 378], [92, 392]]),
  // ra: a short drop that hooks under the baseline
  s([112, 252], [[110, 316], [92, 358], [52, 372]]),
  // the nun's dot
  weighted(0.7, s([252, 216], [[258, 208], [264, 200], [272, 192]])),
];

export const noor = (id: string) => (
  <>
    <defs>
      <radialGradient id={`${id}-glow`} cx=".5" cy=".48" r=".62">
        <stop offset="0" stopColor={c.steel} stopOpacity=".7" />
        <stop offset="1" stopColor={c.deep} stopOpacity="0" />
      </radialGradient>
      <Blur id={`${id}-blur`} deviation={7} />
    </defs>
    <Ground fill={c.deep} />
    <rect width={W} height={H} fill={`url(#${id}-glow)`} />
    <g filter={`url(#${id}-blur)`}>
      <Ink strokes={NOOR} nib={34} color={c.soft} opacity={0.75} />
    </g>
    <Ink strokes={NOOR} nib={30} color={c.ice} />
    <Ink strokes={[s([60, 424], [[140, 444], [250, 444], [344, 410]])]} nib={8} color={c.soft} opacity={0.8} />
    <Seal x={344} y={74} color={c.soft} />
  </>
);

const SALAAM: Stroke[] = [
  // sin: three teeth and the long connecting stroke
  weighted(0.6, s([356, 344], [[356, 310], [334, 310], [334, 344]], [[334, 310], [312, 310], [312, 344]], [[312, 310], [290, 310], [290, 344]])),
  s([290, 344], [[284, 368], [260, 376], [246, 352]]),
  // lam, with its base hooking left
  s([244, 168], [[243, 240], [244, 300], [245, 350]], [[246, 376], [208, 380], [196, 352]]),
  // alif
  s([192, 190], [[192, 250], [193, 310], [194, 360]]),
  // meem: a small closed head and a tail
  s([168, 330], [[170, 304], [128, 300], [128, 328]], [[128, 352], [166, 354], [168, 330]]),
  s([164, 346], [[160, 380], [120, 396], [88, 384]]),
];

/** A pointed arch centred on x=200, base at y=y1. */
const archPath = (half: number, top: number, base: number) =>
  `M${200 - half} ${base}V${top + half * 0.9}Q${200 - half} ${top + half * 0.25} 200 ${top}Q${200 + half} ${top + half * 0.25} ${200 + half} ${top + half * 0.9}V${base}`;

export const salaam = (id: string) => (
  <>
    <Paper id={id} />
    <path d={archPath(150, 70, 440)} fill={c.ice} stroke={c.deep} strokeWidth="2.4" />
    <path d={archPath(136, 84, 440)} fill="none" stroke={c.mist} strokeWidth="1" />
    <g transform="translate(200 262) scale(.92) translate(-222 -282)">
      <Ink strokes={SALAAM} nib={26} color={c.deep} />
    </g>
    <path d="M50 440H350" stroke={c.deep} strokeWidth="2.4" />
    <Ink strokes={[s([120, 418], [[170, 426], [230, 426], [282, 418]])]} nib={7} color={c.brand} opacity={0.85} />
    <Seal x={200} y={116} color={c.brand} />
  </>
);
