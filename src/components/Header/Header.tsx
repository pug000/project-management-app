import React from 'react';
import Button from 'components/Button/Button';
import AppLogo from 'components/AppLogo/AppLogo';
// import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import headerItems from 'utils/variables';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HeaderContainer, HeaderContainerElements, HeaderLink } from './Header.style';

function Header() {
  const location = useLocation();
  const { t } = useTranslation('translation');
  return (
    <HeaderContainer>
      <AppLogo />
      <HeaderContainerElements>
        {headerItems.map(({ id, text, link }) => (
          <HeaderLink to={link} key={id}>
            <Button type="button" width="120px" text={t(text)} />
          </HeaderLink>
        ))}
      </HeaderContainerElements>
    </HeaderContainer>
  );
}

export default Header;
