import React, { memo, useCallback } from 'react';

import { useAppDispatch } from 'hooks/useRedux';

import { setDeletePopupOpen } from 'redux/slices/popupSlice';
import { setSelectedColumn } from 'redux/slices/columnSlice';

import { projectIconsList } from 'utils/constants';

import Button from 'components/Button/Button';
import Task from 'components/Task/Task';
import theme from 'styles/theme';
import { ColumnData } from 'ts/interfaces';

import {
  ColumnWrapper,
  ColumnHeader,
  ColumnHeaderButton,
  ColumnTitle,
  ColumnTaskContainer,
  IconWrapper,
} from './Column.style';

interface ColumnProps {
  columns: ColumnData[];
}

function Column({ columns }: ColumnProps) {
  const dispatch = useAppDispatch();

  const editOrDeleteColumnOnClick = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      id: number,
      column: ColumnData
    ) => {
      event.preventDefault();
      dispatch(setSelectedColumn(column));

      if (id === 2) {
        dispatch(setDeletePopupOpen(true));
      }
    },
    []
  );

  return (
    <ColumnWrapper>
      {columns.map((column) => (
        <>
          <ColumnHeader>
            <ColumnTitle>{column.title}</ColumnTitle>
            {projectIconsList.map(({ id, icon }) => (
              <ColumnHeaderButton
                key={id}
                onClick={(event) => editOrDeleteColumnOnClick(event, id, column)}
              >
                <IconWrapper>{icon}</IconWrapper>
              </ColumnHeaderButton>
            ))}
          </ColumnHeader>
          <Button type="button" callback={() => console.log('add task')}>
            Add task
          </Button>
          <ColumnTaskContainer>
            <Task title="hello" />
          </ColumnTaskContainer>
        </>
      ))}
    </ColumnWrapper>
  );
}

export default memo(Column);
