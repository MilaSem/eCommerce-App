import { create } from 'zustand';
import type {
  ByProjectKeyRequestBuilder,
  Cart,
  LineItemDraft,
  CartAddLineItemAction,
  CartRemoveLineItemAction,
} from '@commercetools/platform-sdk';

interface LocalCartItem {
  productId: string;
  variantId: number;
  quantity: number;
}

interface CartStore {
  isMergingCart: boolean;
  isCartReady: boolean;

  cart: Cart | null;
  loading: boolean;
  error: string | null;

  localCart: LocalCartItem[];

  isAddingToCart: boolean;
  addingProductId: string | null;

  fetchCart: (
    client: ByProjectKeyRequestBuilder,
    customerId: string,
  ) => Promise<void>;

  addToCart: (
    client: ByProjectKeyRequestBuilder,
    customerId: string,
    productId: string,
    variantId: number,
    quantity?: number,
  ) => Promise<void>;

  addToLocalCart: (
    productId: string,
    variantId: number,
    quantity?: number,
  ) => void;

  removeFromCart: (
    client: ByProjectKeyRequestBuilder,
    productId: string,
    variantId: number,
  ) => Promise<void>;

  removeFromLocalCart: (productId: string, variantId: number) => void;

  clearLocalCart: () => void;

  clearCart: () => void;

  mergeLocalCartToServer: (
    client: ByProjectKeyRequestBuilder,
    customerId: string,
  ) => Promise<void>;

  loadLocalCart: () => void;

  clearServerCart: (
    client: ByProjectKeyRequestBuilder,
    cartId: string,
    version: number,
  ) => Promise<void>;
}

const LOCAL_CART_KEY = 'local_cart';

const mapToAddLineItemAction = (
  item: LocalCartItem,
): CartAddLineItemAction => ({
  action: 'addLineItem',
  productId: item.productId,
  variantId: item.variantId,
  quantity: item.quantity,
});

export const useCartStore = create<CartStore>((set, get) => ({
  cart: null,
  loading: false,
  error: null,

  isMergingCart: false,
  isCartReady: false,

  isAddingToCart: false,
  addingProductId: null,

  localCart: [],

  loadLocalCart: () => {
    const json = localStorage.getItem(LOCAL_CART_KEY);
    if (json) {
      try {
        const items: LocalCartItem[] = JSON.parse(json) as LocalCartItem[];
        set({ localCart: items, isCartReady: true });
      } catch {
        set({ localCart: [], isCartReady: true });
      }
    } else {
      set({ localCart: [], isCartReady: true });
    }
  },

  addToLocalCart: (productId, variantId, quantity = 1) => {
    const localCart = get().localCart.slice();
    const idx = localCart.findIndex(
      (i) => i.productId === productId && i.variantId === variantId,
    );
    if (idx !== -1) {
      localCart[idx].quantity += quantity;
    } else {
      localCart.push({ productId, variantId, quantity });
    }
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(localCart));
    set({ localCart });
  },

  removeFromLocalCart: (productId, variantId) => {
    const localCart = get().localCart.filter(
      (item) => !(item.productId === productId && item.variantId === variantId),
    );
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(localCart));
    set({ localCart });
  },

  clearLocalCart: () => {
    localStorage.removeItem(LOCAL_CART_KEY);
    set({ localCart: [] });
  },

  clearCart: () => {
    get().clearLocalCart();
    set({
      cart: null,
      isAddingToCart: false,
      addingProductId: null,
      error: null,
    });
  },

  fetchCart: async (client, customerId) => {
    set({ loading: true, error: null });
    try {
      const response = await client
        .carts()
        .get({
          queryArgs: {
            where: `customerId="${customerId}" and cartState="Active"`,
          },
        })
        .execute();

      const cart = response.body.results[0] || null;
      set({ cart, loading: false, isCartReady: true });
    } catch (error) {
      set({
        error: (error as Error).message,
        loading: false,
        isCartReady: true,
      });
    }
  },

  addToCart: async (client, customerId, productId, variantId, quantity = 1) => {
    set({ isAddingToCart: true, addingProductId: productId });

    const cart = get().cart;

    if (!cart) {
      const lineItemDraft: LineItemDraft = {
        productId,
        variantId,
        quantity,
      };

      try {
        const response = await client
          .carts()
          .post({
            body: {
              currency: 'USD',
              customerId,
              lineItems: [lineItemDraft],
            },
          })
          .execute();

        set({ cart: response.body, error: null });
      } catch (error) {
        set({ error: (error as Error).message });
      } finally {
        set({ isAddingToCart: false, addingProductId: null });
      }
    } else {
      try {
        const response = await client
          .carts()
          .withId({ ID: cart.id })
          .post({
            body: {
              version: cart.version,
              actions: [
                {
                  action: 'addLineItem',
                  productId,
                  variantId,
                  quantity,
                },
              ] as CartAddLineItemAction[],
            },
          })
          .execute();

        set({ cart: response.body, error: null });
      } catch (error) {
        set({ error: (error as Error).message });
      } finally {
        set({ isAddingToCart: false, addingProductId: null });
      }
    }
  },

  removeFromCart: async (client, productId, variantId) => {
    const cart = get().cart;
    if (!cart) return;

    const lineItem = cart.lineItems.find(
      (item) => item.productId === productId && item.variant?.id === variantId,
    );

    if (!lineItem) return;

    try {
      const response = await client
        .carts()
        .withId({ ID: cart.id })
        .post({
          body: {
            version: cart.version,
            actions: [
              {
                action: 'removeLineItem',
                lineItemId: lineItem.id,
                quantity: lineItem.quantity,
              },
            ],
          },
        })
        .execute();

      set({ cart: response.body, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  mergeLocalCartToServer: async (client, customerId) => {
    if (get().isMergingCart) return;

    set({ isMergingCart: true });

    const localCart = get().localCart;
    if (localCart.length === 0) {
      set({ isMergingCart: false });
      return;
    }

    await get().fetchCart(client, customerId);
    const cart = get().cart;

    try {
      if (!cart) {
        const lineItems: LineItemDraft[] = localCart.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        }));

        const response = await client
          .carts()
          .post({
            body: {
              currency: 'USD',
              customerId,
              lineItems,
            },
          })
          .execute();

        set({ cart: response.body, error: null });
      } else {
        const actions: CartAddLineItemAction[] = localCart.map(
          mapToAddLineItemAction,
        );

        const response = await client
          .carts()
          .withId({ ID: cart.id })
          .post({
            body: {
              version: cart.version,
              actions,
            },
          })
          .execute();

        set({ cart: response.body, error: null });
      }

      get().clearLocalCart();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isMergingCart: false });
    }
  },

  clearServerCart: async (client, cartId, version) => {
    const cart = get().cart;
    if (!cart || !cart.lineItems || cart.lineItems.length === 0) return;

    const actions: CartRemoveLineItemAction[] = cart.lineItems.map((item) => ({
      action: 'removeLineItem',
      lineItemId: item.id,
      quantity: item.quantity,
    }));

    try {
      const response = await client
        .carts()
        .withId({ ID: cartId })
        .post({
          body: {
            version,
            actions,
          },
        })
        .execute();

      set({ cart: response.body, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));
