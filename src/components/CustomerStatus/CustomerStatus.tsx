import { customerStore } from '@/stores/customerStore';
import { LogoutButton } from '../LogoutButton/LogoutButton';

import styles from './CustomerStatus.module.css';

export const CustomerStatus: React.FC = () => {
  const customerData = customerStore((state) => state.currentCustomer);

  if (!customerData) {
    return (
      <div className={styles.container}>
        <h4>User, please log in</h4>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h4 className={styles.header}>
        Welcome, {customerData.body.customer.firstName}!
      </h4>
      <LogoutButton />
    </div>
  );
};
