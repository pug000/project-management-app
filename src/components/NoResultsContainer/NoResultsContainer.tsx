import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit/dist/createAction';

import { useAppDispatch } from 'hooks/useRedux';

import defaultTheme from 'styles/theme';

import Button from 'components/Button/Button';

import { Container, Title } from './NoResultsContainer.style';

interface NoResultsProps {
  text: string;
  buttonText: string;
  setPopupShown: ActionCreatorWithPayload<boolean>;
}

function NoResultsContainer({ text, buttonText, setPopupShown }: NoResultsProps) {
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();

  return (
    <Container>
      <Title>{t(`${text}`)}</Title>
      <Button
        type="button"
        backgroundColor={defaultTheme.colors.transparent}
        color={defaultTheme.colors.grey}
        callback={() => dispatch(setPopupShown(true))}
      >
        {t(`${buttonText}`)}
      </Button>
    </Container>
  );
}

export default NoResultsContainer;
