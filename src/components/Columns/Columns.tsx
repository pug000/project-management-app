import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'hooks/useRedux';
import useGetAllColumns from 'hooks/useGetAllColumns';
import useEditColumnTitle from 'hooks/useEditColumnTitle';
import useCreateTask from 'hooks/useCreateTask';

import { setDeleteColumnPopupOpen, setSelectedColumn } from 'redux/slices/columnSlice';
import { setCreateTaskPopupOpen } from 'redux/slices/taskSlice';

import Button from 'components/Button/Button';
import EditText from 'components/EditText/EditText';
import TaskCards from 'components/TaskCards/TaskCards';
import PopupWithForm from 'components/PopupWithForm/PopupWithForm';
import Loader from 'components/Loader/Loader';

import { ColumnData } from 'ts/interfaces';

import defaultTheme from 'styles/theme';
import { ColumnWrapper, ColumnsContainer } from './Columns.style';

interface ColumnsProps {
  columns: ColumnData[];
}

function Columns({ columns }: ColumnsProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'columnContainer' });
  const dispatch = useAppDispatch();
  const { isSuccessGetColumnList, isLoadingColumnList } = useGetAllColumns();
  const { editColumnTitle } = useEditColumnTitle();
  const { isCreateTaskPopupOpen, isLoadingCreateTask, onSubmit, showCreateTaskPopup } =
    useCreateTask();

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
              isSuccess={isSuccessGetColumnList}
              isLoading={isLoadingColumnList}
              deleteItemOnClick={deleteColumnOnClick}
              editText={editColumnTitle}
            />
            <TaskCards boardId={column.boardId} columnId={column._id} />
            <Button
              type="button"
              backgroundColor={defaultTheme.colors.transparent}
              color={defaultTheme.colors.grey}
              callback={() => showCreateTaskPopup(column)}
            >
              {`+ ${t('newTaskButton')}`}
            </Button>
          </ColumnsContainer>
        ))}
      <PopupWithForm
        isPopupShown={isCreateTaskPopupOpen}
        setPopupShown={setCreateTaskPopupOpen}
        formTitleText="editTitle"
        keyPrefix="editTaskForm"
        onSubmit={onSubmit}
      />
      {isLoadingCreateTask && <Loader />}
    </ColumnWrapper>
  );
}

export default memo(Columns);
