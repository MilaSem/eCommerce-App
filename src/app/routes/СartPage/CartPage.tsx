import { Cart } from '@/components/Cart/Cart';
import styles from './CartPage.module.css';

export const CartPage = () => {
  return (
    <div className={styles.container}>
      <h2>Your Shopping Cart</h2>
      <Cart />
    </div>
  );
};
