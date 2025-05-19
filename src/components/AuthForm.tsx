import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

type FieldType = {
  email?: string;
  password?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
 
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const AuthForm: React.FC = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
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
          {
            validator(_, value) {
              if (value.startsWith(' ')) {
                return Promise.reject(
                  new Error('An email should not start with a space.')
                );
              }
      
              if (value.endsWith(' ')) {
                return Promise.reject(
                  new Error('An email should not end with a space.')
                );
              }
      
              return Promise.resolve();
            },
          },
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
        },
        { 
          validator(_, value) {
            if (!value) return Promise.resolve(); 
      
            if (value.startsWith(' ')) {
              return Promise.reject(new Error('Password should not start with a space'));
            }
      
            if (value.endsWith(' ')) {
              return Promise.reject(new Error('Password should not end with a space'));
            }
      
            return Promise.resolve();
          },

        }
      ]}
    >       
      <Input.Password />
    </Form.Item>

 

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Send
      </Button>
    </Form.Item>
  </Form>
);

export default AuthForm;