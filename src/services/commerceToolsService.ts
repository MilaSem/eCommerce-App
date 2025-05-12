import { apiRoot } from '@/api/api';
import { Product } from '@commercetools/platform-sdk';

export const commerceToolsService = {
  getProducts: async (): Promise<Product[]> => {
    const response = await apiRoot.products().get().execute();
    return response.body.results;
  },
};
