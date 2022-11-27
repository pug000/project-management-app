import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { EditFormValues } from 'ts/interfaces';

import { useCreateProjectMutation } from 'redux/api/projectsApiSlice';
import { getCreationPopupOpen } from 'redux/selectors/popupSelectors';
import { getUser } from 'redux/selectors/userSelectors';

import { useAppSelector } from './useRedux';

const useCreateProject = () => {
  const isCreationPopupOpen = useAppSelector(getCreationPopupOpen);
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

  return {
    isSuccessCreateProject,
    isCreationPopupOpen,
    isLoadingCreateProject,
    onSubmit,
  };
};

export default useCreateProject;
