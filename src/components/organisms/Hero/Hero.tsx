import Image from "next/image";
import { Container } from "@/components/atoms/Container";
import {
  AllArtworksGridIcon,
  CalligraphyOriginalsIcon,
  CollectionsGalleryIcon,
  MixedMediaTextureIcon,
} from "@/components/atoms/Icons";
import { SmartLink } from "@/components/atoms/Link";
import { homeHero } from "@/data/home";
import { allProducts } from "@/data/products";

const categoryIcons = {
  sparkles: CalligraphyOriginalsIcon,
  layers: MixedMediaTextureIcon,
  frame: CollectionsGalleryIcon,
  grid: AllArtworksGridIcon,
} as const;

/**
 * Pick 18 distinct artworks (6 per row across 3 rows) so the marquee fills even ultrawide
 * viewports seamlessly while keeping initial image payload lean and flicker-free.
 */
function getArtworkMarqueeRows() {
  const seen = new Set<string>();
  const images: { src: string; title: string }[] = [];

  for (const product of allProducts) {
    if (product.image && !seen.has(product.image)) {
      seen.add(product.image);
      images.push({ src: product.image, title: product.title });
      if (images.length >= 18) break;
    }
  }

  const perRow = 6;
  const duration = `${perRow * 4.5}s`;
  return [
    { key: "row-1", items: images.slice(0, perRow), direction: "left" as const, duration },
    { key: "row-2", items: images.slice(perRow, perRow * 2), direction: "right" as const, duration },
    { key: "row-3", items: images.slice(perRow * 2, perRow * 3), direction: "left" as const, duration },
  ];
}

/** Full-bleed moving artwork marquee hero with a frosted-glass category dock. */
export function Hero() {
  const rows = getArtworkMarqueeRows();

  return (
    <section
      aria-labelledby="home-title"
      className="relative flex min-h-[460px] items-center overflow-hidden bg-deep sm:min-h-[540px] lg:min-h-[600px]"
    >
      {/* Full-bleed 3-row moving artwork marquee wall */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-col gap-1.5 bg-deep py-1.5"
      >
        {rows.map((row) => {
          const trackClass =
            row.direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

          return (
            <div key={row.key} className="relative flex-1 overflow-hidden">
              <div
                className={`flex h-full w-max ${trackClass}`}
                style={{ animationDuration: row.duration }}
              >
                {[0, 1].map((dup) => (
                  <div
                    key={dup}
                    className={`flex h-full shrink-0 gap-1.5 pr-1.5 ${
                      dup === 1 ? "motion-reduce:hidden" : ""
                    }`}
                  >
                    {row.items.map((item) => (
                      <div
                        key={`${row.key}-${dup}-${item.src}`}
                        className="relative h-full w-40 shrink-0 overflow-hidden rounded-sm bg-deep sm:w-52 lg:w-64"
                      >
                        <Image
                          src={item.src}
                          alt=""
                          fill
                          loading="eager"
                          decoding="async"
                          quality={65}
                          sizes="(min-width: 1024px) 256px, (min-width: 640px) 208px, 160px"
                          className="object-cover object-center"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Editorial navy scrim + soft center radial vignette so text pops while outer tiles stay vivid */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep/55 via-deep/60 to-deep/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(13,24,42,0.72)_0%,rgba(13,24,42,0.38)_52%,transparent_100%)]" />
      </div>

      {/* Centered copy + frosted-glass quick-category dock */}
      <Container className="relative z-10 py-14 text-center sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <h1
            id="home-title"
            className="text-3xl font-semibold leading-[1.12] tracking-tight text-white text-balance drop-shadow-[0_2px_14px_rgba(13,24,42,0.65)] sm:text-5xl lg:text-[3.5rem]"
          >
            {homeHero.title}
          </h1>
          <p className="mx-auto mt-3.5 max-w-2xl text-sm font-medium leading-relaxed text-white drop-shadow-[0_2px_10px_rgba(13,24,42,0.85)] sm:mt-4 sm:text-base lg:text-lg">
            {homeHero.description}
          </p>
        </div>

        <nav
          aria-label="Browse artwork categories"
          className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-white/30 bg-white/15 shadow-artwork backdrop-blur-md sm:mt-10"
        >
          <ul className="grid grid-cols-2 divide-x divide-y divide-white/25 sm:grid-cols-4 sm:divide-y-0">
            {homeHero.quickCategories.map((item) => {
              const Icon = categoryIcons[item.icon];
              return (
                <li key={item.id} className="min-w-0">
                  <SmartLink
                    href={item.href}
                    className="group flex h-full min-h-[84px] flex-col items-center justify-center gap-2 px-3 py-4 text-center text-white transition-colors duration-200 hover:bg-white/20 focus-visible:bg-white/20 focus-visible:outline-none sm:min-h-[96px] sm:px-4 sm:py-5"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 text-white/90 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-white sm:h-6 sm:w-6"
                    />
                    <span className="text-xs font-medium leading-snug tracking-wide text-white/95 group-hover:text-white sm:text-[13px]">
                      {item.label}
                    </span>
                  </SmartLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
