import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AppLogo from 'components/AppLogo/AppLogo';
import Button from 'components/Button/Button';

import { headerSignItems, headerLinkItems } from 'utils/constants';

import LangSwitcher from './LangSwitcher/LangSwitcher';

import {
  HeaderWrapper,
  HeaderContainer,
  HeaderContainerElements,
  HeaderLink,
  HeaderLinkElement,
} from './Header.style';

function Header() {
  const { t } = useTranslation('translation');
  const [isSticky, setIsSticky] = useState(false);
  const stickyHeader = useCallback(() => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', stickyHeader);
    return () => window.removeEventListener('scroll', stickyHeader);
  }, []);

  return (
    <HeaderWrapper sticky={isSticky}>
      <HeaderContainer>
        <HeaderContainerElements>
          <AppLogo />
          {headerLinkItems.map(({ id, text, link, color }) => (
            <HeaderLink to={link} key={id} end>
              <HeaderLinkElement color={color}>{t(text)}</HeaderLinkElement>
            </HeaderLink>
          ))}
        </HeaderContainerElements>
        <HeaderContainerElements>
          <LangSwitcher />
          {headerSignItems.map(({ id, text, link, color, backgroundColor }) => (
            <HeaderLink to={link} key={id} end>
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
