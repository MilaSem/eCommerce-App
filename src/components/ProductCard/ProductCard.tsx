import { Card, Image, Typography, Space } from 'antd';
import { Link } from 'react-router';

import type {
  ProductProjection,
  ProductVariant,
} from '@commercetools/platform-sdk';

import styles from './ProductCard.module.css';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';

import { useCartStore } from '@/stores/cartStore';

const { Title, Paragraph, Text } = Typography;

interface ProductCardProps {
  product: ProductProjection;
  onAddToCart?: (productId: string, variantId: number) => Promise<void>;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  const name = product.name?.['en-US'] || 'untitle';

  const images = product.masterVariant?.images || [];
  const imageUrl = images.length > 0 ? images[0].url : '';

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

  const allVariants: ProductVariant[] = [
    product.masterVariant,
    ...(product.variants || []),
  ];

  const variantPrices = allVariants
    .map((variant) => {
      const price = variant.prices?.[0];
      return price?.discounted?.value.centAmount ?? price?.value.centAmount;
    })
    .filter((amount): amount is number => amount !== undefined);

  const uniqueSortedPrices = Array.from(new Set(variantPrices)).sort(
    (a, b) => a - b,
  );

  const { cart, localCart, addingProductId } = useCartStore();

  const isAddingCurrentProduct = addingProductId === product.id;

  const isInCart =
    cart?.lineItems?.some(
      (item) =>
        item.productId === product.id &&
        item.variant?.id === product.masterVariant.id,
    ) ||
    localCart?.some(
      (item) =>
        item.productId === product.id &&
        item.variantId === product.masterVariant.id,
    );

  return (
    <Link to={`/catalog/${product.id}`}>
      <Card
        hoverable
        className={styles.card}
        cover={
          imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              className={styles.image}
              preview={false}
            />
          ) : null
        }
      >
        <Title ellipsis={{ rows: 1 }} level={4}>
          {name}
        </Title>
        <Paragraph ellipsis={{ rows: 1 }}>{description}</Paragraph>
        <Space direction="vertical" className={styles.space}>
          {discountedCentAmount !== undefined ? (
            <Space>
              <Text delete className={styles.oldprice}>
                {formatPrice(baseCentAmount)}
              </Text>
              <Text strong className={styles.newprice}>
                {formatPrice(discountedCentAmount)}
              </Text>
            </Space>
          ) : (
            <Text strong>{formatPrice(baseCentAmount)}</Text>
          )}

          {uniqueSortedPrices.length > 0 && (
            <Text type="secondary" className={styles.variantPrices}>
              there are options {uniqueSortedPrices.map(formatPrice).join(', ')}
            </Text>
          )}

          {onAddToCart && (
            <AddToCartButton
              productId={product.id}
              variantId={product.masterVariant.id}
              onAddToCart={onAddToCart}
              disabled={isInCart || isAddingCurrentProduct}
              loading={isAddingCurrentProduct}
            />
          )}
        </Space>
      </Card>
    </Link>
  );
};
