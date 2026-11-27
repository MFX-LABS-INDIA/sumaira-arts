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

const categoryIcons = {
  sparkles: CalligraphyOriginalsIcon,
  layers: MixedMediaTextureIcon,
  frame: CollectionsGalleryIcon,
  grid: AllArtworksGridIcon,
} as const;

interface MarqueeTile {
  src: string;
  blurDataURL: string;
}

/**
 * 18 pre-compressed (11–19 KB) static WebP artworks with tiny inline 16×16 LQIP blur
 * placeholders baked at build time so every marquee tile paints its exact artwork tones
 * on frame 0 with zero dark-to-light pop-in flicker and zero /_next/image cold re-encoding.
 */
const HERO_MARQUEE_TILES: readonly MarqueeTile[] = [
  {
    src: "/assets/images/original-texture-artworks/promise-after-hardship/1.webp",
    blurDataURL:
      "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAQAgCdASoQABAAA8BgJZQC7AEQyiXNfSsAAP7Tq6Gi+GzL/5YBj3hiiBENMxitNQ22Jd5fExPPb718NF9vq1t/NODLNDIuNdh1AAAA",
  },
  {
    src: "/assets/images/original-texture-artworks/infinite-gratitude/1.webp",
    blurDataURL:
      "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAAAQAgCdASoQABAAA8BgJQBdgCMD+GP+y1WAAP7p9iRjaJjV/owBwdLckgAyeTszOF/GcIOoP3F3PXCJG3Rx/sW+YNUkiq42ejHGYflcMywUUWGU/Nql7AAA",
  },
  {
    src: "/assets/images/original-texture-artworks/tides-of-blessing/1.webp",
    blurDataURL:
      "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAAAwAgCdASoQABAAA8BgJZwAD5SwXWsQBCRoAAD+7W0p1S93jHO29jJTGOR2qFMv/N5zR7Po5vMs93Nw1b//D3tD9raHiPCevpSe6DlEvOn7+xc015Z6bX6oCtwRgQAA",
  },
  {
    src: "/assets/images/original-texture-artworks/multiplied-blessings/1.webp",
    blurDataURL:
      "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAADwAQCdASoQABAAA8BgJZwAFEAXFg7C9GAA+N1+HhWWyfJ1jyxm3Dh1B5lXOqsPQ8D/HZ68V47aLQVOv7TIfpSPE4/h+wFGlqwKFC8EWiiiqfs4QAA=",
  },
  {
    src: "/assets/images/original-texture-artworks/divine-reliance-(choosen-title)/1.webp",
    blurDataURL:
      "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAABQAgCdASoQABAAA8BgJZQCdAEPAAgCAOhx9gAA/tMaJcmcPEesb1xuoeTOdK5uSi7p+v1bvuTgqTADIsIXHC0l2pnP0FBlSROyQwkuyAA=",
  },
  {
    src: "/assets/images/original-texture-artworks/golden-praise/1.webp",
    blurDataURL:
      "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAADwAQCdASoQABAAA8BgJZQCdAYua2I1WnwA/mteeQm7xASmGxexJJkCf8bwApt/eKUFVMjW3FyBPh7Bg2QLo+N9lGeofySobvIzcevzs2Sxh86Tzprs6rxBzTpuerjEP4e+bO4wv8FJtIqgAAA=",
  },
  {
    src: "/assets/images/original-texture-artworks/waves-of-patience/1.webp",
    blurDataURL:
      "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAAAQAgCdASoQABAAA8BgJZwAD5XPv9SDwXgAAP7h3PAcTbJti50nGs6TF3uU3tnVEeZjvG+GXtggVPLOUP9TzJVNxCoY85NEIvj4ZEcgnjWOI/usx00/tAAA",
  },
  {
    src: "/assets/images/original-texture-artworks/divine-reliance/1.webp",
    blurDataURL:
      "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADQAQCdASoQABAAA8BgJZQAAiE0bcV7wAD+1gryBbtInhsifESo58MFIkWPtq8JsKX+w9F3O86oXHTaehD4fYjeEg2JebyKyrRw12QA",
  },
  {
    src: "/assets/images/original-texture-artworks/echoes-of-dhikr/1.webp",
    blurDataURL:
      "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAABQAgCdASoQABAAA8BgJZwAD5XQXrJWyZiedAAA/uslxvEsVsBqlxONh2gsMGIW3u0BjK5ansHYjpw8rZs5XnNETYT8FG8y0KY9j4hVdTmk5fY3/bixzv+UqIP2/iEPQ9kjU4y8AAA=",
  },
  {
    src: "/assets/images/original-texture-artworks/depths-of-tawbah/1.webp",
    blurDataURL:
      "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAABQAgCdASoQABAAA8BgJZwAD4wQ5LugSMCEoIAA/eN+Bst2QXQ7vjLA1GJ4lwxuPzFy7k7y8qx4l9YLaUtlzSgzvJAQdbrUG5k/xV+5U4gpA7E7q3Kro0YabYLegE8wv7AAAA==",
  },
  {
    src: "/assets/images/original-texture-artworks/motion-of-faith/1.webp",
    blurDataURL:
      "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAACwAQCdASoQABAAA8BgJZwAAogMKMUAAP6Uo47oZT6VXKoySyCA7RHopIuLl0OKXmtrtwEx4hNkyu4mZKoO5qRKhP+SHjeO/QlFceOF2zRl+jZ4/ws75YHAAAA=",
  },
  {
    src: "/assets/images/mixed-media-collections/the-purity/1.webp",
    blurDataURL:
      "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAAAQAgCdASoQABAAA8BgJZwAD5GsfUVjOCIAAP33gbtJBYTA+uGd6Ch0LQ53uwLU/VL+7BBCt1NVBoO+05p+SlVO+Rf60njiirIgqWcMjEN6fZj5qZD8JElGqpof7QUAAAA=",
  },
  {
    src: "/assets/images/mixed-media-collections/enlightening/1.webp",
    blurDataURL:
      "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAAAQAgCdASoQABAAA8BgJZQAD5RLZHMHzPfAAPkeG/8hjUoQAxgQKdiwveO+kdonm0FyRQTADBybjDCOql9qHFU/1PKNfnIafQDD30VK/IXMK+Z/WhW4khqihMTIZqv8fgAAAA==",
  },
  {
    src: "/assets/images/mixed-media-collections/gracious/1.webp",
    blurDataURL:
      "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAAAQAgCdASoQABAAA8BgJZQC7AYsZ2o9vUcAAP7p+QHkf/LIy6lnV1UvTgA6pkmAK4Daye/ZnwIZwHLgGa9oIyfMaNhaACdot8XmmkBG4G32YcxvqckUitaHM+2vfUqe6mW9kk6kjI9RJlhwAAA=",
  },
  {
    src: "/assets/images/mixed-media-collections/heavenly/1.webp",
    blurDataURL:
      "data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAAAQAgCdASoQABAAA8BgJZwAEP48Tb+ZcCAAAPkFWtz04wjsNTO6Yvz/Otbq3NqP9PMkGxGJR8R8tNg4PCwRQ2VKt/QgbAmPjrwWDOcp9OCU2vMofEqseVPwZmTySm/xj70Cytx5ju6tVw88zEf0Wno0n7QuJIhXb2uCQR0CAAA=",
  },
  {
    src: "/assets/images/mixed-media-collections/infinite/1.webp",
    blurDataURL:
      "data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAABQAgCdASoQABAAA8BgJaQAD5LRe86o/UabQAAAzj05Ps9snVc0f9qE5N6Hbwk/dBDejKnn59+15gsX9bMjzgQTxSN/KG4yF1IX9pAuC++HwnTdInN8T4LSThoQtzdREMa80MhSzw83NAgA",
  },
  {
    src: "/assets/images/mixed-media-collections/mighty/1.webp",
    blurDataURL:
      "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAADwAQCdASoQABAAA8BgJZQCdADAfxqfrgAA/uB3SFl9MDVxbv2kf/i9Xz/K6kIhHuA3AmqKCFAHkorpe78g5HblSH6TKYEsfQugPFsKlCpMqGAAAAA=",
  },
  {
    src: "/assets/images/mixed-media-collections/miraculous/1.webp",
    blurDataURL:
      "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAAAQAgCdASoQABAAA8BgJYwAD5RLRGNHfP4AAP7JbB8uHpgrSU2yyFNFwQopA+6waYXpF55z39f0QLV863OIszSULzlcRnVMLlPiVFoxEqhTbkznI5xDwvaw6tNVrLiDq/v5YAAA",
  },
];

const PER_ROW = 6;
const ROW_DURATION = `${PER_ROW * 4.5}s`;

const MARQUEE_ROWS = [
  { key: "row-1", items: HERO_MARQUEE_TILES.slice(0, PER_ROW), direction: "left" as const, duration: ROW_DURATION },
  { key: "row-2", items: HERO_MARQUEE_TILES.slice(PER_ROW, PER_ROW * 2), direction: "right" as const, duration: ROW_DURATION },
  { key: "row-3", items: HERO_MARQUEE_TILES.slice(PER_ROW * 2, PER_ROW * 3), direction: "left" as const, duration: ROW_DURATION },
];

/** Full-bleed moving artwork marquee hero with a frosted-glass category dock. */
export function Hero() {
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
        {MARQUEE_ROWS.map((row) => {
          const trackClass =
            row.direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

          return (
            <div key={row.key} className="relative flex-1 overflow-hidden [contain:content]">
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
                        style={{ backgroundImage: `url(${item.blurDataURL})` }}
                        className="relative h-full w-40 shrink-0 overflow-hidden rounded-control bg-deep bg-cover bg-center [backface-visibility:hidden] [transform:translateZ(0)] sm:w-52 lg:w-64"
                      >
                        <Image
                          src={item.src}
                          alt=""
                          fill
                          unoptimized
                          loading="eager"
                          decoding="sync"
                          fetchPriority={dup === 0 ? "high" : "auto"}
                          placeholder="blur"
                          blurDataURL={item.blurDataURL}
                          className="object-cover object-center [backface-visibility:hidden]"
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

      {/* Copy (left-aligned on mobile, centered on sm+) + frosted-glass quick-category dock */}
      <Container className="relative z-10 py-14 text-left sm:py-20 sm:text-center lg:py-24">
        <div className="max-w-5xl sm:mx-auto">
          <h1
            id="home-title"
            className="text-2xl font-semibold leading-tight tracking-tight text-white drop-shadow-[0_2px_14px_rgba(13,24,42,0.65)] sm:text-3xl md:whitespace-nowrap lg:text-[3.25rem]"
          >
            {homeHero.title}
          </h1>
          <p className="mt-3.5 max-w-2xl text-sm font-medium leading-relaxed text-white drop-shadow-[0_2px_10px_rgba(13,24,42,0.85)] sm:mx-auto sm:mt-4 sm:text-base lg:max-w-none lg:whitespace-nowrap lg:text-lg">
            {homeHero.description}
          </p>
        </div>

        <nav
          aria-label="Browse artwork categories"
          className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-card border border-white/30 bg-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_14px_34px_-14px_rgba(13,24,42,0.55)] backdrop-blur-xs sm:mt-10"
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
