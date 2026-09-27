import { ArtImage } from "@/components/art/ArtImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink, TextLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { journalIntro, journalPosts } from "@/data/journal";

export function Journal() {
  return (
    <Section id="journal" tone="white">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={journalIntro.eyebrow} title={journalIntro.title} />
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-14 md:mt-16 md:grid-cols-3">
          {journalPosts.map((post, index) => (
            <Reveal key={post.title} delay={index * 120} className={index === 1 ? "md:mt-14" : ""}>
              <article className="group relative">
                <ArtImage
                  art={post.art}
                  scene={post.scene}
                  src={post.image}
                  alt={post.title}
                  zoom
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="aspect-[3/2]"
                />
                <Eyebrow className="mt-6">{post.category}</Eyebrow>
                <h3 className="mt-3 font-serif text-[1.7rem] font-light leading-snug tracking-tight text-deep">
                  <SmartLink href={post.href} className="after:absolute after:inset-0">
                    {post.title}
                  </SmartLink>
                </h3>
                <p className="mt-3 text-body-sm leading-relaxed text-steel">{post.excerpt}</p>
                <div className="mt-5">
                  <TextLink href={post.href}>Read Article</TextLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
