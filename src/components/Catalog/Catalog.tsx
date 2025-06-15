import { useEffect, useState } from 'react';
import { Button, Input, Radio, Spin } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import useSWR from 'swr';

import type { ProductProjection } from '@commercetools/platform-sdk';

import { ProductTabs } from './ProductTabs';
import { ProductCard } from '../ProductCard/ProductCard';
import { Filters } from '../Filters/Filters';

import { useCartStore } from '@/stores/cartStore';
import { useCustomerStore } from '@/stores/customerStore';

import {
  fetchProducts,
  fetchFilteredProducts,
  fetchProductTypes,
} from '@/services/getProductsService';

import { filterProducts, sortProducts } from './catalogUtils';

import styles from './Catalog.module.css';

type SortOption = 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc';

type FiltersPairs = Record<string, string | number | boolean>;

export const Catalog = () => {
  const [productTypes, setProductTypes] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [selectedTypeId, setSelectedTypeId] = useState<string>('all');

  const [draftFilters, setDraftFilters] = useState<FiltersPairs>({});
  const [appliedFilters, setAppliedFilters] = useState<FiltersPairs>({});

  const [filtersVisible, setFiltersVisible] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('name_asc');

  useEffect(() => {
    const loadProductTypes = async () => {
      try {
        const types = await fetchProductTypes();
        setProductTypes(types);
      } catch (error) {
        console.error(error);
      }
    };
    void loadProductTypes();
  }, []);

  const fetcher = async ([, currentFilters]: [string, FiltersPairs]) => {
    if (Object.keys(currentFilters).length === 0) {
      return await fetchProducts();
    } else {
      return await fetchFilteredProducts(currentFilters);
    }
  };

  useEffect(() => {
    const savedFilters = localStorage.getItem('filters');
    if (savedFilters) {
      try {
        const parsedFilters = JSON.parse(savedFilters) as FiltersPairs;
        setDraftFilters(parsedFilters);
        setAppliedFilters(parsedFilters);
      } catch (error) {
        console.error('Error parsing filters from localStorage:', error);
      }
    }
  }, []);

  const swrKey = ['products', appliedFilters];
  const {
    data: products,
    error,
    isLoading,
  } = useSWR<ProductProjection[], Error>(swrKey, fetcher);

  const clearFilters = () => {
    setDraftFilters({});
    setAppliedFilters({});
    localStorage.removeItem('filters');
  };

  const handleApplyFilters = (newFilters: FiltersPairs) => {
    setAppliedFilters(newFilters);
    setDraftFilters(newFilters);
    localStorage.setItem('filters', JSON.stringify(newFilters));
  };

  const handleSelectChange = (
    key: string,
    value: string | number | boolean,
  ) => {
    const updated = { ...draftFilters, [key]: value };
    setDraftFilters(updated);
    setAppliedFilters(updated);
    localStorage.setItem('filters', JSON.stringify(updated));
  };

  const addToCart = useCartStore((state) => state.addToCart);
  const addToLocalCart = useCartStore((state) => state.addToLocalCart);
  const fetchCart = useCartStore((state) => state.fetchCart);

  const client = useCustomerStore((state) => state.currentCustomer?.client);
  const customerId = useCustomerStore(
    (state) => state.currentCustomer?.data.body.customer.id,
  );

  const handleAddToCart = async (productId: string, variantId: number) => {
    if (client && customerId) {
      try {
        await addToCart(client, customerId, productId, variantId, 1);
        await fetchCart(client, customerId);
        console.log('Product added to server cart');
      } catch (error) {
        console.error(error);
      }
    } else {
      addToLocalCart(productId, variantId, 1);
      console.log('Product added to local cart');
    }
  };

  if (error) return <div>Download error: {error.message}</div>;

  if (isLoading)
    return (
      <div className={styles.spin}>
        <Spin size="large" />
      </div>
    );

  const filteredProducts = filterProducts(
    products!,
    selectedTypeId,
    searchQuery,
  );
  const sortedProducts = sortProducts(filteredProducts, sortOption);

  return (
    <>
      <ProductTabs
        types={productTypes}
        selectedTypeId={selectedTypeId}
        onChange={setSelectedTypeId}
      />

      <Button
        className={styles.collapsebutton}
        type="primary"
        onClick={() => setFiltersVisible((prev) => !prev)}
      >
        Filters {filtersVisible ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </Button>

      <Filters
        filters={draftFilters}
        setFilters={setDraftFilters}
        clearFilters={clearFilters}
        onApplyFilters={handleApplyFilters}
        onSelectChange={handleSelectChange}
        visible={filtersVisible}
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
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))
        )}
      </div>
    </>
  );
};
