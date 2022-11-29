import { createSelector } from '@reduxjs/toolkit';
import { getBaseAllTasks } from 'redux/api/tasksApiSlice';
import { RootState } from 'redux/store';

import { TasksProps } from 'ts/interfaces';

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

const getEditTaskPopupOpen = createSelector(
  getBaseTaskState,
  (state) => state.isEditTaskPopupOpen
);

const getLoadingTasksList = createSelector(
  getBaseTaskState,
  (state) => state.isLoadingGetAllTasks
);

const getAllTasks = createSelector(
  [getBaseAllTasks, (state: RootState, query: TasksProps) => query],
  (result) => result.data ?? []
);

export {
  getSelectedTask,
  getCreateTaskPopupOpen,
  getDeleteTaskPopupOpen,
  getAllTasks,
  getLoadingTasksList,
  getEditTaskPopupOpen,
};
