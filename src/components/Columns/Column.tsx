import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Draggable, Droppable } from '@hello-pangea/dnd';

import useGetAllTasks from 'hooks/useGetAllTasks';

import Button from 'components/Button/Button';
import EditText from 'components/EditText/EditText';
import TaskCard from 'components/TaskCard/TaskCard';

import { ColumnData, Task, TaskList } from 'ts/interfaces';

import defaultTheme from 'styles/theme';
import { ColumnContainer, TasksWrapper } from './Columns.style';

interface ColumnProps {
  column: ColumnData;
  columnIndex: number;
  isSuccessGetColumnList: boolean;
  isLoadingColumnList: boolean;
  taskList: TaskList;
  setTaskList: React.Dispatch<React.SetStateAction<TaskList>>;
  showCreateTaskPopup: (column: ColumnData) => void;
  editColumnTitle: (title: string, item: ColumnData) => void;
  deleteColumnOnClick: (column: ColumnData) => void;
  showEditPopupOnClick: (task: Task) => void;
  showDeletePopupOnClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    task: Task
  ) => void;
}

function Column({
  column,
  columnIndex,
  isSuccessGetColumnList,
  isLoadingColumnList,
  taskList,
  setTaskList,
  showCreateTaskPopup,
  editColumnTitle,
  deleteColumnOnClick,
  showEditPopupOnClick,
  showDeletePopupOnClick,
}: ColumnProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'columnContainer' });
  useGetAllTasks(column.boardId, column._id, setTaskList);

  return (
    <Draggable draggableId={column._id} index={columnIndex}>
      {(providedDrag, snapshot) => (
        <ColumnContainer
          ref={providedDrag.innerRef}
          {...providedDrag.draggableProps}
          {...providedDrag.dragHandleProps}
          $isDragging={snapshot.isDragging}
          style={{
            ...providedDrag.draggableProps.style,
            cursor: 'default',
          }}
        >
          <EditText
            item={column}
            isSuccess={isSuccessGetColumnList}
            isLoading={isLoadingColumnList}
            deleteItemOnClick={deleteColumnOnClick}
            editText={editColumnTitle}
          />
          <Droppable droppableId={column._id} direction="vertical" type="task">
            {(providedDrop) => (
              <TasksWrapper ref={providedDrop.innerRef} {...providedDrop.droppableProps}>
                {taskList[column._id] &&
                  taskList[column._id].map((task, index) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      taskIndex={index}
                      showEditPopupOnClick={showEditPopupOnClick}
                      showDeletePopupOnClick={showDeletePopupOnClick}
                    />
                  ))}
                {providedDrop.placeholder}
              </TasksWrapper>
            )}
          </Droppable>
          <Button
            type="button"
            backgroundColor={defaultTheme.colors.transparent}
            color={defaultTheme.colors.grey}
            callback={() => showCreateTaskPopup(column)}
          >
            {`+ ${t('newTaskButton')}`}
          </Button>
        </ColumnContainer>
      )}
    </Draggable>
  );
}

export default memo(Column);
