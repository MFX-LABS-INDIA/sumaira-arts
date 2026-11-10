import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, headingClass } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { artist } from "@/data/artist";

export const metadata: Metadata = {
  title: "About the Artist | Sumaira Mohammed Ashik | Sumaira Arts",
  description:
    "Discover the artistic journey of Sumaira Mohammed Ashik, Dubai-based abstract calligraphy artist, commercial designer for Landmark Group Homebox GCC, and tutor.",
};

const visualStories = [
  {
    title: "World Art Dubai Solo Showcase",
    category: "Exhibition",
    image: "/assets/images/artist/exhibition-world-art-dubai.webp",
    description: "Original masterworks exhibited and acquired by private collectors at World Art Dubai, Sheikh Saeed Halls.",
  },
  {
    title: "GCC-Wide Homebox Collection",
    category: "Product Design",
    image: "/assets/images/artist/homebox-dining-collection.webp",
    description: "Calligraphy dining, coffee sets & Ramadan home accessories designed for 37 Landmark Group stores across UAE and GCC.",
  },
  {
    title: "Mall of the Emirates Feature",
    category: "Curated Exhibition",
    image: "/assets/images/artist/exhibition-gallery-vibes.webp",
    description: "Five signature textured calligraphy compositions featured during the Ramadan Fusion Vibes exhibition at Gallery Vibes.",
  },
  {
    title: "Studio Masterclasses & Workshops",
    category: "Education",
    image: "/assets/images/artist/workshop-dubai-jumeirah.webp",
    description: "Mentoring emerging creatives in modern Arabic calligraphy & 3D texture techniques at The Workshop Dubai, Jumeirah.",
  },
  {
    title: "UAE @ 50 National Day Artwork",
    category: "Award",
    image: "/assets/images/artist/artwork-uae-national-day.webp",
    description: "6th place finalist among 123 international artists in the UAE 50th National Day competition under royal patronage.",
  },
  {
    title: "Ramadan Decor & Textiles",
    category: "Product Design",
    image: "/assets/images/artist/homebox-decor-collection.webp",
    description: "Embroidered cushions, calligraphy platters, and luxury living accents designed for modern contemporary homes.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-canvas text-deep">
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-sand/40 bg-sand/10 py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 px-3.5 py-1 text-xs font-medium tracking-widest uppercase text-brand">
                {artist.eyebrow}
              </span>
              <h1 className="mt-4 font-serif text-3xl font-normal tracking-tight text-deep sm:text-5xl lg:text-5xl">
                {artist.name}
              </h1>
              <p className="mt-3 text-lg font-light text-brand sm:text-xl">
                {artist.role}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-steel">
                {artist.tagline}
              </p>

              {/* Stats Bar */}
              <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 border-t border-sand/40 pt-8">
                {artist.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-serif text-2xl sm:text-3xl font-light text-deep">{stat.value}</div>
                    <div className="mt-1 text-xs text-steel">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Main Portrait */}
            <Reveal delay={150} className="lg:col-span-5">
              <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-sm shadow-xl ring-1 ring-black/5">
                <Image
                  src="/assets/images/artist/sumaira-studio-calligraphy.webp"
                  alt="Sumaira Mohammed Ashik at her easel in Dubai"
                  fill
                  priority
                  sizes="(min-width: 1024px) 35vw, 85vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Biography & Philosophy Section */}
      <Section tone="light">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6 space-y-6 text-base leading-relaxed text-steel">
              <Reveal>
                <Eyebrow>The Creative Journey</Eyebrow>
                <h2 className={`${headingClass} mt-3 text-deep`}>
                  From Traditional Heritage to 3D Textured Abstraction
                </h2>
              </Reveal>

              <Reveal delay={100}>
                {artist.bio.map((paragraph, idx) => (
                  <p key={idx} className="mt-4">
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between">
              <Reveal delay={200} className="rounded-xl border border-sand/60 bg-white/70 p-8 shadow-sm backdrop-blur-sm">
                <h3 className="font-serif text-xl font-normal text-deep">Artistic Philosophy & Medium</h3>
                <p className="mt-4 text-sm leading-relaxed text-steel">
                  {artist.philosophy}
                </p>
                <blockquote className="mt-6 border-s-2 border-brand ps-5 font-serif text-lg font-light italic text-deep">
                  &ldquo;{artist.belief}&rdquo;
                </blockquote>

                <div className="mt-6 border-t border-sand/40 pt-6">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-brand">Signature Techniques:</h4>
                  <ul className="mt-3 grid grid-cols-2 gap-2 text-xs text-steel">
                    <li>• Metallic & 24K Gold Embellishments</li>
                    <li>• Heavy Modeling Paste Sculpting</li>
                    <li>• Multi-layered Palette Knife Striations</li>
                    <li>• Classical Arabic Scripts & Monograms</li>
                    <li>• Mixed-Media Fluid Contrasts</li>
                    <li>• Architectural Interior Harmony</li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={250} className="mt-8 rounded-xl bg-deep p-8 text-white">
                <h3 className="font-serif text-xl font-light">Custom Commissions & Collaborations</h3>
                <p className="mt-3 text-sm text-sand/80 leading-relaxed">
                  Sumaira creates bespoke original works for luxury residences, corporate environments, and commercial collections throughout the UAE and worldwide.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/#commission"
                    className="inline-flex items-center rounded-sm bg-brand px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-deep transition-colors hover:bg-brand/90"
                  >
                    Commission an Artwork
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex items-center rounded-sm border border-sand/30 px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-white/10"
                  >
                    View Original Works
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Visual Milestones & Projects Grid */}
      <Section tone="light" className="border-t border-sand/40">
        <Container>
          <Reveal className="text-center max-w-2xl mx-auto">
            <Eyebrow>Exhibitions & Milestones</Eyebrow>
            <h2 className={`${headingClass} mt-3 text-deep`}>
              Major Exhibitions, Retail Partnerships & Public Appearances
            </h2>
            <p className="mt-4 text-sm text-steel">
              Selected highlights from solo exhibitions, regional design collections, and curated galleries.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visualStories.map((story, idx) => (
              <Reveal key={story.title} delay={idx * 80} className="group flex flex-col overflow-hidden rounded-lg border border-sand/40 bg-white shadow-sm transition-all hover:shadow-md">
                <div className="relative aspect-[16/10] overflow-hidden bg-sand/10">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-deep/80 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium tracking-wide text-white">
                    {story.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-lg font-normal text-deep group-hover:text-brand transition-colors">
                    {story.title}
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-steel">
                    {story.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Timeline of Key Milestones */}
          <div className="mt-16 rounded-xl border border-sand/50 bg-sand/5 p-8 sm:p-10">
            <h3 className="font-serif text-2xl font-normal text-deep mb-6">Career Timeline & Achievements</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {artist.milestones.map((item, idx) => (
                <div key={idx} className="border-s-2 border-brand/50 ps-4 py-1">
                  <div className="text-xs font-semibold tracking-wider uppercase text-brand">{item.category}</div>
                  <h4 className="mt-1 font-serif text-base font-medium text-deep">{item.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-steel">{item.description}</p>
                  {item.highlight && (
                    <span className="mt-3 inline-block rounded bg-brand/10 px-2 py-0.5 text-[11px] font-medium text-brand">
                      {item.highlight}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

