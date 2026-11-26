import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { BrandStatement } from ".";

it("renders the luxury studio brand statement", () => {
  const { container } = render(<BrandStatement />);
  expect(container.firstChild).toBeInTheDocument();
});
