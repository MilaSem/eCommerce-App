import styles from './CatalogPage.module.css';
import { Link } from 'react-router';
import { ProductList } from '@/features/products/ProductList';

export const CatalogPage = () => {
  return (
    <div>
      <h2>Choose Product Category</h2>
      <ul className={styles.container}>
        <li>
          <Link to="/page404">Forest</Link>
        </li>
        <li>
          <Link to="/page404">Blossom</Link>
        </li>
        <li>
          <Link to="/page404">Dark</Link>
        </li>
        <li>
          <Link to="/page404">Herb</Link>
        </li>
        <li>
          <Link to="/page404">Mountain</Link>
        </li>
        <li>
          <Link to="/page404">Creamy</Link>
        </li>
        <li>
          <Link to="/page404">Nuts in honey</Link>
        </li>
        <li>
          <Link to="/page404">Bee products</Link>
        </li>
      </ul>
      <ProductList />
    </div>
  );
};
