
import { Card, Descriptions, Button, Modal, Form, Input, message,DatePicker } from 'antd';
import { FC, useState } from 'react';
import { customerStore } from '../../stores/customerStore';
import { ctpClient } from '../../api/CtpClient';




const Profile : FC = () => {
  
  const customer = customerStore((state) => state.currentCustomer?.body.customer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  if (!customer) return  null;

  const showModal = () => {
    form.setFieldsValue({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      postal: customer.addresses[0].postalCode,
      country: customer.addresses[0].country,
      city: customer.addresses[0].city,
      street: customer.addresses[0].streetName,
      apartment: customer.addresses[0].apartment,
    });
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const apiRoot = ctpClient.createClient();

      await apiRoot.customers().withId({ ID: customer.id }).post({
        body: {
          version: customer.version,
          actions: [
            { action: 'setFirstName', firstName: values.firstName },
            { action: 'setLastName', lastName: values.lastName },
            { action: 'changeEmail', email: values.email },
            {
              action: 'changeAddress',
              addressId: existingAddressId,
              address: {
                country: values.country,
                city: values.city,
                postalCode: values.postalCode,
                streetName: values.streetName,
              },
            },
          ], 
        }, 
      }).execute();

      message.success('Данные обновлены');
      setIsModalOpen(false);
    } catch (error) {
      message.error('Не удалось обновить данные');
    }
  };

  return (
    <Card
      style={{ width: 1000, margin: '0 auto', marginTop: 50, border: '1px solid #d9d9d9' }}
      bodyStyle={{ display: 'flex', gap: 20 }}
    >
      <Descriptions column={1} style={{ flex: 1 }}>
        <Descriptions.Item label="First Name">{customer.firstName}</Descriptions.Item>
        <Descriptions.Item label="Last Name">{customer.lastName}</Descriptions.Item>
        <Descriptions.Item label="Date of birth">{customer.dateOfBirth}</Descriptions.Item>
      </Descriptions>
      <Descriptions column={1} style={{ flex: 1 }}>
        <Descriptions.Item label="Postal Code">{customer.addresses[0].postalCode}</Descriptions.Item>
        <Descriptions.Item label="Country">{customer.addresses[0].country}</Descriptions.Item>
        <Descriptions.Item label="City">{customer.addresses[0].city}</Descriptions.Item>
        <Descriptions.Item label="Street">{customer.addresses[0].streetName}</Descriptions.Item>
        <Descriptions.Item label="Apartment">{customer.addresses[0].apartment}</Descriptions.Item>
      </Descriptions>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Button type="primary" onClick={showModal}>Edit profile</Button>
        <Button type="primary" >Billing</Button>
        <Button type="primary">Shipping</Button>
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
            name="first Name"
            label="First Name"
            rules={[{ required: true, message: 'enter your first name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Last Name"
            label="Last Name"
            rules={[{ required: true, message: 'enter your last name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Date of birth"
            name="dateOfBirth"
            rules={[
              { required: true, message: 'pick date of birth' },
           
            ]}
          >
            <DatePicker format="MM/DD/YYYY" />
          </Form.Item>

          <Form.Item
            name="email"
            label="email"
            rules={[
              { required: true, message: 'enter your email' },
              { type: 'email', message: 'enter your email' },
            ]}
          >
              <Input />




<Form.Item
  name="Country"
  label="Country"
  rules={[{ required: true, message: 'enter your country' }]}
>
  <Input />
</Form.Item>

<Form.Item
  name="city"
  label="city"
  rules={[{ required: true, message: 'enter your city' }]}
>
  <Input placeholder="Москва" />
</Form.Item>

<Form.Item
  name="street"
  label="street"
  rules={[{ required: true, message: 'enter your street' }]}
>
  <Input/>
</Form.Item>

<Form.Item
  name="postalCode"
  label="postalCode"
  rules={[
    { required: true, message: 'enter your postalCode' },
    { pattern: /^\d{5,6}$/, message: 'enter your postalCode' },
  ]}

>
<Input/>


</Form.Item>






        
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Profile;






















/* import { Card, Descriptions,Button, Modal,Form, Input} from 'antd';
import { useState } from 'react';
import { customerStore } from '../../stores/customerStore';
import { ctpClient } from '../../api/CtpClient';






apiRoot.customers()
  .withId({ ID: customerId })
  .post({
    body: {
      version: customerVersion,
      actions: [
        { action: 'setFirstName', firstName: newFirstName },
        { action: 'setLastName', lastName: newLastName },
        { action: 'changeEmail', email: newEmail },
      ],
    },
  })
  .execute()
  .then(response => {
    console.log('Обновлено успешно:', response.body);
  })
  .catch(error => {
    console.error('Ошибка обновления:', error);
  });



  const customer = ctpClient((state) => state.currentCustomer?.body.customer);

  if (!customer) return <p>Пользователь не найден</p>;

  return (
    <div>
      <h2>Профиль пользователя</h2>
      <p><strong>Имя:</strong> {customer.firstName}</p>
      <p><strong>Фамилия:</strong> {customer.lastName}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Дата рождения:</strong> {customer.dateOfBirth}</p>
    </div>
  );










const Profile = () => {
  const user = {
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    password: '',
    postal: '',
    country: '',
    city: '',
    street: '',
    apartment: '',

  };










  

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };




  return (
    <Card
      style={{ width: 1000,  margin: '0 auto', marginTop: 50,  borderWidth: 1, borderStyle: 'thin',  borderColor: '#d9d9d9',}}  bodyStyle={{ display: 'flex', gap: 20 }}
    >
 

      <Descriptions column={1} style={{flex: 1}} >
        <Descriptions.Item label="First Name">{user.firstName} {customer.firstName} </Descriptions.Item>
        <Descriptions.Item label="Last Name">{user.lastName}</Descriptions.Item>
        <Descriptions.Item label="Date of birth">{user.age}</Descriptions.Item>
        </Descriptions>
        <Descriptions column={1} style={{flex:1}}>
        <Descriptions.Item label="Postal code">{user.postal}</Descriptions.Item>
        <Descriptions.Item label="Country">{user.country}</Descriptions.Item>
        <Descriptions.Item label="City">{user.city}</Descriptions.Item>
        <Descriptions.Item label="Street ">{user.street}</Descriptions.Item>
        <Descriptions.Item label="Apartment">{user.apartment}</Descriptions.Item>
    
      </Descriptions>

      <div style={{display: 'flex',  flexDirection: 'column', gap: 10 }} >
    <Button type="primary" onClick={showModal}style={{ marginRight: 10 }}>Edit profile</Button>
    <Button type="primary">Billing</Button>
    <Button type="primary">Shipping</Button>
  </div>
  <Modal closable={false}   open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => setIsModalOpen(false)  }>

   
    
      <Form.Item
        name="first Name"
        label="firstName"
        rules={[
          { required: true, message: 'enter your first name' },
          {
            pattern: /^[A-Za-z]+$/,
            message: 'must contain only letters',
          },
        ]}
      >
        <Input style={{width :'150px'}} />
      </Form.Item>

      <Form.Item
        name="last name"
        label="Last name"
        rules={[{ required: true, message: 'Введите фамилию' }]}
      >
        <Input style={{width :'150px'}} />
      </Form.Item>

      <Form.Item
        name="email"
        label="Почта"
        rules={[
          { required: true, message: 'Введите почту' },
          { type: 'email', message: 'Некорректный формат почты' },
        ]}
      >
        <Input style={{width :'150px'}} />
      </Form.Item>



        
 
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


   
       
      </Modal>





    </Card>






  );
};

export default Profile;
 */

/* import { Card, Descriptions, Button, Modal, Form, Input, message } from 'antd';
import { useState } from 'react';
import { customerStore } from '../../stores/customerStore';
import { ctpClient } from '../../api/CtpClient';

const Profile = () => {
  const customer = customerStore((state) => state.currentCustomer?.body.customer);
  console.log(customer)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  if (!customer) return <p>Пользователь не найден</p>;

  const showModal = () => {
    form.setFieldsValue({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      postal: customer.addresses[0].postalCode,
      country: customer.addresses[0].city,
    });
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const apiRoot = ctpClient.createClient();

      await apiRoot.customers().withId({ ID: customer.id }).post({
        body: {
          version: customer.version,
          actions: [
            { action: 'setFirstName', firstName: values.firstName },
            { action: 'setLastName', lastName: values.lastName },
            { action: 'changeEmail', email: values.email },
          ],
        },
      }).execute();

      message.success('Данные обновлены');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Ошибка обновления:', error);
      message.error('Не удалось обновить данные');
    }
  };

  return (
    <Card
      style={{ width: 1000, margin: '0 auto', marginTop: 50, border: '1px solid #d9d9d9' }}
      bodyStyle={{ display: 'flex', gap: 20 }}
    >
      <Descriptions column={1} style={{ flex: 1 }}>
        <Descriptions.Item label="First Name">{customer.firstName}</Descriptions.Item>
        <Descriptions.Item label="Last Name">{customer.lastName}</Descriptions.Item>
        <Descriptions.Item label="Date of birth">{customer.dateOfBirth}</Descriptions.Item>
      </Descriptions>
      <Descriptions column={1} style={{ flex: 1 }}>
        <Descriptions.Item label="Postal Code">{customer.addresses[0].postalCode}</Descriptions.Item>
        <Descriptions.Item label="City">{customer.addresses[0].city}</Descriptions.Item>
      </Descriptions>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Button type="primary" onClick={showModal}>Edit profile</Button>
      </div>

      <Modal
        title="Редактировать профиль"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleOk}
        closable={false}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="firstName"
            label="Имя"
            rules={[{ required: true, message: 'Введите имя' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Фамилия"
            rules={[{ required: true, message: 'Введите фамилию' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Почта"
            rules={[
              { required: true, message: 'Введите почту' },
              { type: 'email', message: 'Некорректный формат почты' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Profile; */