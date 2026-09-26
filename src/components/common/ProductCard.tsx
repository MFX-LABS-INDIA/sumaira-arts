import Image from "next/image";
import { ArtPiece } from "@/components/art/ArtPiece";
import { RoomScene } from "@/components/art/RoomScene";
import { buildScene } from "@/components/art/scenes";
import { SmartLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { WishlistButton } from "./WishlistButton";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/content";

// TODO: point at `/artwork/${product.slug}` once product pages exist.
const productHref = "#";

const sizes = "(min-width: 1024px) 25vw, 50vw";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <Reveal delay={(index % 4) * 90}>
      <article className="group relative h-full overflow-hidden rounded-card border border-light bg-white transition-colors duration-500 hover:border-soft">
        <div className="relative aspect-portrait overflow-hidden bg-ice">
          {/* Default view: the artwork, matted, on a quiet ground. */}
          <div className="absolute inset-0 transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-0 motion-reduce:transform-none">
            {product.image ? (
              <Image src={product.image} alt={product.title} fill sizes={sizes} className="object-cover" />
            ) : (
              <div role="img" aria-label={product.title} className="absolute inset-[12%] bg-white p-[3.5%] shadow-artwork">
                <ArtPiece variant={product.art} className="h-full w-full" />
              </div>
            )}
          </div>
          {/* Second view on hover: the same piece on a wall. */}
          <div className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100" aria-hidden>
            {product.sceneImage ? (
              <Image src={product.sceneImage} alt="" fill sizes={sizes} className="object-cover" />
            ) : (
              <RoomScene scene={buildScene(product.scene, product.art)} className="h-full w-full" />
            )}
          </div>
          <WishlistButton title={product.title} className="absolute end-3 top-3 z-10" />
        </div>

        <div className="p-4 md:p-5">
          <p className="text-micro font-medium uppercase tracking-caps text-steel">{product.category}</p>
          <h3 className="mt-2 font-serif text-lg leading-snug text-deep md:text-[1.4rem]">
            <SmartLink href={productHref} className="after:absolute after:inset-0">
              {product.title}
            </SmartLink>
          </h3>
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-deep">{formatPrice(product.price)}</p>
            <span className="hidden text-micro font-medium uppercase tracking-caps text-brand transition-[opacity,transform] duration-500 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 md:block md:translate-y-1 md:opacity-0">
              View artwork →
            </span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
