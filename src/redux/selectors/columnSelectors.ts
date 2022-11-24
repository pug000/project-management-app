import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const getBaseColumnState = (state: RootState) => state.column;

const getSelectedColumn = createSelector(
  getBaseColumnState,
  (state) => state.selectedColumn
);

export default getSelectedColumn;
