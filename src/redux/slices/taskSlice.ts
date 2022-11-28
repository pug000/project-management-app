import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Task } from 'ts/interfaces';

interface TaskState {
  selectedTask: Task | null;
  isCreateTaskPopupOpen: boolean;
}

const initialState: TaskState = {
  selectedTask: null,
  isCreateTaskPopupOpen: false,
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
  },
});

export const { setSelectedTask, setCreateTaskPopupOpen } = taskSlice.actions;

export default taskSlice.reducer;
