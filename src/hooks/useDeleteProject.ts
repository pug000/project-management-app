import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDeleteProjectByIdMutation } from 'redux/api/projectsApiSlice';
import { getDeleteProjectPopupOpen } from 'redux/selectors/projectSelectors';
import { setDeleteProjectPopupOpen, setSelectedProject } from 'redux/slices/projectSlice';

import { Project } from 'ts/interfaces';

import { useAppSelector, useAppDispatch } from './useRedux';

const useDeleteProject = (selectedProject: Project | null | undefined) => {
  const isDeleteProjectPopupOpen = useAppSelector(getDeleteProjectPopupOpen);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [deleteProjectById, { isLoading: isLoadingDeleteProject }] =
    useDeleteProjectByIdMutation();

  const deleteProject = useCallback(async () => {
    if (selectedProject) {
      dispatch(setDeleteProjectPopupOpen(false));
      dispatch(setSelectedProject(null));
      await deleteProjectById(selectedProject._id);

      if (pathname === `/projects/${selectedProject?._id}`) {
        navigate('/projects');
      }
    }
  }, [selectedProject]);

  useEffect(
    () => () => {
      if (isDeleteProjectPopupOpen) {
        dispatch(setDeleteProjectPopupOpen(false));
        dispatch(setSelectedProject(null));
      }
    },
    []
  );

  return {
    isLoadingDeleteProject,
    isDeleteProjectPopupOpen,
    deleteProject,
    navigate,
  };
};

export default useDeleteProject;
