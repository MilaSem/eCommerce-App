import styles from './CatalogPage.module.css';
import { Link } from 'react-router';
import { ProductList } from '@/features/products/ProductList';

export const CatalogPage = () => {
  return (
    <div>
      <h2>Choose Product Category</h2>
      <ul className={styles.container}>
        <li>
          <Link to="/#forest">Forest</Link>
        </li>
        <li>
          <Link to="/#blossom">Blossom</Link>
        </li>
        <li>
          <Link to="/#dark">Dark</Link>
        </li>
        <li>
          <Link to="/#herb">Herb</Link>
        </li>
        <li>
          <Link to="/#mountain">Mountain</Link>
        </li>
        <li>
          <Link to="/#creamy">Creamy</Link>
        </li>
        <li>
          <Link to="/#nuts-in-honey">Nuts in honey</Link>
        </li>
        <li>
          <Link to="/#bee-products">Bee products</Link>
        </li>
      </ul>
      <ProductList />
    </div>
  );
};
