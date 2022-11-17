import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { getLoggedIn } from 'redux/selectors/userSelectors';

import { setLoggedOut } from 'redux/slices/userSlice';
import { setIsWarningPopupOpen } from 'redux/slices/popupSlice';

import { headerSignItems, headerLinkItems, headerItemsIfLoggedIn } from 'utils/constants';

import AppLogo from 'components/AppLogo/AppLogo';
import Button from 'components/Button/Button';
import PopupWarning from 'components/PopupWarning/PopupWarning';
import LangSwitcher from './LangSwitcher/LangSwitcher';

import {
  HeaderWrapper,
  HeaderContainer,
  HeaderContainerElements,
  HeaderLink,
  HeaderLinkElement,
} from './Header.style';
import Menu from './Menu/Menu';

function Header() {
  const { t } = useTranslation('translation');
  const isLoggedIn = useAppSelector(getLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isSticky, setIsSticky] = useState(false);

  const stickyHeader = useCallback(() => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  }, []);

  const openWarningPopup = (id: number) => {
    if (id === 3) {
      dispatch(setIsWarningPopupOpen(true));
    }
  };

  const signOut = () => {
    dispatch(setLoggedOut());
    navigate('/');
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
              <HeaderLink to={link} key={id} onClick={() => openWarningPopup(id)} end>
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
      <PopupWarning text="signOut" actionOnYes={signOut} />
    </HeaderWrapper>
  );
}

export default Header;
