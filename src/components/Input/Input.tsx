import React, { useState } from 'react';

import {
  FieldError,
  FieldValues,
  Path,
  UseFormClearErrors,
  UseFormRegister,
  ValidationRule,
} from 'react-hook-form';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import {
  InputWrapper,
  Label,
  StyledInput,
  InputErrorText,
  Wrapper,
  PasswordButton,
} from './Input.style';

interface InputProps<T extends FieldValues> {
  type: string;
  placeholderText?: string;
  name: Path<T>;
  minLength?: ValidationRule<number>;
  maxLength?: ValidationRule<number>;
  required?: string;
  pattern?: ValidationRule<RegExp>;
  errors?: FieldError;
  disabled?: boolean;
  register: UseFormRegister<T>;
  clearErrors: UseFormClearErrors<T>;
}

function Input<T extends FieldValues>({
  type,
  placeholderText,
  name,
  minLength,
  maxLength,
  required,
  pattern,
  errors,
  disabled,
  register,
  clearErrors,
}: InputProps<T>) {
  const [isPasswordShown, setPasswordShown] = useState(false);

  const renderPasswordButton = () => {
    if (name !== 'password') {
      return null;
    }

    return (
      <PasswordButton onClick={() => setPasswordShown((prev) => !prev)}>
        {isPasswordShown ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </PasswordButton>
    );
  };

  const togglePasswordInputType = () => {
    if (name !== 'password') {
      return type;
    }

    return isPasswordShown ? 'text' : 'password';
  };

  return (
    <Wrapper>
      <InputWrapper>
        <StyledInput
          type={togglePasswordInputType()}
          required
          id={name}
          disabled={disabled}
          {...register(name, {
            required,
            minLength,
            maxLength,
            pattern,
            onChange: () => errors && clearErrors(name),
          })}
        />
        <Label>{placeholderText}</Label>
        {renderPasswordButton()}
      </InputWrapper>
      <InputErrorText>{errors?.message}</InputErrorText>
    </Wrapper>
  );
}

Input.defaultProps = {
  placeholderText: '',
  errors: undefined,
  disabled: false,
  maxLength: undefined,
  minLength: undefined,
  required: undefined,
  pattern: undefined,
};

export default Input;
