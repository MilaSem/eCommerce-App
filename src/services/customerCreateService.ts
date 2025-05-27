import { apiRoot } from '@/api/api';
import { message } from 'antd';

import { loginCustomer } from '@/services/loginCustomerService';

import type {
  AddressData,
  PersonalData,
} from '@/components/RegisterForm/RegisterFormTypes';

const createAddressObject = (address: AddressData, key: string) =>
  Object.assign({ key }, address);

export const customerCreate = async (
  values: PersonalData,
  billingAddress?: AddressData,
  shippingAddress?: AddressData,
  isDefaultBilling?: boolean,
  isDefaultShipping?: boolean,
) => {
  try {
    const addresses = [];
    let billingIndex = -1;
    let shippingIndex = -1;

    if (billingAddress) {
      addresses.push(createAddressObject(billingAddress, 'billing'));
      billingIndex = addresses.length - 1;
    }

    if (shippingAddress) {
      if (
        billingAddress &&
        JSON.stringify(shippingAddress) === JSON.stringify(billingAddress)
      ) {
        shippingIndex = billingIndex;
      } else {
        addresses.push(createAddressObject(shippingAddress, 'shipping'));
        shippingIndex = addresses.length - 1;
      }
    }

    const dateOfBirthStr = values.dateOfBirth
      ? values.dateOfBirth.toISOString().split('T')[0]
      : undefined;

    const customerDraft = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: dateOfBirthStr,

      addresses,

      defaultBillingAddress: isDefaultBilling ? billingIndex : undefined,
      defaultShippingAddress: isDefaultShipping ? shippingIndex : undefined,

      shippingAddresses: shippingIndex !== -1 ? [shippingIndex] : [],
      billingAddresses: billingIndex !== -1 ? [billingIndex] : [],
    };

    const response = await apiRoot
      .customers()
      .post({ body: customerDraft })
      .execute();

    message.success('registration success');

    await loginCustomer(customerDraft.email, customerDraft.password);

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
