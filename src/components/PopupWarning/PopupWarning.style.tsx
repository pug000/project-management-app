import { motion } from 'framer-motion';
import styled from 'styled-components';

import { VariantsProps } from 'ts/interfaces';

const Background = styled(motion.div).attrs<VariantsProps>(({ $variants }) => ({
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  variants: $variants,
}))<VariantsProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
`;

const Popup = styled.div`
  max-width: 500px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  padding: 25px;
  margin: -10% 10px 0;
  border-radius: 7px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
`;

const PopupText = styled.p`
  font-weight: ${({ theme }) => theme.fontsWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.h5};
  color: ${({ theme }) => theme.colors.white};
`;

const PopupButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export { Background, Popup, PopupText, PopupButtons, CloseButtonWrapper };
