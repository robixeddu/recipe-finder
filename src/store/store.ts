import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import { localStorageMiddleware } from './localStorageMiddleware';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;