import Link from 'next/link';
import { CartIndicator } from './CartIndicator';

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="СервисПромМаш — на главную">
        <span className="brand-mark" aria-hidden="true"><img src="/logo-spm-black.png" alt="" /></span>
        <span className="brand-name">СервисПромМаш</span>
      </Link>
      <nav className="main-nav" aria-label="Основная навигация">
        <Link href="/#selection">Каталог</Link>
        <Link className="nav-secondary" href="/#service">Услуги</Link>
        <Link className="nav-secondary" href="/#delivery">Доставка</Link>
        <Link className="nav-secondary" href="/#contacts">Контакты</Link>
      </nav>
      <CartIndicator />
    </header>
  );
}
