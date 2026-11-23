/**
 * Every public page in one place. The sitemap is generated from this, so a new page
 * only needs one line here (plus its folder under src/app/(site)).
 */
export const routes = {
  home: "/",
  products: "/products",
  liveEvents: "/live-events",
  workshops: "/workshops",
  about: "/about",
  cart: "/cart",
  orders: "/orders",
  privacy: "/privacy",
} as const;
