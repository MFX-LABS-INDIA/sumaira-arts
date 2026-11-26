import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { allProducts } from "@/data/products";
import type { Product } from "@/types/content";
import { ProductCard } from ".";

it("renders product card with title and price", () => {
  const p = allProducts[0];
  const product: Product = {
    ...p,
    price: p.priceUSD,
    category: "Originals",
    art: "allah",
    scene: "living",
  };

  const { container } = render(
    <ReduxProvider>
      <ProductCard product={product} index={0} />
    </ReduxProvider>
  );
  expect(container).toBeInTheDocument();
});
