export const mockProducts = {
  body: {
    results: [
      {
        id: '1',
        key: 'product-1',
        masterData: {
          current: {
            masterVariant: {
              images: [{ url: 'http://example.com/image1.jpg' }],
              attributes: [{ name: 'weight', value: '100' }],
            },
          },
        },
      },
      {
        id: '2',
        key: 'product-2',
        masterData: {
          current: {
            masterVariant: {
              images: [{ url: 'http://example.com/image2.jpg' }],
              attributes: [{ name: 'brand', value: 'yummy' }],
            },
          },
        },
      },
    ],
  },
};
