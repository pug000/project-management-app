import React, { useCallback, useState } from 'react';

import Button from 'components/Button/Button';

import { ColumnData, ColumnFormValues } from 'ts/interfaces';

import { StyledDeleteIcon, StyledEditTextIcon } from 'styles/styles';
import defaultTheme from 'styles/theme';
import {
  EditTextWrapper,
  EditTextContainer,
  StyledEditText,
  TextWrapper,
} from './EditText.styles';

import EditTextForm from './EditTextForm';

interface EditTextProps {
  item: ColumnData;
  onSubmit: (formValues: ColumnFormValues, item: ColumnData) => void;
  deleteItemOnClick: (column: ColumnData) => void;
}

function EditText({ item, onSubmit, deleteItemOnClick }: EditTextProps) {
  const [isEditingText, setEditingText] = useState(false);

  const toggleEditingTextOnClick = useCallback(() => {
    setEditingText((prev) => !prev);
  }, [isEditingText]);

  return (
    <EditTextContainer>
      {isEditingText ? (
        <EditTextForm
          item={item}
          toggleEditingTextOnClick={toggleEditingTextOnClick}
          onSubmit={onSubmit}
        />
      ) : (
        <EditTextWrapper>
          <TextWrapper>
            <StyledEditText onClick={toggleEditingTextOnClick}>
              {item.title}
            </StyledEditText>
            <Button
              type="button"
              width="25px"
              backgroundColor={defaultTheme.colors.transparent}
              callback={toggleEditingTextOnClick}
            >
              <StyledEditTextIcon />
            </Button>
          </TextWrapper>
          <Button
            type="button"
            width="25px"
            backgroundColor={defaultTheme.colors.transparent}
            color={defaultTheme.colors.pink}
            callback={() => deleteItemOnClick(item)}
          >
            <StyledDeleteIcon />
          </Button>
        </EditTextWrapper>
      )}
    </EditTextContainer>
  );
}

export default EditText;
