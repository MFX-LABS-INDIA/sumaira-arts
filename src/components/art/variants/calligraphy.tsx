import { Ground, W, H, c } from "./_kit";

/** Geometric work: the eight-pointed star. The hand-lettered Arabic works live in ./script.tsx. */
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
