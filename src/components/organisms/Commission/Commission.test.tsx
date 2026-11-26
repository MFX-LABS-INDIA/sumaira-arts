import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { Commission } from ".";

it("renders bespoke art commission section", () => {
  const { container } = render(<Commission />);
  expect(container.firstChild).toBeInTheDocument();
});
