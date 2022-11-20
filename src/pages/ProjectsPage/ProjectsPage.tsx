import React from 'react';

import defaultTheme from 'styles/theme';

import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import Button from 'components/Button/Button';

import { MainWrapper } from 'styles/styles';

import { ProjectsControls, ProjectsTitle, ProjectsContainer } from './ProjectsPage.style';

function ProjectsPage() {
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
        <ProjectsContainer />
      </MainWrapper>
    </ProtectedRoute>
  );
}

export default ProjectsPage;
