import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { CollectionFeature } from ".";

it("renders featured artwork collection highlight", () => {
  const { container } = render(
    <ReduxProvider>
      <CollectionFeature />
    </ReduxProvider>
  );
  expect(container.firstChild).toBeInTheDocument();
});
