import { useCallback } from 'react';

import { useDeleteColumnByIdMutation } from 'redux/api/columnApiSlice';
import { getDeleteColumnPopupOpen } from 'redux/selectors/popupSelectors';
import { setDeleteColumnPopupOpen } from 'redux/slices/popupSlice';
import { setSelectedColumn } from 'redux/slices/columnSlice';

import { ColumnData } from 'ts/interfaces';

import { useAppSelector, useAppDispatch } from './useRedux';

const useDeleteColumn = (selectedColumn: ColumnData | null | undefined) => {
  const isDeleteColumnPopupOpen = useAppSelector(getDeleteColumnPopupOpen);
  const dispatch = useAppDispatch();
  const [deleteColumnById, { isLoading: isLoadingDeleteColumn }] =
    useDeleteColumnByIdMutation();

  const deleteColumn = useCallback(async () => {
    if (selectedColumn) {
      dispatch(setDeleteColumnPopupOpen(false));
      dispatch(setSelectedColumn(null));
      await deleteColumnById(selectedColumn);
    }
  }, [selectedColumn]);

  return {
    isLoadingDeleteColumn,
    isDeleteColumnPopupOpen,
    deleteColumn,
  };
};

export default useDeleteColumn;
