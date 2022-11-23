import styled from 'styled-components';

import { BackgroundColorProps } from 'ts/interfaces';

const RadioInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.smallText};
  color: ${({ theme }) => theme.colors.text};
`;

const RadioInputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-self: center;
  gap: 10px;
`;

const RadioInputSpan = styled.span<BackgroundColorProps>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $backgroundColor, theme }) =>
    $backgroundColor ?? theme.colors.primaryColor};

  &:before {
    content: '';
    display: inline-block;
    width: 60%;
    height: 60%;
    background-color: ${({ theme }) => theme.colors.backgroundWhite};
    border-radius: 50%;
    opacity: 0;
  }
`;

const RadioInputLabel = styled.label`
  cursor: pointer;
`;

const StyledRadioInput = styled.input`
  display: none;

  &:checked + ${RadioInputSpan}:before {
    opacity: 1;
  }
`;

const InputErrorText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.smallNoteText};
  color: ${({ theme }) => theme.colors.red};
  display: flex;
  width: 100%;
  justify-content: flex-end;
  text-align: end;
  min-height: 16px;
`;

export {
  RadioInputContainer,
  RadioInputWrapper,
  RadioInputLabel,
  RadioInputSpan,
  StyledRadioInput,
  Label,
  InputErrorText,
};
