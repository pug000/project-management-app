import React from 'react';
import { burgerMenuAnimation } from 'utils/animations';
import { Icon, Path } from './Menu.style';

function MenuIcon() {
  return (
    <Icon viewBox="0 0 23 23">
      <Path $animation={burgerMenuAnimation.firstLine} />
      <Path $animation={burgerMenuAnimation.secondLine} />
      <Path $animation={burgerMenuAnimation.thirdLine} />
    </Icon>
  );
}

export default MenuIcon;
