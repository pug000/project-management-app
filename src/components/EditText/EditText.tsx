import React, { useCallback, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit/dist/createAction';

import { useAppDispatch } from 'hooks/useRedux';

import Button from 'components/Button/Button';

import { ColumnFormValues } from 'ts/interfaces';

import { StyledDeleteIcon, StyledEditTextIcon } from 'styles/styles';
import defaultTheme from 'styles/theme';
import {
  EditTextWrapper,
  EditTextContainer,
  StyledEditText,
  TextWrapper,
} from './EditText.styles';

import EditTextForm from './EditTextForm';

interface EditTextProps<T> {
  title?: string;
  item: T;
  setSelectedItem: ActionCreatorWithPayload<T | null>;
  onSubmit: SubmitHandler<ColumnFormValues>;
  deleteItemOnClick: (column: T) => void;
}

function EditText<T>({
  title,
  item,
  setSelectedItem,
  onSubmit,
  deleteItemOnClick,
}: EditTextProps<T>) {
  const [isEditingText, setEditingText] = useState(false);
  const dispatch = useAppDispatch();

  const enableEditingOnClick = useCallback(() => {
    setEditingText(true);
    dispatch(setSelectedItem(item));
  }, []);

  const disableEditingOnClick = useCallback(() => {
    setEditingText(false);
    dispatch(setSelectedItem(null));
  }, []);

  return (
    <EditTextContainer>
      {isEditingText ? (
        <EditTextForm
          title={title}
          disableEditingOnClick={disableEditingOnClick}
          onSubmit={onSubmit}
        />
      ) : (
        <EditTextWrapper>
          <TextWrapper>
            <StyledEditText onClick={enableEditingOnClick}>{title}</StyledEditText>
            <Button
              type="button"
              width="25px"
              backgroundColor={defaultTheme.colors.transparent}
              callback={enableEditingOnClick}
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

EditText.defaultProps = {
  title: '',
};

export default EditText;
