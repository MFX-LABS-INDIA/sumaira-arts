"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { mainNav } from "@/data/navigation";
import { BagIcon, CloseIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/ui/Icons";
import { SmartLink } from "@/components/ui/Link";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

const subscribeToScroll = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};

const iconSize = "h-[1.35rem] w-[1.35rem]";
const iconLayer = "absolute inset-0 h-6 w-6 transition-[opacity,transform] duration-300 ease-out-soft motion-reduce:transition-none";

/** Each drawer row slides in from the end edge and fades, one after another (delay set inline). */
const drawerItem = (open: boolean) =>
  `transition-[opacity,transform] duration-500 ease-out-soft motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
    open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0 rtl:-translate-x-6"
  }`;

/** Scroll distance before the header gains its shadow. */
const SHADOW_AFTER = 40;

export function Header() {
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > SHADOW_AFTER,
    () => false,
  );
  const [open, setOpen] = useState(false);

  // While the drawer is open: Escape closes it, the page behind stops scrolling, and it closes itself
  // if the window grows to desktop width (where the drawer does not exist).
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = (event: MediaQueryListEvent) => event.matches && setOpen(false);
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  // Always white. The shadow appears once the page moves (or the menu opens) so the bar reads as raised.
  const raised = scrolled || open;
  const iconButton = "p-2 text-deep transition-colors duration-300 hover:text-brand";
  const navLink =
    "relative py-2 text-label font-medium uppercase tracking-caps text-deep after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:after:scale-x-100";

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-light bg-white transition-shadow duration-300 ${raised ? "shadow-raised" : ""}`}
      >
        <Container className="flex h-19 items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {mainNav.map((link) => (
                <li key={link.label}>
                  <SmartLink href={link.href} className={navLink}>
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <button type="button" aria-label="Search" className={`${iconButton} hidden lg:block`}>
              <SearchIcon className={iconSize} />
            </button>
            <button type="button" aria-label="Account" className={`${iconButton} hidden lg:block`}>
              <UserIcon className={iconSize} />
            </button>
            <button type="button" aria-label="Cart" className={iconButton}>
              <BagIcon className={iconSize} />
            </button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
              className={`${iconButton} lg:hidden`}
            >
              <span className="relative block h-6 w-6">
                <MenuIcon className={`${iconLayer} ${open ? "rotate-90 scale-75 opacity-0" : ""}`} />
                <CloseIcon className={`${iconLayer} ${open ? "" : "-rotate-90 scale-75 opacity-0"}`} />
              </span>
            </button>
          </div>
        </Container>
      </header>

      {/*
        The drawer is a sibling of the header on purpose: backdrop-filter on an ancestor would trap this
        fixed layer. Only transform and opacity animate, so it stays on the compositor and smooth on phones.
      */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-x-0 bottom-0 top-19 z-40 overflow-hidden transition-[visibility] duration-0 lg:hidden ${
          open ? "visible delay-0" : "invisible delay-[450ms] motion-reduce:delay-0"
        }`}
      >
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-deep/40 transition-opacity duration-[450ms] ease-out-soft motion-reduce:transition-none ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          data-lenis-prevent
          className={`absolute inset-y-0 end-0 w-[min(22rem,86vw)] overflow-y-auto overscroll-contain bg-white px-8 pb-12 pt-6 shadow-raised transition-transform duration-[450ms] ease-out-soft motion-reduce:transition-none ${
            open ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
          }`}
        >
          <nav aria-label="Mobile">
            <ul className="divide-y divide-light">
              {mainNav.map((link, index) => (
                <li key={link.label} style={{ transitionDelay: open ? `${140 + index * 55}ms` : "0ms" }} className={drawerItem(open)}>
                  <SmartLink
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 font-serif text-3xl text-deep transition-colors hover:text-brand"
                  >
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
          <div
            style={{ transitionDelay: open ? `${140 + mainNav.length * 55}ms` : "0ms" }}
            className={`mt-8 flex gap-6 text-label font-medium uppercase tracking-caps text-steel ${drawerItem(open)}`}
          >
            <button type="button" className="inline-flex items-center gap-2">
              <SearchIcon className="h-5 w-5" /> Search
            </button>
            <button type="button" className="inline-flex items-center gap-2">
              <UserIcon className="h-5 w-5" /> Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
