import React, { useCallback, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { useAppDispatch } from 'hooks/useRedux';

import { setDeletePopupOpen } from 'redux/slices/popupSlice';

import Button from 'components/Button/Button';

import { StyledDeleteIcon, StyledEditTextIcon } from 'styles/styles';
import defaultTheme from 'styles/theme';
import { EditTextWrapper, EditTextContainer, StyledEditText } from './EditText.styles';
import EditTextForm from './EditTextForm';

interface EditTextProps {
  text?: string;
  onSubmit: SubmitHandler<{ title: string }>;
}

function EditText({ text, onSubmit }: EditTextProps) {
  const [isEditingText, setEditingText] = useState(false);
  const dispatch = useAppDispatch();

  const toggleEditingText = useCallback(() => {
    setEditingText((prev) => !prev);
  }, [isEditingText]);

  return (
    <EditTextContainer>
      {isEditingText ? (
        <EditTextForm
          text={text}
          toggleEditingText={toggleEditingText}
          onSubmit={onSubmit}
        />
      ) : (
        <EditTextWrapper>
          <StyledEditText onClick={toggleEditingText}>{text}</StyledEditText>
          <Button
            type="button"
            width="25px"
            backgroundColor={defaultTheme.colors.transparent}
            callback={toggleEditingText}
          >
            <StyledEditTextIcon />
          </Button>
          <Button
            type="button"
            width="25px"
            backgroundColor={defaultTheme.colors.transparent}
            color={defaultTheme.colors.pink}
            callback={() => dispatch(setDeletePopupOpen(true))}
          >
            <StyledDeleteIcon />
          </Button>
        </EditTextWrapper>
      )}
    </EditTextContainer>
  );
}

EditText.defaultProps = {
  text: '',
};

export default EditText;
