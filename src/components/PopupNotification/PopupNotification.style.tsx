import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';

import { BackgroundColorProps } from 'ts/interfaces';

const notificationAnimate = {
  initial: {
    opacity: 0,
    y: '100vh',
    scale: 0.3,
  },
  animate: {
    opacity: 1,
    y: '35vh',
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.5,
    },
  },
};

const PopupWrapper = styled(motion.div)`
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

export { PopupWrapper, Popup, ButtonWrapper, PopupText, CloseIcon, notificationAnimate };
