import Link from 'next/link';
import { CategoryExplorer } from '../components/CategoryExplorer';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-copy">
          <h1>Счётчики ППО-25 и ППО-40 от официального дилера завода</h1>
          <p>Поставляем счётчики с овальными шестернями для измерения объёмного количества нефтепродуктов. Подберём исполнение под вашу задачу.</p>
          <div className="hero-actions">
            <a className="button-primary" href="#selection">Перейти к подбору <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <figure className="hero-product">
          <div className="hero-decor hero-decor-top" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="product-stage"><img src="/ppo-25-approved.png" alt="Счётчик жидкости СЖ-ППО-25" /></div>
          <div className="hero-decor hero-decor-bottom" aria-hidden="true"><i /><i /><i /><i /></div>
        </figure>
      </section>

      <div className="catalog-fold" aria-hidden="true">
        <span>Каталог оборудования</span>
        <span>Основные направления уже на главной ↓</span>
      </div>

      <section className="home-catalog" id="selection" aria-labelledby="catalog-title">
        <div className="home-catalog-heading">
          <h2 id="catalog-title">Каталог товаров</h2>
        </div>

        <CategoryExplorer />
      </section>

      <section className="service-section" id="service" aria-labelledby="service-title">
        <div className="section-heading-row service-heading">
          <h2 id="service-title">Услуги</h2>
          <p>Отдельный коммерческий блок: работы не смешаны с товарным каталогом.</p>
        </div>
        <div className="service-grid">
          <article>
            <h3>Подбор и поставка</h3>
            <p>Подбираем исполнение под параметры учёта и поставляем счётчик с подтверждёнными документами.</p>
          </article>
          <article>
            <h3>Ремонт и тарировка</h3>
            <p>Диагностируем и ремонтируем оборудование, проводим тарировку на собственном стенде.</p>
          </article>
          <article>
            <h3>Поверка и пломбирование</h3>
            <p>Организуем официальную поверку и пломбирование с участием Тульского ЦСМ.</p>
          </article>
        </div>
      </section>

      <section className="about-strip" id="about">
        <div>
          <h2>От выбора счётчика до ввода в работу</h2>
        </div>
        <p>Счётчики ППО внесены в Государственный реестр средств измерений. Для конкретной модели покажем подтверждённые параметры, цену и доступные действия.</p>
      </section>

      <section className="store-info" aria-label="Информация для заказа">
        <article id="delivery">
          <h2>Доставка и оплата</h2>
          <p>Условия поставки и оплаты фиксируются в коммерческом предложении для выбранной модели и количества.</p>
          <Link href="/cart">Перейти к заказу <span aria-hidden="true">→</span></Link>
        </article>
        <article id="documents">
          <h2>Документы</h2>
          <p>Для каждой позиции показываем только подтверждённые характеристики. Комплект документов уточняется вместе с заказом.</p>
          <Link href="/#selection">Выбрать модель <span aria-hidden="true">→</span></Link>
        </article>
      </section>
      <SiteFooter />
    </main>
  );
}
