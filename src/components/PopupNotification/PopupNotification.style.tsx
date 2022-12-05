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
  top: 0;
  z-index: 8;
  justify-self: center;
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

const ProgressBar = styled.div`
  width: 95%;
  height: 5px;
  position: absolute;
  top: 85%;
  background-color: ${({ theme }) => theme.colors.transparent};
`;

const Progress = styled(motion.div).attrs<VariantsProps>(({ $variants }) => ({
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  variants: $variants,
}))<VariantsProps>`
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  height: 5px;
  opacity: 0.4;
  border-radius: 0 0 5px 5px;
`;

export {
  PopupWrapper,
  Popup,
  ButtonWrapper,
  PopupText,
  CloseIcon,
  ProgressBar,
  Progress,
};
