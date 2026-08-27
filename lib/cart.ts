export type CartItem = {
  slug: string;
  name: string;
  priceRub: number;
  image: string;
  quantity: number;
};

export const cartStorageKey = 'service-plus-m-cart';
export const cartUpdatedEvent = 'servicepm:cart-updated';

function isStoredItem(value: unknown): value is Omit<CartItem, 'quantity'> & { quantity?: number } {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return typeof item.slug === 'string'
    && typeof item.name === 'string'
    && typeof item.priceRub === 'number'
    && typeof item.image === 'string';
}

export function readCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(cartStorageKey);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isStoredItem).map((item) => ({
      ...item,
      quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1,
    }));
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]) {
  window.localStorage.setItem(cartStorageKey, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(cartUpdatedEvent));
}

export function cartItemCount(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.priceRub * item.quantity, 0);
}
