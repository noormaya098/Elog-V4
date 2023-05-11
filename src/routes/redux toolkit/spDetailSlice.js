import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isidata: [],
};

export const spDetailSlice = createSlice({
  name: 'spDetail',
  initialState,
  reducers: {
    setSpDetail: (state, action) => {
      state.isidata = action.payload;
    },
  },
});

export const { setSpDetail } = spDetailSlice.actions;

export default spDetailSlice.reducer;
