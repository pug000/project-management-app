import styled from 'styled-components';

const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 5px;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 155px;
  max-height: 300px;
  resize: vertical;
  display: block;
  padding: 5px;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.text};
  font-family: ${({ theme }) => theme.fonts.text};
  border-radius: 3px;
  border: solid 1px ${({ theme }) => theme.colors.grey};
  outline: none;
  transition: ${({ theme }) => theme.effects.transition};

  &:focus {
    border: solid 1px ${({ theme }) => theme.colors.primaryColor};
    box-shadow: 0px 10px 13px rgba(0, 0, 0, 0.07);
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

const TextareaErrorText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.smallNoteText};
  color: ${({ theme }) => theme.colors.red};
  display: flex;
  width: 100%;
  justify-content: flex-end;
  text-align: end;
  min-height: 16px;
`;

export { TextareaWrapper, Label, StyledTextarea, TextareaErrorText };
