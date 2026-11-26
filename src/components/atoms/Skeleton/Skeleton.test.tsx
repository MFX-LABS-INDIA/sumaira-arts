import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { Skeleton } from ".";

it("renders skeleton placeholder element", () => {
  const { container } = render(<Skeleton className="h-6 w-20" />);
  expect(container.firstChild).toBeInTheDocument();
});
