import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetAllProjectsQuery } from 'redux/api/projectsApiSlice';

import defaultTheme from 'styles/theme';

import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import NoResultsContainer from 'components/NoResultsContainer/NoResultsContainer';

import { MainWrapper } from 'styles/styles';

import { ProjectsControls, ProjectsTitle, ProjectsContainer } from './ProjectsPage.style';

function ProjectsPage() {
  const { data: projects, isLoading: isProjectsListLoading } = useGetAllProjectsQuery();
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
          {isProjectsListLoading && <Loader />}
          {projects?.length ? (
            <p>Project cards</p>
          ) : (
            <NoResultsContainer
              text="projectsPage.emptyContainerText"
              buttonText="projectsPage.emptyContainerButton"
            />
          )}
        </ProjectsContainer>
      </MainWrapper>
    </ProtectedRoute>
  );
}

export default memo(ProjectsPage);
