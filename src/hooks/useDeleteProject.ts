import { useCallback } from 'react';

import { useDeleteProjectByIdMutation } from 'redux/api/projectsApiSlice';
import { getDeletePopupOpen } from 'redux/selectors/popupSelectors';
import { setDeletePopupOpen } from 'redux/slices/popupSlice';
import { setSelectedProject } from 'redux/slices/projectSlice';

import { Project } from 'ts/interfaces';

import { useAppSelector, useAppDispatch } from './useRedux';

const useDeleteProject = (selectedProject: Project | null) => {
  const isDeletePopupOpen = useAppSelector(getDeletePopupOpen);

  const dispatch = useAppDispatch();
  const [deleteProjectById, { isLoading: isLoadingDeleteProject }] =
    useDeleteProjectByIdMutation();

  const deleteProject = useCallback(async () => {
    if (selectedProject) {
      dispatch(setDeletePopupOpen(false));
      dispatch(setSelectedProject(null));
      await deleteProjectById(selectedProject._id);
    }
  }, [selectedProject]);

  return {
    isLoadingDeleteProject,
    isDeletePopupOpen,
    deleteProject,
  };
};

export default useDeleteProject;
