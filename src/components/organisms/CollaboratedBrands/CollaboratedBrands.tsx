import { SkeletonImage } from "@/components/atoms/SkeletonImage";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { Reveal } from "@/components/atoms/Reveal";
import { liveEventsData, type CollaboratedBrand } from "@/data/live-events";

interface CollaboratedBrandsProps {
  id?: string;
  tone?: "ice" | "white";
}

function BrandMarqueeRow({
  rowKey,
  items,
  direction,
  duration,
  compact = false,
}: {
  rowKey: string;
  items: CollaboratedBrand[];
  direction: "left" | "right";
  duration?: string;
  compact?: boolean;
}) {
  const trackClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";
  const tileSizeClass = compact
    ? "h-14 w-28 p-2 sm:h-16 sm:w-36 sm:p-2.5"
    : "h-20 w-40 p-3 lg:h-24 lg:w-44 lg:p-3.5";

  return (
    <div className="marquee-row overflow-hidden py-1 motion-reduce:overflow-x-auto no-scrollbar sm:py-1.5">
      <div
        className={`flex w-max ${trackClass}`}
        style={duration ? { animationDuration: duration } : undefined}
      >
        {[0, 1].map((dupIndex) => (
          <ul
            key={dupIndex}
            aria-hidden={dupIndex === 1 ? "true" : undefined}
            className={`flex shrink-0 items-center gap-2.5 pr-2.5 sm:gap-3.5 sm:pr-3.5 lg:gap-4 lg:pr-4 ${
              dupIndex === 1 ? "motion-reduce:hidden" : ""
            }`}
          >
            {items.map((brand) => (
              <li
                key={`${rowKey}-${dupIndex}-${brand.name}`}
                title={brand.name}
                className={`flex shrink-0 items-center justify-center overflow-hidden rounded-card border border-light transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-brand/35 motion-reduce:transform-none ${tileSizeClass} ${
                  brand.darkSurface ? "bg-[#163020]" : "bg-white"
                }`}
              >
                <div className="relative h-full w-full">
                  <SkeletonImage
                    src={brand.logo}
                    alt={dupIndex === 1 ? "" : brand.name}
                    fill
                    skeletonTone={brand.darkSurface ? "dark" : "light"}
                    sizes={
                      compact
                        ? "(min-width: 640px) 124px, 96px"
                        : "(min-width: 1024px) 150px, 136px"
                    }
                    className="object-contain"
                  />
                </div>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function CollaboratedBrands({
  id = "brands",
  tone = "ice",
}: CollaboratedBrandsProps) {
  const { brandsIntro, brands } = liveEventsData;

  const rows = [
    { key: "r-1", items: brands.slice(0, 9), direction: "left" as const, duration: "36s" },
    { key: "r-2", items: brands.slice(9, 18), direction: "right" as const, duration: "40s" },
    { key: "r-3", items: brands.slice(18, 27), direction: "left" as const, duration: "38s" },
    { key: "r-4", items: brands.slice(27), direction: "right" as const, duration: "42s" },
  ];

  return (
    <Section id={id} tone={tone} className="overflow-x-clip">
      <Container>
        <Reveal>
          <SectionHeading {...brandsIntro} />
        </Reveal>

        <Reveal delay={90}>
          <div dir="ltr" className="marquee-mask mt-6 -my-1 sm:mt-10 sm:-my-1.5">
            <div className="flex flex-col gap-0.5 sm:gap-1">
              {rows.map((row) => (
                <BrandMarqueeRow
                  key={row.key}
                  rowKey={row.key}
                  items={row.items}
                  direction={row.direction}
                  duration={row.duration}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
