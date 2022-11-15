import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { useTranslation } from 'react-i18next';

import { getLoggedIn } from 'redux/selectors/userSelectors';

import { setLoggedIn } from 'redux/slices/userSlice';

import { headerSignItems, headerLinkItems, headerItemsIfLoggedIn } from 'utils/constants';

import AppLogo from 'components/AppLogo/AppLogo';
import Button from 'components/Button/Button';
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
  const isLoggedIn = useAppSelector(getLoggedIn);
  const dispatch = useAppDispatch();

  const [isSticky, setIsSticky] = useState(false);

  const stickyHeader = useCallback(() => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  }, []);

  const signOut = (id: number) => {
    if (id === 3) {
      dispatch(setLoggedIn(false));
    }
  };

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
          {(isLoggedIn ? headerItemsIfLoggedIn : headerSignItems).map(
            ({ id, text, link, color, backgroundColor }) => (
              <HeaderLink
                to={link}
                key={id}
                onClick={() => {
                  signOut(id);
                }}
                end
              >
                <Button
                  type="button"
                  width="130px"
                  color={color}
                  backgroundColor={backgroundColor}
                  text={t(text)}
                />
              </HeaderLink>
            )
          )}
        </HeaderContainerElements>
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export default Header;
