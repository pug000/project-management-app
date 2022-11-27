import { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { ColumnFormValues } from 'ts/interfaces';

import { useCreateColumnMutation } from 'redux/api/columnApiSlice';
import { getCreationPopupOpen } from 'redux/selectors/popupSelectors';
import { setCreationPopupOpen } from 'redux/slices/popupSlice';

import { useAppDispatch, useAppSelector } from './useRedux';

const useCreateColumn = () => {
  const isCreationPopupOpen = useAppSelector(getCreationPopupOpen);
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
            order: 0,
          },
        });
      }
    },
    [isCreationPopupOpen]
  );

  useEffect(
    () => () => {
      if (isCreationPopupOpen) {
        dispatch(setCreationPopupOpen(false));
      }
    },
    []
  );

  return {
    isSuccessCreateColumn,
    isCreationPopupOpen,
    isLoadingCreateColumn,
    onSubmit,
  };
};

export default useCreateColumn;
