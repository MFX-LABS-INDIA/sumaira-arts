import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { HeroControls } from ".";

const labels = { slide: "Slide", of: "of", previous: "Previous slide", next: "Next slide",
  goTo: "Go to slide", pause: "Pause carousel", play: "Play carousel" };

it("moves between slides and toggles playback using labelled controls", async () => {
  const user = userEvent.setup();
  render(<section><HeroControls count={3} labels={labels} /></section>);
  await user.click(screen.getByRole("button", { name: "Next slide" }));
  expect(screen.getByRole("button", { name: "Go to slide 2 of 3" })).toHaveAttribute("aria-current", "true");
  await user.click(screen.getByRole("button", { name: "Pause carousel" }));
  expect(screen.getByRole("button", { name: "Play carousel" })).toBeInTheDocument();
});
