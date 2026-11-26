import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { Header } from ".";

it("renders site header navigation links", () => {
  const { container } = render(
    <ReduxProvider>
      <Header />
    </ReduxProvider>
  );
  expect(container.firstChild).toBeInTheDocument();
});
