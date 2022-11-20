import React, { memo } from 'react';

import { useGetAllProjectsQuery } from 'redux/api/projectsApiSlice';

import defaultTheme from 'styles/theme';

import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import EmptyProjectsContainer from 'components/EmptyProjectsContainer/EmptyProjectsContainer';

import { MainWrapper } from 'styles/styles';

import { ProjectsControls, ProjectsTitle, ProjectsContainer } from './ProjectsPage.style';

function ProjectsPage() {
  const { data: projects, isLoading: isProjectsListLoading } = useGetAllProjectsQuery();

  return (
    <ProtectedRoute>
      <MainWrapper>
        <ProjectsControls>
          <ProjectsTitle>Projects</ProjectsTitle>
          <Button
            type="button"
            width="130px"
            backgroundColor={defaultTheme.colors.transparent}
            color={defaultTheme.colors.primaryColor}
          >
            New project
          </Button>
        </ProjectsControls>
        <ProjectsContainer>
          {isProjectsListLoading && <Loader />}
          {projects?.length ? <p>Project cards</p> : <EmptyProjectsContainer />}
        </ProjectsContainer>
      </MainWrapper>
    </ProtectedRoute>
  );
}

export default memo(ProjectsPage);
