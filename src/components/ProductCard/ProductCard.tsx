import { Card, Image, Typography, Space,Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';



import { Link } from 'react-router';

import type { Product } from '@commercetools/platform-sdk';

import styles from './ProductCard.module.css';

const { Title, Paragraph, Text } = Typography;

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const name = product.masterData?.current?.name?.['en-US'] || 'untitle';

  const images = product.masterData?.current?.masterVariant?.images || [];
  const imageUrl = images.length > 0 ? images[0].url : '';

  const description =
    product.masterData?.current?.description?.['en-US'] || 'undescription';

  const prices = product.masterData?.current?.masterVariant?.prices || [];

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
        </Space>
        <Button className={styles.button}  icon={<ShoppingCartOutlined />}  type="primary"  size={'middle'}  
        onClick={(e) => {
         e.preventDefault();
        e.stopPropagation();  
        }}
        
        >Add to cart</Button>

      </Card>
    </Link>
  );
};
