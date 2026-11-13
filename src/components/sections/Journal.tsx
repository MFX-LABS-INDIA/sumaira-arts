import { ArtImage } from "@/components/art/ArtImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink, TextLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { journalIntro, journalPosts } from "@/data/journal";

export function Journal({ limit = 3 }: { limit?: number }) {
  const posts = journalPosts.slice(0, limit);

  return (
    <Section id="journal" tone="white">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={journalIntro.eyebrow} title={journalIntro.title} />
        </Reveal>

        <div className="mt-10 grid items-stretch gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={(index % 3) * 120} className="h-full">
              <article id={post.slug} className="group relative flex h-full flex-col scroll-mt-24">
                <ArtImage
                  art={post.art}
                  scene={post.scene}
                  src={post.image}
                  alt={post.title}
                  zoom
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[3/2] shrink-0"
                />
                <Eyebrow className="mt-6">{post.category}</Eyebrow>
                <h3 className="mt-3 font-serif text-xl font-medium leading-snug tracking-tight text-deep">
                  <SmartLink href={post.href} className="after:absolute after:inset-0">
                    {post.title}
                  </SmartLink>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel">{post.excerpt}</p>
                <div className="mt-auto pt-6">
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
