/*
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
*/

import { useEffect, useState } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { useCustomerStore } from '@/stores/customerStore';
import { Button, Spin, Table, InputNumber, message } from 'antd';
import styles from './Cart.module.css';
import { DeleteOutlined } from '@ant-design/icons';

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
    updateLineItemQuantity,
    removeLineItemById,
  } = useCartStore();

  const client = useCustomerStore((state) => state.currentCustomer?.client);
  const customerId = useCustomerStore(
    (state) => state.currentCustomer?.data.body.customer.id,
  );

  const [clearing, setClearing] = useState(false);
  const [clearingLocal, setClearingLocal] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);

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

  const handleQuantityChange = async (lineItemId: string, quantity: number) => {
    if (!client || !cart) return;
    setUpdatingItemId(lineItemId);
    try {
      await updateLineItemQuantity(
        client,
        cart.id,
        cart.version,
        lineItemId,
        quantity,
      );
      await fetchCart(client, customerId!);
      message.success('Quantity updated');
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(`Failed to update quantity: ${error.message}`);
      } else {
        message.error('Failed to update quantity');
      }
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleRemoveItem = async (lineItemId: string) => {
    if (!client || !cart) return;
    setUpdatingItemId(lineItemId);
    try {
      await removeLineItemById(client, cart.id, cart.version, lineItemId);
      await fetchCart(client, customerId!);
      message.success('Item removed');
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(`Failed to remove item: ${error.message}`);
      } else {
        message.error('Failed to remove item');
      }
    } finally {
      setUpdatingItemId(null);
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
    if (!cart || cart.lineItems.length === 0) return <div>Cart is empty</div>;

    const columns = [
      {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (url: string) => (
          <img src={url} alt="product" style={{ width: 50, height: 50 }} />
        ),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Unit Price',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (quantity: number, record: { id: string }) => (
          <InputNumber
            min={1}
            value={quantity}
            onChange={(value) => {
              if (typeof value === 'number') {
                void handleQuantityChange(record.id, value);
              }
            }}
            disabled={updatingItemId === record.id}
          />
        ),
      },
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_: unknown, record: { id: string }) => (
          <Button
            type="link"
            danger
            onClick={() => void handleRemoveItem(record.id)}
            disabled={updatingItemId === record.id}
          >
            <DeleteOutlined />
          </Button>
        ),
      },
    ];

    const dataSource = cart.lineItems.map((item) => ({
      key: item.id,
      id: item.id,
      image: item.variant?.images?.[0]?.url || '',
      name: item.name?.['en-US'] || 'untitled',
      unitPrice: `${item.price?.value?.centAmount / 100} ${item.price?.value?.currencyCode}`,
      quantity: item.quantity,
      total: `${(item.price?.value?.centAmount * item.quantity) / 100} ${item.price?.value?.currencyCode}`,
    }));

    return (
      <div>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
        <Button
          type="primary"
          danger
          onClick={() => {
            void onClearCart();
          }}
          disabled={clearing}
          style={{ marginTop: 16 }}
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
