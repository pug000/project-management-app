import { createSelector } from '@reduxjs/toolkit';
import { getBaseAllColumns } from 'redux/api/columnApiSlice';
import { RootState } from 'redux/store';

const getBaseColumnState = (state: RootState) => state.column;

const getSelectedColumn = createSelector(
  getBaseColumnState,
  (state) => state.selectedColumn
);

const getDeleteColumnPopupOpen = createSelector(
  getBaseColumnState,
  (state) => state.isDeleteColumnPopupOpen
);

const getCreateColumnPopupOpen = createSelector(
  getBaseColumnState,
  (state) => state.isCreateColumnPopupOpen
);

const getAllColumns = createSelector(
  [getBaseAllColumns, (state: RootState, id: string) => id],
  (result) => result.data ?? []
);

export {
  getSelectedColumn,
  getDeleteColumnPopupOpen,
  getCreateColumnPopupOpen,
  getAllColumns,
};
