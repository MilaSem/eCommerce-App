import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  ClientResponse,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';

interface CustomerState {
  currentCustomer: ClientResponse<CustomerSignInResult> | null;
  login: (customerData: ClientResponse<CustomerSignInResult>) => void;
  logout: () => void;
}

export const customerStore = create<CustomerState>()(
  persist(
    (set) => ({
      currentCustomer: null,
      login: (customerData) => set({ currentCustomer: customerData }),
      logout: () => set({ currentCustomer: null }),
    }),
    {
      name: 'customerStore',
    },
  ),
);
