import { useCallback, useEffect } from 'react';

import { useDeleteColumnByIdMutation } from 'redux/api/columnApiSlice';
import { setDeleteColumnPopupOpen, setSelectedColumn } from 'redux/slices/columnSlice';
import {
  getDeleteColumnPopupOpen,
  getSelectedColumn,
} from 'redux/selectors/columnSelectors';

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
        dispatch(setSelectedColumn(null));
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
