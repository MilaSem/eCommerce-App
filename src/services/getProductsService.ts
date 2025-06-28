import { apiRoot } from '@/api/api';

export const fetchProducts = async () => {
  try {
    const response = await apiRoot.productProjections().get().execute();
    return response.body.results;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductTypes = async () => {
  try {
    const response = await apiRoot.productTypes().get().execute();
    return response.body.results.map((type) => ({
      id: type.id,
      name: type.name,
    }));
  } catch (error) {
    console.error('Error fetching product types:', error);
    throw error;
  }
};

export const fetchProductById = async (id: string) => {
  try {
    const response = await apiRoot
      .productProjections()
      .withId({ ID: id })
      .get()
      .execute();
    return response.body;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

export const buildNumericRangeFilter = (
  attributeName: string,
  min?: number,
  max?: number,
): string | null => {
  if (min !== undefined && max !== undefined) {
    return `variants.attributes.${attributeName}:range (${min} to ${max})`;
  }
  if (min !== undefined) {
    return `variants.attributes.${attributeName}:range (${min} to *)`;
  }
  if (max !== undefined) {
    return `variants.attributes.${attributeName}:range (* to ${max})`;
  }
  return null;
};

export const buildSearchAttributeFilter = (
  filters: Record<string, string | number | boolean | undefined | null>,
): string[] => {
  return Object.entries(filters)
    .filter(([, value]) => {
      return value !== '' && value !== undefined && value !== null;
    })
    .map(([name, value]) => {
      if (typeof value === 'string') {
        return `variants.attributes.${name}:"${value}"`;
      } else {
        return `variants.attributes.${name}:${value}`;
      }
    });
};

export const buildPriceFilter = (
  priceMin?: number,
  priceMax?: number,
): string | null => {
  if (priceMin !== undefined && priceMax !== undefined) {
    return `variants.price.centAmount:range (${priceMin * 100} to ${priceMax * 100})`;
  }
  if (priceMin !== undefined) {
    return `variants.price.centAmount:range (${priceMin * 100} to *)`;
  }
  if (priceMax !== undefined) {
    return `variants.price.centAmount:range (* to ${priceMax * 100})`;
  }
  return null;
};

export const fetchFilteredProducts = async (
  filters: Record<string, string | number | boolean | undefined | null>,
) => {
  const toNumber = (val: unknown): number | undefined => {
    const num = typeof val === 'number' ? val : parseFloat(String(val));
    return isNaN(num) ? undefined : num;
  };

  const { priceMin, priceMax, weightMin, weightMax, ...attributeFilters } =
    filters;

  const priceMinNum = toNumber(priceMin);
  const priceMaxNum = toNumber(priceMax);
  const weightMinNum = toNumber(weightMin);
  const weightMaxNum = toNumber(weightMax);

  const filterExpressions: string[] = [];

  const attributeFilterExpressions =
    buildSearchAttributeFilter(attributeFilters);
  if (attributeFilterExpressions.length > 0) {
    filterExpressions.push(...attributeFilterExpressions);
  }

  const priceFilter = buildPriceFilter(priceMinNum, priceMaxNum);
  if (priceFilter) {
    filterExpressions.push(priceFilter);
  }

  const weightFilter = buildNumericRangeFilter(
    'weight',
    weightMinNum,
    weightMaxNum,
  );
  if (weightFilter) {
    filterExpressions.push(weightFilter);
  }

  try {
    if (filterExpressions.length > 0) {
      console.log('Search filters:', filterExpressions);

      const response = await apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            filter: filterExpressions,
            limit: 50,
          },
        })
        .execute();

      return response.body.results;
    } else {
      console.log('Fetching all products');

      const response = await apiRoot
        .productProjections()
        .get({ queryArgs: { limit: 50 } })
        .execute();

      return response.body.results;
    }
  } catch (error) {
    console.error('Error fetching filtered products:', error);
    throw error;
  }
};
