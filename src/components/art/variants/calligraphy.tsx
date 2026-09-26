import type { ReactNode } from "react";
import { Blur, Gradient, Ground, H, W, c, r1, rng } from "./_kit";

/** Calligraphic and geometric works: the names, letters, arches and stars. */
export const names = () => {
  const rand = rng(99);
  const cols = 7;
  const rows = 9;
  const gx = W / cols;
  const gy = H / rows;
  const marks: ReactNode[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = gx * (col + 0.5);
      const y = gy * (row + 0.5);
      const distance = Math.hypot(x - 200, y - 250) / 260;
      const kind = Math.floor(rand() * 4);
      const opacity = r1(Math.max(0.3, 0.95 - distance * 0.6 + (rand() - 0.5) * 0.2));
      const stroke = rand() > 0.86 ? c.brand : c.deep;
      const key = `${row}-${col}`;
      const line = { fill: "none", stroke, strokeWidth: 3, strokeLinecap: "round" as const, opacity };
      if (kind === 0) {
        marks.push(<path key={key} d={`M${r1(x - 15)} ${r1(y + 7)}Q${r1(x)} ${r1(y - 15)} ${r1(x + 15)} ${r1(y + 7)}`} {...line} />);
      } else if (kind === 1) {
        marks.push(
          <g key={key}>
            <circle cx={r1(x)} cy={r1(y - 11)} r="2.6" fill={stroke} opacity={opacity} />
            <path d={`M${r1(x - 16)} ${r1(y + 5)}C${r1(x - 6)} ${r1(y + 15)} ${r1(x + 6)} ${r1(y - 2)} ${r1(x + 16)} ${r1(y + 8)}`} {...line} />
          </g>,
        );
      } else if (kind === 2) {
        marks.push(<path key={key} d={`M${r1(x + 6)} ${r1(y - 16)}V${r1(y + 8)}Q${r1(x + 6)} ${r1(y + 18)} ${r1(x - 11)} ${r1(y + 10)}`} {...line} />);
      } else {
        marks.push(
          <path
            key={key}
            d={`M${r1(x - 14)} ${r1(y)}C${r1(x - 14)} ${r1(y - 14)} ${r1(x + 2)} ${r1(y - 14)} ${r1(x + 2)} ${r1(y)}C${r1(x + 2)} ${r1(y + 12)} ${r1(x - 12)} ${r1(y + 12)} ${r1(x - 14)} ${r1(y)}L${r1(x + 15)} ${r1(y + 9)}`}
            {...line}
          />,
        );
      }
    }
  }
  return (
    <>
      <Ground fill={c.white} />
      <circle cx="200" cy="250" r="160" fill={c.light} opacity=".7" />
      <circle cx="200" cy="250" r="176" fill="none" stroke={c.soft} strokeWidth="1" />
      {marks}
    </>
  );
};

export const letters = (id: string) => (
  <>
    <defs>
      <radialGradient id={`${id}-g`} cx=".5" cy=".45" r=".7">
        <stop offset="0" stopColor={c.steel} stopOpacity=".55" />
        <stop offset="1" stopColor={c.deep} stopOpacity="0" />
      </radialGradient>
      <Blur id={`${id}-b`} deviation={9} />
    </defs>
    <Ground fill={c.deep} />
    <rect width={W} height={H} fill={`url(#${id}-g)`} />
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <g stroke={c.soft} opacity=".7" filter={`url(#${id}-b)`}>
        <path d="M84 372C92 214 196 118 300 168C352 194 328 286 258 274C208 264 208 202 252 190" strokeWidth="22" />
        <path d="M62 428C160 448 262 436 352 384" strokeWidth="10" />
      </g>
      <path d="M84 372C92 214 196 118 300 168C352 194 328 286 258 274C208 264 208 202 252 190" stroke={c.ice} strokeWidth="13" />
      <path d="M62 428C160 448 262 436 352 384" stroke={c.soft} strokeWidth="6" />
      <path d="M118 100l22 -12M152 90l22 -12" stroke={c.soft} strokeWidth="5" />
    </g>
    <circle cx="316" cy="98" r="9" fill={c.ice} />
    <circle cx="104" cy="452" r="4" fill={c.soft} />
  </>
);

/** Pointed arch centred on x=200 with its base at y=470. */

const arch = (halfWidth: number, top: number) =>
  `M${200 - halfWidth} 470V${top + halfWidth * 0.9}Q${200 - halfWidth} ${top + halfWidth * 0.25} 200 ${top}Q${200 + halfWidth} ${top + halfWidth * 0.25} ${200 + halfWidth} ${top + halfWidth * 0.9}V470Z`;

export const arches = (id: string) => (
  <>
    <defs>
      <Gradient id={`${id}-g`} stops={[[0, c.white], [1, c.ice]]} />
    </defs>
    <rect width={W} height={H} fill={`url(#${id}-g)`} />
    <path d={arch(160, 60)} fill={c.light} />
    <path d={arch(124, 104)} fill={c.soft} />
    <path d={arch(88, 150)} fill={c.mist} />
    <path d={arch(54, 204)} fill={c.steel} />
    <path d={arch(24, 262)} fill={c.deep} />
    <rect y="470" width={W} height="30" fill={c.deep} opacity=".9" />
    <circle cx="200" cy="44" r="7" fill={c.brand} />
  </>
);

export const star = (id: string) => (
  <>
    <defs>
      <pattern id={`${id}-p`} width="80" height="80" patternUnits="userSpaceOnUse">
        <g fill="none" stroke={c.mist} strokeWidth="1" opacity=".55">
          <rect x="20" y="20" width="40" height="40" />
          <rect x="20" y="20" width="40" height="40" transform="rotate(45 40 40)" />
        </g>
      </pattern>
    </defs>
    <Ground fill={c.ice} />
    <rect width={W} height={H} fill={`url(#${id}-p)`} />
    <g transform="translate(200 250)">
      <rect x="-104" y="-104" width="208" height="208" fill={c.deep} />
      <rect x="-104" y="-104" width="208" height="208" fill={c.brand} transform="rotate(45)" />
      <rect x="-72" y="-72" width="144" height="144" fill={c.steel} />
      <rect x="-72" y="-72" width="144" height="144" fill={c.soft} transform="rotate(45)" />
      <circle r="38" fill={c.ice} />
      <circle r="16" fill={c.deep} />
    </g>
  </>
);
