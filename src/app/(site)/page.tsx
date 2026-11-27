import { CategoryCards } from "@/components/organisms/CategoryCards";
import { CollectionGrid } from "@/components/organisms/CollectionGrid";
import { Commission } from "@/components/organisms/Commission";
import { FounderBlock } from "@/components/organisms/FounderBlock";
import { Hero } from "@/components/organisms/Hero";
import { LandingMobileStickyBar } from "@/components/molecules/LandingMobileStickyBar";

/** Route files stay thin: this page only decides the order of sections. */
export default function Home() {
  return (
    <>
      <Hero />
      <CategoryCards />
      <CollectionGrid />
      <FounderBlock />
      <Commission />
      <LandingMobileStickyBar />
    </>
  );
}
