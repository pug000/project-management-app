import { motion } from 'framer-motion';
import styled from 'styled-components';

import { VariantsProps } from 'ts/interfaces';

const PopupWrapper = styled(motion.div).attrs<VariantsProps>(({ $variants }) => ({
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  variants: $variants,
}))<VariantsProps>`
  position: fixed;
  display: flex;
  z-index: 15;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 15;
  backdrop-filter: blur(2px);
`;

const Popup = styled.div`
  max-width: 500px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundBlue};
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
  z-index: 20;
`;

const PopupTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.title};
  font-weight: ${({ theme }) => theme.fontsWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.h4};
  color: ${({ theme }) => theme.colors.title};
  align-self: flex-start;
  padding: 10px 20px;
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  svg {
    color: ${({ theme }) => theme.colors.primaryColor};
  }
`;

export { PopupWrapper, Background, Popup, PopupTitle, CloseButtonWrapper };
