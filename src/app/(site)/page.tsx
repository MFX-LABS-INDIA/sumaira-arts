import { BrandStatement } from "@/components/sections/BrandStatement";
import { CategoryCards } from "@/components/sections/CategoryCards";
import { CollectionFeature } from "@/components/sections/CollectionFeature";
import { CollectionGrid } from "@/components/sections/CollectionGrid";
import { Commission } from "@/components/sections/Commission";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { FounderBlock } from "@/components/sections/FounderBlock";
import { Hero } from "@/components/sections/Hero";
import { InteriorShowcase } from "@/components/sections/InteriorShowcase";
import { Journal } from "@/components/sections/Journal";
import { Mirage } from "@/components/sections/Mirage";
import { ReviewsWall } from "@/components/sections/ReviewsWall";
import { SocialGallery } from "@/components/sections/SocialGallery";

/** Route files stay thin: this page only decides the order of sections. */
export default function Home() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <CategoryCards />
      <FeaturedProducts />
      <CollectionFeature />
      <Commission />
      <Mirage />
      <FounderBlock />
      <CollectionGrid />
      <ReviewsWall />
      <InteriorShowcase />
      <Journal />
      <SocialGallery />
    </>
  );
}
