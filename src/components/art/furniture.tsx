import { palette as c } from "./variants";

export type ItemType = "sofa" | "sideboard" | "bed" | "nightstand" | "desk" | "chair" | "lamp" | "plant" | "rug";

export type Item = {
  type: ItemType;
  /** Horizontal centre. */
  x: number;
  /** Width where it applies (sofa, sideboard, bed, desk, rug), height for lamps and plants. */
  size?: number;
};

type Props = { x: number; fy: number; size?: number; shadow: string };

const Shadow = ({ x, fy, rx, shadow }: { x: number; fy: number; rx: number; shadow: string }) => (
  <ellipse cx={x} cy={fy + 3} rx={rx} ry={Math.max(6, rx * 0.06)} fill={`url(#${shadow})`} />
);

function Sofa({ x, fy, size = 460, shadow }: Props) {
  const l = x - size / 2;
  const cushion = (size - 80) / 2 - 3;
  return (
    <g>
      <Shadow x={x} fy={fy} rx={size / 2 + 16} shadow={shadow} />
      <rect x={l + 20} y={fy - 124} width={size - 40} height="82" rx="18" fill={c.mist} />
      <rect x={l} y={fy - 74} width={size} height="54" rx="16" fill={c.steel} />
      <rect x={l} y={fy - 94} width="36" height="74" rx="16" fill={c.steel} />
      <rect x={l + size - 36} y={fy - 94} width="36" height="74" rx="16" fill={c.steel} />
      <rect x={l + 40} y={fy - 92} width={cushion} height="46" rx="10" fill={c.mist} stroke={c.soft} strokeWidth="1" />
      <rect x={l + 43 + cushion} y={fy - 92} width={cushion} height="46" rx="10" fill={c.mist} stroke={c.soft} strokeWidth="1" />
      <rect x={l + 58} y={fy - 122} width="54" height="52" rx="10" fill={c.light} transform={`rotate(-8 ${l + 85} ${fy - 96})`} />
      <rect x={l + 26} y={fy - 20} width="8" height="20" fill={c.deep} />
      <rect x={l + size - 34} y={fy - 20} width="8" height="20" fill={c.deep} />
    </g>
  );
}

function Sideboard({ x, fy, size = 420, shadow }: Props) {
  const l = x - size / 2;
  return (
    <g>
      <Shadow x={x} fy={fy} rx={size / 2 + 10} shadow={shadow} />
      <rect x={l} y={fy - 102} width={size} height="10" rx="2" fill={c.deep} />
      <rect x={l + 8} y={fy - 92} width={size - 16} height="64" fill={c.white} stroke={c.light} strokeWidth="1.5" />
      <path d={`M${x} ${fy - 92}V${fy - 28}`} stroke={c.light} strokeWidth="1.5" />
      <circle cx={x - 10} cy={fy - 62} r="2.5" fill={c.mist} />
      <circle cx={x + 10} cy={fy - 62} r="2.5" fill={c.mist} />
      <rect x={l + 22} y={fy - 28} width="7" height="28" fill={c.deep} />
      <rect x={l + size - 29} y={fy - 28} width="7" height="28" fill={c.deep} />
      <ellipse cx={l + 70} cy={fy - 128} rx="17" ry="26" fill={c.soft} />
      <rect x={l + 66} y={fy - 162} width="8" height="14" fill={c.soft} />
      <path
        d={`M${l + 70} ${fy - 162}C${l + 62} ${fy - 196} ${l + 92} ${fy - 208} ${l + 100} ${fy - 240}M${l + 70} ${fy - 162}C${l + 78} ${fy - 190} ${l + 52} ${fy - 214} ${l + 44} ${fy - 236}`}
        fill="none"
        stroke={c.deep}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x={l + size - 120} y={fy - 118} width="70" height="16" fill={c.steel} />
      <rect x={l + size - 112} y={fy - 132} width="58" height="14" fill={c.mist} />
      <rect x={l + size - 116} y={fy - 144} width="52" height="12" fill={c.light} />
    </g>
  );
}

function Bed({ x, fy, size = 470, shadow }: Props) {
  const l = x - size / 2;
  return (
    <g>
      <Shadow x={x} fy={fy} rx={size / 2 + 14} shadow={shadow} />
      <rect x={l + 6} y={fy - 214} width={size - 12} height="170" rx="8" fill={c.steel} />
      <rect x={l} y={fy - 44} width={size} height="30" rx="4" fill={c.deep} />
      <rect x={l + 10} y={fy - 96} width={size - 20} height="66" rx="12" fill={c.white} />
      <rect x={l + 10} y={fy - 70} width={size - 20} height="46" rx="8" fill={c.soft} />
      <rect x={l + 40} y={fy - 132} width={size / 2 - 52} height="46" rx="16" fill={c.white} stroke={c.light} strokeWidth="1.5" />
      <rect x={x + 12} y={fy - 132} width={size / 2 - 52} height="46" rx="16" fill={c.white} stroke={c.light} strokeWidth="1.5" />
      <rect x={l + 10} y={fy - 14} width="10" height="14" fill={c.deep} />
      <rect x={l + size - 20} y={fy - 14} width="10" height="14" fill={c.deep} />
    </g>
  );
}

function Nightstand({ x, fy, shadow }: Props) {
  return (
    <g>
      <Shadow x={x} fy={fy} rx={52} shadow={shadow} />
      <rect x={x - 34} y={fy - 84} width="68" height="72" fill={c.white} stroke={c.light} strokeWidth="1.5" />
      <rect x={x - 30} y={fy - 12} width="6" height="12" fill={c.deep} />
      <rect x={x + 24} y={fy - 12} width="6" height="12" fill={c.deep} />
      <path d={`M${x - 8} ${fy - 60}h16`} stroke={c.mist} strokeWidth="2" strokeLinecap="round" />
      <rect x={x - 12} y={fy - 96} width="24" height="12" fill={c.deep} />
      <path d={`M${x - 24} ${fy - 100}L${x - 14} ${fy - 142}H${x + 14}L${x + 24} ${fy - 100}Z`} fill={c.light} />
    </g>
  );
}

function Desk({ x, fy, size = 400, shadow }: Props) {
  const l = x - size / 2;
  return (
    <g>
      <Shadow x={x} fy={fy} rx={size / 2 + 10} shadow={shadow} />
      <rect x={l} y={fy - 122} width={size} height="10" rx="2" fill={c.deep} />
      <rect x={l + 18} y={fy - 112} width="8" height="112" fill={c.deep} />
      <rect x={l + size - 96} y={fy - 112} width="78" height="104" fill={c.steel} />
      <path d={`M${l + size - 96} ${fy - 60}h78`} stroke={c.mist} strokeWidth="1.5" />
      <rect x={x - 118} y={fy - 190} width="108" height="68" rx="3" fill={c.deep} />
      <rect x={x - 112} y={fy - 184} width="96" height="56" fill={c.mist} />
      <rect x={x - 132} y={fy - 126} width="136" height="6" rx="3" fill={c.mist} />
      <path d={`M${x + 70} ${fy - 122}V${fy - 172}L${x + 110} ${fy - 200}`} fill="none" stroke={c.deep} strokeWidth="3" strokeLinecap="round" />
      <path d={`M${x + 98} ${fy - 206}L${x + 132} ${fy - 190}L${x + 116} ${fy - 178}Z`} fill={c.deep} />
    </g>
  );
}

function Chair({ x, fy, shadow }: Props) {
  return (
    <g>
      <Shadow x={x} fy={fy} rx={64} shadow={shadow} />
      <rect x={x - 42} y={fy - 150} width="84" height="88" rx="14" fill={c.mist} />
      <rect x={x - 52} y={fy - 70} width="104" height="22" rx="8" fill={c.steel} />
      <rect x={x - 4} y={fy - 48} width="8" height="42" fill={c.deep} />
      <path d={`M${x - 46} ${fy}H${x + 46}`} stroke={c.deep} strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}

function Lamp({ x, fy, size = 320, shadow }: Props) {
  return (
    <g>
      <Shadow x={x} fy={fy} rx={34} shadow={shadow} />
      <rect x={x - 1.5} y={fy - size} width="3" height={size} fill={c.deep} />
      <ellipse cx={x} cy={fy - 2} rx="24" ry="5" fill={c.deep} />
      <path d={`M${x - 34} ${fy - size + 56}L${x - 20} ${fy - size}H${x + 20}L${x + 34} ${fy - size + 56}Z`} fill={c.white} stroke={c.light} strokeWidth="1.5" />
    </g>
  );
}

function Plant({ x, fy, size = 230, shadow }: Props) {
  const leaves = [
    { dx: 0, a: 0, len: 1, fill: c.steel },
    { dx: -10, a: -28, len: 0.86, fill: c.mist },
    { dx: 10, a: 26, len: 0.9, fill: c.mist },
    { dx: -18, a: -54, len: 0.6, fill: c.steel },
    { dx: 18, a: 52, len: 0.64, fill: c.steel },
    { dx: -4, a: -12, len: 0.7, fill: c.deep },
  ];
  return (
    <g>
      <Shadow x={x} fy={fy} rx={52} shadow={shadow} />
      {leaves.map((leaf, i) => (
        <ellipse
          key={i}
          cx={x + leaf.dx}
          cy={fy - 60 - (size * leaf.len) / 2}
          rx="16"
          ry={(size * leaf.len) / 2}
          fill={leaf.fill}
          opacity=".92"
          transform={`rotate(${leaf.a} ${x} ${fy - 60})`}
        />
      ))}
      <path d={`M${x - 30} ${fy - 62}H${x + 30}L${x + 22} ${fy}H${x - 22}Z`} fill={c.white} stroke={c.light} strokeWidth="1.5" />
    </g>
  );
}

function Rug({ x, fy, size = 560 }: Props) {
  return (
    <g>
      <ellipse cx={x} cy={fy + 20} rx={size / 2} ry="22" fill={c.light} />
      <ellipse cx={x} cy={fy + 20} rx={size / 2 - 22} ry="15" fill="none" stroke={c.soft} strokeWidth="1.5" />
    </g>
  );
}

const renderers: Record<ItemType, (p: Props) => React.ReactNode> = {
  sofa: Sofa,
  sideboard: Sideboard,
  bed: Bed,
  nightstand: Nightstand,
  desk: Desk,
  chair: Chair,
  lamp: Lamp,
  plant: Plant,
  rug: Rug,
};

export function renderItem(item: Item, fy: number, shadow: string, key: string) {
  const Component = renderers[item.type];
  return <Component key={key} x={item.x} fy={fy} size={item.size} shadow={shadow} />;
}
