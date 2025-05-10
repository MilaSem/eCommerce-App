import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { ProductList } from './ProductList';
import { mockProducts } from './mockProducts';

vi.mock('@commercetools/platform-sdk', () => {
  return {
    createApiBuilderFromCtpClient: () => ({
      withProjectKey: () => ({
        products: () => ({
          get: () => ({
            execute: vi.fn().mockResolvedValue(mockProducts),
          }),
        }),
      }),
    }),
  };
});

describe('ProductList', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should display loading state initially', () => {
    render(<ProductList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should display products after loading', async () => {
    render(<ProductList />);

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument(),
    );

    const productTypeElements = screen.getAllByText(/product type:/i);
    expect(productTypeElements.length).toBeGreaterThan(0);

    const weightElements = screen.getAllByText(/weight : 100/i);
    expect(weightElements.length).toBeGreaterThan(0);

    const brandElements = screen.getAllByText(/brand : yummy/i);
    expect(brandElements.length).toBeGreaterThan(0);

    const images = screen.getAllByRole('img');
    mockProducts.body.results.forEach((product, index) => {
      const imageUrl = product.masterData.current.masterVariant.images[0].url;
      expect(images[index]).toHaveAttribute('src', imageUrl);
    });
  });
});
