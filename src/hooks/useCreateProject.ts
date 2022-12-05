import { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { EditFormValues } from 'ts/interfaces';

import { useCreateProjectMutation } from 'redux/api/projectsApiSlice';
import { getUser } from 'redux/selectors/userSelectors';
import { getCreateProjectPopupOpen } from 'redux/selectors/projectSelectors';
import { setCreateProjectPopupOpen } from 'redux/slices/projectSlice';

import { useAppDispatch, useAppSelector } from './useRedux';

const useCreateProject = () => {
  const isCreateProjectPopupOpen = useAppSelector(getCreateProjectPopupOpen);
  const dispatch = useAppDispatch();
  const [
    createProject,
    { isLoading: isLoadingCreateProject, isSuccess: isSuccessCreateProject },
  ] = useCreateProjectMutation();
  const user = useAppSelector(getUser);

  const onSubmit: SubmitHandler<EditFormValues> = useCallback(
    async ({ color, responsibleUser, ...formValues }) => {
      await createProject({
        title: JSON.stringify({ ...formValues }),
        owner: user?.name ?? '',
        users: [],
      });
    },
    [isCreateProjectPopupOpen]
  );

  useEffect(
    () => () => {
      if (isCreateProjectPopupOpen) {
        dispatch(setCreateProjectPopupOpen(false));
      }
    },
    []
  );

  return {
    isSuccessCreateProject,
    isCreateProjectPopupOpen,
    isLoadingCreateProject,
    onSubmit,
  };
};

export default useCreateProject;
