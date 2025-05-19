import { Checkbox, Form, Input, Select } from 'antd';
import type { AddressData } from './RegisterFormTypes';
import styles from './RegisterForm.module.css';
import { validatePostalCode, validateStreet } from '@/utils/validators';

interface AddressBlockProps {
  prefix?: string;
  address?: AddressData | null;
  readOnly?: boolean;
  onChange?: (address: AddressData) => void;
  disabled?: boolean;
  defaultChecked?: boolean;
  onDefaultChange?: (checked: boolean) => void;
}

export const AddressBlock: React.FC<AddressBlockProps> = ({
  prefix = '',
  address,
  readOnly = false,
  onChange,
  defaultChecked = false,
  onDefaultChange,
}) => {
  const handleChange =
    (field: keyof AddressData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (!onChange) return;

      const value = e.target.value;

      const updatedAddress: AddressData = {
        ...(address ?? {
          postalCode: '',
          country: '',
          city: '',
          streetName: '',
          apartment: '',
        }),
        [field]: value,
      };

      onChange(updatedAddress);
    };

  return (
    <>
      <Checkbox
        checked={defaultChecked}
        onChange={(e) => onDefaultChange?.(e.target.checked)}
        className={styles.checkbox}
      >
        set as default address
      </Checkbox>

      <div className={styles.row}>
        <Form.Item
          label="Postal Code"
          name={`${prefix}PostalCode`}
          dependencies={[`${prefix}Country`]}
          rules={[
            ({ getFieldValue }) => ({
              validator: (_, value) =>
                validatePostalCode(
                  _,
                  value as string | undefined,
                  getFieldValue(`${prefix}Country`) as string | undefined,
                ),
            }),
          ]}
        >
          <Input
            id={`${prefix}_PostalCode`}
            value={address?.postalCode}
            onChange={handleChange('postalCode')}
            readOnly={readOnly}
          />
        </Form.Item>

        <Form.Item
          label="Country"
          name={`${prefix}Country`}
          rules={[{ required: true, message: 'select country' }]}
          className={styles.country}
        >
          <Select
            id={`${prefix}_Country`}
            value={address?.country}
            onChange={(value) => {
              if (onChange && address) {
                onChange({ ...address, country: value });
              }
            }}
            disabled={readOnly}
            placeholder="Select country"
          >
            <Select.Option value="RU">Russia</Select.Option>
            <Select.Option value="BY">Belarus</Select.Option>
            <Select.Option value="KZ">Kazakhstan</Select.Option>
          </Select>
        </Form.Item>
      </div>

      <div className={styles.row}>
        <Form.Item
          label="City"
          name={`${prefix}City`}
          rules={[
            { required: true, message: 'enter city' },
            { pattern: /^[A-Za-z]+$/, message: 'only letters A-Z or a-z' },
          ]}
        >
          <Input
            id={`${prefix}_City`}
            value={address?.city}
            onChange={handleChange('city')}
            readOnly={readOnly}
          />
        </Form.Item>

        <Form.Item
          label="Street"
          name={`${prefix}StreetName`}
          rules={[
            { required: true, message: 'enter street' },
            { validator: validateStreet },
          ]}
        >
          <Input
            id={`${prefix}_StreetName`}
            value={address?.streetName}
            onChange={handleChange('streetName')}
            readOnly={readOnly}
          />
        </Form.Item>

        <Form.Item label="Apartment" name={`${prefix}Apartment`}>
          <Input
            id={`${prefix}_Apartment`}
            value={address?.apartment}
            onChange={handleChange('apartment')}
            readOnly={readOnly}
          />
        </Form.Item>
      </div>
    </>
  );
};
