import { renderItem } from "./furniture";
import { layouts, type SceneKey } from "./scenes";
import { palette as c, variants, type ArtVariant } from "./variants";

const artNames = Object.keys(variants) as ArtVariant[];
const sceneKeys = Object.keys(layouts) as SceneKey[];

/**
 * Every artwork and every room, drawn ONCE per page. Anywhere else, an artwork or a room is a
 * <use> that points here. That turns ~150 full inline SVGs into a handful of references,
 * which is most of the page's HTML weight and DOM size.
 *
 * Mounted once in the root layout. It is 0x0 and off-screen rather than display:none, because
 * browsers skip gradients and filters that live inside a display:none SVG.
 */
export function ArtSprite() {
  return (
    <svg aria-hidden focusable={false} width="0" height="0" style={{ position: "absolute", overflow: "hidden" }}>
      <defs>
        <linearGradient id="room-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.white} />
          <stop offset="1" stopColor={c.ice} />
        </linearGradient>
        <linearGradient id="room-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.light} />
          <stop offset="1" stopColor={c.soft} />
        </linearGradient>
        <linearGradient id="room-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={c.white} stopOpacity=".85" />
          <stop offset="1" stopColor={c.white} stopOpacity="0" />
        </linearGradient>
        <radialGradient id="room-shadow">
          <stop offset="0" stopColor={c.deep} stopOpacity=".32" />
          <stop offset="1" stopColor={c.deep} stopOpacity="0" />
        </radialGradient>
        <filter id="room-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {artNames.map((name) => (
        <symbol key={name} id={`art-${name}`} viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
          {variants[name](`art-${name}`)}
        </symbol>
      ))}

      {sceneKeys.map((key) => {
        const { w, h, floorY, items } = layouts[key];
        const view = `0 0 ${w} ${h}`;
        return (
          <g key={key}>
            <symbol id={`scene-${key}-shell`} viewBox={view}>
              <rect width={w} height={floorY} fill="url(#room-wall)" />
              <polygon points={`${w * 0.04},0 ${w * 0.42},0 ${w * 0.72},${floorY} ${w * 0.2},${floorY}`} fill="url(#room-beam)" opacity=".55" />
              <polygon points={`${w * 0.5},0 ${w * 0.58},0 ${w * 0.84},${floorY} ${w * 0.74},${floorY}`} fill="url(#room-beam)" opacity=".3" />
              <rect y={floorY} width={w} height={h - floorY} fill="url(#room-floor)" />
              <rect y={floorY - 7} width={w} height="7" fill={c.white} opacity=".9" />
            </symbol>
            {/* Behind the frames: rugs. In front of the frames: everything else. */}
            <symbol id={`scene-${key}-back`} viewBox={view}>
              {items.filter((item) => item.type === "rug").map((item, i) => renderItem(item, floorY, "room-shadow", `b${i}`))}
            </symbol>
            <symbol id={`scene-${key}-front`} viewBox={view}>
              {items.filter((item) => item.type !== "rug").map((item, i) => renderItem(item, floorY, "room-shadow", `f${i}`))}
            </symbol>
          </g>
        );
      })}
    </svg>
  );
}
