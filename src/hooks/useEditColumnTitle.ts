import { useCallback } from 'react';

import { useUpdateColumnByIdMutation } from 'redux/api/columnApiSlice';

import { ColumnData } from 'ts/interfaces';

const useEditColumnTitle = () => {
  const [updateColumnById, { isLoading: isLoadingEditColumnTitle }] =
    useUpdateColumnByIdMutation();

  const editColumnTitle = useCallback(async (title: string, column: ColumnData) => {
    await updateColumnById({
      ...column,
      title,
    });
  }, []);

  return {
    isLoadingEditColumnTitle,
    editColumnTitle,
  };
};

export default useEditColumnTitle;
