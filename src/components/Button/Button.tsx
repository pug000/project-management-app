import React from 'react';

import { Variants } from 'framer-motion';

import StyledButton from './Button.style';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset';
  text?: string;
  id?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  disabled?: boolean;
  animation?: Variants;
  backgroundColor?: string;
  color?: string;
  width?: string;
  callback?: () => void;
}

function Button({
  type,
  text,
  leftIcon,
  rightIcon,
  id,
  disabled,
  animation,
  backgroundColor,
  color,
  width,
  callback,
}: ButtonProps) {
  return (
    <StyledButton
      type={type}
      id={id}
      disabled={disabled}
      $backgroundColor={backgroundColor}
      $color={color}
      $width={width}
      $variants={animation}
      onClick={() => callback && callback()}
    >
      {leftIcon}
      {text}
      {rightIcon}
    </StyledButton>
  );
}

Button.defaultProps = {
  text: '',
  leftIcon: undefined,
  rightIcon: undefined,
  disabled: false,
  animation: undefined,
  id: undefined,
  callback: undefined,
  backgroundColor: undefined,
  color: undefined,
  width: undefined,
};

export default Button;
