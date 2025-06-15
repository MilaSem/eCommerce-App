import { useEffect, useState } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { useCustomerStore } from '@/stores/customerStore';
import { Button, Spin } from 'antd';
import styles from './Cart.module.css';

export const Cart = () => {
  const {
    cart,
    loading,
    error,
    fetchCart,
    localCart,
    loadLocalCart,
    clearServerCart,
    clearLocalCart,
  } = useCartStore();

  const client = useCustomerStore((state) => state.currentCustomer?.client);
  const customerId = useCustomerStore(
    (state) => state.currentCustomer?.data.body.customer.id,
  );

  const [clearing, setClearing] = useState(false);
  const [clearingLocal, setClearingLocal] = useState(false);

  useEffect(() => {
    loadLocalCart();
  }, [loadLocalCart]);

  useEffect(() => {
    if (client && customerId) {
      void fetchCart(client, customerId);
    }
  }, [client, customerId, fetchCart]);

  const onClearCart = async () => {
    if (!client || !cart) return;
    setClearing(true);
    try {
      await clearServerCart(client, cart.id, cart.version);
    } finally {
      setClearing(false);
      await fetchCart(client, customerId!);
    }
  };

  const onClearLocalCart = () => {
    setClearingLocal(true);
    try {
      clearLocalCart();
    } finally {
      setClearingLocal(false);
    }
  };

  if (loading)
    return (
      <div className={styles.spin}>
        <Spin size="large" />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  if (customerId) {
    if (!cart) return <div>Cart is empty</div>;

    return (
      <div>
        <p>ID Cart: {cart.id}</p>
        <p>Version: {cart.version}</p>
        <ul>
          {cart.lineItems?.map((item) => (
            <li key={item.id}>
              {item.name?.['en-US'] || 'untitle'} — Quantity: {item.quantity} —
              Price: {item.price?.value?.centAmount / 100}{' '}
              {item.price?.value?.currencyCode}
            </li>
          ))}
        </ul>
        <Button
          type="primary"
          danger
          onClick={() => {
            void onClearCart();
          }}
          disabled={clearing}
        >
          {clearing ? 'Clearing...' : 'Clear Cart'}
        </Button>
      </div>
    );
  }

  if (localCart.length === 0) return <div>Cart is empty</div>;

  return (
    <div>
      <p>Local Cart:</p>
      <ul>
        {localCart.map((item, idx) => (
          <li key={`${item.productId}-${item.variantId}-${idx}`}>
            Product ID: {item.productId} — Variant ID: {item.variantId} —
            Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      <Button
        type="primary"
        danger
        onClick={onClearLocalCart}
        disabled={clearingLocal}
      >
        {clearingLocal ? 'Clearing...' : 'Clear Cart'}
      </Button>
    </div>
  );
};
