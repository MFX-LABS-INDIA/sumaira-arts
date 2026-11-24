import { CategoryCards } from "@/components/organisms/CategoryCards";
import { CollaboratedBrands } from "@/components/organisms/CollaboratedBrands";
import { CollectionGrid } from "@/components/organisms/CollectionGrid";
import { Commission } from "@/components/organisms/Commission";
import { ExperiencesBanner } from "@/components/organisms/ExperiencesBanner";
import { FeaturedProducts } from "@/components/organisms/FeaturedProducts";
import { FounderBlock } from "@/components/organisms/FounderBlock";
import { Hero } from "@/components/organisms/Hero";

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
