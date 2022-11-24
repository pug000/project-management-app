import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import useDeleteProject from 'hooks/useDeleteProject';
import useCreateProject from 'hooks/useCreateProject';

import { useGetAllProjectsQuery } from 'redux/api/projectsApiSlice';
import { getLoggedIn } from 'redux/selectors/userSelectors';
import {
  setDeletePopupOpen,
  setCreationPopupOpen,
  setEditPopupOpen,
} from 'redux/slices/popupSlice';

import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import NoResultsContainer from 'components/NoResultsContainer/NoResultsContainer';
import ProjectCards from 'components/ProjectCards/ProjectCards';
import PopupWarning from 'components/PopupWarning/PopupWarning';
import PopupWithForm from 'components/PopupWithForm/PopupWithForm';

import defaultTheme from 'styles/theme';
import { MainWrapper } from 'styles/styles';
import getSelectedProject from 'redux/selectors/projectSelectors';
import useEditProject from 'hooks/useEditProject';
import { setSelectedProject } from 'redux/slices/projectSlice';
import { ProjectsControls, ProjectsTitle, ProjectsContainer } from './ProjectsPage.style';

function ProjectsPage() {
  const isLoggedIn = useAppSelector(getLoggedIn);
  const selectedProject = useAppSelector(getSelectedProject);

  const { data: projects, isFetching: isProjectsListLoading } = useGetAllProjectsQuery(
    undefined,
    { skip: !isLoggedIn }
  );
  const { isDeletePopupOpen, isLoadingDeleteProject, deleteProject } =
    useDeleteProject(selectedProject);
  const { isEditPopupOpen, isLoadingEditProject, editOnSubmit } =
    useEditProject(selectedProject);

  const { t } = useTranslation('translation', { keyPrefix: 'projectsPage' });
  const dispatch = useAppDispatch();
  const { isCreationPopupOpen, isCreationLoading, onSubmit } = useCreateProject();

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
            callback={() => dispatch(setCreationPopupOpen(true))}
          >
            {t('newProjectButton')}
          </Button>
        </ProjectsControls>
        <ProjectsContainer>
          {(isProjectsListLoading ||
            isLoadingDeleteProject ||
            isCreationLoading ||
            isLoadingEditProject) && <Loader />}
          {projects?.length ? (
            <ProjectCards projects={projects} setEditPopupOpen={setEditPopupOpen} />
          ) : (
            <NoResultsContainer
              text="projectsPage.emptyContainerText"
              buttonText="projectsPage.emptyContainerButton"
              setPopupShown={setCreationPopupOpen}
            />
          )}
        </ProjectsContainer>
        <PopupWarning
          isPopupShown={isDeletePopupOpen}
          setPopupShown={setDeletePopupOpen}
          actionOnYes={deleteProject}
          text="deleteProject"
        />
        <PopupWithForm
          isPopupShown={isCreationPopupOpen}
          setPopupShown={setCreationPopupOpen}
          keyPrefix="editProjectForm"
          formTitleText="newProjectTitle"
          onSubmit={onSubmit}
        />
        <PopupWithForm
          isPopupShown={isEditPopupOpen}
          setPopupShown={setEditPopupOpen}
          keyPrefix="editProjectForm"
          formTitleText="editTitle"
          selectedItem={selectedProject}
          onSubmit={editOnSubmit}
          setSelectedItem={setSelectedProject}
        />
      </MainWrapper>
    </ProtectedRoute>
  );
}

export default memo(ProjectsPage);
