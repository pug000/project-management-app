import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Project } from 'ts/interfaces';

interface ProjectState {
  selectedProject: Project | null;
  isDeleteProjectPopupOpen: boolean;
  isCreateProjectPopupOpen: boolean;
  isEditProjectPopupOpen: boolean;
  searchedProjects: Project[];
}

const initialState: ProjectState = {
  selectedProject: null,
  isDeleteProjectPopupOpen: false,
  isCreateProjectPopupOpen: false,
  isEditProjectPopupOpen: false,
  searchedProjects: [],
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setSelectedProject(state, { payload }: PayloadAction<Project | null>) {
      state.selectedProject = payload;
    },

    setDeleteProjectPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isDeleteProjectPopupOpen = payload;
    },

    setCreateProjectPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isCreateProjectPopupOpen = payload;
    },

    setEditProjectPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isEditProjectPopupOpen = payload;
    },

    setSearchedProjects(state, { payload }: PayloadAction<Project[]>) {
      state.searchedProjects = payload;
    },
  },
});

export const {
  setSelectedProject,
  setDeleteProjectPopupOpen,
  setCreateProjectPopupOpen,
  setEditProjectPopupOpen,
  setSearchedProjects,
} = projectSlice.actions;

export default projectSlice.reducer;
