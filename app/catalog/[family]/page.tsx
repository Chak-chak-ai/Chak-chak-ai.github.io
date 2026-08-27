import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductCard } from '../../../components/ProductCard';
import { SiteFooter } from '../../../components/SiteFooter';
import { SiteHeader } from '../../../components/SiteHeader';
import { familyMeta, isFamily, productsForFamily } from '../../../lib/catalog';

export function generateStaticParams() {
  return [{ family: 'ppo-25' }, { family: 'ppo-40' }];
}

export async function generateMetadata({ params }: { params: Promise<{ family: string }> }): Promise<Metadata> {
  const { family } = await params;
  if (!isFamily(family)) return {};
  const meta = familyMeta[family];
  return {
    title: `${meta.title} — каталог моделей`,
    description: `Счётчики ${meta.title}: условный проход ${meta.diameter} мм, расход ${meta.flow}.`,
  };
}

export default async function FamilyPage({ params }: { params: Promise<{ family: string }> }) {
  const { family } = await params;
  if (!isFamily(family)) notFound();

  const meta = familyMeta[family];
  const familyProducts = productsForFamily(family);
  const accuracy025 = familyProducts.filter((product) => product.errorClassOrLimit === '0,25');
  const accuracy05 = familyProducts.filter((product) => product.errorClassOrLimit === '0,5');

  return (
    <main>
      <SiteHeader />
      <section className="family-intro">
        <div>
          <div className="breadcrumbs"><Link href="/">Главная</Link><span>/</span><Link href="/#selection">Счётчики нефтепродуктов</Link></div>
          <h1>{meta.title}</h1>
        </div>
        <dl className="family-summary">
          <div><dt>Условный проход</dt><dd>DN {meta.diameter}</dd></div>
          <div><dt>Рабочее давление</dt><dd>{meta.pressure}</dd></div>
          <div><dt>Расход</dt><dd>{meta.flow}</dd></div>
          <div><dt>Каталог</dt><dd>Все модели</dd></div>
        </dl>
      </section>

      <section className="store-grid-section" aria-labelledby="store-grid-title-025">
          <div className="store-grid-heading">
            <h2 id="store-grid-title-025">Предел допускаемой погрешности 0,25%</h2>
            <p>Модели с условным проходом DN {meta.diameter}.</p>
          </div>
          <div className="store-grid">
            {accuracy025.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
      </section>

      <section className="store-grid-section" aria-labelledby="store-grid-title-05">
        <div className="store-grid-heading">
          <h2 id="store-grid-title-05">Предел допускаемой погрешности 0,5%</h2>
          <p>Модели с условным проходом DN {meta.diameter}.</p>
        </div>
        <div className="store-grid">
          {accuracy05.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
