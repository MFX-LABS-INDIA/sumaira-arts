import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { WorkshopsGallery } from ".";

it("renders workshops gallery grid", () => {
  const { container } = render(<WorkshopsGallery items={[]} />);
  expect(container.firstChild).toBeInTheDocument();
});
