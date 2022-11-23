import { useCallback } from 'react';

import { useDeleteProjectByIdMutation } from 'redux/api/projectsApiSlice';
import { getDeletePopupOpen } from 'redux/selectors/popupSelectors';
import getSelectedProject from 'redux/selectors/projectSelectors';
import { setDeletePopupOpen } from 'redux/slices/popupSlice';
import { setSelectedProject } from 'redux/slices/projectSlice';

import { useAppSelector, useAppDispatch } from './useRedux';

const useDeleteProject = () => {
  const isDeletePopupOpen = useAppSelector(getDeletePopupOpen);
  const selectedProject = useAppSelector(getSelectedProject);
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
    selectedProject,
  };
};

export default useDeleteProject;
