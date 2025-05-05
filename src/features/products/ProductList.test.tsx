import { render, screen, waitFor } from '@testing-library/react';

import { describe, it, expect, vi, beforeEach } from 'vitest';
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
  beforeEach(() => {
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

    expect(screen.getByText(/weight : 100/i)).toBeInTheDocument();
    expect(screen.getByText(/brand : yummy/i)).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'http://example.com/image1.jpg');
    expect(images[1]).toHaveAttribute('src', 'http://example.com/image2.jpg');
  });
});
