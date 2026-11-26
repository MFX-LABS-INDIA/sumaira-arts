import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { ImageWithText } from ".";

it("renders image with heading and body text", () => {
  const { container } = render(
    <ImageWithText
      feature={{
        art: "allah",
        image: "/test.webp",
        alt: "Craft",
        title: "Textured Layers",
        description: "Gold leaf",
        cta: { label: "Learn more", href: "/about" },
      }}
    />
  );
  expect(container).toBeInTheDocument();
});
