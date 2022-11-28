import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const getBaseTaskState = (state: RootState) => state.task;

const getSelectedTask = createSelector(getBaseTaskState, (state) => state.selectedTask);

const getCreateTaskPopupOpen = createSelector(
  getBaseTaskState,
  (state) => state.isCreateTaskPopupOpen
);

const getDeleteTaskPopupOpen = createSelector(
  getBaseTaskState,
  (state) => state.isDeleteTaskPopupOpen
);

export { getSelectedTask, getCreateTaskPopupOpen, getDeleteTaskPopupOpen };
