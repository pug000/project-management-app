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

export {
  getSelectedProject,
  getDeleteProjectPopupOpen,
  getCreateProjectPopupOpen,
  getEditProjectPopupOpen,
};
