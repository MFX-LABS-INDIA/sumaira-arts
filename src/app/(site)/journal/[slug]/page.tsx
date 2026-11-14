import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journalPosts } from "@/data/journal";
import { Container } from "@/components/ui/Container";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return journalPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = journalPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  return { title: post.title, description: post.excerpt, alternates: { canonical: post.href } };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = journalPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  const related = journalPosts
    .filter((item) => item.slug !== slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);
  const wordCount = [post.excerpt, ...post.sections.flatMap((section) => section.paragraphs)]
    .join(" ").trim().split(/\s+/).length;
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <Container className="py-6 sm:py-10 lg:py-12">
      <div>
        <nav aria-label="Journal navigation" className="mb-7 sm:mb-10">
          <Link href="/journal" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-deep">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            Back to journal
          </Link>
        </nav>
        <article aria-labelledby="article-title">
          <header>
            <p className="inline-flex rounded-full bg-ice px-3 py-1.5 text-sm font-semibold text-brand">{post.category}</p>
            <h1 id="article-title" className="mt-5 text-balance text-3xl font-medium leading-tight tracking-tight text-deep sm:text-4xl lg:text-5xl">{post.title}</h1>
            <p className="mt-5 text-pretty text-lg leading-8 text-steel sm:text-xl sm:leading-9">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-light pt-5 text-sm text-steel">
              <p>By <span className="font-semibold text-deep">{post.author}</span></p>
              <p className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" aria-hidden="true" />{readingMinutes} min read</p>
            </div>
          </header>
          {post.image && (
            <div className="relative my-8 aspect-[3/2] overflow-hidden rounded-xl bg-ice sm:my-10 sm:rounded-2xl">
              <Image src={post.image} alt={post.title} fill sizes="(min-width: 1280px) 1184px, (min-width: 1024px) calc(100vw - 96px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)" className="object-cover" />
            </div>
          )}
          <div className="space-y-8 sm:space-y-10">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-pretty text-xl font-semibold leading-snug text-deep sm:text-2xl">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 whitespace-pre-line text-base leading-8 text-deep sm:text-lg sm:leading-9">{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
          <footer className="mt-10 rounded-2xl border border-light bg-ice/40 p-6 sm:mt-12 sm:p-8">
            <h2 className="text-xl font-semibold text-deep">Find a piece for your space</h2>
            <p className="mt-2 text-base leading-7 text-steel">Explore the collection and discover artwork that speaks to you.</p>
            <Link href="/products" className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-deep sm:w-auto">
              Explore the artworks <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </footer>
        </article>
      </div>
      {related.length > 0 && (
      <section aria-labelledby="related-articles" className="mt-14 border-t border-light pt-8 sm:mt-20 sm:pt-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="related-articles" className="text-2xl font-semibold tracking-tight text-deep sm:text-3xl">More from the journal</h2>
          <Link href="/journal" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-brand hover:underline sm:self-auto">View all stories <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /></Link>
        </div>
        <div className="mt-6 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <Link key={item.slug} href={item.href} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-light bg-white transition-colors hover:border-brand">
              <div className="relative aspect-[3/2] bg-ice">
                {item.image && <Image src={item.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />}
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-sm font-medium text-brand">{item.category}</p>
                <h3 className="mt-3 text-xl font-semibold leading-snug text-deep group-hover:underline">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-steel">{item.excerpt}</p>
                <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-brand">Read article <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      )}
    </Container>
  );
}
