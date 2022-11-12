import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  outline: none;
  border: 1px solid;
  border-radius: 3px;
  border-color: ${({ theme }) => theme.colors.grey};
  font-family: ${({ theme }) => theme.fonts.text};
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.text};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primaryColor};
  }

  &:focus ~ label,
  &:valid ~ label,
  &:disabled ~ label {
    transform: translateX(-10px) translateY(-32px);
    font-size: ${({ theme }) => theme.fontSizes.smallText};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Label = styled.label`
  position: absolute;
  top: 1px;
  left: 1px;
  padding: 10px;
  display: inline-block;
  color: ${({ theme }) => theme.colors.grey};
  font-size: ${({ theme }) => theme.fontSizes.text};
  transition: ${({ theme }) => theme.effects.transition};
  pointer-events: none;
`;

const InputErrorText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.smallNoteText};
  color: ${({ theme }) => theme.colors.pink};
  display: flex;
  width: 100%;
  justify-content: flex-end;
  text-align: end;
  min-height: 16px;
`;

export { Wrapper, InputWrapper, StyledInput, Label, InputErrorText };
