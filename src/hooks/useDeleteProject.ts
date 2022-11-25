import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDeleteProjectByIdMutation } from 'redux/api/projectsApiSlice';
import { getDeletePopupOpen } from 'redux/selectors/popupSelectors';
import { setDeletePopupOpen } from 'redux/slices/popupSlice';
import { setSelectedProject } from 'redux/slices/projectSlice';

import { Project } from 'ts/interfaces';

import { useAppSelector, useAppDispatch } from './useRedux';

const useDeleteProject = (selectedProject: Project | null | undefined) => {
  const isDeletePopupOpen = useAppSelector(getDeletePopupOpen);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [deleteProjectById, { isLoading: isLoadingDeleteProject }] =
    useDeleteProjectByIdMutation();

  const deleteProject = useCallback(async () => {
    if (selectedProject) {
      dispatch(setDeletePopupOpen(false));
      dispatch(setSelectedProject(null));
      await deleteProjectById(selectedProject._id);

      if (pathname === `/projects/${selectedProject?._id}`) {
        navigate('/projects');
      }
    }
  }, [selectedProject]);

  return {
    isLoadingDeleteProject,
    isDeletePopupOpen,
    deleteProject,
    navigate,
  };
};

export default useDeleteProject;
