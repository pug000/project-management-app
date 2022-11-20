import React from 'react';

import defaultTheme from 'styles/theme';

import Button from 'components/Button/Button';

import { Container, Title } from './EmptyProjectsContainer.style';

function EmptyProjectsContainer() {
  return (
    <Container>
      <Title>It seems you do not have projects yet.</Title>
      <Button
        type="button"
        backgroundColor={defaultTheme.colors.transparent}
        color={defaultTheme.colors.grey}
      >
        Click here to create new project
      </Button>
    </Container>
  );
}

export default EmptyProjectsContainer;
