import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const getBaseProjectState = (state: RootState) => state.project;

const getSelectedProject = createSelector(
  getBaseProjectState,
  (state) => state.selectedProject
);

export default getSelectedProject;
