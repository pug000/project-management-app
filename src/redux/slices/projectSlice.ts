import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from 'ts/interfaces';

interface ProjectState {
  selectedProject: Project | null;
}

const initialState: ProjectState = {
  selectedProject: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setSelectedProject(state, { payload }: PayloadAction<Project | null>) {
      state.selectedProject = payload;
    },
  },
});

export const { setSelectedProject } = projectSlice.actions;

export default projectSlice.reducer;
