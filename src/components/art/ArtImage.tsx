import Image from "next/image";
import { ArtPiece } from "./ArtPiece";
import { RoomScene } from "./RoomScene";
import { buildScene, type SceneKind } from "./scenes";
import type { ArtVariant } from "./variants";

/**
 * The single place an "image" is rendered. With `src` it is a real photograph;
 * without one it falls back to the placeholder artwork (`art`), optionally hung in a room (`scene`).
 * The parent decides the size, e.g. className="aspect-portrait".
 */
export function ArtImage({
  art,
  scene,
  src,
  alt,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority = false,
  zoom = false,
  flush = false,
  className = "",
}: {
  art: ArtVariant;
  scene?: SceneKind;
  src?: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  /** Slow 1 to 1.03 zoom when an ancestor with the `group` class is hovered. */
  zoom?: boolean;
  /** No rounded corners: for an image that sits flush inside a card, which clips it instead. */
  flush?: boolean;
  className?: string;
}) {
  const inner = `absolute inset-0 ${
    zoom ? "transition-transform duration-[900ms] ease-out group-hover:scale-[1.03] motion-reduce:transform-none" : ""
  }`;

  return (
    <div
      className={`relative overflow-hidden bg-ice ${flush ? "" : "rounded-card"} ${className}`}
      {...(src ? {} : { role: "img", "aria-label": alt })}
    >
      <div className={inner}>
        {src ? (
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        ) : scene ? (
          <RoomScene scene={buildScene(scene, art)} className="h-full w-full" />
        ) : (
          <ArtPiece variant={art} className="h-full w-full" />
        )}
      </div>
    </div>
  );
}
