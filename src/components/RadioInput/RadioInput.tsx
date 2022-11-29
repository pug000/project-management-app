import React from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { RadioInputItem } from 'ts/interfaces';

import {
  InputErrorText,
  Label,
  RadioInputContainer,
  RadioInputLabel,
  RadioInputSpan,
  RadioInputWrapper,
  StyledRadioInput,
} from './RadioInput.style';

interface RadioInputProps<T extends FieldValues> {
  radioInputs: RadioInputItem[];
  name: Path<T>;
  text?: string;
  required?: string;
  errors?: FieldError;
  defaultValue: string;
  register: UseFormRegister<T>;
}

function RadioInput<T extends FieldValues>({
  radioInputs,
  name,
  text,
  required,
  errors,
  defaultValue,
  register,
}: RadioInputProps<T>) {
  return (
    <RadioInputContainer>
      <Label>{text}</Label>
      <RadioInputWrapper>
        {radioInputs.map(({ id, value, checked }) => (
          <RadioInputLabel key={id} htmlFor={id} $backgroundColor={value}>
            <StyledRadioInput
              type="radio"
              value={value}
              defaultChecked={defaultValue === value ? !!defaultValue : checked}
              id={id}
              {...register(name, {
                required,
              })}
            />
            <RadioInputSpan>&#10004;</RadioInputSpan>
          </RadioInputLabel>
        ))}
      </RadioInputWrapper>
      <InputErrorText>{errors?.message}</InputErrorText>
    </RadioInputContainer>
  );
}

RadioInput.defaultProps = {
  text: '',
  required: undefined,
  errors: undefined,
};

export default RadioInput;
