import { Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

interface AddToCartButtonProps {
  productId: string;
  variantId: number;
  onAddToCart: (productId: string, variantId: number) => Promise<void>;
  disabled?: boolean;
  loading?: boolean;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  variantId,
  onAddToCart,
  disabled = false,
  loading = false,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    onAddToCart(productId, variantId).catch((error) => {
      console.error('Failed to add to cart:', error);
    });
  };

  return (
    <Button
      type="primary"
      onClick={handleClick}
      icon={<ShoppingCartOutlined />}
      disabled={disabled}
      loading={loading}
    />
  );
};
