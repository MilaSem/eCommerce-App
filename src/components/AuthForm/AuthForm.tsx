import { useNavigate } from 'react-router';

import { Form, Input, Button, message } from 'antd';

import { customerStore } from '@/stores/customerStore';
import { loginCustomer } from '@/services/loginCustomerService';
import { validatePassword } from '@/utils/validators';

import styles from './AuthForm.module.css';

type FieldType = {
  email: string;
  password: string;
};

interface ApiError {
  message?: string;
}

export const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const login = customerStore((state) => state.login);

  const onFinish = (values: FieldType) => {
    loginCustomer(values.email, values.password)
      .then((response) => {
        if (response) {
          message.success('success enter!');
          login(response);
          console.log(response.body);
          void navigate('/');
        }
      })
      .catch((error: ApiError) => {
        message.error(error.message);
      });
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <div className={styles.section}>
        <Form.Item
          label="email"
          name="email"
          rules={[
            { required: true, message: 'enter your email' },
            { type: 'email', message: 'enter a valid email' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[
            { required: true, message: 'enter your password' },
            { validator: validatePassword },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" className={styles.button}>
          Login
        </Button>
      </div>
    </Form>
  );
};
