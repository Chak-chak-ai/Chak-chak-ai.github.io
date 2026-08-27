'use client';

import { useEffect, useState } from 'react';
import { readCart, writeCart } from '../lib/cart';

type CartProduct = {
  slug: string;
  name: string;
  priceRub: number;
  image: string;
};

export function AddToCartButton({ product, compact = false }: { product: CartProduct; compact?: boolean }) {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsAdded(readCart().some((item) => item.slug === product.slug));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [product.slug]);

  function addToCart() {
    const cart = readCart();
    const existing = cart.find((item) => item.slug === product.slug);
    if (existing) {
      writeCart(cart.map((item) => item.slug === product.slug
        ? { ...item, quantity: item.quantity + 1 }
        : item));
    } else {
      writeCart([...cart, { ...product, quantity: 1 }]);
    }
    setIsAdded(true);
  }

  return (
    <button
      className={compact ? 'product-buy-button' : 'button-primary pdp-action'}
      type="button"
      onClick={addToCart}
      aria-live="polite"
    >
      {isAdded ? 'Добавить ещё' : 'В корзину'}
    </button>
  );
}
