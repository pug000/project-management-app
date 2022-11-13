import React from 'react';
import { useTranslation } from 'react-i18next';

import { Container, ProtectedTitle } from './ProtectedRoute.style';

interface ProtectedProps {
  conditionValue: boolean | null;
  children: JSX.Element;
}

function ProtectedRoute({ conditionValue, children }: ProtectedProps) {
  if (!conditionValue) {
    const { t } = useTranslation('translation', { keyPrefix: 'protected' });
    return (
      <Container>
        <ProtectedTitle>{t('text')}</ProtectedTitle>
      </Container>
    );
  }
  return children;
}

export default ProtectedRoute;
