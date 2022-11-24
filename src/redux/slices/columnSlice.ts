import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnData } from 'ts/interfaces';

interface ColumnState {
  selectedColumn: ColumnData | null;
}

const initialState: ColumnState = {
  selectedColumn: null,
};

const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setSelectedColumn(state, { payload }: PayloadAction<ColumnData | null>) {
      state.selectedColumn = payload;
    },
  },
});

export const { setSelectedColumn } = columnSlice.actions;

export default columnSlice.reducer;
