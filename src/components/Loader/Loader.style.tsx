import styled from 'styled-components';
import { motion } from 'framer-motion';

import { VariantsProps } from 'ts/interfaces';

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(2px);
`;

const StyledLoader = styled(motion.div).attrs<VariantsProps>(({ $variants }) => ({
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  variants: $variants,
}))<VariantsProps>`
  display: block;
  position: absolute;
  top: 45%;
  left: 50%;
  height: 120px;
  width: 120px;
  margin: -60px 0 0 -60px;
  border: 10px rgba(0, 0, 0, 0.25) solid;
  border-top: 10px ${({ theme }) => theme.colors.primaryColor} solid;
  border-radius: 50%;
  z-index: 35;
`;

export { StyledLoader, Background };
