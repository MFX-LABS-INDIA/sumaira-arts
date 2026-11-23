import { CategoryCards } from "@/components/sections/CategoryCards";
import { CollaboratedBrands } from "@/components/sections/CollaboratedBrands";
import { CollectionGrid } from "@/components/sections/CollectionGrid";
import { Commission } from "@/components/sections/Commission";
import { ExperiencesBanner } from "@/components/sections/ExperiencesBanner";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { FounderBlock } from "@/components/sections/FounderBlock";
import { Hero } from "@/components/sections/Hero";

/** Route files stay thin: this page only decides the order of sections. */
export default function Home() {
  return (
    <>
      <Hero />
      <CategoryCards />
      <FeaturedProducts />
      <CollectionGrid />
      <FounderBlock />
      <ExperiencesBanner />
      <Commission />
      <CollaboratedBrands tone="white" />
    </>
  );
}
