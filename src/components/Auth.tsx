import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
 
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Auth: React.FC = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
<Form.Item<FieldType>
        label="Почта"
        name="email"
        rules={[
          { required: true, message: "Пожалуйста, введите email!" },
          { type: "email", message: "Введите корректный email!" },
        ]}
      >
        <Input />
      </Form.Item>

    <Form.Item<FieldType>
      label="Пароль"
      name="password"
      rules={[{ required: true, message: 'Введите пароль' },
        { min: 8, message: 'Пароль должен быть не менее 8 символов' },
        {
          pattern: /[A-Z]/,
          message: 'Пароль должен содержать хотя бы одну заглавную букву',
          
        },
        {
          pattern: /[0-9]/,
          message: 'Пароль должен содержать хотя бы одну цифру',
        },
        {
            pattern: /[a-z]/,
          message: 'Пароль должен содержать хотя бы одну строчную букву'
        }
      ]}
    >       
      <Input.Password />
    </Form.Item>

    <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Отправить
      </Button>
    </Form.Item>
  </Form>
);

export default Auth;