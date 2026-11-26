import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { ButtonLink, SmartLink, TextLink } from ".";

it("keeps section links as native anchors for smooth scrolling", () => {
  render(<SmartLink href="#collections">Collections</SmartLink>);
  expect(screen.getByRole("link", { name: "Collections" })).toHaveAttribute("href", "#collections");
});

it("gives button and editorial links accessible destinations", () => {
  render(<><ButtonLink href="/products">Shop now</ButtonLink><TextLink href="/about">Our story</TextLink></>);
  expect(screen.getByRole("link", { name: "Shop now" })).toHaveAttribute("href", "/products");
  expect(screen.getByRole("link", { name: /Our story/ })).toHaveAttribute("href", "/about");
});
