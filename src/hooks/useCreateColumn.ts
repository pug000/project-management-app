import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import getSelectedColumn from 'redux/selectors/columnSelectors';
import { ColumnFormValue } from 'ts/interfaces';

import { useCreateColumnMutation } from 'redux/api/columnApiSlice';
import { getCreationPopupOpen } from 'redux/selectors/popupSelectors';

import { useAppSelector } from './useRedux';

const useCreateColumn = (idProject: string) => {
  const isCreationPopupOpen = useAppSelector(getCreationPopupOpen);
  const [
    createColumn,
    { isLoading: isCreationLoading, isSuccess: isSuccessCreateColumn },
  ] = useCreateColumnMutation();

  const onSubmit: SubmitHandler<ColumnFormValue> = useCallback(
    async (formValues) => {
      await createColumn({
        id: idProject,
        title: formValues.title,
      });
    },
    [isCreationPopupOpen]
  );

  return {
    isSuccessCreateColumn,
    isCreationPopupOpen,
    isCreationLoading,
    onSubmit,
  };
};

export default useCreateColumn;
