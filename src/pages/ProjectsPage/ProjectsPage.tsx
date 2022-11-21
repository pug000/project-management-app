import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'hooks/useRedux';
import useDeleteProject from 'hooks/useDeleteProject';

import { useGetAllProjectsQuery } from 'redux/api/projectsApiSlice';
import { getLoggedIn } from 'redux/selectors/userSelectors';
import { setDeletePopupOpen } from 'redux/slices/popupSlice';

import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import NoResultsContainer from 'components/NoResultsContainer/NoResultsContainer';
import ProjectCards from 'components/ProjectCards/ProjectCards';

import defaultTheme from 'styles/theme';
import { MainWrapper } from 'styles/styles';

import PopupWarning from 'components/PopupWarning/PopupWarning';
import { ProjectsControls, ProjectsTitle, ProjectsContainer } from './ProjectsPage.style';

function ProjectsPage() {
  const isLoggedIn = useAppSelector(getLoggedIn);
  const { data: projects, isLoading: isProjectsListLoading } = useGetAllProjectsQuery(
    undefined,
    { skip: !isLoggedIn }
  );
  const { isDeletePopupOpen, isLoadingDeleteProject, deleteProject } = useDeleteProject();
  const { t } = useTranslation('translation', { keyPrefix: 'projectsPage' });

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
          >
            {t('newProjectButton')}
          </Button>
        </ProjectsControls>
        <ProjectsContainer>
          <ProjectCards projects={[]} />
          {(isProjectsListLoading || isLoadingDeleteProject) && <Loader />}
          {projects?.length ? (
            <ProjectCards projects={projects} />
          ) : (
            <NoResultsContainer
              text="projectsPage.emptyContainerText"
              buttonText="projectsPage.emptyContainerButton"
            />
          )}
        </ProjectsContainer>
        <PopupWarning
          isPopupShown={isDeletePopupOpen}
          setPopupShown={setDeletePopupOpen}
          actionOnYes={deleteProject}
          text="deleteProject"
        />
      </MainWrapper>
    </ProtectedRoute>
  );
}

export default memo(ProjectsPage);
