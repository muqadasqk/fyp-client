import { createSlice } from '@reduxjs/toolkit';
import { readLocalStorage, writeLocalStorage } from '@utils';

const initialState = {
  theme: readLocalStorage("theme") ?? "system",
  isLoading: false,
  errors: {}
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      writeLocalStorage("theme", action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      state.errors = {};
    },
  },
});

export const { setTheme, setLoading, setErrors, clearErrors } = uiSlice.actions;
export default uiSlice.reducer;

