import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AddToCartButton } from '../../../../components/AddToCartButton';
import { SiteFooter } from '../../../../components/SiteFooter';
import { SiteHeader } from '../../../../components/SiteHeader';
import {
  accuracyLabel,
  familyForProduct,
  familyMeta,
  getFacts,
  getProduct,
  productImage,
  products,
} from '../../../../lib/catalog';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const description = product.priceRub
    ? `${product.fullName}. Цена ${product.priceRub.toLocaleString('ru-RU')} ₽ с НДС и подтверждённые характеристики.`
    : `${product.fullName}. Подтверждённые характеристики без неподтверждённой цены.`;
  return {
    title: product.fullName,
    description,
    openGraph: { title: product.fullName, description, images: [] },
    twitter: { card: 'summary', title: product.fullName, description, images: [] },
  };
}

const specLabels: Record<string, string> = {
  conditionalPassageMm: 'Условный проход',
  workingPressureMpa: 'Рабочее давление',
  workingTemperatureC: 'Рабочая температура',
  flowM3h: 'Диапазон расхода',
  measurementErrorsPercent: 'Пределы погрешности',
  massKg: 'Масса',
  packageDimensionsCm: 'Габариты упаковки',
};

const specUnits: Record<string, string> = {
  conditionalPassageMm: ' мм',
  workingPressureMpa: ' МПа',
  workingTemperatureC: ' °C',
  flowM3h: ' м³/ч',
  measurementErrorsPercent: '%',
  massKg: ' кг',
  packageDimensionsCm: ' см',
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const facts = getFacts(product.groupFactsId);
  if (!facts) notFound();
  const family = familyForProduct(product);
  const familyInfo = familyMeta[family];
  const specs = Object.entries(facts.technicalTable).filter(([key]) => key in specLabels);
  const questionHref = `mailto:?subject=${encodeURIComponent(`Вопрос по ${product.fullName}`)}&body=${encodeURIComponent(`Здравствуйте! Нужна консультация по модели ${product.fullName}.`)}`;

  return (
    <main>
      <SiteHeader />
      <div className="pdp-breadcrumbs breadcrumbs">
        <Link href="/">Главная</Link><span>/</span>
        <Link href="/#selection">Счётчики нефтепродуктов</Link><span>/</span>
        <Link href={`/catalog/${family}`}>{familyInfo.shortTitle}</Link>
      </div>

      <article className="pdp">
        <div className="pdp-image">
          <img src={productImage(product)} alt={product.fullName} />
        </div>
        <div className="pdp-copy">
          <p className="pdp-family">{familyInfo.title} · {accuracyLabel(product)}</p>
          <h1>{product.fullName}</h1>
          <p className="pdp-purpose">{facts.purpose}</p>
          <dl className="pdp-key-specs">
            <div><dt>Исполнение</dt><dd>{product.execution}</dd></div>
            {product.viscosityCst && <div><dt>Вязкость</dt><dd>{product.viscosityCst} сСт</dd></div>}
            <div><dt>Условный проход</dt><dd>DN {facts.technicalTable.conditionalPassageMm}</dd></div>
            <div><dt>Погрешность</dt><dd>{product.errorClassOrLimit}%</dd></div>
          </dl>
          {product.priceRub ? (
            <p className="pdp-price">{product.priceRub.toLocaleString('ru-RU')} ₽ <small>с НДС</small></p>
          ) : null}
          {product.priceRub ? (
            <div className="pdp-actions">
              <AddToCartButton product={{ slug: product.slug, name: product.fullName, priceRub: product.priceRub, image: productImage(product) }} />
              <a className="button-outline pdp-question" href={questionHref}>Задать вопрос</a>
            </div>
          ) : (
            <Link className="button-primary pdp-action" href={`/catalog/${family}`}>Вернуться к моделям</Link>
          )}
          {!product.priceRub ? <p className="pdp-price-note">Стоимость и обозначение для заказа не указаны: в источниках они не подтверждены.</p> : null}
        </div>
      </article>

      <section className="pdp-details">
        <div className="pdp-details-heading">
          <h2>Описание и характеристики</h2>
          <p>{facts.description[0]}</p>
        </div>
        <dl className="spec-table">
          {specs.map(([key, value]) => (
            <div key={key}>
              <dt>{specLabels[key]}</dt>
              <dd>{String(value)}{specUnits[key]}</dd>
            </div>
          ))}
          <div><dt>Производитель</dt><dd>{facts.manufacturer}</dd></div>
        </dl>
      </section>

      <section className="request-strip" id="request">
        <div>
          <h2>Посмотрите другие исполнения</h2>
          <p>Вернитесь к моделям этого типоразмера или откройте весь ассортимент ППО-25 и ППО-40.</p>
        </div>
        <div className="request-actions">
          <Link className="button-light" href={`/catalog/${family}`}>Все {familyInfo.shortTitle}</Link>
          <Link className="button-outline" href="/catalog">К выбору типоразмера</Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
