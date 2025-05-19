import { useReducer } from 'react';
import { useNavigate } from 'react-router';

import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  message,
  RadioChangeEvent,
} from 'antd';

import { customerCreate } from '@/services/customerCreateService';
import { customerStore } from '@/stores/customerStore';
import { validateAge, validatePassword } from '@/utils/validators';

import { AddressBlock } from '@/components/RegisterForm/AddressBlock';

import type {
  Action,
  AddressData,
  AddressMode,
  ApiError,
  PersonalData,
  State,
} from './RegisterFormTypes';

import styles from './RegisterForm.module.css';

interface FormValues extends PersonalData, AddressData {}

const initialState: State = {
  billingAddress: null,
  shippingAddress: null,
  addressMode: 'same',
  isDefaultBilling: false,
  isDefaultShipping: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_ADDRESS_MODE':
      if (action.payload === 'same' && state.billingAddress) {
        return {
          ...state,
          addressMode: 'same',
          shippingAddress: state.billingAddress,
        };
      }
      return { ...state, addressMode: action.payload };

    case 'UPDATE_BILLING_ADDRESS':
      if (state.addressMode === 'same') {
        return {
          ...state,
          billingAddress: action.payload,
          shippingAddress: action.payload,
        };
      }
      return { ...state, billingAddress: action.payload };

    case 'UPDATE_SHIPPING_ADDRESS':
      return { ...state, shippingAddress: action.payload };

    case 'TOGGLE_DEFAULT_BILLING':
      return { ...state, isDefaultBilling: action.payload };

    case 'TOGGLE_DEFAULT_SHIPPING':
      return { ...state, isDefaultShipping: action.payload };

    default:
      return state;
  }
};

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const login = customerStore((state) => state.login);

  const [form] = Form.useForm<FormValues>();

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleRadioChange = (e: RadioChangeEvent) => {
    dispatch({
      type: 'SET_ADDRESS_MODE',
      payload: e.target.value as AddressMode,
    });
  };

  const handleBillingChange = (address: AddressData) => {
    dispatch({ type: 'UPDATE_BILLING_ADDRESS', payload: address });
  };

  const handleShippingChange = (address: AddressData) => {
    dispatch({ type: 'UPDATE_SHIPPING_ADDRESS', payload: address });
  };

  const handleDefaultChange =
    (type: 'billing' | 'shipping') => (checked: boolean) => {
      if (type === 'billing') {
        dispatch({ type: 'TOGGLE_DEFAULT_BILLING', payload: checked });
      } else if (type === 'shipping') {
        dispatch({ type: 'TOGGLE_DEFAULT_SHIPPING', payload: checked });
      }
    };

  const onFinish = (values: PersonalData) => {
    customerCreate(
      values,
      state.billingAddress ?? undefined,
      state.shippingAddress ?? undefined,
      state.isDefaultBilling,
      state.isDefaultShipping,
    )
      .then((response) => {
        if (response) {
          login(response);
          console.log(response.body);
          void navigate('/');
        }
      })
      .catch((error: ApiError) => {
        message.error(error.body?.message);
      });
  };

  return (
    <Form<FormValues>
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className={styles.form}
    >
      <div className={styles.section}>
        <div className={styles.row}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: 'enter your first name' },
              {
                pattern: /^[A-Za-z]+$/,
                message: 'must contain only letters',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: 'enter your last name' },
              {
                pattern: /^[A-Za-z]+$/,
                message: 'must contain only letters',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Date of birth"
            name="dateOfBirth"
            rules={[{ validator: validateAge }]}
          >
            <DatePicker format="MM/DD/YYYY" />
          </Form.Item>
        </div>
        <div className={styles.row}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'enter your email' },
              { type: 'email', message: 'enter a valid email' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ validator: validatePassword }]}
          >
            <Input.Password />
          </Form.Item>
        </div>
      </div>

      <div className={styles.row}>
        <h4>Billing and shipping addresses:</h4>
        <Radio.Group
          onChange={handleRadioChange}
          value={state.addressMode}
          className={styles.radioGroup}
        >
          <Radio value="diff">different</Radio>
          <Radio value="same">same</Radio>
        </Radio.Group>
      </div>

      <div className={styles.section}>
        <h4>Billing Address</h4>
        <AddressBlock
          prefix="billing_"
          address={state.billingAddress}
          onChange={handleBillingChange}
          defaultChecked={state.isDefaultBilling}
          onDefaultChange={handleDefaultChange('billing')}
        />

        {state.addressMode === 'diff' && (
          <>
            <h4 className={styles.addressHeader}>Shipping Address</h4>
            <AddressBlock
              prefix="shipping_"
              address={state.shippingAddress}
              onChange={handleShippingChange}
              defaultChecked={state.isDefaultShipping}
              onDefaultChange={handleDefaultChange('shipping')}
            />
          </>
        )}
      </div>

      <Button type="primary" htmlType="submit" className={styles.button}>
        Register
      </Button>
    </Form>
  );
};
