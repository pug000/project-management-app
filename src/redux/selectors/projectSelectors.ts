import { RootState } from 'redux/store';

const getSelectedProject = (state: RootState) => state.project.selectedProject;

export default getSelectedProject;
