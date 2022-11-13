import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AppLogo from 'components/AppLogo/AppLogo';
import Button from 'components/Button/Button';

import { headerSignItems, headerLinkItems } from 'utils/constants';

import theme from 'styles/theme';

import {
  HeaderWrapper,
  HeaderContainer,
  HeaderContainerElements,
  HeaderLink,
  HeaderLinkElement,
} from './Header.style';

function Header() {
  const { t } = useTranslation('translation');
  const [sticky, setSticky] = useState(false);
  const stickyHeader = useCallback(() => {
    if (window.scrollY > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', stickyHeader);
    return () => window.removeEventListener('scroll', stickyHeader);
  }, []);

  return (
    <HeaderWrapper $backgroundColor={sticky ? theme.colors.backgroundBlue : ''}>
      <HeaderContainer>
        <HeaderContainerElements>
          <AppLogo />
          {headerLinkItems.map(({ id, text, link, color }) => (
            <HeaderLink to={link} key={id}>
              <HeaderLinkElement color={color}>{t(text)}</HeaderLinkElement>
            </HeaderLink>
          ))}
        </HeaderContainerElements>
        <HeaderContainerElements>
          {headerSignItems.map(({ id, text, link, color, backgroundColor }) => (
            <HeaderLink to={link} key={id}>
              <Button
                type="button"
                width="130px"
                color={color}
                backgroundColor={backgroundColor}
                text={t(text)}
              />
            </HeaderLink>
          ))}
        </HeaderContainerElements>
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export default Header;
