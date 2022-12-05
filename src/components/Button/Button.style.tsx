import styled from 'styled-components';
import { motion } from 'framer-motion';

import {
  BackgroundColorProps,
  ColorProps,
  WidthProps,
  VariantsProps,
} from 'ts/interfaces';

type ButtonProps = ColorProps & BackgroundColorProps & WidthProps & VariantsProps;

const StyledButton = styled(motion.button).attrs<ButtonProps>(({ $variants }) => ({
  initial: 'initial',
  exit: 'exit',
  whileHover: 'hover',
  variants: $variants,
}))<ButtonProps>`
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.text};
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  justify-self: center;
  color: ${({ $color, theme }) => $color ?? theme.colors.textButton};
  border: none;
  padding: 8px;
  min-width: ${({ $width }) => $width ?? '175px'};
  background-color: ${({ $backgroundColor, theme }) =>
    $backgroundColor ?? theme.colors.primaryColor};
  transition: ${({ theme }) => theme.effects.transition};

  &:hover:enabled {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: ${({ $variants, theme }) =>
      $variants ? theme.colors.transparent : theme.colors.grey};
    cursor: default;
  }

  &:active:enabled {
    opacity: ${({ theme }) => theme.effects.activeOpacity};
  }
`;

export default StyledButton;
