import { useEffect, useState } from 'react';
import { Select, InputNumber, Button } from 'antd';

import {
  brandOptions,
  colorOptions,
  floralSourceOptions,
} from './filterOptions';

import styles from './Filters.module.css';

const { Option } = Select;

type FiltersPairs = Record<string, string | number | boolean>;

interface FiltersProps {
  filters: FiltersPairs;
  setFilters: React.Dispatch<React.SetStateAction<FiltersPairs>>;
  clearFilters: () => void;
  onApplyFilters: (filters: FiltersPairs) => void;
  onSelectChange: (key: string, value: string | number | boolean) => void;
  visible?: boolean;
}

export const Filters: React.FC<FiltersProps> = ({
  filters,
  setFilters,
  clearFilters,
  onApplyFilters,
  onSelectChange,
  visible = true,
}) => {
  const [localFilters, setLocalFilters] = useState<FiltersPairs>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handlePriceChange = (
    type: 'priceMin' | 'priceMax',
    value: number | null,
  ) => {
    setLocalFilters((prev) => ({ ...prev, [type]: value ?? '' }));
  };

  const handleWeightChange = (
    type: 'weightMin' | 'weightMax',
    value: number | null,
  ) => {
    setLocalFilters((prev) => ({ ...prev, [type]: value ?? '' }));
  };

  const handlePriceFilterApply = () => {
    const updatedFilters = { ...localFilters };
    setFilters(updatedFilters);
    onApplyFilters(updatedFilters);
  };

  const handleWeightFilterApply = () => {
    const updatedFilters = { ...localFilters };
    setFilters(updatedFilters);
    onApplyFilters(updatedFilters);
  };

  return (
    <>
      {visible && (
        <div className={styles.container}>
          <div className={styles.filterbox}>
            <p>Brand:</p>
            <Select
              className={styles.select}
              value={filters.brand || ''}
              onChange={(value) => onSelectChange('brand', value)}
            >
              {brandOptions.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </div>

          <div className={styles.filterbox}>
            <p>Floral source:</p>
            <Select
              className={styles.select}
              value={filters['floral-source'] || ''}
              onChange={(value) => onSelectChange('floral-source', value)}
            >
              {floralSourceOptions.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </div>

          <div className={styles.filterbox}>
            <p>Color:</p>
            <Select
              className={styles.select}
              value={filters.color || ''}
              onChange={(value) => onSelectChange('color', value)}
            >
              {colorOptions.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </div>

          <div className={styles.filterbox}>
            <p>Weight (g) from:</p>
            <InputNumber
              className={styles.input}
              min={0}
              value={localFilters.weightMin as number | undefined}
              onChange={(value) => handleWeightChange('weightMin', value)}
              onPressEnter={handleWeightFilterApply}
            />
            <p>to:</p>
            <InputNumber
              className={styles.input}
              min={0}
              value={localFilters.weightMax as number | undefined}
              onChange={(value) => handleWeightChange('weightMax', value)}
              onPressEnter={handleWeightFilterApply}
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
                onSelectChange(
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
            <InputNumber
              className={styles.input}
              min={0}
              value={localFilters.priceMin as number | undefined}
              onChange={(value) => handlePriceChange('priceMin', value)}
              onPressEnter={handlePriceFilterApply}
            />
            <p>to:</p>
            <InputNumber
              className={styles.input}
              min={0}
              value={localFilters.priceMax as number | undefined}
              onChange={(value) => handlePriceChange('priceMax', value)}
              onPressEnter={handlePriceFilterApply}
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
        </div>
      )}

      <div className={styles.activeFilters}>
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
    </>
  );
};
