import { useEffect, useState } from 'react';
import { AppRouter } from './Router';
import '@ant-design/v5-patch-for-react-19';
import './App.css';
import '../config/colors.css';

import { useCustomerStore } from '@/stores/customerStore';
import { useCartStore } from '@/stores/cartStore';
import { Spin } from 'antd';

function App() {
  const currentCustomer = useCustomerStore((state) => state.currentCustomer);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const loadLocalCart = useCartStore((state) => state.loadLocalCart);
  const isCartReady = useCartStore((state) => state.isCartReady);

  const [cartInitialized, setCartInitialized] = useState(false);

  useEffect(() => {
    const initCart = async () => {
      if (currentCustomer) {
        await fetchCart(
          currentCustomer.client,
          currentCustomer.data.body.customer.id,
        );
      } else {
        loadLocalCart();
      }

      setCartInitialized(true);
    };

    void initCart();
  }, [currentCustomer, fetchCart, loadLocalCart]);

  if (!cartInitialized || !isCartReady) {
    return (
      <div>
        <Spin className="spin" size="large" />
      </div>
    );
  }

  return <AppRouter />;
}

export default App;
