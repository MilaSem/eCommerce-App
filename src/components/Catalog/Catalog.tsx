import {
  fetchProducts,
  fetchFilteredProducts,
  fetchProductTypes,
} from '@/services/getProductsService';
import useSWR from 'swr';
import type { Product } from '@commercetools/platform-sdk';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './Catalog.module.css';
import { Filters } from '../Filters/Filters';
import { useEffect, useState } from 'react';
import { ProductTabs } from './ProductTabs';

export const Catalog = () => {
  const [productTypes, setProductTypes] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);

  useEffect(() => {
    const loadProductTypes = async () => {
      try {
        const types = await fetchProductTypes();
        setProductTypes(types);
        if (types.length > 0) {
          setSelectedTypeId(types[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    };
    void loadProductTypes();
  }, []);

  const fetcher = async ([key, currentFilters]: [string, typeof filters]) => {
    console.log('Fetching data with key:', key);

    if (Object.keys(currentFilters).length === 0) {
      return await fetchProducts();
    } else {
      const results = await fetchFilteredProducts(currentFilters);
      return results;
    }
  };

  const [filters, setFilters] = useState<
    Record<string, string | number | boolean>
  >({});

  const swrKey = ['products', filters];

  const { data: products, error } = useSWR<Product[], Error>(swrKey, fetcher);

  const clearFilters = () => {
    setFilters({});
  };

  const handleApplyFilters = () => {
    setFilters(filters);
  };

  if (error) return <div>Download error</div>;
  if (!products) return <div>Loading...</div>;

  return (
    <>
      <ProductTabs
        types={productTypes}
        selectedTypeId={selectedTypeId}
        onChange={(typeId) => setSelectedTypeId(typeId)}
      />
      <Filters
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
        onApplyFilters={handleApplyFilters}
      />
      <div className={styles.container}>
        {products.map(
          (product) =>
            product.productType.id === selectedTypeId && (
              <ProductCard key={product.id} product={product} />
            ),
        )}
      </div>
    </>
  );
};
