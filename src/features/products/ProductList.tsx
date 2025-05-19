import useSWR from 'swr';
import type { Product } from '@commercetools/platform-sdk';
import { getProducts } from '@/services/getProductsService';

import styles from './ProductList.module.css';

const fetcher = (): Promise<Product[]> => getProducts();

export const ProductList = () => {
  const { data: products, error } = useSWR<Product[], Error>(
    'products',
    fetcher,
  );

  if (!products) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul className={styles.container}>
      {products.map((product) => (
        <div key={product.id} className={styles.card}>
          <h3>Product type: {product.key}</h3>
          {product.masterData.current.masterVariant.images?.length ? (
            <img
              src={product.masterData.current.masterVariant.images[0].url}
              alt={product.key}
              className={styles.image}
            />
          ) : null}

          <ul className={styles.info}>
            {product.masterData.current.masterVariant.attributes?.map(
              (attribute) => (
                <li key={attribute.name}>
                  {attribute.name} : {`${attribute.value}`}
                </li>
              ),
            )}
          </ul>
        </div>
      ))}
    </ul>
  );
};
