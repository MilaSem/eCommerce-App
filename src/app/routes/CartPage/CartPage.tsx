import styles from './CartPage.module.css';
import { Cart } from '@/components/Cart/Cart';
export const CartPage = () => {
  return (
    <div className={styles.container}>
      <h2>Your Shopping Cart</h2>
      <Cart/>
    </div>
  );
};
