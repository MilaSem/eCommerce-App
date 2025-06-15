import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  ByProjectKeyRequestBuilder,
  ClientResponse,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { CtpClient } from '@/api/CtpClient';
import { useCartStore } from './cartStore';

interface CurrentCustomer {
  data: ClientResponse<CustomerSignInResult>;
  client: ByProjectKeyRequestBuilder;
}

interface CustomerState {
  currentCustomer: CurrentCustomer | null;
  login: (
    customerData: ClientResponse<CustomerSignInResult>,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
  initClientFromPersist: (
    customerData: ClientResponse<CustomerSignInResult>,
  ) => void;
}

const ctpClient = new CtpClient();

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set) => ({
      currentCustomer: null,

      login: async (customerData, email, password) => {
        console.log('[CustomerStore] login', {
          email,
          customerId: customerData.body.customer.id,
        });
        const client = ctpClient.createCustomerClient(email, password);
        console.log('[CustomerStore] created client', client);
        set({ currentCustomer: { data: customerData, client } });

        const { mergeLocalCartToServer } = useCartStore.getState();

        await mergeLocalCartToServer(client, customerData.body.customer.id);
      },

      logout: () => {
        useCartStore.getState().clearCart();
        set({ currentCustomer: null });
      },

      initClientFromPersist: (customerData) => {
        const client = ctpClient.createClient();
        set({ currentCustomer: { data: customerData, client } });
      },
    }),
    {
      name: 'customerStore',
      partialize: (state) => ({
        currentCustomer: state.currentCustomer
          ? { data: state.currentCustomer.data }
          : null,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.currentCustomer?.data) {
          state.initClientFromPersist(state.currentCustomer.data);
        }
      },
    },
  ),
);
