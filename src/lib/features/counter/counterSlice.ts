import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment(state) {
      state.value += 1;
    },
    setValue(state, action) {
      state.value = action.payload;
    },
  },
});

export const { increment, setValue } = counterSlice.actions;
export default counterSlice.reducer;