import React from 'react';
import {
  FieldError,
  FieldValues,
  Path,
  UseFormClearErrors,
  UseFormRegister,
  ValidationRule,
} from 'react-hook-form';

import {
  StyledTextarea,
  TextareaErrorText,
  Label,
  TextareaWrapper,
} from './Textarea.style';

interface TextareaProps<T extends FieldValues> {
  name: Path<T>;
  placeholderText?: string;
  disabled?: boolean;
  required?: string;
  pattern?: ValidationRule<RegExp>;
  minLength?: ValidationRule<number>;
  maxLength?: ValidationRule<number>;
  errors?: FieldError;
  register: UseFormRegister<T>;
  clearErrors: UseFormClearErrors<T>;
}

function Textarea<T extends FieldValues>({
  name,
  placeholderText,
  disabled,
  required,
  pattern,
  minLength,
  maxLength,
  errors,
  register,
  clearErrors,
}: TextareaProps<T>) {
  return (
    <TextareaWrapper>
      <StyledTextarea
        id={name}
        disabled={disabled}
        required
        {...register(name, {
          required,
          pattern,
          minLength,
          maxLength,
          onChange: () => errors && clearErrors(name),
        })}
      />
      <Label htmlFor={name}>{placeholderText}</Label>
      <TextareaErrorText>{errors?.message}</TextareaErrorText>
    </TextareaWrapper>
  );
}

Textarea.defaultProps = {
  placeholderText: '',
  disabled: false,
  required: undefined,
  pattern: undefined,
  minLength: undefined,
  maxLength: undefined,
  errors: undefined,
};

export default Textarea;
