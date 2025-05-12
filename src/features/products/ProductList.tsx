import styles from './ProductList.module.css';

import useSWR from 'swr';
import { commerceToolsService } from '@/services/commerceToolsService';
import { Product } from '@commercetools/platform-sdk';

const fetcher = async (): Promise<Product[]> =>
  await commerceToolsService.getProducts();

export const ProductList = () => {
  const { data: products, error } = useSWR<Product[], Error>(
    '/api/products',
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
