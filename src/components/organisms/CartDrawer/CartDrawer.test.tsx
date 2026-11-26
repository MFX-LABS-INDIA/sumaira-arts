import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { CartDrawer } from ".";

it("renders cart drawer in closed state by default", () => {
  const { container } = render(
    <ReduxProvider>
      <CartDrawer />
    </ReduxProvider>
  );
  expect(container).toBeInTheDocument();
});
