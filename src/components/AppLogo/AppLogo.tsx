import React from 'react';

import {
  AppLogoWrapper,
  AppLogoLink,
  AppLogoText,
  LogoWrapper,
  AppLogoNote,
} from './AppLogo.style';

import AppLogoSvg from './AppLogoSvg';

function AppLogo() {
  return (
    <AppLogoWrapper>
      <AppLogoLink to="/">
        <LogoWrapper>
          <AppLogoSvg />
          <AppLogoText>PMA</AppLogoText>
        </LogoWrapper>
        <AppLogoNote>Project Management App</AppLogoNote>
      </AppLogoLink>
    </AppLogoWrapper>
  );
}

export default AppLogo;
