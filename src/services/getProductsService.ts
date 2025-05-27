import { apiRoot } from '@/api/api';

export const getProducts = async () => {
  const response = await apiRoot.products().get().execute();
  return response.body.results;
};
