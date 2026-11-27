import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { CartQuantityNote } from ".";

it("shows the quantity until the last copy is removed", () => {
  const { rerender } = render(<CartQuantityNote quantity={1} />);
  expect(screen.getByText("In your cart").parentElement).toHaveTextContent("1 In your cart");
  rerender(<CartQuantityNote quantity={12} />);
  expect(screen.getByText("In your cart").parentElement).toHaveTextContent("12 In your cart");
  rerender(<CartQuantityNote quantity={0} />);
  expect(screen.queryByText(/in your cart/i)).not.toBeInTheDocument();
});
