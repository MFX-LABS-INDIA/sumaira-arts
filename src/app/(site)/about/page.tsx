import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { artist } from "@/data/artist";
import { InteractiveAboutClient } from "@/components/about/InteractiveAboutClient";

export const metadata: Metadata = {
  title: "About the Artist | Sumaira Mohammed Ashik | Sumaira Arts",
  description:
    "Discover the artistic journey of Sumaira Mohammed Ashik, Dubai-based abstract calligraphy artist, commercial designer for Landmark Group Homebox GCC, and resident tutor.",
};

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
              <h1 className="mt-4 font-serif text-3xl font-normal tracking-tight text-deep sm:text-5xl lg:text-6xl">
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

              {/* Action Buttons */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#gallery"
                  className="rounded-full bg-deep px-6 py-3 text-xs font-medium uppercase tracking-widest text-white shadow-sm transition-all hover:bg-deep/85 hover:shadow-md"
                >
                  Explore Archive & Gallery &darr;
                </a>
                <Link
                  href="/#commission"
                  className="rounded-full border border-deep/20 bg-white px-6 py-3 text-xs font-medium uppercase tracking-widest text-deep transition-all hover:border-brand hover:text-brand"
                >
                  Commission Bespoke Art
                </Link>
              </div>
            </Reveal>

            {/* Main Portrait with Floating Stat Card */}
            <Reveal delay={150} className="lg:col-span-5">
              <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10">
                <Image
                  src="/assets/images/artist/sumaira-studio-calligraphy.webp"
                  alt="Sumaira Mohammed Ashik at her easel in Dubai"
                  fill
                  priority
                  sizes="(min-width: 1024px) 35vw, 85vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/90 p-4 backdrop-blur-md shadow-lg border border-white/40">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand">Resident Dubai Artist</div>
                  <div className="mt-1 text-xs text-deep">
                    Specializing in 3D metallic textures, gold leaf accents & contemporary Arabic script.
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Interactive Story, Technique Tabs, Filterable Gallery & Modal */}
      <InteractiveAboutClient />
    </main>
  );
}
