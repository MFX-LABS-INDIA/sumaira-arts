import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { liveEventsData } from "@/data/live-events";

interface CollaboratedBrandsProps {
  id?: string;
  tone?: "ice" | "white";
}

export function CollaboratedBrands({
  id = "brands",
  tone = "ice",
}: CollaboratedBrandsProps) {
  const { brandsIntro, brands } = liveEventsData;

  return (
    <Section id={id} tone={tone} className="overflow-x-clip">
      <Container>
        <Reveal>
          <SectionHeading {...brandsIntro} />
        </Reveal>

        <Reveal delay={90}>
          <div dir="ltr" className="marquee-mask mt-6 -my-1.5 flex flex-col gap-0 sm:mt-10 sm:gap-1">
            {[
              { items: brands.slice(0, 18), trackClass: "animate-marquee-left", key: "row-1" },
              { items: brands.slice(18), trackClass: "animate-marquee-right", key: "row-2" },
            ].map((row) => (
              <div
                key={row.key}
                className="marquee-row overflow-hidden py-1.5 motion-reduce:overflow-x-auto no-scrollbar"
              >
                <div className={`flex w-max ${row.trackClass}`}>
                  {[0, 1].map((dupIndex) => (
                    <ul
                      key={dupIndex}
                      aria-hidden={dupIndex === 1 ? "true" : undefined}
                      className={`flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4 ${
                        dupIndex === 1 ? "motion-reduce:hidden" : ""
                      }`}
                    >
                      {row.items.map((brand) => (
                        <li
                          key={`${row.key}-${dupIndex}-${brand.name}`}
                          title={brand.name}
                          className={`flex h-16 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-light p-2.5 transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-brand/35 hover:shadow-raised sm:h-20 sm:w-40 sm:p-3 lg:h-24 lg:w-44 lg:p-3.5 motion-reduce:transform-none ${
                            brand.darkSurface ? "bg-[#163020]" : "bg-white"
                          }`}
                        >
                          <div className="relative h-full w-full">
                            <Image
                              src={brand.logo}
                              alt={dupIndex === 1 ? "" : brand.name}
                              fill
                              sizes="(min-width: 1024px) 150px, (min-width: 640px) 136px, 108px"
                              className="object-contain"
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
