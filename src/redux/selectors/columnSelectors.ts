import { createSelector } from '@reduxjs/toolkit';
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

export { getSelectedColumn, getDeleteColumnPopupOpen, getCreateColumnPopupOpen };
