import React, { memo, useCallback, useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import useGetAllColumns from 'hooks/useGetAllColumns';
import useEditColumnTitle from 'hooks/useEditColumnTitle';
import useCreateTask from 'hooks/useCreateTask';
import useDeleteTask from 'hooks/useDeleteTask';
import useEditTask from 'hooks/useEditTask';
import useDragAndDrop from 'hooks/useDragAndDrop';

import { setDeleteColumnPopupOpen, setSelectedColumn } from 'redux/slices/columnSlice';
import {
  setCreateTaskPopupOpen,
  setDeleteTaskPopupOpen,
  setEditTaskPopupOpen,
  setSelectedTask,
} from 'redux/slices/taskSlice';
import { getSelectedTask } from 'redux/selectors/taskSelectors';

import PopupWithForm from 'components/PopupWithForm/PopupWithForm';
import Loader from 'components/Loader/Loader';
import PopupWarning from 'components/PopupWarning/PopupWarning';

import { ColumnData, TaskList } from 'ts/interfaces';

import { ColumnWrapper } from './Columns.style';

import Column from './Column';

function Columns() {
  const selectedTask = useAppSelector(getSelectedTask);
  const [taskList, setTaskList] = useState<TaskList>({});
  const dispatch = useAppDispatch();
  const { columnList, isSuccessGetColumnList, isLoadingColumnList, setColumnList } =
    useGetAllColumns();
  const { editColumnTitle } = useEditColumnTitle();
  const {
    isCreateTaskPopupOpen,
    isLoadingCreateTask,
    createTaskOnSubmit,
    showCreateTaskPopup,
  } = useCreateTask(taskList);
  const {
    isEditTaskPopupOpen,
    isLoadingEditTask,
    editTaskOnSubmit,
    showEditPopupOnClick,
  } = useEditTask(selectedTask);
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
  const { onDragEnd } = useDragAndDrop(columnList, setColumnList, taskList, setTaskList);

  const deleteColumnOnClick = useCallback((column: ColumnData) => {
    dispatch(setSelectedColumn(column));
    dispatch(setDeleteColumnPopupOpen(true));
  }, []);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="columnList" direction="horizontal" type="column">
          {(providedDrop) => (
            <ColumnWrapper ref={providedDrop.innerRef} {...providedDrop.droppableProps}>
              {columnList.map((column, index) => (
                <Column
                  key={column._id}
                  column={column}
                  columnIndex={index}
                  isSuccessGetColumnList={isSuccessGetColumnList}
                  isLoadingColumnList={isLoadingColumnList}
                  taskList={taskList}
                  setTaskList={setTaskList}
                  deleteColumnOnClick={deleteColumnOnClick}
                  editColumnTitle={editColumnTitle}
                  showEditPopupOnClick={showEditPopupOnClick}
                  showDeletePopupOnClick={showDeletePopupOnClick}
                  showCreateTaskPopup={showCreateTaskPopup}
                />
              ))}
              {providedDrop.placeholder}
            </ColumnWrapper>
          )}
        </Droppable>
      </DragDropContext>
      <PopupWithForm
        isPopupShown={isCreateTaskPopupOpen}
        setPopupShown={setCreateTaskPopupOpen}
        formTitleText="newTaskTitle"
        keyPrefix="editTaskForm"
        onSubmit={createTaskOnSubmit}
        maxDescriptionLength={200}
      />
      <PopupWithForm
        isPopupShown={isEditTaskPopupOpen}
        setPopupShown={setEditTaskPopupOpen}
        selectedItem={selectedTask}
        setSelectedItem={setSelectedTask}
        formTitleText="editTitle"
        keyPrefix="editTaskForm"
        onSubmit={editTaskOnSubmit}
        maxDescriptionLength={200}
      />
      <PopupWarning
        isPopupShown={isDeleteTaskPopupOpen}
        setPopupShown={setDeleteTaskPopupOpen}
        text="deleteTask"
        actionOnYes={deleteTask}
      />
      {isLoadingColumns && <Loader />}
    </>
  );
}

export default memo(Columns);
