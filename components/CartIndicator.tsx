'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cartItemCount, cartUpdatedEvent, readCart } from '../lib/cart';

export function CartIndicator() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(cartItemCount(readCart()));
    update();
    window.addEventListener(cartUpdatedEvent, update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener(cartUpdatedEvent, update);
      window.removeEventListener('storage', update);
    };
  }, []);

  return <Link className="header-cart" href="/cart">Корзина <span>{count}</span></Link>;
}
