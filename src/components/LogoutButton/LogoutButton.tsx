import { Button } from 'antd';
import { useCustomerStore } from '@/stores/customerStore';
import { useNavigate } from 'react-router';
import styles from './LogoutButton.module.css';

export const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const customerData = useCustomerStore((state) => state.currentCustomer);
  const logout = useCustomerStore((state) => state.logout);

  const handleLogout = () => {
    if (customerData) {
      logout();
      void navigate('/login');
    }
  };

  return (
    <Button onClick={handleLogout} className={styles.button}>
      Logout
    </Button>
  );
};
