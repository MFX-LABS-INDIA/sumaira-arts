import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { ContactDialog } from ".";

it("renders contact dialog trigger listener without crashing", () => {
  const { container } = render(<ContactDialog />);
  expect(container).toBeInTheDocument();
});
