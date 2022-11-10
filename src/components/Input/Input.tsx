/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
  FieldError,
  FieldValues,
  Path,
  UseFormClearErrors,
  UseFormRegister,
  ValidationRule,
} from 'react-hook-form';

import { InputWrapper, Label, StyledInput, InputErrorText, Wrapper } from './Input.style';

interface InputProps<T extends FieldValues> {
  type: string;
  placeholderText?: string;
  name: Path<T>;
  minLength?: ValidationRule<number>;
  required?: string;
  pattern?: ValidationRule<RegExp>;
  errors?: FieldError;
  register: UseFormRegister<T>;
  clearErrors: UseFormClearErrors<T>;
}

function Input<T extends FieldValues>({
  type,
  placeholderText,
  name,
  minLength,
  required,
  pattern,
  errors,
  register,
  clearErrors,
}: InputProps<T>) {
  return (
    <Wrapper>
      <InputWrapper>
        <StyledInput
          type={type}
          required
          id={name}
          {...register(name, {
            required,
            minLength,
            pattern,
            onChange: () => errors && clearErrors(name),
          })}
        />
        <Label>{placeholderText}</Label>
      </InputWrapper>
      <InputErrorText>{errors?.message}</InputErrorText>
    </Wrapper>
  );
}

Input.defaultProps = {
  placeholderText: '',
  errors: undefined,
  minLength: undefined,
  required: undefined,
  pattern: undefined,
};

export default Input;
