'use client';

import { useState } from 'react';
import Link from 'next/link';
import { familyForProduct, products, type FamilyKey } from '../lib/catalog';
import { ProductCard } from './ProductCard';

type CatalogFilter = 'all' | FamilyKey;

export function CategoryExplorer() {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<CatalogFilter>('all');
  const visibleProducts = filter === 'all'
    ? products
    : products.filter((product) => familyForProduct(product) === filter);

  return (
    <>
      {!isOpen ? (
        <div className="catalog-direction-grid">
          <button
            className="catalog-direction catalog-direction-main"
            type="button"
            aria-expanded="false"
            aria-controls="counter-products"
            onClick={() => { setFilter('all'); setIsOpen(true); }}
          >
            <small>Товарная категория</small>
            <strong>Счётчики нефтепродуктов</strong>
            <span>Показать весь ассортимент <i className="ui-arrow" aria-hidden="true" /></span>
          </button>
          <Link className="catalog-direction" href="/catalog/ppo-25">
            <small>Условный проход DN 25</small>
            <strong>Счётчики ППО-25</strong>
            <span>Все исполнения <i className="ui-arrow" aria-hidden="true" /></span>
          </Link>
          <Link className="catalog-direction" href="/catalog/ppo-40">
            <small>Условный проход DN 40</small>
            <strong>Счётчики ППО-40</strong>
            <span>Все исполнения <i className="ui-arrow" aria-hidden="true" /></span>
          </Link>
        </div>
      ) : (
        <section className="expanded-catalog" id="counter-products" aria-labelledby="expanded-catalog-title">
          <div className="expanded-catalog-heading">
            <div>
              <h3 id="expanded-catalog-title">Счётчики нефтепродуктов</h3>
              <p>Сразу весь ассортимент — без повторной страницы категории.</p>
            </div>
            <button type="button" onClick={() => setIsOpen(false)}>Свернуть ↑</button>
          </div>
          <div className="catalog-filters" aria-label="Фильтр по условному проходу">
            {([
              ['all', 'Все модели'],
              ['ppo-25', 'ППО-25'],
              ['ppo-40', 'ППО-40'],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={filter === value ? 'is-active' : ''}
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="store-grid">
            {visibleProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </section>
      )}
    </>
  );
}
