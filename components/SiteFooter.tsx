import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contacts">
      <div className="footer-main">
        <div className="footer-identity">
          <Link className="footer-brand" href="/" aria-label="СервисПромМаш — на главную">
            <img src="/logo-spm-black.png" alt="" />
            <span>
              <small>ООО</small>
              <strong>«СервисПромМаш»</strong>
            </span>
          </Link>
          <p>Поставка, ремонт, тарировка и поверка счётчиков жидкости СЖ-ППО.</p>
        </div>

        <div className="footer-link-columns">
          <div className="footer-link-group">
            <p>Основное</p>
            <nav aria-label="Основная навигация в подвале">
              <Link href="/#selection">Каталог</Link>
              <Link href="/#service">Услуги</Link>
              <Link href="/#about">Компания</Link>
            </nav>
          </div>
          <div className="footer-link-group">
            <p>Покупателям</p>
            <nav aria-label="Информация для покупателей">
              <Link href="/#delivery">Доставка и оплата</Link>
              <Link href="/#documents">Документы</Link>
              <Link href="/cart">Корзина</Link>
            </nav>
          </div>
        </div>

        <div className="footer-order">
          <strong>Нужна помощь с подбором?</strong>
          <p>Выберите модель или соберите заказ — уточним исполнение и подготовим предложение.</p>
          <Link href="/cart">Перейти к заказу <span aria-hidden="true">→</span></Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 ООО «СервисПромМаш»</span>
        <Link href="/#top">Наверх</Link>
      </div>
    </footer>
  );
}
