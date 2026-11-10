"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { mainNav } from "@/data/navigation";
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, UserIcon } from "@/components/ui/Icons";
import { SmartLink } from "@/components/ui/Link";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useAppSelector } from "@/store/hooks";
import { Languages } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

const ORDERS_STORAGE_KEY = "sumaira-arts-orders";
const ORDERS_UPDATED_EVENT = "sumaira-orders-updated";
const LOCALE_STORAGE_KEY = "sumaira-arts-locale";
const LOCALE_UPDATED_EVENT = "sumaira-locale-updated";
const WISHLIST_STORAGE_KEY = "sumaira-arts-wishlist";
const WISHLIST_UPDATED_EVENT = "sumaira-wishlist-updated";

type Locale = "en-GB" | "ar" | "fr" | "es";

const languages: Record<Locale, { label: string; countryCode: string; direction: "ltr" | "rtl" }> = {
  "en-GB": { label: "English (UK)", countryCode: "GB", direction: "ltr" },
  ar: { label: "العربية", countryCode: "SA", direction: "rtl" },
  fr: { label: "Français", countryCode: "FR", direction: "ltr" },
  es: { label: "Español", countryCode: "ES", direction: "ltr" },
};

const navTranslations: Record<Locale, Record<string, string>> = {
  "en-GB": {},
  ar: {
    Products: "المنتجات", About: "حول", "Contact Us": "اتصل بنا", Cart: "السلة", Wishlist: "المفضلة", "My Orders": "طلباتي", Journal: "المجلة",
  },
  fr: {
    Products: "Produits", About: "À propos", "Contact Us": "Nous contacter", Cart: "Panier", Wishlist: "Favoris", "My Orders": "Mes commandes", Journal: "Journal",
  },
  es: {
    Products: "Productos", About: "Acerca de", "Contact Us": "Contacto", Cart: "Carrito", Wishlist: "Favoritos", "My Orders": "Mis pedidos", Journal: "Revista",
  },
};

const subscribeToScroll = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};

const getOrderCount = () => {
  try {
    const storedOrders = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    const orders = storedOrders ? JSON.parse(storedOrders) : [];
    return Array.isArray(orders) ? orders.length : 0;
  } catch {
    return 0;
  }
};

const subscribeToOrders = (onChange: () => void) => {
  const onStorage = (event: StorageEvent) => {
    if (event.key === ORDERS_STORAGE_KEY) onChange();
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(ORDERS_UPDATED_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(ORDERS_UPDATED_EVENT, onChange);
  };
};

const getWishlistCount = () => {
  try {
    const saved = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    const wishlist = saved ? JSON.parse(saved) : [];
    return Array.isArray(wishlist) ? wishlist.length : 0;
  } catch { return 0; }
};

const subscribeToWishlist = (onChange: () => void) => {
  const onStorage = (event: StorageEvent) => event.key === WISHLIST_STORAGE_KEY && onChange();
  window.addEventListener("storage", onStorage);
  window.addEventListener(WISHLIST_UPDATED_EVENT, onChange);
  return () => { window.removeEventListener("storage", onStorage); window.removeEventListener(WISHLIST_UPDATED_EVENT, onChange); };
};

const getLocale = (): Locale => {
  const locale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return locale && locale in languages ? locale as Locale : "en-GB";
};

const subscribeToLocale = (onChange: () => void) => {
  const onStorage = (event: StorageEvent) => {
    if (event.key === LOCALE_STORAGE_KEY) onChange();
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(LOCALE_UPDATED_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(LOCALE_UPDATED_EVENT, onChange);
  };
};

function CountBadge({ count }: { count: number }) {
  if (count < 1) return null;

  return (
    <span className="inline-flex min-w-4 items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 font-mono text-[10px] font-bold leading-none text-white shadow-sm ring-2 ring-white" aria-label={`${count} items`}>
      {count > 99 ? "99+" : count}
    </span>
  );
}

const iconLayer = "absolute inset-0 h-6 w-6 transition-[opacity,transform] duration-300 ease-out-soft motion-reduce:transition-none";

/** Each drawer row slides in from the end edge and fades, one after another (delay set inline). */
const drawerItem = (open: boolean) =>
  `transition-[opacity,transform] duration-500 ease-out-soft motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
    open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0 rtl:-translate-x-6"
  }`;

/** Scroll distance before the header gains its shadow. */
const SHADOW_AFTER = 40;

export function Header() {
  const cartItemCount = useAppSelector((state) => state.cart.cartItemCount);
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > SHADOW_AFTER,
    () => false,
  );
  const orderCount = useSyncExternalStore(subscribeToOrders, getOrderCount, () => 0);
  const wishlistCount = useSyncExternalStore(subscribeToWishlist, getWishlistCount, () => 0);
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const locale = useSyncExternalStore<Locale>(subscribeToLocale, getLocale, () => "en-GB");

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = languages[locale].direction;
  }, [locale]);

  const selectLocale = (nextLocale: Locale) => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    window.dispatchEvent(new Event(LOCALE_UPDATED_EVENT));
    setLanguageOpen(false);
  };

  const navLabel = (label: string) => navTranslations[locale][label] ?? label;

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

          <nav aria-label="Primary" className="absolute start-1/2 hidden -translate-x-1/2 lg:block">
            <ul className="flex items-center gap-7">
              {mainNav.filter((link) => !["Cart", "Wishlist", "My Orders"].includes(link.label)).map((link) => (
                <li key={link.label}>
                  <SmartLink href={link.href} className={navLink}>
                    {navLabel(link.label)}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ms-auto hidden items-center gap-1 lg:flex">
            <div className="relative order-last ms-1">
              <button type="button" aria-label="Choose language" aria-expanded={languageOpen} aria-haspopup="listbox" onClick={() => setLanguageOpen((value) => !value)} className="inline-flex items-center gap-2 rounded-full border border-light px-3 py-2 text-xs font-semibold text-deep transition-colors hover:border-brand hover:text-brand">
                <Languages className="h-4 w-4" aria-hidden />
                <ReactCountryFlag svg countryCode={languages[locale].countryCode} aria-label={languages[locale].label} className="h-4 w-5 rounded-sm object-cover" />
              </button>
              {languageOpen ? (
              <div role="listbox" aria-label="Language" className="absolute end-0 top-[calc(100%+0.5rem)] z-50 w-44 overflow-hidden rounded-xl border border-light bg-white py-1 shadow-raised">
                {(Object.keys(languages) as Locale[]).map((language) => (
                  <button
                    key={language}
                    type="button"
                    role="option"
                    aria-selected={locale === language}
                    onClick={() => selectLocale(language)}
                    className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors hover:bg-ice ${locale === language ? "bg-ice text-brand" : "text-deep"}`}
                  >
                    <ReactCountryFlag
                      svg
                      countryCode={languages[language].countryCode}
                      aria-label={languages[language].label}
                      className="h-4 w-5 shrink-0 rounded-sm object-cover"
                    />
                    <span>{languages[language].label}</span>
                  </button>
                ))}
              </div>
              ) : null}
            </div>
            <SmartLink href="/wishlist" aria-label="Wishlist" className="group relative flex h-10 w-10 items-center justify-center rounded-full text-deep transition-colors hover:bg-ice hover:text-brand"><HeartIcon className="h-5 w-5" /><span className="absolute end-0 top-0"><CountBadge count={wishlistCount} /></span><span role="tooltip" className="pointer-events-none absolute end-0 top-full mt-2 whitespace-nowrap rounded-md bg-deep px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white opacity-0 shadow-raised transition-opacity group-hover:opacity-100">Wishlist</span></SmartLink>
            <SmartLink href="/orders" aria-label="My orders" className="group relative flex h-10 w-10 items-center justify-center rounded-full text-deep transition-colors hover:bg-ice hover:text-brand"><UserIcon className="h-5 w-5" /><span className="absolute end-0 top-0"><CountBadge count={orderCount} /></span><span role="tooltip" className="pointer-events-none absolute end-0 top-full mt-2 whitespace-nowrap rounded-md bg-deep px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white opacity-0 shadow-raised transition-opacity group-hover:opacity-100">My orders</span></SmartLink>
            <SmartLink href="/cart" aria-label="Cart" className="group relative flex h-10 w-10 items-center justify-center rounded-full text-deep transition-colors hover:bg-ice hover:text-brand"><BagIcon className="h-5 w-5" /><span className="absolute end-0 top-0"><CountBadge count={cartItemCount} /></span><span role="tooltip" className="pointer-events-none absolute end-0 top-full mt-2 whitespace-nowrap rounded-md bg-deep px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white opacity-0 shadow-raised transition-opacity group-hover:opacity-100">Cart</span></SmartLink>
          </div>

          <div className="flex items-center gap-1">
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
                    className="flex items-center justify-between gap-4 py-4 font-serif text-3xl text-deep transition-colors hover:text-brand"
                  >
                    <span>{navLabel(link.label)}</span>
                    {link.label === "Cart" ? <CountBadge count={cartItemCount} /> : null}
                    {link.label === "Wishlist" ? <CountBadge count={wishlistCount} /> : null}
                    {link.label === "My Orders" ? <CountBadge count={orderCount} /> : null}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8 border-t border-light pt-6">
            <p className="text-label font-medium uppercase tracking-eyebrow text-steel">Language</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(Object.keys(languages) as Locale[]).map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => selectLocale(language)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${locale === language ? "border-brand bg-ice text-brand" : "border-light text-deep hover:border-brand"}`}
                >
                  <ReactCountryFlag
                    svg
                    countryCode={languages[language].countryCode}
                    aria-label={languages[language].label}
                    className="h-4 w-5 shrink-0 rounded-sm object-cover"
                  />
                  <span>{languages[language].label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide-over cart drawer */}
      <CartDrawer />
    </>
  );
}
