import { createSlice } from '@reduxjs/toolkit';
import { products as initialProducts } from '../data/products';

// Initial state with site-specific products
const initialState = {
  products: initialProducts.map(p => ({ ...p, siteId: 'site_1' })), // Default all to site 1
};

const loadProducts = () => {
  const saved = localStorage.getItem('acharu-products');
  return saved ? JSON.parse(saved) : initialState;
};

const productsSlice = createSlice({
  name: 'products',
  initialState: loadProducts(),
  reducers: {
    addProduct: (state, action) => {
      state.products.push({
        ...action.payload,
        id: Date.now().toString()
      });
      localStorage.setItem('acharu-products', JSON.stringify(state));
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
        localStorage.setItem('acharu-products', JSON.stringify(state));
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
      localStorage.setItem('acharu-products', JSON.stringify(state));
    },
    syncInventory: (state, action) => {
      // Logic for syncing with a real backend would go here
      state.products = action.payload;
      localStorage.setItem('acharu-products', JSON.stringify(state));
    }
  }
});

export const { addProduct, updateProduct, deleteProduct, syncInventory } = productsSlice.actions;

export const selectAllProducts = (state) => state.products.products;
export const selectProductsBySite = (state, siteId) => 
  state.products.products.filter(p => p.siteId === siteId);

export default productsSlice.reducer;
