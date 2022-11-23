import { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { EditFormValues } from 'ts/interfaces';

import { useCreateProjectMutation } from 'redux/api/projectsApiSlice';
import { setCreationPopupOpen } from 'redux/slices/popupSlice';
import { getCreationPopupOpen } from 'redux/selectors/popupSelectors';
import { getUser } from 'redux/selectors/userSelectors';

import { useAppDispatch, useAppSelector } from './useRedux';

const useCreateProject = () => {
  const dispatch = useAppDispatch();
  const isCreationPopupOpen = useAppSelector(getCreationPopupOpen);
  const [
    createProject,
    { isSuccess: isCreationSuccessful, isLoading: isCreationLoading },
  ] = useCreateProjectMutation();
  const user = useAppSelector(getUser);

  const onSubmit: SubmitHandler<EditFormValues> = useCallback(
    async ({ color, ...formValues }) => {
      await createProject({
        title: JSON.stringify({ ...formValues }),
        owner: user?.name ?? '',
        users: [],
      });
    },
    []
  );

  useEffect(() => {
    if (isCreationSuccessful) {
      dispatch(setCreationPopupOpen(false));
    }
  }, [isCreationSuccessful]);

  return {
    isCreationPopupOpen,
    isCreationLoading,
    onSubmit,
  };
};

export default useCreateProject;
