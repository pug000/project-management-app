import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'hooks/useRedux';

import { getLoggedIn } from 'redux/selectors/userSelectors';

import { Container, ProtectedTitle } from './ProtectedRoute.style';

interface ProtectedProps {
  children: JSX.Element;
}

function ProtectedRoute({ children }: ProtectedProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'protected' });
  const isLoggedIn = useAppSelector(getLoggedIn);

  if (!isLoggedIn) {
    return (
      <Container>
        <ProtectedTitle>{t('text')}</ProtectedTitle>
      </Container>
    );
  }
  return children;
}

export default ProtectedRoute;
