/**
 * Every public page in one place. The sitemap is generated from this, so a new page
 * only needs one line here (plus its folder under src/app/(site)).
 */
export const routes = {
  home: "/",
  about: "/about",
  products: "/products",
  cart: "/cart",
  orders: "/orders",
  privacy: "/privacy",
} as const;
