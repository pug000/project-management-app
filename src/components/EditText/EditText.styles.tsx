import styled from 'styled-components';

const EditTextInput = styled.input``;

const StyledEditText = styled.h5`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-family: ${({ theme }) => theme.fonts.text};
  font-weight: ${({ theme }) => theme.fontsWeight.bold};
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  Button {
    margin-top: 8px;
    padding: 0;
    align-self: flex-start;
  }
`;

const EditTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EditTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  Button {
    margin-top: 6px;
    padding: 0;
    align-self: center;
  }
`;

export { Form, EditTextContainer, EditTextWrapper, EditTextInput, StyledEditText };
