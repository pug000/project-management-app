import React, { memo, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { getLoggedIn, getLogoutUserPopupOpen } from 'redux/selectors/userSelectors';
import { setLoggedOut, setLogoutUserPopupOpen } from 'redux/slices/userSlice';

import { headerSignItems, headerLinkItems, headerItemsIfLoggedIn } from 'utils/constants';

import AppLogo from 'components/AppLogo/AppLogo';
import Button from 'components/Button/Button';
import PopupWarning from 'components/PopupWarning/PopupWarning';
import LangSwitcher from './LangSwitcher/LangSwitcher';
import Menu from './Menu/Menu';

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
  const navigate = useNavigate();
  const isLogoutUserPopupOpen = useAppSelector(getLogoutUserPopupOpen);
  const [isSticky, setSticky] = useState(false);

  const stickyHeader = useCallback(() => {
    if (window.scrollY > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  }, []);

  const openLogoutUserPopup = useCallback((id: string) => {
    if (id === 'signOut') {
      dispatch(setLogoutUserPopupOpen(true));
    }
  }, []);

  const signOut = useCallback(() => {
    dispatch(setLoggedOut());
    dispatch(setLogoutUserPopupOpen(false));
    navigate('/');
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', stickyHeader);
    return () => {
      window.removeEventListener('scroll', stickyHeader);

      if (isLogoutUserPopupOpen) {
        dispatch(setLogoutUserPopupOpen(false));
      }
    };
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
                id={id}
                onClick={() => openLogoutUserPopup(id)}
                end
              >
                <Button
                  type="button"
                  width="130px"
                  color={color}
                  backgroundColor={backgroundColor}
                >
                  {t(text)}
                </Button>
              </HeaderLink>
            )
          )}
          <Menu />
        </HeaderContainerElements>
      </HeaderContainer>
      <PopupWarning
        text="signOut"
        actionOnYes={signOut}
        isPopupShown={isLogoutUserPopupOpen}
        setPopupShown={setLogoutUserPopupOpen}
      />
    </HeaderWrapper>
  );
}

export default memo(Header);
