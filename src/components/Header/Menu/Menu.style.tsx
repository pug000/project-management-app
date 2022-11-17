import styled from 'styled-components';
import { motion, SVGMotionProps } from 'framer-motion';

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

const BackgroundMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 320px;
  background-color: ${({ theme }) => theme.colors.backgroundGrey};
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

export { StyledMenu, BackgroundMenu, MenuButton, Icon, Path };
