import { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { useUpdateProjectMutation } from 'redux/api/projectsApiSlice';
import { getEditProjectPopupOpen } from 'redux/selectors/projectSelectors';
import { setEditProjectPopupOpen } from 'redux/slices/projectSlice';

import { EditFormValues, Project } from 'ts/interfaces';

import { useAppDispatch, useAppSelector } from './useRedux';

const useEditProject = (selectedProject: Project | null) => {
  const isEditProjectPopupOpen = useAppSelector(getEditProjectPopupOpen);
  const dispatch = useAppDispatch();
  const [editProject, { isLoading: isLoadingEditProject }] = useUpdateProjectMutation();

  const editOnSubmit: SubmitHandler<EditFormValues> = useCallback(
    async ({ color, ...formValues }) => {
      if (selectedProject) {
        const { description, ...projectData } = selectedProject;
        await editProject({
          ...projectData,
          title: JSON.stringify({ ...formValues }),
        });
      }
    },
    [isEditProjectPopupOpen]
  );

  useEffect(
    () => () => {
      if (isEditProjectPopupOpen) {
        dispatch(setEditProjectPopupOpen(false));
      }
    },
    []
  );

  return {
    isEditProjectPopupOpen,
    isLoadingEditProject,
    editOnSubmit,
  };
};

export default useEditProject;
