export interface AddressData {
  postalCode: string;
  country: string;
  city: string;
  streetName: string;
  apartment?: string;
}

export interface PersonalData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
}

export interface ApiError {
  message: string;
}

export type AddressMode = 'same' | 'diff';

export interface State {
  billingAddress: AddressData | null;
  shippingAddress: AddressData | null;
  addressMode: AddressMode;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
}

type SetAddressModeAction = {
  type: 'SET_ADDRESS_MODE';
  payload: AddressMode;
};

type UpdateBillingAddressAction = {
  type: 'UPDATE_BILLING_ADDRESS';
  payload: AddressData;
};

type UpdateShippingAddressAction = {
  type: 'UPDATE_SHIPPING_ADDRESS';
  payload: AddressData;
};

type ToggleDefaultBillingAction = {
  type: 'TOGGLE_DEFAULT_BILLING';
  payload: boolean;
};

type ToggleDefaultShippingAction = {
  type: 'TOGGLE_DEFAULT_SHIPPING';
  payload: boolean;
};

export type Action =
  | SetAddressModeAction
  | UpdateBillingAddressAction
  | UpdateShippingAddressAction
  | ToggleDefaultBillingAction
  | ToggleDefaultShippingAction;
