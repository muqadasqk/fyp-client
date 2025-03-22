import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  errors: {}
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
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

export const { setLoading, setErrors, clearErrors } = uiSlice.actions;
export default uiSlice.reducer;

