"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, headingClass } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { artist } from "@/data/artist";

interface VisualStory {
  id: string;
  title: string;
  category: "All" | "Exhibitions" | "Product Design" | "Workshops" | "Awards";
  image: string;
  subtitle: string;
  description: string;
  details: string[];
  location?: string;
}

const visualStories: VisualStory[] = [
  {
    id: "world-art-dubai",
    title: "World Art Dubai Solo Showcase",
    category: "Exhibitions",
    subtitle: "Solo Stand & Live Calligraphy Showcase",
    image: "/assets/images/artist/exhibition-world-art-dubai.webp",
    location: "Dubai World Trade Centre",
    description:
      "A landmark solo exhibition showcasing original textured Arabic calligraphy masterworks. Works were acquired by international art collectors and commercial interior stylists across the region.",
    details: [
      "Stand No. E27, Hall 1 (Sheikh Saeed Halls)",
      "Featured custom Arabic calligraphy on metallic-textured canvases",
      "Direct interactions with bespoke residential and commercial buyers",
    ],
  },
  {
    id: "homebox-dining",
    title: "Homebox GCC Calligraphy Dining Collection",
    category: "Product Design",
    subtitle: "Commercial Lifestyle Collaboration with Landmark Group",
    image: "/assets/images/artist/homebox-dining-collection.webp",
    location: "37 Stores across UAE & GCC",
    description:
      "Sumaira's digital and hand-drawn calligraphy patterns were selected by Landmark Group to anchor Homebox's iconic Ramadan dining collection, blending traditional reverence with contemporary luxury.",
    details: [
      "Included Istikan and Kahwa sets, twin dispensers & porcelain tea sets",
      "Available across 11 stores in the UAE and 37 stores GCC-wide",
      "Celebrated for elegant gold motifs and balanced calligraphic geometry",
    ],
  },
  {
    id: "gallery-vibes",
    title: "Ramadan Fusion Vibes Exhibition",
    category: "Exhibitions",
    subtitle: "Curated Showcase in Mall of the Emirates",
    image: "/assets/images/artist/exhibition-gallery-vibes.webp",
    location: "Gallery Vibes, Mall of the Emirates",
    description:
      "An exclusive Ramadan curation featuring five monumental works fusing equine anatomy with sacred Arabic script and multi-layered textural acrylics.",
    details: [
      "5 original masterworks exhibited",
      "Curated by prominent art advisors during the holy month of Ramadan",
      "Featured the celebrated calligraphic Arabian horse compositions",
    ],
  },
  {
    id: "workshop-jumeirah",
    title: "The Workshop Dubai, Jumeirah",
    category: "Workshops",
    subtitle: "Resident Tutor for Modern Calligraphy & 3D Textures",
    image: "/assets/images/artist/workshop-dubai-jumeirah.webp",
    location: "Jumeirah, Dubai",
    description:
      "As resident tutor at one of Dubai's most celebrated boutique design hubs, Sumaira has trained hundreds of students in modern Arabic letterforms, knife techniques, and fluid color layering.",
    details: [
      "Conducted 20+ specialized masterclasses",
      "Covers modeling paste sculpting, 24K gold foil application & stroke composition",
      "Special Ramadan masterclasses hosted for 50+ students in fitness and corporate settings",
    ],
  },
  {
    id: "uae-national-day",
    title: "UAE @ 50 National Day Competition",
    category: "Awards",
    subtitle: "6th Position out of 123 International Artists",
    image: "/assets/images/artist/artwork-uae-national-day.webp",
    location: "National Art Competition UAE",
    description:
      "An award-winning homage to the 50th National Day of the United Arab Emirates, integrating national symbols, the Burj Khalifa skyline, and flowing patriotic Arabic verses.",
    details: [
      "Ranked 6th among 123 juried international participants",
      "Crafted with heavy impasto sculpting, gold metallic accents, and fluid pigments",
      "Commended by esteemed UAE cultural curators and collectors",
    ],
  },
  {
    id: "homebox-decor",
    title: "Homebox Ramadan Décor & Textiles",
    category: "Product Design",
    subtitle: "Embroidered Cushions, Lanterns & Living Décor",
    image: "/assets/images/artist/homebox-decor-collection.webp",
    location: "Homebox Furniture Stores",
    description:
      "Extending calligraphic aesthetics into soft home textiles, sculptural lanterns, and decorative accessories for modern living rooms and majlis environments.",
    details: [
      "Gold-embroidered velvet filled cushions and beaded placemats",
      "Arabic calligraphy lanterns, sculpted wall mirrors, and decorative platters",
      "Designed specifically for festive Ramadan hospitality collections",
    ],
  },
];

const studioTechniques = [
  {
    step: "01",
    title: "Structural Modeling Paste",
    desc: "Sculpting tactile 3D relief using heavy impasto pastes and custom scrapers to build architectural depth before pigments touch canvas.",
  },
  {
    step: "02",
    title: "Sacred Arabic Calligraphy",
    desc: "Inscribing Quranic verses, poetic stanzas, and symbolic monograms in Thuluth, Diwani, and contemporary abstract script styles.",
  },
  {
    step: "03",
    title: "Metallic & 24K Gold Embellishment",
    desc: "Applying multi-tone gold leaf, copper accents, and metallic patinas that catch daylight and shimmer dynamically as viewers move.",
  },
  {
    step: "04",
    title: "Layered Glaze & Sealing",
    desc: "Locking the work with archival museum-grade UV varnishes, preserving tactile textural peaks while ensuring decades of longevity.",
  },
];

export function InteractiveAboutClient() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedStory, setSelectedStory] = useState<VisualStory | null>(null);
  const [activeTab, setActiveTab] = useState<"story" | "techniques" | "milestones">("story");

  const categories = ["All", "Exhibitions", "Product Design", "Workshops", "Awards"];

  const filteredStories =
    activeCategory === "All"
      ? visualStories
      : visualStories.filter((s) => s.category === activeCategory);

  return (
    <>
      {/* Interactive Story Tabs */}
      <Section tone="light" className="border-b border-sand/30">
        <Container>
          {/* Navigation Pill Switcher */}
          <div className="flex justify-center">
            <div className="inline-flex rounded-full border border-sand/60 bg-white/80 p-1.5 shadow-sm backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setActiveTab("story")}
                className={`rounded-full px-5 py-2 text-xs font-medium tracking-wide uppercase transition-all ${
                  activeTab === "story"
                    ? "bg-deep text-white shadow-sm"
                    : "text-steel hover:text-deep"
                }`}
              >
                The Story & Philosophy
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("techniques")}
                className={`rounded-full px-5 py-2 text-xs font-medium tracking-wide uppercase transition-all ${
                  activeTab === "techniques"
                    ? "bg-deep text-white shadow-sm"
                    : "text-steel hover:text-deep"
                }`}
              >
                Studio Craft & Technique
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("milestones")}
                className={`rounded-full px-5 py-2 text-xs font-medium tracking-wide uppercase transition-all ${
                  activeTab === "milestones"
                    ? "bg-deep text-white shadow-sm"
                    : "text-steel hover:text-deep"
                }`}
              >
                Timeline & Exhibitions
              </button>
            </div>
          </div>

          {/* TAB 1: STORY */}
          {activeTab === "story" && (
            <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
              <Reveal className="lg:col-span-6 space-y-6 text-base leading-relaxed text-steel">
                <Eyebrow>The Artist's Journey</Eyebrow>
                <h2 className={`${headingClass} mt-2 text-deep`}>
                  From Traditional Heritage to Contemporary 3D Abstraction
                </h2>
                {artist.bio.map((paragraph, idx) => (
                  <p key={idx} className="text-sm md:text-base leading-relaxed text-steel">
                    {paragraph}
                  </p>
                ))}
              </Reveal>

              <Reveal delay={150} className="lg:col-span-6 space-y-6">
                <div className="rounded-2xl border border-sand/60 bg-white/90 p-8 shadow-sm backdrop-blur-sm">
                  <span className="text-xs font-semibold tracking-wider uppercase text-brand">
                    Artistic Philosophy
                  </span>
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-steel">
                    {artist.philosophy}
                  </p>

                  <blockquote className="mt-6 border-s-2 border-brand ps-5 font-serif text-lg font-light italic leading-relaxed text-deep">
                    &ldquo;{artist.belief}&rdquo;
                  </blockquote>

                  <div className="mt-8 border-t border-sand/40 pt-6">
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-brand/30">
                        <Image
                          src="/assets/images/artist/sumaira-portrait.webp"
                          alt="Sumaira Mohammed Ashik"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-serif text-base font-medium text-deep">
                          {artist.name}
                        </div>
                        <div className="text-xs text-steel">Founder & Artist, Sumaira Arts Dubai</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Interactive Commission Card */}
                <div className="rounded-2xl bg-deep p-8 text-white shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl font-light">Custom Commissions Available</h3>
                      <p className="mt-1 text-xs text-sand/80">
                        Bespoke canvases tailored to the architectural palette of your home or project.
                      </p>
                    </div>
                    <Link
                      href="/#commission"
                      className="inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-deep transition-all hover:bg-brand/90 hover:scale-105"
                    >
                      Inquire Now &rarr;
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          )}

          {/* TAB 2: STUDIO CRAFT & TECHNIQUES */}
          {activeTab === "techniques" && (
            <div className="mt-12">
              <Reveal className="max-w-2xl text-center mx-auto">
                <Eyebrow>Craft & Materials</Eyebrow>
                <h2 className={`${headingClass} mt-2 text-deep`}>
                  Sculpting Multi-Dimensional Calligraphy
                </h2>
                <p className="mt-3 text-sm text-steel">
                  Unlike traditional flat calligraphy, Sumaira’s work utilizes tactile impasto techniques, sculpting reliefs with modeling paste and heavy tools before applying gold foil and pigments.
                </p>
              </Reveal>

              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {studioTechniques.map((tech, idx) => (
                  <Reveal
                    key={tech.step}
                    delay={idx * 100}
                    className="group relative rounded-xl border border-sand/50 bg-white/80 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand/50 hover:shadow-md"
                  >
                    <span className="font-serif text-3xl font-light text-brand/40 group-hover:text-brand transition-colors">
                      {tech.step}
                    </span>
                    <h3 className="mt-3 font-serif text-lg font-medium text-deep">
                      {tech.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-steel">
                      {tech.desc}
                    </p>
                  </Reveal>
                ))}
              </div>

              {/* Material Highlights Strip */}
              <div className="mt-12 rounded-xl border border-sand/40 bg-sand/10 p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <h4 className="font-serif text-base font-medium text-deep">Studio Masterclass Sessions</h4>
                    <p className="mt-1 text-xs text-steel">
                      Hands-on workshops in Dubai covering abstract textures, palette knife techniques, and Arabic calligraphy.
                    </p>
                  </div>
                  <a
                    href="https://instagram.com/chumzz_art"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-sm border border-deep/20 bg-white px-4 py-2 text-xs font-medium uppercase tracking-wider text-deep shadow-sm hover:border-brand hover:text-brand transition-colors"
                  >
                    View Upcoming Workshops &rarr;
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TIMELINE & MILESTONES */}
          {activeTab === "milestones" && (
            <div className="mt-12">
              <Reveal className="max-w-2xl text-center mx-auto">
                <Eyebrow>Career Milestones</Eyebrow>
                <h2 className={`${headingClass} mt-2 text-deep`}>
                  Exhibitions, Retail Collaborations & Honours
                </h2>
              </Reveal>

              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {artist.milestones.map((item, idx) => (
                  <Reveal
                    key={idx}
                    delay={idx * 80}
                    className="group relative rounded-xl border border-sand/50 bg-white/90 p-6 shadow-sm transition-all hover:border-brand/50 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-sand/30 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-brand">
                        {item.category}
                      </span>
                      {item.highlight && (
                        <span className="text-[11px] font-medium text-steel/80">
                          {item.highlight}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 font-serif text-lg font-medium text-deep group-hover:text-brand transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-steel">
                      {item.description}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* Interactive Visual Gallery with Category Filter & Modal */}
      <Section tone="white" id="gallery">
        <Container>
          <Reveal className="text-center max-w-2xl mx-auto">
            <Eyebrow>Visual Archive</Eyebrow>
            <h2 className={`${headingClass} mt-2 text-deep`}>
              Curated Showcase & Exhibition Highlights
            </h2>
            <p className="mt-3 text-sm text-steel">
              Click any photo to explore the story, exhibition context, and product details.
            </p>
          </Reveal>

          {/* Filter Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all ${
                  activeCategory === cat
                    ? "bg-brand text-deep shadow-sm font-semibold"
                    : "border border-sand/50 bg-white text-steel hover:border-deep/30 hover:text-deep"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Visual Cards Grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStories.map((story, idx) => (
              <Reveal
                key={story.id}
                delay={idx * 60}
                className="group cursor-pointer overflow-hidden rounded-xl border border-sand/40 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div
                  onClick={() => setSelectedStory(story)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setSelectedStory(story);
                  }}
                  className="w-full text-left focus:outline-none"
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-sand/15">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-deep backdrop-blur-sm">
                        View Details & Story &rarr;
                      </span>
                    </div>
                    <span className="absolute top-3 left-3 rounded-full bg-deep/80 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                      {story.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="text-xs font-medium text-brand">{story.location}</div>
                    <h3 className="mt-1 font-serif text-lg font-medium text-deep group-hover:text-brand transition-colors">
                      {story.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-steel line-clamp-2">
                      {story.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Interactive Modal for Selected Story */}
      {selectedStory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedStory(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-sand/30 text-deep hover:bg-sand/60 transition-colors"
              aria-label="Close dialog"
            >
              &times;
            </button>

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-sand/15">
              <Image
                src={selectedStory.image}
                alt={selectedStory.title}
                fill
                sizes="(min-width: 640px) 600px, 90vw"
                className="object-cover"
              />
            </div>

            <div className="mt-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                  {selectedStory.category}
                </span>
                {selectedStory.location && (
                  <span className="text-xs font-medium text-steel">
                    📍 {selectedStory.location}
                  </span>
                )}
              </div>

              <h3 className="mt-3 font-serif text-2xl font-normal text-deep">
                {selectedStory.title}
              </h3>
              <p className="mt-1 text-sm font-light text-brand">
                {selectedStory.subtitle}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-steel">
                {selectedStory.description}
              </p>

              {/* Highlights / Details bullets */}
              <div className="mt-6 rounded-xl border border-sand/40 bg-sand/10 p-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-deep">
                  Exhibition & Design Highlights:
                </h4>
                <ul className="mt-2.5 space-y-2 text-xs text-steel">
                  {selectedStory.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-brand font-bold">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedStory(null)}
                  className="rounded-full bg-deep px-6 py-2 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-deep/80"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

