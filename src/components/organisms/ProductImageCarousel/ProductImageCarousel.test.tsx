import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { ProductImageCarousel } from ".";

it("renders product image carousel with images", () => {
  const { container } = render(
    <ProductImageCarousel images={["/img1.webp", "/img2.webp"]} productName="Gold Calligraphy" />
  );
  expect(container).toBeInTheDocument();
});
