import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import AppLogo from 'components/AppLogo/AppLogo';

import { authors } from 'utils/constants';

import {
  FooterWrapper,
  FooterContainer,
  Copyright,
  CopyrightText,
  SchoolLogo,
  AuthorsContainer,
  AuthorsTitle,
  Authors,
  Author,
} from './Footer.style';

function Footer() {
  const { t } = useTranslation('translation', { keyPrefix: 'footer' });
  return (
    <FooterWrapper>
      <FooterContainer>
        <AppLogo />
        <AuthorsContainer>
          <AuthorsTitle>{t('authors')}</AuthorsTitle>
          <Authors>
            {authors.map((author) => (
              <Author
                key={author.id}
                href={author.githubLink}
                title={author.title}
                target="_blank"
              >
                {t(author.name)}
              </Author>
            ))}
          </Authors>
        </AuthorsContainer>
      </FooterContainer>
      <Copyright>
        <CopyrightText>{t('copyright')}</CopyrightText>
        <SchoolLogo href="https://rs.school/react/" title="RS school" target="_blank" />
      </Copyright>
    </FooterWrapper>
  );
}

export default memo(Footer);
