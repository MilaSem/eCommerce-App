import { useCustomerStore } from '@/stores/customerStore';
import { LogoutButton } from '../LogoutButton/LogoutButton';

import styles from './CustomerStatus.module.css';

export const CustomerStatus: React.FC = () => {
  const customerData = useCustomerStore((state) => state.currentCustomer);

  if (customerData) {
    console.log('Customer Data:', customerData);
  }

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
        Welcome, {customerData.data.body.customer.firstName}!
      </h4>
      <LogoutButton />
    </div>
  );
};
