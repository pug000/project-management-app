import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import useDragColumn from 'hooks/useDragColumn';
import useGetAllTasks from 'hooks/useGetAllTasks';

import Button from 'components/Button/Button';
import EditText from 'components/EditText/EditText';
import TaskCard from 'components/TaskCard/TaskCard';

import { ColumnData, Task } from 'ts/interfaces';

import defaultTheme from 'styles/theme';
import { ColumnsContainer, TasksWrapper } from './Columns.style';

interface ColumnProps {
  column: ColumnData;
  columnIndex: number;
  isSuccessGetColumnList: boolean;
  isLoadingColumnList: boolean;
  moveColumns: (dragIndex: number, hoverIndex: number) => void;
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
  moveColumns,
  showCreateTaskPopup,
  editColumnTitle,
  deleteColumnOnClick,
  showEditPopupOnClick,
  showDeletePopupOnClick,
}: ColumnProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'columnContainer' });
  const { tasks } = useGetAllTasks(column.boardId, column._id);
  const { dragRef, handlerId, isDragging } = useDragColumn(
    column,
    columnIndex,
    'columnList',
    moveColumns
  );

  return (
    <ColumnsContainer
      ref={dragRef}
      data-handler-id={handlerId}
      style={{
        opacity: isDragging ? 0.2 : 1,
      }}
    >
      <EditText
        item={column}
        isSuccess={isSuccessGetColumnList}
        isLoading={isLoadingColumnList}
        deleteItemOnClick={deleteColumnOnClick}
        editText={editColumnTitle}
      />
      <TasksWrapper>
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            showEditPopupOnClick={showEditPopupOnClick}
            showDeletePopupOnClick={showDeletePopupOnClick}
          />
        ))}
      </TasksWrapper>
      <Button
        type="button"
        backgroundColor={defaultTheme.colors.transparent}
        color={defaultTheme.colors.grey}
        callback={() => showCreateTaskPopup(column)}
      >
        {`+ ${t('newTaskButton')}`}
      </Button>
    </ColumnsContainer>
  );
}

export default memo(Column);
