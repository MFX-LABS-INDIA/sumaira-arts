import type { SVGProps } from "react";
import type { ArtVariant } from "./variants";

/**
 * One placeholder artwork. It is only a reference to the shared drawing in the sprite
 * (see Sprite.tsx), so it is cheap to place anywhere, as many times as needed.
 */
export function ArtPiece({
  variant,
  ...rest
}: { variant: ArtVariant } & Omit<SVGProps<SVGSVGElement>, "viewBox" | "children">) {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden focusable={false} {...rest}>
      <use href={`#art-${variant}`} />
    </svg>
  );
}
