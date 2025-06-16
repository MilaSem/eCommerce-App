import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface RemoveFromCartButtonProps {
  productId: string;
  variantId: number;
  onRemoveFromCart: (productId: string, variantId: number) => Promise<void>;
  loading?: boolean;
  disabled?: boolean;
}

export const RemoveFromCartButton: React.FC<RemoveFromCartButtonProps> = ({
  productId,
  variantId,
  onRemoveFromCart,
  loading = false,
  disabled = false,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onRemoveFromCart(productId, variantId).catch((error) => {
      console.error('Failed to remove from cart:', error);
    });
  };

  return (
    <Button
      danger
      icon={<DeleteOutlined />}
      loading={loading}
      disabled={disabled}
      onClick={handleClick}
    />
  );
};
