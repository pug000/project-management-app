import React, { useCallback, useRef } from 'react';
import { useCycle, AnimatePresence } from 'framer-motion';

import useDimensions from 'hooks/useDimensions';

import { MenuButton, Overlay, StyledMenu } from './Menu.style';
import MenuIcon from './MenuIcon';
import MenuNavigation from './MenuNavigation';

function Menu() {
  const [isOpenMenu, toggleOpenMenu] = useCycle(false, true);
  const containerRef = useRef<HTMLAnchorElement | null>(null);
  const { height } = useDimensions(containerRef);

  const toggleMenuOnClick = useCallback(() => {
    toggleOpenMenu();
  }, []);

  return (
    <AnimatePresence>
      <StyledMenu
        initial={false}
        animate={isOpenMenu ? 'open' : 'closed'}
        custom={height}
        ref={containerRef}
      >
        {isOpenMenu && <Overlay onClick={toggleMenuOnClick} />}
        <MenuNavigation toggleMenu={toggleMenuOnClick} />
        <MenuButton onClick={toggleMenuOnClick}>
          <MenuIcon />
        </MenuButton>
      </StyledMenu>
    </AnimatePresence>
  );
}

export default Menu;
