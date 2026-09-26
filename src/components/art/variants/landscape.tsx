import type { ReactNode } from "react";
import { Blur, Gradient, H, W, c, r1, rng } from "./_kit";

/** Horizons and terrain: mirage, seasons, dunes and ash. */
export const horizon = (id: string) => {
  const lines: ReactNode[] = [];
  for (let i = 0; i < 12; i++) {
    const y = 314 + i * 15;
    lines.push(
      <path key={i} d={`M-10 ${y}Q95 ${y - 7} 200 ${y}T410 ${y}`} fill="none" stroke={c.white} strokeWidth="1.4" opacity={r1(0.55 - i * 0.03)} />,
    );
  }
  return (
    <>
      <defs>
        <Gradient id={`${id}-s`} stops={[[0, c.soft], [0.65, c.light], [1, c.ice]]} />
        <Gradient id={`${id}-l`} stops={[[0, c.mist], [1, c.steel]]} />
        <Blur id={`${id}-b`} deviation={5} />
      </defs>
      <rect width={W} height="304" fill={`url(#${id}-s)`} />
      <circle cx="200" cy="262" r="66" fill={c.white} opacity=".85" filter={`url(#${id}-b)`} />
      <rect y="304" width={W} height="196" fill={`url(#${id}-l)`} />
      <ellipse cx="200" cy="338" rx="62" ry="12" fill={c.white} opacity=".4" filter={`url(#${id}-b)`} />
      {lines}
    </>
  );
};

export const seasons = (id: string) => {
  const fills = [c.light, c.soft, c.mist, c.steel];
  return (
    <>
      <defs>
        {fills.map((fill, i) => (
          <Gradient key={i} id={`${id}-${i}`} stops={[[0, c.white, 0.55], [1, fill]]} />
        ))}
      </defs>
      {fills.map((_, i) => (
        <g key={i}>
          <rect x={i * 100} width="100" height={H} fill={`url(#${id}-${i})`} />
          <circle cx={i * 100 + 50} cy={390 - i * 88} r="34" fill={i === 3 ? c.ice : c.white} opacity=".92" />
        </g>
      ))}
      <rect y="452" width={W} height="48" fill={c.deep} opacity=".85" />
    </>
  );
};

export const dunes = (id: string) => (
  <>
    <defs>
      <Gradient id={`${id}-g`} stops={[[0, c.ice], [1, c.light]]} />
    </defs>
    <rect width={W} height={H} fill={`url(#${id}-g)`} />
    <circle cx="256" cy="168" r="56" fill={c.white} opacity=".9" />
    <path d="M0 296C80 244 160 268 240 298S360 328 400 288V500H0Z" fill={c.soft} />
    <path d="M0 340C100 288 180 328 260 350S360 340 400 320V500H0Z" fill={c.mist} />
    <path d="M0 402C90 360 200 392 280 412S370 402 400 386V500H0Z" fill={c.steel} />
    <path d="M0 452C120 426 220 456 320 440S380 446 400 440V500H0Z" fill={c.brand} />
  </>
);

export const ash = (id: string) => {
  const rand = rng(5);
  const grain = Array.from({ length: 150 }, (_, i) => {
    const y = 120 + Math.pow(rand(), 0.6) * 380;
    return <circle key={i} cx={r1(rand() * W)} cy={r1(y)} r={r1(0.5 + rand() * 1.8)} fill={c.light} opacity={r1(0.15 + rand() * 0.45)} />;
  });
  return (
    <>
      <defs>
        <Gradient id={`${id}-g`} stops={[[0, c.deep], [0.6, c.deep], [1, c.brand]]} />
        <Blur id={`${id}-b`} deviation={12} />
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-g)`} />
      <g fill="none" strokeLinecap="round">
        <path d="M-30 392C110 296 230 428 430 330" stroke={c.soft} strokeWidth="44" opacity=".4" filter={`url(#${id}-b)`} />
        <path d="M-30 424C120 350 240 448 430 366" stroke={c.ice} strokeWidth="6" opacity=".55" />
        <path d="M-30 300C90 250 200 320 430 248" stroke={c.mist} strokeWidth="2" opacity=".5" />
      </g>
      {grain}
    </>
  );
};
