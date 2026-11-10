export const WISHLIST_STORAGE_KEY = "sumaira-arts-wishlist";
export const WISHLIST_UPDATED_EVENT = "sumaira-wishlist-updated";

let cachedWishlist: string[] = [];
let cachedValue: string | null = null;

export const getWishlist = () => {
  if (typeof window === "undefined") return cachedWishlist;
  try {
    const stored = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (stored !== cachedValue) {
      const parsed = stored ? JSON.parse(stored) : [];
      cachedWishlist = Array.isArray(parsed) ? parsed.filter((slug): slug is string => typeof slug === "string") : [];
      cachedValue = stored;
    }
  } catch {
    cachedWishlist = [];
    cachedValue = null;
  }
  return cachedWishlist;
};

export const subscribeToWishlist = (onChange: () => void) => {
  const onStorage = (event: StorageEvent) => event.key === WISHLIST_STORAGE_KEY && onChange();
  window.addEventListener("storage", onStorage);
  window.addEventListener(WISHLIST_UPDATED_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(WISHLIST_UPDATED_EVENT, onChange);
  };
};

export const saveWishlist = (wishlist: string[]) => {
  const uniqueWishlist = [...new Set(wishlist)];
  cachedWishlist = uniqueWishlist;
  cachedValue = JSON.stringify(uniqueWishlist);
  window.localStorage.setItem(WISHLIST_STORAGE_KEY, cachedValue);
  window.dispatchEvent(new Event(WISHLIST_UPDATED_EVENT));
};
