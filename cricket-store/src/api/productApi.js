import { mockProducts, mockCategories } from "../data/mockData";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const productApi = {
  getAllProducts: async () => {
    await delay(500);
    return { data: mockProducts };
  },

  getProductById: async (id) => {
    await delay(300);
    const product = mockProducts.find((p) => p.id === parseInt(id));
    if (!product) {
      throw new Error("Product not found");
    }
    return { data: product };
  },

  getProductsByCategory: async (categorySlug) => {
    await delay(400);
    const products = mockProducts.filter((p) => p.category === categorySlug);
    return { data: products };
  },

  getCategories: async () => {
    await delay(200);
    return { data: mockCategories };
  },

  searchProducts: async (query) => {
    await delay(300);
    const products = mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    );
    return { data: products };
  },
};
