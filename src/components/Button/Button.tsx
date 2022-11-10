import React from 'react';

import StyledButton from './Button.style';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset';
  text?: string;
  id?: string;
  disabled?: boolean;
  callback?: () => void;
}

function Button({ type, text, id, disabled, callback }: ButtonProps) {
  return (
    <StyledButton
      type={type}
      id={id}
      disabled={disabled}
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
};

export default Button;
