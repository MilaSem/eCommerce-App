import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from '../BuilderClient';
import { useEffect, useState } from 'react';
import { Product } from '@commercetools/platform-sdk';

import styles from './ProductList.module.css';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: 'honey-shop',
});

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await apiRoot.products().get().execute();
      console.log(response.body.results);
      setProducts(response.body.results);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul className={styles.container}>
      {products.map((product) => (
        <div key={product.id} className={styles.card}>
          <h3>Product type: {product.key}</h3>
          {product.masterData.current.masterVariant.images &&
            product.masterData.current.masterVariant.images.length > 0 && (
              <img
                src={product.masterData.current.masterVariant.images[0].url}
                alt={product.key}
                className={styles.image}
              />
            )}

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
