import styled from 'styled-components';

import { BackgroundColorProps } from 'ts/interfaces';

const RadioInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.smallText};
  color: ${({ theme }) => theme.colors.grey};
`;

const RadioInputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-self: center;
  gap: 10px;
`;

const RadioInputSpan = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.h4};
  transition: ${({ theme }) => theme.effects.transition};
  opacity: 0;
`;

const RadioInputLabel = styled.label<BackgroundColorProps>`
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $backgroundColor, theme }) =>
    $backgroundColor ?? theme.colors.primaryColor};
  transition: ${({ theme }) => theme.effects.transition};

  &:hover {
    box-shadow: 0px 10px 13px rgba(0, 0, 0, 0.07);
  }
`;

const StyledRadioInput = styled.input`
  display: none;

  &:checked + ${RadioInputSpan} {
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
