import { CustomerStatus } from '@/components/CustomerStatus/CustomerStatus';
import { ProductList } from '@/features/products/ProductList';

export const MainPage = () => {
  return (
    <div>
      <CustomerStatus />
      <h2>Our Products</h2>
      <ProductList />
    </div>
  );
};
