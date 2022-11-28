import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import useDeleteProject from 'hooks/useDeleteProject';
import useCreateProject from 'hooks/useCreateProject';
import useGetAllProject from 'hooks/useGetAllProjects';
import useEditProject from 'hooks/useEditProject';

import {
  setCreateProjectPopupOpen,
  setDeleteProjectPopupOpen,
  setEditProjectPopupOpen,
  setSelectedProject,
} from 'redux/slices/projectSlice';
import { getSelectedProject } from 'redux/selectors/projectSelectors';

import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import NoResultsContainer from 'components/NoResultsContainer/NoResultsContainer';
import ProjectCards from 'components/ProjectCards/ProjectCards';
import PopupWarning from 'components/PopupWarning/PopupWarning';
import PopupWithForm from 'components/PopupWithForm/PopupWithForm';

import defaultTheme from 'styles/theme';
import { MainWrapper } from 'styles/styles';
import { ProjectsControls, ProjectsTitle, ProjectsContainer } from './ProjectsPage.style';

function ProjectsPage() {
  const selectedProject = useAppSelector(getSelectedProject);
  const { t } = useTranslation('translation', { keyPrefix: 'projectsPage' });
  const dispatch = useAppDispatch();
  const { projects, isProjectsListLoading } = useGetAllProject();
  const { isDeleteProjectPopupOpen, isLoadingDeleteProject, deleteProject } =
    useDeleteProject(selectedProject);
  const { isEditProjectPopupOpen, isLoadingEditProject, editOnSubmit } =
    useEditProject(selectedProject);
  const { isCreateProjectPopupOpen, isLoadingCreateProject, onSubmit } =
    useCreateProject();
  const isLoadingProjectsPage = [
    isProjectsListLoading,
    isLoadingCreateProject,
    isLoadingEditProject,
    isLoadingDeleteProject,
  ].some((loader) => loader);

  return (
    <ProtectedRoute>
      <MainWrapper>
        <ProjectsControls>
          <ProjectsTitle>{t('title')}</ProjectsTitle>
          <Button
            type="button"
            width="130px"
            backgroundColor={defaultTheme.colors.transparent}
            color={defaultTheme.colors.primaryColor}
            callback={() => dispatch(setCreateProjectPopupOpen(true))}
          >
            {t('newProjectButton')}
          </Button>
        </ProjectsControls>
        <ProjectsContainer>
          {projects?.length ? (
            <ProjectCards projects={projects} />
          ) : (
            <NoResultsContainer
              text="projectsPage.emptyContainerText"
              buttonText="projectsPage.emptyContainerButton"
              setPopupShown={setCreateProjectPopupOpen}
            />
          )}
        </ProjectsContainer>
        <PopupWarning
          isPopupShown={isDeleteProjectPopupOpen}
          setPopupShown={setDeleteProjectPopupOpen}
          actionOnYes={deleteProject}
          text="deleteProject"
        />
        <PopupWithForm
          isPopupShown={isCreateProjectPopupOpen}
          setPopupShown={setCreateProjectPopupOpen}
          keyPrefix="editProjectForm"
          formTitleText="newProjectTitle"
          onSubmit={onSubmit}
        />
        <PopupWithForm
          isPopupShown={isEditProjectPopupOpen}
          setPopupShown={setEditProjectPopupOpen}
          keyPrefix="editProjectForm"
          formTitleText="editTitle"
          selectedItem={selectedProject}
          onSubmit={editOnSubmit}
          setSelectedItem={setSelectedProject}
        />
        {isLoadingProjectsPage && <Loader />}
      </MainWrapper>
    </ProtectedRoute>
  );
}

export default memo(ProjectsPage);
