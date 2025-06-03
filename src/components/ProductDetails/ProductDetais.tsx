import { useParams } from 'react-router';
import useSWR from 'swr';
import { Card, Typography, Space, Descriptions, Carousel } from 'antd';

import type { Product } from '@commercetools/platform-sdk';

import { fetchProductById } from '@/services/getProductsService';
import styles from './ProductDetails.module.css';

const { Title, Paragraph, Text } = Typography;

export const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const { data: product, error } = useSWR<Product, Error>(
    productId ? ['product', productId] : null,
    () => fetchProductById(productId!),
  );

  if (!productId) {
    return <div>Invalid product ID</div>;
  }

  if (error) return <div>Error: {error.message}</div>;
  if (!product) return <div>Loading...</div>;

  const name = product.masterData?.current?.name?.['en-US'] || 'untitled';

  const images = product.masterData?.current?.masterVariant?.images || [];

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
        {product.masterData.current.masterVariant.attributes?.map(
          (attribute) =>
            attribute.name != 'price' && (
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
    </Card>
  );
};
