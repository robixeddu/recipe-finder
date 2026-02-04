import { Middleware } from '@reduxjs/toolkit';

const LOCAL_STORAGE_KEY = 'favorites';

export const localStorageMiddleware: Middleware = 
  (store) => (next) => (action: any) => {
    const result = next(action);
    
    // Save to localStorage after any favorites action
    if (action.type?.startsWith('favorites/')) {
      const state = store.getState();
      try {
        localStorage.setItem(
          LOCAL_STORAGE_KEY, 
          JSON.stringify(state.favorites)
        );
      } catch (error) {
        console.error('Failed to save favorites to localStorage:', error);
      }
    }
    
    return result;
  };