import React, { useRef } from 'react';
import { useCycle } from 'framer-motion';

import useDimensions from 'hooks/useDimensions';

import { menuBackgroundAnimation } from 'utils/animations';
import { BackgroundMenu, MenuButton, StyledMenu } from './Menu.style';
import MenuIcon from './MenuIcon';

function Menu() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef<HTMLAnchorElement | null>(null);
  const { height } = useDimensions(containerRef);

  return (
    <StyledMenu
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      ref={containerRef}
    >
      <BackgroundMenu variants={menuBackgroundAnimation} />
      <MenuButton onClick={() => toggleOpen()}>
        <MenuIcon />
      </MenuButton>
    </StyledMenu>
  );
}

export default Menu;
