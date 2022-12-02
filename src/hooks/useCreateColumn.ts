import { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { ColumnData, ColumnFormValues } from 'ts/interfaces';

import { useCreateColumnMutation } from 'redux/api/columnApiSlice';
import { getCreateColumnPopupOpen } from 'redux/selectors/columnSelectors';
import { setCreateColumnPopupOpen } from 'redux/slices/columnSlice';

import { useAppDispatch, useAppSelector } from './useRedux';

const useCreateColumn = (columns: ColumnData[]) => {
  const isCreateColumnPopupOpen = useAppSelector(getCreateColumnPopupOpen);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [
    createColumn,
    { isLoading: isLoadingCreateColumn, isSuccess: isSuccessCreateColumn },
  ] = useCreateColumnMutation();

  const onSubmit: SubmitHandler<ColumnFormValues> = useCallback(
    async (formValues) => {
      if (id) {
        await createColumn({
          id,
          body: {
            ...formValues,
            order: columns ? columns.length : 0,
          },
        });
      }
    },
    [isCreateColumnPopupOpen]
  );

  useEffect(
    () => () => {
      if (isCreateColumnPopupOpen) {
        dispatch(setCreateColumnPopupOpen(false));
      }
    },
    []
  );

  return {
    isSuccessCreateColumn,
    isCreateColumnPopupOpen,
    isLoadingCreateColumn,
    onSubmit,
    id,
  };
};

export default useCreateColumn;
