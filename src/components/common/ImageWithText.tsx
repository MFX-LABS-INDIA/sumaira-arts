import type { ReactNode } from "react";
import { ArtImage } from "@/components/art/ArtImage";
import { ButtonLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, headingClass } from "@/components/ui/SectionHeading";
import type { Feature } from "@/types/content";

/**
 * A picture (60%) beside its words (40%). `isReversed` puts the words on the start side and the picture on
 * the end side. Stacks on small screens, picture first. `children` render between the description and the button.
 */
export function ImageWithText({
  feature,
  isReversed = false,
  children,
}: {
  feature: Feature;
  isReversed?: boolean;
  children?: ReactNode;
}) {
  const media = (
    <Reveal key="media" className="group">
      <ArtImage
        art={feature.art}
        scene={feature.scene}
        src={feature.image}
        alt={feature.alt}
        zoom
        sizes="(min-width: 1024px) 58vw, 100vw"
        className="aspect-landscape"
      />
    </Reveal>
  );
  const text = (
    <Reveal key="text" delay={150}>
      {feature.eyebrow ? <Eyebrow>{feature.eyebrow}</Eyebrow> : null}
      <h2 className={`${headingClass} ${feature.eyebrow ? "mt-5" : ""} text-deep`}>{feature.title}</h2>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-steel md:text-base">{feature.description}</p>
      {children}
      <div className="mt-10">
        <ButtonLink href={feature.cta.href}>{feature.cta.label}</ButtonLink>
      </div>
    </Reveal>
  );

  return (
    <div className={`grid items-center gap-10 lg:gap-16 ${isReversed ? "lg:grid-cols-[2fr_3fr]" : "lg:grid-cols-[3fr_2fr]"}`}>
      {isReversed ? [text, media] : [media, text]}
    </div>
  );
}
