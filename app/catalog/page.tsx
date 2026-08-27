import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../components/SiteFooter';
import { SiteHeader } from '../../components/SiteHeader';
import { familyMeta } from '../../lib/catalog';

export const metadata: Metadata = {
  title: 'Каталог счётчиков СЖ-ППО',
  description: 'Выбор счётчиков СЖ-ППО-25 и СЖ-ППО-40 по условному проходу.',
};

export default function CatalogPage() {
  return (
    <main>
      <SiteHeader />
      <section className="catalog-intro">
        <div>
          <div className="breadcrumbs"><Link href="/">Главная</Link><span>/</span><span>Каталог</span></div>
          <h1>Каталог счётчиков</h1>
        </div>
        <p>Выберите условный проход. На следующей странице сразу показаны все исполнения выбранного типоразмера.</p>
      </section>
      <div className="catalog-families">
        {(Object.entries(familyMeta) as Array<[keyof typeof familyMeta, (typeof familyMeta)[keyof typeof familyMeta]]>).map(([key, family]) => (
          <Link className="catalog-family" href={`/catalog/${key}`} key={key}>
            <span className="catalog-family-number">{family.diameter}</span>
            <span className="catalog-family-copy">
              <small>Условный проход DN {family.diameter}</small>
              <strong>{family.title}</strong>
              <span>{family.flow} · {family.pressure}</span>
            </span>
            <span className="catalog-family-action">Все исполнения <b aria-hidden="true">→</b></span>
          </Link>
        ))}
      </div>
      <SiteFooter />
    </main>
  );
}
