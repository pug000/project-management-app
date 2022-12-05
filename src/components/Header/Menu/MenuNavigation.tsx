import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { getLoggedIn } from 'redux/selectors/userSelectors';
import { setLogoutUserPopupOpen } from 'redux/slices/userSlice';

import {
  menuItemAnimation,
  menuListAnimation,
  menuWrapperAnimation,
} from 'utils/animations';
import { headerItemsIfLoggedIn, headerLinkItems, headerSignItems } from 'utils/constants';
import {
  MenuWrapper,
  MenuLink,
  MenuList,
  MenuItem,
  MenuImageWrapper,
} from './Menu.style';
import MenuSvg from './MenuSvg';

interface MenuNavigationProps {
  toggleMenu: () => void;
}

function MenuNavigation({ toggleMenu }: MenuNavigationProps) {
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getLoggedIn);

  const toggleMenuOnClick = (id: string) => {
    if (id === 'signOut') {
      dispatch(setLogoutUserPopupOpen(true));
    }

    toggleMenu();
  };

  return (
    <MenuWrapper variants={menuWrapperAnimation}>
      <MenuList variants={menuListAnimation}>
        {headerLinkItems.map(({ id, text, link, color }) => (
          <MenuItem key={id} color={color} variants={menuItemAnimation}>
            <MenuLink to={link} end onClick={toggleMenu}>
              {t(text)}
            </MenuLink>
          </MenuItem>
        ))}
        {(isLoggedIn ? headerItemsIfLoggedIn : headerSignItems).map(
          ({ id, text, link }) => (
            <MenuItem key={id} variants={menuItemAnimation}>
              <MenuLink to={link} end onClick={() => toggleMenuOnClick(id)}>
                {t(text)}
              </MenuLink>
            </MenuItem>
          )
        )}
      </MenuList>
      <MenuImageWrapper>
        <MenuSvg />
      </MenuImageWrapper>
    </MenuWrapper>
  );
}

export default MenuNavigation;
