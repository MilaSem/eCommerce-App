import { useEffect, useState } from 'react';
import { Select, Input, Button } from 'antd';
import styles from './Filters.module.css';

const { Option } = Select;

interface FiltersProps {
  filters: Record<string, string | number | boolean>;
  setFilters: (filters: Record<string, string | number | boolean>) => void;
  clearFilters: () => void;
  onApplyFilters: () => void;
}

export const Filters: React.FC<FiltersProps> = ({
  filters,
  setFilters,
  clearFilters,
}) => {
  const handleChange = (
    attributeName: string,
    value: string | number | boolean,
  ) => {
    setFilters({ ...filters, [attributeName]: value });
  };

  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handlePriceChange = (type: 'priceMin' | 'priceMax', value: string) => {
    const numericValue = value === '' ? '' : Number(value);
    setLocalFilters({ ...localFilters, [type]: numericValue });
  };

  const handleWeightChange = (
    type: 'weightMin' | 'weightMax',
    value: string,
  ) => {
    const numericValue = value === '' ? '' : Number(value);
    setLocalFilters({ ...localFilters, [type]: numericValue });
  };

  const handlePriceFilterApply = () => {
    setFilters(localFilters);
  };

  const handleWeightFilterApply = () => {
    setFilters(localFilters);
  };

  return (
    <div className={styles.container}>
      <h2>Filters</h2>

      <div className={styles.filterbox}>
        <p>Brand:</p>
        <Select
          className={styles.select}
          value={filters.brand || ''}
          onChange={(value) => handleChange('brand', value)}
        >
          <Option value="">All</Option>
          <Option value="dobryishmel">dobryishmel</Option>
          <Option value="PurelyBuzz">PurelyBuzz</Option>
        </Select>
      </div>

      <div className={styles.filterbox}>
        <p>Floral source:</p>
        <Select
          className={styles.select}
          value={filters['floral-source'] || ''}
          onChange={(value) => handleChange('floral-source', value)}
        >
          <Option value="">All</Option>
          <Option value="clover">clover</Option>
          <Option value="wildflower">wildflower</Option>
          <Option value="orange blossom">orange blossom</Option>
        </Select>
      </div>

      <div className={styles.filterbox}>
        <p>Color:</p>
        <Select
          className={styles.select}
          value={filters.color || ''}
          onChange={(value) => handleChange('color', value)}
        >
          <Option value="">All</Option>
          <Option value="light amber">light amber</Option>
          <Option value="dark amber">dark amber</Option>
          <Option value="bright golden">bright golden</Option>
        </Select>
      </div>

      <div className={styles.filterbox}>
        <p>Weight (g) from:</p>
        <Input
          className={styles.input}
          type="number"
          value={
            localFilters.weightMin !== undefined
              ? String(localFilters.weightMin)
              : ''
          }
          onChange={(e) => handleWeightChange('weightMin', e.target.value)}
        />
        <p>to:</p>
        <Input
          className={styles.input}
          type="number"
          value={
            localFilters.weightMax !== undefined
              ? String(localFilters.weightMax)
              : ''
          }
          onChange={(e) => handleWeightChange('weightMax', e.target.value)}
        />
        <Button
          className={styles.okbutton}
          type="primary"
          onClick={handleWeightFilterApply}
        >
          ok
        </Button>
      </div>

      <div className={styles.filterbox}>
        <p>Organic certification:</p>
        <Select
          className={styles.select}
          value={
            typeof filters['organic-certification'] === 'boolean'
              ? String(filters['organic-certification'])
              : ''
          }
          onChange={(value) =>
            handleChange(
              'organic-certification',
              value === '' ? false : value === 'true',
            )
          }
        >
          <Option value="">All</Option>
          <Option value="true">Yes</Option>
          <Option value="false">No</Option>
        </Select>
      </div>

      <div className={styles.filterbox}>
        <p>Price ($) from:</p>
        <Input
          className={styles.input}
          type="number"
          value={
            localFilters.priceMin !== undefined
              ? String(localFilters.priceMin)
              : ''
          }
          onChange={(e) => handlePriceChange('priceMin', e.target.value)}
        />
        <p>to:</p>
        <Input
          className={styles.input}
          type="number"
          value={
            localFilters.priceMax !== undefined
              ? String(localFilters.priceMax)
              : ''
          }
          onChange={(e) => handlePriceChange('priceMax', e.target.value)}
        />
        <Button
          className={styles.okbutton}
          type="primary"
          onClick={handlePriceFilterApply}
        >
          ok
        </Button>
      </div>

      <Button
        className={styles.button}
        type="primary"
        danger
        onClick={clearFilters}
      >
        Reset
      </Button>

      <div>
        <h3>Products with selected filters:</h3>
        {Object.entries(filters).map(
          ([key, value]) =>
            value !== undefined &&
            value !== '' &&
            value !== false && (
              <div key={key}>
                {key}: {String(value)}
              </div>
            ),
        )}
      </div>
    </div>
  );
};
