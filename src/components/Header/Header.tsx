import React, { useState } from 'react';
import Button from 'components/Button/Button';
import AppLogo from 'components/AppLogo/AppLogo';
import headerSignItems from 'utils/variables';
import theme from 'styles/theme';
import { useTranslation } from 'react-i18next';
import {
  HeaderWrapper,
  HeaderContainer,
  HeaderContainerElements,
  HeaderLink,
} from './Header.style';

function Header() {
  const { t } = useTranslation('translation');
  const [sticky, setSticky] = useState(false);
  function stickyHeader() {
    if (window.scrollY > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  }
  window.addEventListener('scroll', stickyHeader);
  return (
    <HeaderWrapper $backgroundColor={sticky ? theme.colors.backgroundBlue : ''}>
      <HeaderContainer>
        <HeaderContainerElements>
          <AppLogo />
        </HeaderContainerElements>
        <HeaderContainerElements>
          {headerSignItems.map(({ id, text, link, color, backgroundColor }) => (
            <HeaderLink to={link} key={id}>
              <Button
                type="button"
                width="120px"
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
