import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const getBaseProjectState = (state: RootState) => state.project;

const getSelectedProject = createSelector(
  getBaseProjectState,
  (state) => state.selectedProject
);

const getDeleteProjectPopupOpen = createSelector(
  getBaseProjectState,
  (state) => state.isDeleteProjectPopupOpen
);

const getCreateProjectPopupOpen = createSelector(
  getBaseProjectState,
  (state) => state.isCreateProjectPopupOpen
);

const getEditProjectPopupOpen = createSelector(
  getBaseProjectState,
  (state) => state.isEditProjectPopupOpen
);

const getSearchedProjects = createSelector(
  getBaseProjectState,
  (state) => state.searchedProjects
);

export {
  getSelectedProject,
  getDeleteProjectPopupOpen,
  getCreateProjectPopupOpen,
  getEditProjectPopupOpen,
  getSearchedProjects,
};
