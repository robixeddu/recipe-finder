import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const LOCAL_STORAGE_KEY = "favorites";

const loadInitialState = (): string[] => {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: loadInitialState(),
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.indexOf(id);

      if (index === -1) {
        state.push(id);
        //return [...state, id]
      } else {
        state.splice(index, 1);
        //return state.filter((item) => item !== id)
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;