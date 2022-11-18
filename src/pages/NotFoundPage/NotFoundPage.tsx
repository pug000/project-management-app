import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button/Button';

import { MainWrapper, Title } from 'styles/styles';

import { NotFoundText, NotFoundLink, NotFoundIcon } from './NotFoundPage.style';

function NotFoundPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'notFound' });

  return (
    <MainWrapper>
      <NotFoundIcon />
      <Title>{t('title')}</Title>
      <NotFoundText>{t('text')}</NotFoundText>
      <NotFoundLink to="/">
        <Button type="button" width="210px">
          {t('button')}
        </Button>
      </NotFoundLink>
    </MainWrapper>
  );
}

export default memo(NotFoundPage);
