import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnData } from 'ts/interfaces';

interface ColumnState {
  selectedColumn: ColumnData | null;
  isDeleteColumnPopupOpen: boolean;
  isCreateColumnPopupOpen: boolean;
}

const initialState: ColumnState = {
  selectedColumn: null,
  isDeleteColumnPopupOpen: false,
  isCreateColumnPopupOpen: false,
};

const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setSelectedColumn(state, { payload }: PayloadAction<ColumnData | null>) {
      state.selectedColumn = payload;
    },

    setDeleteColumnPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isDeleteColumnPopupOpen = payload;
    },

    setCreateColumnPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isCreateColumnPopupOpen = payload;
    },
  },
});

export const { setSelectedColumn, setDeleteColumnPopupOpen, setCreateColumnPopupOpen } =
  columnSlice.actions;

export default columnSlice.reducer;
