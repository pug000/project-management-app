import React from 'react';

import StyledButton from './Button.style';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset';
  text?: string;
  id?: string;
  disabled?: boolean;
  backgroundColor?: string;
  color?: string;
  width?: string;
  callback?: () => void;
}

function Button({
  type,
  text,
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
      {text}
    </StyledButton>
  );
}

Button.defaultProps = {
  text: '',
  disabled: false,
  id: undefined,
  callback: undefined,
  backgroundColor: undefined,
  color: undefined,
  width: undefined,
};

export default Button;
