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

        <div className="mt-6 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 no-scrollbar sm:mx-0 sm:mt-10 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-8 sm:gap-y-12 sm:overflow-visible">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={(index % 3) * 120} className="h-full w-[76vw] max-w-[280px] shrink-0 snap-start sm:w-auto sm:max-w-none">
              <article id={post.slug} className="group relative flex h-full flex-col scroll-mt-24">
                <ArtImage
                  art={post.art}
                  scene={post.scene}
                  src={post.image}
                  alt={post.title}
                  zoom
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 76vw"
                  className="aspect-[16/11] sm:aspect-[3/2] shrink-0 rounded-card overflow-hidden"
                />
                <Eyebrow className="mt-3 sm:mt-6 text-[10px] sm:text-label">{post.category}</Eyebrow>
                <h3 className="mt-1.5 sm:mt-3 font-serif text-base sm:text-xl font-medium leading-snug tracking-tight text-deep">
                  <SmartLink href={post.href} className="after:absolute after:inset-0">
                    {post.title}
                  </SmartLink>
                </h3>
                <p className="mt-1.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-steel line-clamp-2 sm:line-clamp-none">{post.excerpt}</p>
                <div className="mt-auto pt-3 sm:pt-6">
                  <TextLink href={post.href} className="text-xs sm:text-sm">Read Article</TextLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
