import React, { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import useDeleteColumn from 'hooks/useDeleteColumn';

import getSelectedColumn from 'redux/selectors/columnSelectors';

import { setDeleteColumnPopupOpen } from 'redux/slices/popupSlice';
import { setSelectedColumn } from 'redux/slices/columnSlice';

import Button from 'components/Button/Button';
import Task from 'components/Task/Task';
import PopupWarning from 'components/PopupWarning/PopupWarning';
import Loader from 'components/Loader/Loader';

import { ColumnData } from 'ts/interfaces';

import { BiEdit } from 'react-icons/bi';

import { StyledDeleteIcon } from 'styles/styles';
import defaultTheme from 'styles/theme';

import {
  ColumnWrapper,
  ColumnsContainer,
  ColumnHeader,
  ColumnHeaderButtonWrapper,
  ColumnHeaderButton,
  ColumnTitle,
  ColumnTaskContainer,
  IconWrapper,
} from './ColumnContainer.style';

interface ColumnsProps {
  columns: ColumnData[];
}

function ColumnContainer({ columns }: ColumnsProps) {
  const selectedColumn = useAppSelector(getSelectedColumn);
  const { t } = useTranslation('translation', { keyPrefix: 'columnContainer' });
  const dispatch = useAppDispatch();

  const deleteColumnOnClick = useCallback((column: ColumnData) => {
    dispatch(setSelectedColumn(column));
    dispatch(setDeleteColumnPopupOpen(true));
  }, []);

  const { isLoadingDeleteColumn, isDeleteColumnPopupOpen, deleteColumn } =
    useDeleteColumn(selectedColumn);

  return (
    <ColumnWrapper>
      {isLoadingDeleteColumn && <Loader />}
      {columns?.length &&
        columns.map((column) => (
          <ColumnsContainer key={column._id}>
            <ColumnHeader>
              <ColumnTitle>{column.title}</ColumnTitle>
              <ColumnHeaderButtonWrapper>
                <ColumnHeaderButton>
                  <IconWrapper>
                    <BiEdit color={defaultTheme.colors.grey} />
                  </IconWrapper>
                </ColumnHeaderButton>
                <ColumnHeaderButton onClick={() => deleteColumnOnClick(column)}>
                  <IconWrapper>
                    <StyledDeleteIcon color={defaultTheme.colors.pink} />
                  </IconWrapper>
                </ColumnHeaderButton>
              </ColumnHeaderButtonWrapper>
            </ColumnHeader>
            <Button type="button">{t('newTaskButton')}</Button>
            <ColumnTaskContainer>
              <Task title="hello" />
              <Task title="hello" />
              <Task title="hello" />
              <Task title="hello" />
              <Task title="hello" />
              <Task title="hello" />
              <Task title="hello" />
              <Task title="hello" />
              <Task title="hello" />
              <Task title="hello" />
              <Task title="hello" />
              <Task title="hello" />
              <Task title="hello" />
              <Task title="hello" />
            </ColumnTaskContainer>
          </ColumnsContainer>
        ))}
      <PopupWarning
        isPopupShown={isDeleteColumnPopupOpen}
        setPopupShown={setDeleteColumnPopupOpen}
        text="deleteColumn"
        actionOnYes={deleteColumn}
      />
    </ColumnWrapper>
  );
}

export default memo(ColumnContainer);
