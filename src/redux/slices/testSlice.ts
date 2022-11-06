import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    test() {},
  },
});

export const { test } = testSlice.actions;

export default testSlice.reducer;
