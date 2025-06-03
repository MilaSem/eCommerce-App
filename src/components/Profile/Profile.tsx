import { Button, Modal, Form, Input, message, DatePicker } from 'antd';
import { FC, useState } from 'react';
import { customerStore } from '../../stores/customerStore';
import { apiRoot } from '@/api/api';
import styles from './Profile.module.css';
import { validateAge, validateStreet } from '@/utils/validators';

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  postalCode: string;
  country: string;
  city: string;
  street: string;
  apartment: string;
}

export const Profile: FC = () => {
  const customer = customerStore(
    (state) => state.currentCustomer?.body.customer,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm<ProfileFormValues>();

  if (!customer) return null;

  const showModal = () => {
    form.setFieldsValue({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      postalCode: customer.addresses[0].postalCode,
      country: customer.addresses[0].country,
      city: customer.addresses[0].city,
      street: customer.addresses[0].streetName,
      apartment: customer.addresses[0].apartment,
    });
    setIsModalOpen(true);
  };

  const handleOkAsync = async () => {
    try {
      const values = await form.validateFields();

      await apiRoot
        .customers()
        .withId({ ID: customer.id })
        .post({
          body: {
            version: customer.version,
            actions: [
              { action: 'setFirstName', firstName: values.firstName },
              { action: 'setLastName', lastName: values.lastName },
              { action: 'changeEmail', email: values.email },
              {
                action: 'changeAddress',
                address: {
                  country: values.country,
                  city: values.city,
                  postalCode: values.postalCode,
                  streetName: values.street,
                },
              },
            ],
          },
        })
        .execute();

      message.success('Data updated');
      setIsModalOpen(false);
    } catch (error) {
      message.error('Failed to update data');
      console.error(error);
    }
  };

  const handleOk = () => {
    void handleOkAsync();
  };

  return (
    <div className={styles.card}>
      <div className={styles.group}>
        <div>
          <span className={styles.label}>First Name:</span> {customer.firstName}
        </div>
        <div>
          <span className={styles.label}>Last Name:</span> {customer.lastName}
        </div>
        <div>
          <span className={styles.label}>Date of birth:</span>{' '}
          {customer.dateOfBirth}
        </div>
      </div>

      <div className={styles.group}>
        <div>
          <span className={styles.label}>Postal Code:</span>{' '}
          {customer.addresses[0].postalCode}
        </div>
        <div>
          <span className={styles.label}>Country:</span>{' '}
          {customer.addresses[0].country}
        </div>
        <div>
          <span className={styles.label}>City:</span>{' '}
          {customer.addresses[0].city}
        </div>
        <div>
          <span className={styles.label}>Street:</span>{' '}
          {customer.addresses[0].streetName}
        </div>
        <div>
          <span className={styles.label}>Apartment:</span>{' '}
          {customer.addresses[0].apartment}
        </div>
      </div>

      <div className={styles.control}>
        <Button className={styles.button} type="primary" onClick={showModal}>
          Edit profile
        </Button>
        <Button className={styles.button} type="primary">
          Billing
        </Button>
        <Button className={styles.button} type="primary">
          Shipping
        </Button>
      </div>

      <Modal
        title="Edit profile"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleOk}
        closable={false}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="firstName"
            label="First Name"
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
            name="lastName"
            label="Last Name"
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
            name="dateOfBirth"
            label="Date of birth"
            rules={[
              { required: true, message: 'pick date of birth' },
              { validator: validateAge },
            ]}
          >
            <DatePicker format="MM/DD/YYYY" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'enter your email' },
              { type: 'email', message: 'enter a valid email' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: 'enter your country' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: 'enter your city' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="street"
            label="Street"
            rules={[
              { required: true, message: 'enter street' },
              { validator: validateStreet },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="postalCode"
            label="Postal Code"
            rules={[
              { required: true, message: 'enter your postal code' },
              { pattern: /^\d{5,6}$/, message: 'enter your postal code' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
