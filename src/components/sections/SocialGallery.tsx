import { ArtImage } from "@/components/art/ArtImage";
import { InstagramIcon } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { social, socialTiles } from "@/data/social";

export function SocialGallery() {
  return (
    <Section id="social" tone="ice">
      <Container>
        <Reveal>
          <SectionHeading align="center" eyebrow={social.eyebrow} title={social.title} />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 md:mt-16 md:gap-3 lg:grid-cols-6">
          {socialTiles.map((tile, index) => (
            <Reveal key={tile.label} delay={(index % 3) * 90}>
              <a href={social.cta.href} aria-label={tile.label} className="group relative block">
                <ArtImage
                  art={tile.art}
                  scene={tile.scene}
                  src={tile.image}
                  alt={tile.label}
                  zoom
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                  className="aspect-square"
                />
                <span className="absolute inset-0 flex items-center justify-center rounded-card bg-deep/45 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <InstagramIcon className="h-7 w-7 text-white" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <ButtonLink href={social.cta.href} variant="outline">
            {social.cta.label}
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}
