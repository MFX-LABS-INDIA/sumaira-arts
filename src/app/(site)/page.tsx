import { BrandStory } from "@/components/sections/BrandStory";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { CollectionGallery } from "@/components/sections/CollectionGallery";
import { FeaturedCollection } from "@/components/sections/FeaturedCollection";
import { Commission } from "@/components/sections/Commission";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { CategoryCards } from "@/components/sections/CategoryCards";
import { Hero } from "@/components/sections/Hero";
import { InteriorShowcase } from "@/components/sections/InteriorShowcase";
import { Journal } from "@/components/sections/Journal";
import { Newsletter } from "@/components/sections/Newsletter";
import { Testimonials } from "@/components/sections/Testimonials";
import { SocialGallery } from "@/components/sections/SocialGallery";

/** Route files stay thin: this page only decides the order of sections. */
export default function Home() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <CategoryCards />
      <FeaturedProducts />
      <FeaturedCollection />
      <InteriorShowcase />
      <CollectionGallery />
      <Commission />
      <BrandStory />
      <Testimonials />
      <Journal />
      <SocialGallery />
      <Newsletter />
    </>
  );
}
