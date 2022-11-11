import React from 'react';
import Button from 'components/Button/Button';
import { HeaderContainer, HeaderContainerElements } from './Header.style';

function Header() {
  return (
    <HeaderContainer>
      <HeaderContainerElements>
        <Button type="button" text="sign in" />
        <Button type="button" text="sign up" />
      </HeaderContainerElements>
    </HeaderContainer>
  );
}

export default Header;
