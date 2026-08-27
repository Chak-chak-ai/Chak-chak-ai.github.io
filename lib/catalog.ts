import registry from '../data/products.json';
import sourceFacts from '../data/source-facts.json';

export type Product = (typeof registry.products)[number];
export type SourceGroup = (typeof sourceFacts.groups)[number];

export const products = registry.products;
export const groups = sourceFacts.groups;

export const familyMeta = {
  'ppo-25': {
    title: 'СЖ-ППО-25',
    shortTitle: 'ППО-25',
    diameter: '25',
    pressure: '1,6 МПа',
    flow: '0,72–7,2 м³/ч',
  },
  'ppo-40': {
    title: 'СЖ-ППО-40',
    shortTitle: 'ППО-40',
    diameter: '40',
    pressure: '0,6 МПа',
    flow: '2,5–25 м³/ч',
  },
} as const;

export type FamilyKey = keyof typeof familyMeta;

export function isFamily(value: string): value is FamilyKey {
  return value === 'ppo-25' || value === 'ppo-40';
}

export function productsForFamily(family: FamilyKey) {
  const marker = family === 'ppo-25' ? 'ppo25-' : 'ppo40-';
  return products.filter((product) => product.groupId.startsWith(marker));
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getFacts(groupId: string) {
  return groups.find((group) => group.id === groupId);
}

export function productImage(product: Product) {
  return `/products/${product.approvedCard}`;
}

export function familyForProduct(product: Product): FamilyKey {
  return product.groupId.startsWith('ppo25-') ? 'ppo-25' : 'ppo-40';
}

export function accuracyLabel(product: Product) {
  return `ПГ ${product.errorClassOrLimit}`;
}
