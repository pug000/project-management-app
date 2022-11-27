import { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { useUpdateProjectMutation } from 'redux/api/projectsApiSlice';
import { getEditPopupOpen } from 'redux/selectors/popupSelectors';
import { setEditPopupOpen } from 'redux/slices/popupSlice';

import { EditFormValues, Project } from 'ts/interfaces';

import { useAppDispatch, useAppSelector } from './useRedux';

const useEditProject = (selectedProject: Project | null) => {
  const isEditPopupOpen = useAppSelector(getEditPopupOpen);
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
    [isEditPopupOpen]
  );

  useEffect(
    () => () => {
      if (isEditPopupOpen) {
        dispatch(setEditPopupOpen(false));
      }
    },
    []
  );

  return {
    isEditPopupOpen,
    isLoadingEditProject,
    editOnSubmit,
  };
};

export default useEditProject;
