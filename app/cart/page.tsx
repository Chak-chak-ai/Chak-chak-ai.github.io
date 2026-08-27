import type { Metadata } from 'next';
import { CartView } from '../../components/CartView';
import { SiteFooter } from '../../components/SiteFooter';
import { SiteHeader } from '../../components/SiteHeader';

export const metadata: Metadata = {
  title: 'Корзина',
  description: 'Товары, выбранные для заказа.',
};

export default function CartPage() {
  return (
    <main>
      <SiteHeader />
      <section className="cart-intro">
        <div>
          <h1>Корзина</h1>
          <p>Товары перед оформлением заказа</p>
        </div>
      </section>
      <CartView />
      <SiteFooter />
    </main>
  );
}
