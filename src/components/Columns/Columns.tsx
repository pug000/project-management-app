import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import useGetAllColumns from 'hooks/useGetAllColumns';
import useEditColumnTitle from 'hooks/useEditColumnTitle';
import useCreateTask from 'hooks/useCreateTask';
import useDeleteTask from 'hooks/useDeleteTask';
import useEditTask from 'hooks/useEditTask';

import { setDeleteColumnPopupOpen, setSelectedColumn } from 'redux/slices/columnSlice';
import {
  setCreateTaskPopupOpen,
  setDeleteTaskPopupOpen,
  setEditTaskPopupOpen,
  setSelectedTask,
} from 'redux/slices/taskSlice';
import { getSelectedTask } from 'redux/selectors/taskSelectors';

import Button from 'components/Button/Button';
import EditText from 'components/EditText/EditText';
import TaskCards from 'components/TaskCards/TaskCards';
import PopupWithForm from 'components/PopupWithForm/PopupWithForm';
import Loader from 'components/Loader/Loader';
import PopupWarning from 'components/PopupWarning/PopupWarning';

import { ColumnData } from 'ts/interfaces';

import defaultTheme from 'styles/theme';
import { ColumnWrapper, ColumnsContainer } from './Columns.style';

interface ColumnsProps {
  columns: ColumnData[];
}

function Columns({ columns }: ColumnsProps) {
  const selectedTask = useAppSelector(getSelectedTask);
  const { t } = useTranslation('translation', { keyPrefix: 'columnContainer' });
  const dispatch = useAppDispatch();
  const { isSuccessGetColumnList, isLoadingColumnList } = useGetAllColumns();
  const { editColumnTitle } = useEditColumnTitle();
  const { isCreateTaskPopupOpen, isLoadingCreateTask, onSubmit, showCreateTaskPopup } =
    useCreateTask();
  const { isEditTaskPopupOpen, isLoadingEditTask, editOnSubmit, showEditPopupOnClick } =
    useEditTask(selectedTask);
  const {
    isDeleteTaskPopupOpen,
    isLoadingDeleteTask,
    deleteTask,
    showDeletePopupOnClick,
  } = useDeleteTask(selectedTask);
  const isLoadingColumns = [
    isLoadingColumnList,
    isLoadingCreateTask,
    isLoadingEditTask,
    isLoadingDeleteTask,
  ].some((loader) => loader);

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
            <TaskCards
              boardId={column.boardId}
              columnId={column._id}
              showEditPopupOnClick={showEditPopupOnClick}
              showDeletePopupOnClick={showDeletePopupOnClick}
            />
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
        formTitleText="newTaskTitle"
        keyPrefix="editTaskForm"
        onSubmit={onSubmit}
      />
      <PopupWithForm
        isPopupShown={isEditTaskPopupOpen}
        setPopupShown={setEditTaskPopupOpen}
        selectedItem={selectedTask}
        setSelectedItem={setSelectedTask}
        formTitleText="editTitle"
        keyPrefix="editTaskForm"
        onSubmit={editOnSubmit}
      />
      <PopupWarning
        isPopupShown={isDeleteTaskPopupOpen}
        setPopupShown={setDeleteTaskPopupOpen}
        text="deleteTask"
        actionOnYes={deleteTask}
      />
      {isLoadingColumns && <Loader />}
    </ColumnWrapper>
  );
}

export default memo(Columns);
