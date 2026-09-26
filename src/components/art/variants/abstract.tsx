import type { ReactNode } from "react";
import { Blur, Gradient, Ground, H, Rough, W, c, r1, rng } from "./_kit";

/** Abstract studies: enso, shadow, bloom, ink, orbs, mosaic and rings. */
export const enso = (id: string) => (
  <>
    <defs>
      <Rough id={`${id}-r`} scale={8} freq={0.035} seed={3} />
    </defs>
    <Ground fill={c.ice} />
    <g filter={`url(#${id}-r)`} fill="none" strokeLinecap="round" transform="rotate(-62 200 240)">
      <circle cx="200" cy="240" r="108" stroke={c.deep} strokeWidth="26" strokeDasharray="610 70" />
      <circle cx="200" cy="240" r="108" stroke={c.steel} strokeWidth="9" strokeDasharray="420 260" strokeDashoffset="-90" opacity=".55" />
      <circle cx="200" cy="240" r="122" stroke={c.deep} strokeWidth="3" strokeDasharray="190 580" opacity=".4" />
    </g>
    <circle cx="302" cy="376" r="9" fill={c.brand} />
    <rect x="152" y="424" width="96" height="1.5" fill={c.mist} />
  </>
);

export const shadow = (id: string) => (
  <>
    <defs>
      <Gradient id={`${id}-g`} stops={[[0, c.white], [1, c.light]]} />
    </defs>
    <rect width={W} height={H} fill={`url(#${id}-g)`} />
    <g transform="skewX(-22)">
      <rect x="150" y="-40" width="70" height="620" fill={c.deep} opacity=".08" />
      <rect x="240" y="-40" width="34" height="620" fill={c.deep} opacity=".22" />
      <rect x="292" y="-40" width="110" height="620" fill={c.deep} opacity=".1" />
      <rect x="420" y="-40" width="28" height="620" fill={c.deep} opacity=".3" />
      <rect x="110" y="-40" width="20" height="620" fill={c.white} opacity=".8" />
      <rect x="470" y="-40" width="70" height="620" fill={c.steel} opacity=".22" />
    </g>
    <circle cx="150" cy="150" r="48" fill={c.deep} opacity=".85" />
    <rect x="0" y="430" width={W} height="70" fill={c.deep} opacity=".08" />
  </>
);

export const bloom = (id: string) => {
  const flower = (cx: number, cy: number, radius: number, color: string, opacity: number) => (
    <g key={`${cx}-${cy}`}>
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={r1(cy - radius * 0.5)}
          rx={r1(radius * 0.27)}
          ry={r1(radius * 0.52)}
          fill={color}
          opacity={opacity}
          transform={`rotate(${i * 45} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={r1(radius * 0.14)} fill={c.deep} />
    </g>
  );
  return (
    <>
      <defs>
        <Gradient id={`${id}-g`} stops={[[0, c.white], [1, c.ice]]} />
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-g)`} />
      <g fill="none" stroke={c.deep} strokeWidth="2" strokeLinecap="round" opacity=".8">
        <path d="M140 520C150 400 112 330 150 235" />
        <path d="M262 520C252 420 292 350 266 268" />
        <path d="M338 520C330 440 356 400 346 352" />
        <path d="M78 520C84 450 60 420 84 372" />
      </g>
      {flower(150, 205, 92, c.steel, 0.5)}
      {flower(266, 240, 68, c.soft, 0.75)}
      {flower(346, 336, 44, c.brand, 0.55)}
      {flower(84, 356, 40, c.mist, 0.6)}
    </>
  );
};

export const ink = (id: string) => {
  const rand = rng(21);
  const splatter = Array.from({ length: 34 }, (_, i) => {
    const angle = rand() * Math.PI * 2;
    const distance = 130 + rand() * 120;
    return (
      <circle
        key={i}
        cx={r1(200 + Math.cos(angle) * distance)}
        cy={r1(250 + Math.sin(angle) * distance * 0.9)}
        r={r1(0.8 + rand() * 3.4)}
        fill={c.deep}
        opacity={r1(0.25 + rand() * 0.5)}
      />
    );
  });
  return (
    <>
      <defs>
        <filter id={`${id}-w`} x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="4" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="70" result="d" />
          <feGaussianBlur in="d" stdDeviation="2.5" />
        </filter>
      </defs>
      <Ground fill={c.white} />
      <g filter={`url(#${id}-w)`}>
        <ellipse cx="190" cy="235" rx="118" ry="88" fill={c.deep} opacity=".92" transform="rotate(-25 190 235)" />
        <ellipse cx="254" cy="306" rx="90" ry="58" fill={c.brand} opacity=".8" />
        <ellipse cx="156" cy="168" rx="66" ry="46" fill={c.steel} opacity=".6" />
        <circle cx="296" cy="184" r="36" fill={c.soft} opacity=".85" />
      </g>
      {splatter}
    </>
  );
};

export const orbs = (id: string) => (
  <>
    <defs>
      <Gradient id={`${id}-g`} stops={[[0, c.ice], [1, c.light]]} />
      <Blur id={`${id}-b`} deviation={24} />
    </defs>
    <rect width={W} height={H} fill={`url(#${id}-g)`} />
    <g filter={`url(#${id}-b)`}>
      <circle cx="130" cy="170" r="112" fill={c.soft} opacity=".9" />
      <circle cx="284" cy="256" r="92" fill={c.mist} opacity=".6" />
      <circle cx="170" cy="392" r="100" fill={c.steel} opacity=".55" />
      <circle cx="304" cy="118" r="60" fill={c.white} opacity=".95" />
      <circle cx="252" cy="420" r="66" fill={c.light} opacity=".9" />
    </g>
  </>
);

export const mosaic = () => {
  const rand = rng(64);
  const tones = [c.ice, c.light, c.soft, c.mist, c.steel, c.brand, c.deep];
  const cells: ReactNode[] = [];
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 8; col++) {
      const t = (col / 8 + row / 10) / 2 + (rand() - 0.5) * 0.55;
      const tone = tones[Math.min(6, Math.max(0, Math.floor(t * 7)))];
      cells.push(<rect key={`${row}-${col}`} x={col * 50 + 1} y={row * 50 + 1} width="48" height="48" fill={tone} />);
      if (rand() > 0.82) cells.push(<circle key={`c${row}-${col}`} cx={col * 50 + 25} cy={row * 50 + 25} r="11" fill={c.white} opacity=".85" />);
    }
  }
  return (
    <>
      <Ground fill={c.white} />
      {cells}
    </>
  );
};

export const rings = (id: string) => {
  const rand = rng(11);
  const stars = Array.from({ length: 26 }, (_, i) => (
    <circle key={i} cx={r1(rand() * W)} cy={r1(rand() * H)} r={r1(0.6 + rand() * 1.4)} fill={c.ice} opacity={r1(0.3 + rand() * 0.5)} />
  ));
  return (
    <>
      <defs>
        <radialGradient id={`${id}-g`} cx=".5" cy=".5" r=".75">
          <stop offset="0" stopColor={c.steel} />
          <stop offset="1" stopColor={c.deep} />
        </radialGradient>
        <radialGradient id={`${id}-p`} cx=".35" cy=".3" r=".85">
          <stop offset="0" stopColor={c.white} />
          <stop offset=".45" stopColor={c.soft} />
          <stop offset="1" stopColor={c.steel} />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-g)`} />
      {stars}
      <g fill="none" stroke={c.soft}>
        {[50, 82, 114, 146, 178, 210].map((radius, i) => (
          <circle key={radius} cx="200" cy="250" r={radius} strokeWidth="1" opacity={r1(0.42 - i * 0.05)} />
        ))}
      </g>
      <circle cx="262" cy="292" r="74" fill={`url(#${id}-p)`} />
      <ellipse cx="262" cy="292" rx="122" ry="26" fill="none" stroke={c.ice} strokeWidth="2" opacity=".7" transform="rotate(-18 262 292)" />
    </>
  );
};
