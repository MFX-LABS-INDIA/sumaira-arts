import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { CategoryFilter } from ".";

const categories = [
  { id: "all", label: "All artworks" },
  { id: "originals", label: "Originals" },
];

it("selects a category from the desktop list", async () => {
  const user = userEvent.setup();
  const onSelectCategory = vi.fn();
  render(
    <CategoryFilter categories={categories} selectedCategory="all" onSelectCategory={onSelectCategory}
      isSectionOpen onSectionToggle={vi.fn()} isModalOpen={false} onModalToggle={vi.fn()} />,
  );
  await user.click(screen.getByRole("radio", { name: "Select Originals" }));
  expect(onSelectCategory).toHaveBeenCalledWith("originals");
});

it("opens and closes the mobile category dialog", async () => {
  const user = userEvent.setup();
  const onModalToggle = vi.fn();
  const { rerender } = render(
    <CategoryFilter categories={categories} selectedCategory="all" onSelectCategory={vi.fn()}
      isMobile isSectionOpen onSectionToggle={vi.fn()} isModalOpen={false} onModalToggle={onModalToggle} />,
  );
  await user.click(screen.getByRole("button", { name: "Open category filter" }));
  expect(onModalToggle).toHaveBeenCalledWith(true);
  rerender(
    <CategoryFilter categories={categories} selectedCategory="all" onSelectCategory={vi.fn()}
      isMobile isSectionOpen onSectionToggle={vi.fn()} isModalOpen onModalToggle={onModalToggle} />,
  );
  await user.click(screen.getByRole("button", { name: "Close category filter" }));
  expect(onModalToggle).toHaveBeenCalledWith(false);
});
