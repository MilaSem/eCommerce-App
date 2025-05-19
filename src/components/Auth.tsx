import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

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
        label="email"
        name="email"
        rules={[
          { required: true, message: "Please enter your email!" },
          { type: "email", message: "Enter the correct email!" },
        ]}
      >
        <Input />
      </Form.Item>

    <Form.Item<FieldType>
      label="password"
      name="password"
      rules={[{ required: true, message: 'Enter the password' },
        { min: 8, message: 'The password must be at least 8 characters long' },
        {
          pattern: /[A-Z]/,
          message: 'The password must contain at least one uppercase letter',
          
        },
        {
          pattern: /[0-9]/,
          message: 'The password must contain at least one digit',
        },
        {
            pattern: /[a-z]/,
          message: 'The password must contain at least one lowercase letter'
        }
      ]}
    >       
      <Input.Password />
    </Form.Item>

 

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        send
      </Button>
    </Form.Item>
  </Form>
);

export default Auth;