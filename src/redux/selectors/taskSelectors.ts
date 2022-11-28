import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const getBaseTaskState = (state: RootState) => state.task;

const getSelectedTask = createSelector(getBaseTaskState, (state) => state.selectedTask);

const getCreateTaskPopupOpen = createSelector(
  getBaseTaskState,
  (state) => state.isCreateTaskPopupOpen
);

export { getSelectedTask, getCreateTaskPopupOpen };
