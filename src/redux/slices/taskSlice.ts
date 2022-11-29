import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Task } from 'ts/interfaces';

interface TaskState {
  selectedTask: Task | null;
  isCreateTaskPopupOpen: boolean;
  isDeleteTaskPopupOpen: boolean;
  isEditTaskPopupOpen: boolean;
  isLoadingGetAllTasks: boolean;
}

const initialState: TaskState = {
  selectedTask: null,
  isCreateTaskPopupOpen: false,
  isDeleteTaskPopupOpen: false,
  isEditTaskPopupOpen: false,
  isLoadingGetAllTasks: false,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setSelectedTask(state, { payload }: PayloadAction<Task | null>) {
      state.selectedTask = payload;
    },

    setCreateTaskPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isCreateTaskPopupOpen = payload;
    },

    setDeleteTaskPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isDeleteTaskPopupOpen = payload;
    },

    setEditTaskPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isEditTaskPopupOpen = payload;
    },

    setLoadingGetAllTasks(state, { payload }: PayloadAction<boolean>) {
      state.isLoadingGetAllTasks = payload;
    },
  },
});

export const {
  setSelectedTask,
  setCreateTaskPopupOpen,
  setDeleteTaskPopupOpen,
  setLoadingGetAllTasks,
  setEditTaskPopupOpen,
} = taskSlice.actions;

export default taskSlice.reducer;
