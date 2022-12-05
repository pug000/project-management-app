import styled from 'styled-components';
import { motion, SVGMotionProps } from 'framer-motion';
import { NavLink } from 'react-router-dom';

interface PathAnimationProps {
  $animation?: SVGMotionProps<SVGPathElement>;
}

const StyledMenu = styled(motion.nav)`
  display: none;
  align-items: center;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(2px);
`;

const MenuWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 320px;
  background-color: ${({ theme }) => theme.colors.backgroundGrey};
  justify-content: space-evenly;
`;

const MenuButton = styled.button.attrs({
  type: 'button',
})`
  outline: none;
  border: none;
  cursor: pointer;
  user-select: none;
  margin-top: 5px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.transparent};
  z-index: 10;
`;

const MenuList = styled(motion.ul)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 50px;
  z-index: 10;
  padding: 35px 0 35px 35px;
  width: 100%;
`;

const MenuItem = styled(motion.li)`
  display: flex;
  list-style-type: none;
`;

const MenuLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.h5};
  width: 100%;
  transition: ${({ theme }) => theme.effects.transition};

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

const MenuImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.svg`
  width: 23px;
  height: 23px;
`;

const Path = styled(motion.path).attrs<PathAnimationProps>(({ $animation }) => ({
  ...$animation,
}))<PathAnimationProps>`
  fill: ${({ theme }) => theme.colors.transparent};
  stroke-width: 3;
  stroke: ${({ theme }) => theme.colors.primaryColor};
  stroke-linecap: round;
`;

export {
  StyledMenu,
  Overlay,
  MenuWrapper,
  MenuButton,
  MenuList,
  MenuLink,
  MenuItem,
  MenuImageWrapper,
  Icon,
  Path,
};
