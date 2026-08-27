import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contacts">
      <div className="footer-topline">
        <div className="footer-brand">
          <img src="/logo-spm-black.png" alt="" />
          <p>ООО «СервисПромМаш»</p>
        </div>
        <p>Поставка, сервис и поверка счётчиков жидкости СЖ-ППО.</p>
      </div>
      <nav className="footer-nav" aria-label="Дополнительная навигация">
        <Link href="/#about">Компания</Link>
        <Link href="/#delivery">Доставка и оплата</Link>
        <Link href="/#documents">Документы</Link>
        <Link href="/#contacts">Контакты</Link>
        <Link href="/#contacts">Реквизиты</Link>
      </nav>
    </footer>
  );
}
