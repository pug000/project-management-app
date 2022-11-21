import React from 'react';
import { useTranslation } from 'react-i18next';

import defaultTheme from 'styles/theme';

import Button from 'components/Button/Button';

import { Container, Title } from './NoResultsContainer.style';

interface NoResultsProps {
  text: string;
  buttonText: string;
}

function NoResultsContainer({ text, buttonText }: NoResultsProps) {
  const { t } = useTranslation('translation');

  return (
    <Container>
      <Title>{t(`${text}`)}</Title>
      <Button
        type="button"
        backgroundColor={defaultTheme.colors.transparent}
        color={defaultTheme.colors.grey}
      >
        {t(`${buttonText}`)}
      </Button>
    </Container>
  );
}

export default NoResultsContainer;
