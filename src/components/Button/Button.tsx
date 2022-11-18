import React from 'react';

import { Variants } from 'framer-motion';

import StyledButton from './Button.style';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset';
  children?: React.ReactNode;
  id?: string;
  disabled?: boolean;
  animation?: Variants;
  backgroundColor?: string;
  color?: string;
  width?: string;
  callback?: () => void;
}

function Button({
  type,
  id,
  children,
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
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  disabled: false,
  animation: undefined,
  children: undefined,
  id: undefined,
  callback: undefined,
  backgroundColor: undefined,
  color: undefined,
  width: undefined,
};

export default Button;
