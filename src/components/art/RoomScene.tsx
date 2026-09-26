import { layouts, type Frame, type Scene } from "./scenes";
import { palette as c } from "./variants";

function FrameEl({ frame }: { frame: Frame }) {
  const { x, y, w, h, art, dark, className } = frame;
  const border = dark ? 7 : 3;
  const mat = Math.round(Math.min(w, h) * 0.085);
  const inset = border + mat;
  return (
    <g className={className}>
      <rect x={x + 5} y={y + 12} width={w} height={h} fill={c.deep} opacity=".22" filter="url(#room-blur)" />
      <rect x={x} y={y} width={w} height={h} fill={dark ? c.deep : c.white} stroke={c.light} strokeWidth={dark ? 0 : 1} />
      <rect x={x + border} y={y + border} width={w - border * 2} height={h - border * 2} fill={c.white} />
      <use href={`#art-${art}`} x={x + inset} y={y + inset} width={w - inset * 2} height={h - inset * 2} />
    </g>
  );
}

/**
 * A flat, softly lit interior with artwork on the wall. The room itself is a shared symbol in the
 * sprite, so an instance is only a few elements: the room, its frames, and the front furniture.
 * Fills whatever box it is placed in.
 */
export function RoomScene({
  scene,
  className,
  align = "xMidYMid",
}: {
  scene: Scene;
  className?: string;
  /** Which part survives cropping, as an SVG preserveAspectRatio alignment (e.g. "xMaxYMid" keeps the right edge). */
  align?: string;
}) {
  const { w, h } = layouts[scene.key];
  const size = { width: w, height: h };
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio={`${align} slice`} className={className} aria-hidden focusable={false}>
      <use href={`#scene-${scene.key}-shell`} {...size} />
      <use href={`#scene-${scene.key}-back`} {...size} />
      {scene.frames.map((frame, i) => (
        <FrameEl key={i} frame={frame} />
      ))}
      <use href={`#scene-${scene.key}-front`} {...size} />
    </svg>
  );
}
