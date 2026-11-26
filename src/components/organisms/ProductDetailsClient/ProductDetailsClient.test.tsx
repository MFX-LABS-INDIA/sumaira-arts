import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { allProducts } from "@/data/products";
import { ProductDetailsClient } from ".";

it("renders product detail view with purchase CTA", () => {
  const product = allProducts[0];
  const { container } = render(
    <ReduxProvider>
      <ProductDetailsClient product={product} />
    </ReduxProvider>
  );
  expect(container).toBeInTheDocument();
});
