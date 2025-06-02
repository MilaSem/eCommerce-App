import { Tabs } from 'antd';
import styles from './ProductTabs.module.css';

interface TabProps {
  types: Array<{ id: string; name: string }>;
  selectedTypeId: string | null;
  onChange: (typeId: string) => void;
}

export const ProductTabs: React.FC<TabProps> = ({
  types,
  selectedTypeId,
  onChange,
}) => {
  const items = types.map((type) => ({
    label: type.name,
    key: type.id,
  }));

  const handleChange = (activeKey: string) => {
    onChange(activeKey);
  };

  return (
    <>
      <h2>Choose Product Category</h2>
      <Tabs
        className={styles.tab}
        activeKey={selectedTypeId || undefined}
        items={items}
        onChange={handleChange}
      />
    </>
  );
};
