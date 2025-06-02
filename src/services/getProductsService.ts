import { apiRoot } from '@/api/api';

export const fetchProducts = async () => {
  const response = await apiRoot.products().get().execute();

  return response.body.results;
};

export const fetchProductById = async (id: string) => {
  try {
    const response = await apiRoot
      .products()
      .withId({ ID: id })
      .get()
      .execute();
    return response.body;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

export const fetchFilteredProducts = async (
  filters: Record<string, string | number | boolean>,
) => {
  const filterQueries = Object.entries(filters).map(([name, value]) => {
    if (name === 'weightMin') {
      return `masterData(current(masterVariant(attributes(name="weight" and value >= ${value}))))`;
    } else if (name === 'weightMax') {
      return `masterData(current(masterVariant(attributes(name="weight" and value <= ${value}))))`;
    } else if (name === 'priceMin') {
      return `masterData(current(masterVariant(attributes(name="price" and value >= ${value}))))`;
    } else if (name === 'priceMax') {
      return `masterData(current(masterVariant(attributes(name="price" and value <= ${value}))))`;
    } else if (typeof value === 'string') {
      return `masterData(current(masterVariant(attributes(name="${name}" and value="${value}"))))`;
    } else {
      return `masterData(current(masterVariant(attributes(name="${name}" and value=${value}))))`;
    }
  });

  const combinedFilterQuery = filterQueries.join(' AND ');

  try {
    const response = await apiRoot
      .products()
      .get({ queryArgs: { where: combinedFilterQuery } })
      .execute();
    return response.body.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchProductsByPrice = async (
  priceMin: number,
  priceMax: number,
) => {
  try {
    const response = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: `variants.price.centAmount:range (${priceMin * 100} to ${priceMax * 100})`,
        },
      })
      .execute();

    return response.body.results;
  } catch (error) {
    console.error('fetching error:', error);
    throw error;
  }
};

export const fetchProductTypes = async () => {
  const response = await apiRoot.productTypes().get().execute();
  return response.body.results.map((type) => ({
    id: type.id,
    name: type.name,
  }));
};
