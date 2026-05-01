import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import settingsReducer from './settingsSlice';
import productsReducer from './productsSlice';
import wishlistReducer from './wishlistSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    settings: settingsReducer,
    products: productsReducer,
    wishlist: wishlistReducer,
  },
});
