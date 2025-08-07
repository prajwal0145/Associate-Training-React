import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  categories: [],
  selectedCategory: null,
  selectedProduct: null,
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setLoading,
  setProducts,
  setCategories,
  setSelectedCategory,
  setSelectedProduct,
  setError,
} = productSlice.actions;

export default productSlice.reducer;
