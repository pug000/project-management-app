import React from 'react';

import StyledButton from './Button.style';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset';
  text?: string;
  id?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  disabled?: boolean;
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
  id: undefined,
  callback: undefined,
  backgroundColor: undefined,
  color: undefined,
  width: undefined,
};

export default Button;
