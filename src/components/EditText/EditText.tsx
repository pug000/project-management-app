import React, { useCallback, useEffect, useState } from 'react';

import Button from 'components/Button/Button';

import { ColumnData } from 'ts/interfaces';

import { StyledDeleteIcon, StyledEditTextIcon } from 'styles/styles';
import defaultTheme from 'styles/theme';
import {
  EditTextWrapper,
  EditTextContainer,
  StyledEditText,
  TextWrapper,
  EditTextElement,
} from './EditText.styles';

import EditTextForm from './EditTextForm';

interface EditTextProps {
  item: ColumnData;
  isSuccess: boolean;
  isLoading: boolean;
  deleteItemOnClick: (column: ColumnData) => void;
  editText: (title: string, item: ColumnData) => void;
}

function EditText({
  item,
  isSuccess,
  isLoading,
  deleteItemOnClick,
  editText,
}: EditTextProps) {
  const [isEditingText, setEditingText] = useState(false);

  const toggleEditingTextOnClick = useCallback(() => {
    setEditingText((prev) => !prev);
  }, [isEditingText]);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setEditingText(false);
    }
  }, [isSuccess, isLoading]);

  return (
    <EditTextContainer>
      {isEditingText ? (
        <EditTextForm
          item={item}
          toggleEditingTextOnClick={toggleEditingTextOnClick}
          editText={editText}
        />
      ) : (
        <EditTextWrapper>
          <EditTextElement>
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
          </EditTextElement>
        </EditTextWrapper>
      )}
    </EditTextContainer>
  );
}

export default EditText;
