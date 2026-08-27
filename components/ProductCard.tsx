import Link from 'next/link';
import { AddToCartButton } from './AddToCartButton';
import { accuracyLabel, familyForProduct, familyMeta, productImage, type Product } from '../lib/catalog';

export function ProductCard({ product }: { product: Product }) {
  const family = familyMeta[familyForProduct(product)];
  const image = productImage(product);

  return (
    <article className="shop-product-card">
      <Link className="shop-product-image" href={`/catalog/product/${product.slug}`}>
        <img src={image} alt={product.fullName} loading="lazy" />
      </Link>
      <div className="shop-product-body">
        <small>{family.shortTitle} · {accuracyLabel(product)}</small>
        <Link className="shop-product-title" href={`/catalog/product/${product.slug}`}>{product.fullName}</Link>
        <p>DN {family.diameter} · {product.execution}</p>
        <div className="shop-product-purchase">
          {product.priceRub ? (
            <>
              <span className="shop-product-price">{product.priceRub.toLocaleString('ru-RU')} ₽ <small>с НДС</small></span>
              <AddToCartButton
                compact
                product={{ slug: product.slug, name: product.fullName, priceRub: product.priceRub, image }}
              />
            </>
          ) : (
            <>
              <span className="shop-product-price shop-product-price-request">Цена по запросу</span>
              <Link className="product-details-link" href={`/catalog/product/${product.slug}`}>Подробнее</Link>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
