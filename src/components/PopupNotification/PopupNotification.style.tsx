import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';

import { BackgroundColorProps, VariantsProps } from 'ts/interfaces';

const PopupWrapper = styled(motion.div).attrs<VariantsProps>(({ $variants }) => ({
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  variants: $variants,
}))<VariantsProps>`
  position: fixed;
  max-width: 450px;
  width: 100%;
`;

const Popup = styled.div<BackgroundColorProps>`
  background-color: ${({ $backgroundColor, theme }) =>
    $backgroundColor ?? theme.colors.backgroundBlue};
  padding: 25px;
  margin: 0 10px;
  border-radius: 10px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const PopupText = styled.p`
  font-weight: ${({ theme }) => theme.fontsWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.text};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const CloseIcon = styled(MdClose)``;

export { PopupWrapper, Popup, ButtonWrapper, PopupText, CloseIcon };
