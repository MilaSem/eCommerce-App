import { useParams } from 'react-router';
import useSWR from 'swr';
import { Card, Typography, Space, Descriptions, Carousel, Spin } from 'antd';

import type { ProductProjection } from '@commercetools/platform-sdk';

import { useCartStore } from '@/stores/cartStore';
import { useCustomerStore } from '@/stores/customerStore';

import { fetchProductById } from '@/services/getProductsService';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';
import { RemoveFromCartButton } from '../RemoveFromCartButton/RemoveFromCartButton';
import styles from './ProductDetails.module.css';

const { Title, Paragraph, Text } = Typography;

export const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const {
    addToCart,
    addToLocalCart,
    removeFromCart,
    removeFromLocalCart,
    fetchCart,
    cart,
    localCart,
    isAddingToCart,
    addingProductId,
  } = useCartStore();

  const client = useCustomerStore((state) => state.currentCustomer?.client);
  const customerId = useCustomerStore(
    (state) => state.currentCustomer?.data.body.customer.id,
  );

  const {
    data: product,
    error,
    isLoading,
  } = useSWR<ProductProjection, Error>(
    productId ? ['product', productId] : null,
    () => fetchProductById(productId!),
  );

  if (isLoading) {
    return (
      <div className={styles.spin}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const variantId = product.masterVariant.id;

  const isInCart =
    cart?.lineItems?.some(
      (item) => item.productId === product.id && item.variant?.id === variantId,
    ) ||
    localCart?.some(
      (item) => item.productId === product.id && item.variantId === variantId,
    );

  const isAddingCurrentProduct =
    isAddingToCart && addingProductId === product.id;

  const handleAddToCart = async (productId: string, variantId: number) => {
    try {
      if (client && customerId) {
        await addToCart(client, customerId, productId, variantId, 1);
        await fetchCart(client, customerId);
      } else {
        addToLocalCart(productId, variantId, 1);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleRemoveFromCart = async (productId: string, variantId: number) => {
    try {
      if (client && cart) {
        await removeFromCart(client, productId, variantId);
        await fetchCart(client, customerId!);
      } else {
        removeFromLocalCart(productId, variantId);
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const name = product.name?.['en-US'] || 'untitled';
  const images = product.masterVariant?.images || [];
  const description = product.description?.['en-US'] || 'undescription';
  const prices = product.masterVariant?.prices || [];

  const baseCentAmount = prices[0]?.value.centAmount;
  const discountedCentAmount = prices[0]?.discounted?.value.centAmount;

  const formatPrice = (amount?: number) => {
    if (amount === undefined) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };

  return (
    <Card className={styles.card}>
      {images.length > 0 && (
        <Carousel autoplay className={styles.carousel}>
          {images.map((img, index) => (
            <div key={index}>
              <img src={img.url} alt={name} className={styles.image} />
            </div>
          ))}
        </Carousel>
      )}
      <Title level={3} className={styles.title}>
        {name}
      </Title>

      <Paragraph className={styles.description}>{description}</Paragraph>

      <div className={styles.pricescontainer}>
        {discountedCentAmount !== undefined ? (
          <Space size="middle" align="center">
            <Text delete className={styles.oldprice}>
              {formatPrice(baseCentAmount)}
            </Text>
            <Text strong className={styles.newprice}>
              {formatPrice(discountedCentAmount)}
            </Text>
          </Space>
        ) : (
          <Text strong className={styles.price}>
            {formatPrice(baseCentAmount)}
          </Text>
        )}
      </div>

      <Descriptions
        column={1}
        size="small"
        bordered
        className={styles.attributes}
      >
        {product.masterVariant.attributes?.map(
          (attribute) =>
            attribute.name !== 'price' && (
              <Descriptions.Item
                key={attribute.name}
                label={attribute.name.replace(/-/g, ' ')}
                span={1}
              >
                {String(attribute.value)}
              </Descriptions.Item>
            ),
        )}
      </Descriptions>

      <div className={styles.buttons}>
        <AddToCartButton
          productId={product.id}
          variantId={variantId}
          onAddToCart={handleAddToCart}
          loading={isAddingCurrentProduct}
          disabled={isAddingCurrentProduct || isInCart}
        />
        <RemoveFromCartButton
          productId={product.id}
          variantId={variantId}
          onRemoveFromCart={handleRemoveFromCart}
          disabled={!isInCart}
        />
      </div>
    </Card>
  );
};
