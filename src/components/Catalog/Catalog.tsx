import { useEffect, useState } from 'react';
import { Input, Radio } from 'antd';
import useSWR from 'swr';

import type { Product } from '@commercetools/platform-sdk';

import { ProductTabs } from './ProductTabs';
import { ProductCard } from '../ProductCard/ProductCard';
import { Filters } from '../Filters/Filters';

import {
  fetchProducts,
  fetchFilteredProducts,
  fetchProductTypes,
} from '@/services/getProductsService';

import styles from './Catalog.module.css';

type SortOption = 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc';

export const Catalog = () => {
  const [productTypes, setProductTypes] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [selectedTypeId, setSelectedTypeId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('name_asc');

  useEffect(() => {
    const loadProductTypes = async () => {
      try {
        const types = await fetchProductTypes();
        setProductTypes(types);
        if (selectedTypeId === 'all' && types.length > 0) {
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
      return await fetchFilteredProducts(currentFilters);
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

  const filteredProducts = products
    .filter((product) =>
      selectedTypeId === 'all'
        ? true
        : product.productType.id === selectedTypeId,
    )
    .filter((product) => {
      if (!searchQuery.trim()) return true;
      const productName =
        product.masterData?.current?.name?.['en-US']?.toLowerCase() || '';
      return productName.includes(searchQuery.toLowerCase());
    });

  const [sortCriteria, sortOrder] = sortOption.split('_') as [
    'name' | 'price',
    'asc' | 'desc',
  ];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortCriteria === 'name') {
      const nameA = a.masterData?.current?.name?.['en-US']?.toLowerCase() || '';
      const nameB = b.masterData?.current?.name?.['en-US']?.toLowerCase() || '';
      return sortOrder === 'asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    } else if (sortCriteria === 'price') {
      const priceA =
        a.masterData?.current?.masterVariant?.prices[0]?.value?.centAmount || 0;
      const priceB =
        b.masterData?.current?.masterVariant?.prices[0]?.value?.centAmount || 0;
      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    }
    return 0;
  });

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

      <div className={styles.search}>
        <Input.Search
          placeholder="Search in results by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
        />
      </div>

      <div className={styles.sort}>
        <span>Sort by</span>
        <Radio.Group
          value={sortOption}
          onChange={(e) =>
            setSortOption(e.target.value as React.SetStateAction<SortOption>)
          }
          optionType="button"
          buttonStyle="solid"
        >
          <Radio value="name_asc">Name A-Z</Radio>
          <Radio value="name_desc">Name Z-A</Radio>
          <Radio value="price_asc">Price Low to High</Radio>
          <Radio value="price_desc">Price High to Low</Radio>
        </Radio.Group>
      </div>

      <div className={styles.container}>
        {sortedProducts.length === 0 ? (
          <h3 className={styles.unsuccess}>No products found</h3>
        ) : (
          sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </>
  );
};
