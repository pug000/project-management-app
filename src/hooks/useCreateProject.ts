import { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { EditFormValues } from 'ts/interfaces';

import { useCreateProjectMutation } from 'redux/api/projectsApiSlice';
import { getCreationPopupOpen } from 'redux/selectors/popupSelectors';
import { getUser } from 'redux/selectors/userSelectors';
import { setCreationPopupOpen } from 'redux/slices/popupSlice';

import { useAppDispatch, useAppSelector } from './useRedux';

const useCreateProject = () => {
  const isCreationPopupOpen = useAppSelector(getCreationPopupOpen);
  const dispatch = useAppDispatch();
  const [
    createProject,
    { isLoading: isLoadingCreateProject, isSuccess: isSuccessCreateProject },
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
    isSuccessCreateProject,
    isCreationPopupOpen,
    isLoadingCreateProject,
    onSubmit,
  };
};

export default useCreateProject;
