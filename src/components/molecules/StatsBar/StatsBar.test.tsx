import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { Calendar } from "lucide-react";
import { StatsBar } from ".";

it("renders stats bar with key metrics", () => {
  const { container } = render(
    <StatsBar
      items={[
        { value: "35+", label: "Luxury Brands", icon: <Calendar className="h-4 w-4" /> },
      ]}
    />
  );
  expect(container).toBeInTheDocument();
});
