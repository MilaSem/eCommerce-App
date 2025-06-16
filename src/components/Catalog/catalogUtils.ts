import { ProductProjection } from '@commercetools/platform-sdk';

type SortOption = 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc';

export const filterProducts = (
  products: ProductProjection[],
  selectedTypeId: string,
  searchQuery: string,
) =>
  products
    .filter((product) =>
      selectedTypeId === 'all'
        ? true
        : product.productType.id === selectedTypeId,
    )
    .filter((product) => {
      if (!searchQuery.trim()) return true;
      const productName = product.name?.['en-US']?.toLowerCase() || '';
      return productName.includes(searchQuery.toLowerCase());
    });

export const sortProducts = (
  products: ProductProjection[],
  sortOption: SortOption,
) => {
  const [sortCriteria, sortOrder] = sortOption.split('_');
  return [...products].sort((a, b) => {
    if (sortCriteria === 'name') {
      const nameA = a.name?.['en-US'] || '';
      const nameB = b.name?.['en-US'] || '';

      const normalizedA = nameA.trim().toLowerCase();
      const normalizedB = nameB.trim().toLowerCase();

      if (sortOrder === 'asc') {
        if (normalizedA > normalizedB) return 1;
        if (normalizedA < normalizedB) return -1;
        return 0;
      } else {
        if (normalizedA > normalizedB) return -1;
        if (normalizedA < normalizedB) return 1;
        return 0;
      }
    } else if (sortCriteria === 'price') {
      const priceA = a.masterVariant?.prices![0]?.value?.centAmount || 0;
      const priceB = b.masterVariant?.prices![0]?.value?.centAmount || 0;

      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    }

    return 0;
  });
};
