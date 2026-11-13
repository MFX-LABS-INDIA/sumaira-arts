/** The three catalogue categories, in the same order as the homepage. */
export const artworkCategories = [
  {
    id: "Original_Texture",
    title: "Originals",
    eyebrow: "Discover depth and texture",
    description:
      "Explore original canvases with sculptural surfaces and flowing calligraphy. Choose a piece whose texture is part of the story.",
    productSlug: "waves-of-patience",
  },
  {
    id: "Mixed_Media_Artworks",
    title: "Mixed Media",
    eyebrow: "Make a statement",
    description:
      "Discover individual pieces where Arabic script, colour and layered detail come together. Find a focal point with a meaning of its own.",
    productSlug: "enlightening",
  },
  {
    id: "Mixed_Media_Canvas",
    title: "Collections",
    eyebrow: "Find your colour story",
    description:
      "Explore calligraphy through expressive palettes and compositions. Start with the colours and mood you want to bring into your room.",
    productSlug: "99-names-golden-edition",
  },
] as const;

export const categoryHref = (id: string) => `/products?category=${encodeURIComponent(id)}`;
