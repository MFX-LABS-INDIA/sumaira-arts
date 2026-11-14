import { CategoryCards } from "@/components/sections/CategoryCards";
import { CollectionGrid } from "@/components/sections/CollectionGrid";
import { Commission } from "@/components/sections/Commission";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { FounderBlock } from "@/components/sections/FounderBlock";
import { Hero } from "@/components/sections/Hero";
import { Journal } from "@/components/sections/Journal";
import { HomeClosing } from "@/components/sections/HomeClosing";

/** Route files stay thin: this page only decides the order of sections. */
export default function Home() {
  return (
    <>
      <Hero />
      <CategoryCards />
      <FeaturedProducts />
      <CollectionGrid />
      <FounderBlock />
      <Commission />
      <Journal />
      <HomeClosing />
    </>
  );
}
