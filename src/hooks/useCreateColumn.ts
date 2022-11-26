import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ColumnFormValue } from 'ts/interfaces';

import { useCreateColumnMutation } from 'redux/api/columnApiSlice';
import { getCreationPopupOpen } from 'redux/selectors/popupSelectors';

import { useAppSelector } from './useRedux';
import { defaultColumnFormValues } from 'utils/constants';

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
        body: {
          title: formValues.body.title,
          order: defaultColumnFormValues.body.order,
        },
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
