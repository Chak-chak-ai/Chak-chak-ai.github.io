'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cartTotal, readCart, type CartItem, writeCart } from '../lib/cart';

export function CartView() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => setItems(readCart()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function setQuantity(slug: string, quantity: number) {
    const next = quantity > 0
      ? items.map((item) => item.slug === slug ? { ...item, quantity } : item)
      : items.filter((item) => item.slug !== slug);
    setItems(next);
    writeCart(next);
  }

  if (!items.length) {
    return (
      <section className="cart-empty">
        <p>Корзина пока пуста.</p>
        <Link className="button-primary" href="/#selection">Перейти к товарам</Link>
      </section>
    );
  }

  const emailBody = [
    'Здравствуйте! Прошу подготовить предложение по следующим позициям:',
    '',
    ...items.map((item) => `${item.name} — ${item.quantity} шт. — ${(item.priceRub * item.quantity).toLocaleString('ru-RU')} ₽`),
    '',
    `Итого: ${cartTotal(items).toLocaleString('ru-RU')} ₽ с НДС`,
  ].join('\n');
  const emailHref = `mailto:?subject=${encodeURIComponent('Заказ оборудования СервисПромМаш')}&body=${encodeURIComponent(emailBody)}`;

  return (
    <div className="cart-layout">
      <div className="cart-list">
        {items.map((item) => (
          <article className="cart-row" key={item.slug}>
            <Link className="cart-row-image" href={`/catalog/product/${item.slug}`}>
              <img src={item.image} alt="" />
            </Link>
            <div className="cart-row-copy">
              <Link href={`/catalog/product/${item.slug}`}>{item.name}</Link>
              <button type="button" onClick={() => setQuantity(item.slug, 0)}>Удалить</button>
            </div>
            <div className="cart-quantity" aria-label={`Количество: ${item.name}`}>
              <button type="button" onClick={() => setQuantity(item.slug, item.quantity - 1)} aria-label="Уменьшить количество">−</button>
              <span>{item.quantity}</span>
              <button type="button" onClick={() => setQuantity(item.slug, item.quantity + 1)} aria-label="Увеличить количество">+</button>
            </div>
            <strong>{(item.priceRub * item.quantity).toLocaleString('ru-RU')} ₽</strong>
          </article>
        ))}
      </div>
      <aside className="cart-summary">
        <h2>Ваш заказ</h2>
        <div className="cart-summary-line"><span>Товары</span><strong>{items.reduce((total, item) => total + item.quantity, 0)}</strong></div>
        <p>Итого</p>
        <strong>{cartTotal(items).toLocaleString('ru-RU')} ₽</strong>
        <span>Стоимость указана с НДС.</span>
        <a className="button-primary" href={emailHref}>Оформить заказ / получить счёт</a>
        <p className="cart-summary-note">Состав заказа можно уточнить с менеджером перед выставлением счёта.</p>
      </aside>
    </div>
  );
}
