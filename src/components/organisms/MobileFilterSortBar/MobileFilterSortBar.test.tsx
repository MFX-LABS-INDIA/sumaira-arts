import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { MobileFilterSortBar } from ".";

it("selects a sort order and closes its sheet", async () => {
  const user = userEvent.setup();
  const onSortChange = vi.fn();
  render(
    <MobileFilterSortBar categories={[{ id: "all", label: "All artworks" }]}
      selectedCategory="all" onSelectCategory={vi.fn()} sortBy="featured"
      onSortChange={onSortChange} searchQuery="" onSearchChange={vi.fn()} searchSuggestions={[]} />,
  );
  await user.click(screen.getByRole("button", { name: "Sort" }));
  await user.click(screen.getByRole("button", { name: "Price: Low to High" }));
  expect(onSortChange).toHaveBeenCalledWith("price-asc");
  expect(screen.queryByText("Sort Artworks")).not.toBeInTheDocument();
});

it("searches and chooses an artwork suggestion", async () => {
  const user = userEvent.setup();
  const onSearchChange = vi.fn();
  const props = { categories: [], selectedCategory: "all", onSelectCategory: vi.fn(),
    sortBy: "featured", onSortChange: vi.fn(), searchQuery: "", onSearchChange,
    searchSuggestions: [{ label: "Depths of Tawbah", detail: "Original" }] };
  const { rerender } = render(<MobileFilterSortBar {...props} />);
  await user.click(screen.getByRole("button", { name: "Search artworks" }));
  await user.type(screen.getByPlaceholderText("Search artworks..."), "Depths");
  expect(onSearchChange).toHaveBeenCalled();
  rerender(<MobileFilterSortBar {...props} searchQuery="Depths" />);
  await user.click(screen.getByRole("button", { name: /Depths of Tawbah/ }));
  expect(onSearchChange).toHaveBeenCalledWith("Depths of Tawbah");
});
