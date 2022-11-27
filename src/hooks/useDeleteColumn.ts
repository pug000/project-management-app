import { useCallback, useEffect } from 'react';

import { useDeleteColumnByIdMutation } from 'redux/api/columnApiSlice';
import { getDeleteColumnPopupOpen } from 'redux/selectors/popupSelectors';
import { setDeleteColumnPopupOpen } from 'redux/slices/popupSlice';
import { setSelectedColumn } from 'redux/slices/columnSlice';
import getSelectedColumn from 'redux/selectors/columnSelectors';

import { useAppSelector, useAppDispatch } from './useRedux';

const useDeleteColumn = () => {
  const selectedColumn = useAppSelector(getSelectedColumn);
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

  useEffect(
    () => () => {
      if (isDeleteColumnPopupOpen) {
        dispatch(setDeleteColumnPopupOpen(false));
      }
    },
    []
  );

  return {
    isLoadingDeleteColumn,
    isDeleteColumnPopupOpen,
    deleteColumn,
  };
};

export default useDeleteColumn;
