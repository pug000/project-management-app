import React from 'react';
import { useTranslation } from 'react-i18next';

import AppLogo from 'components/AppLogo/AppLogo';

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
  const { t } = useTranslation('translation');
  return (
    <FooterWrapper>
      <FooterContainer>
        <AppLogo />
        <AuthorsContainer>
          <AuthorsTitle>{t('footer.authors')}</AuthorsTitle>
          <Authors>
            <Author
              href="https://github.com/pug000"
              title="Roman on GitHub"
              target="_blank"
            >
              {t('footer.roma')}
            </Author>
            <Author
              href="https://github.com/saachko"
              title="Anastasiya on GitHub"
              target="_blank"
            >
              {t('footer.nastya')}
            </Author>
            <Author
              href="https://github.com/aArt13"
              title="Artsiom on GitHub"
              target="_blank"
            >
              {t('footer.artem')}
            </Author>
          </Authors>
        </AuthorsContainer>
      </FooterContainer>
      <Copyright>
        <CopyrightText>{t('footer.copyright')}</CopyrightText>
        <SchoolLogo href="https://rs.school/js/" title="RS school" target="_blank" />
      </Copyright>
    </FooterWrapper>
  );
}

export default Footer;
