import styled from 'styled-components';

import { InputErrorText } from 'components/Input/Input.style';

const StyledEditText = styled.h5`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-family: ${({ theme }) => theme.fonts.text};
  font-weight: ${({ theme }) => theme.fontsWeight.bold};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 210px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 80px;

  Button {
    margin-top: 8px;
    padding: 0;
    align-self: flex-start;
  }

  ${InputErrorText} {
    min-height: 32px;
  }
`;

const EditTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TextWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const EditTextWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  height: 80px;
  padding-top: 10px;

  Button {
    padding: 0;
    align-self: flex-start;
  }
`;

export { Form, EditTextContainer, EditTextWrapper, TextWrapper, StyledEditText };
