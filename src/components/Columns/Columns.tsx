import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'hooks/useRedux';

import { setDeleteColumnPopupOpen, setSelectedColumn } from 'redux/slices/columnSlice';

import Button from 'components/Button/Button';
import Task from 'components/Task/Task';
import EditText from 'components/EditText/EditText';

import { ColumnData } from 'ts/interfaces';

import { ColumnWrapper, ColumnsContainer, ColumnTaskContainer } from './Columns.style';

interface ColumnsProps {
  columns: ColumnData[];
}

function Columns({ columns }: ColumnsProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'columnContainer' });
  const dispatch = useAppDispatch();

  const deleteColumnOnClick = useCallback((column: ColumnData) => {
    dispatch(setSelectedColumn(column));
    dispatch(setDeleteColumnPopupOpen(true));
  }, []);

  return (
    <ColumnWrapper>
      {columns?.length &&
        columns.map((column) => (
          <ColumnsContainer key={column._id}>
            <EditText
              item={column}
              deleteItemOnClick={deleteColumnOnClick}
              onSubmit={() => {}}
            />
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
            <Button type="button">{t('newTaskButton')}</Button>
          </ColumnsContainer>
        ))}
    </ColumnWrapper>
  );
}

export default memo(Columns);
