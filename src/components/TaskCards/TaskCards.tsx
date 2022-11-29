import React, { memo } from 'react';

import useGetAllTasks from 'hooks/useGetAllTasks';

import { Task } from 'ts/interfaces';

import {
  StyledTask,
  TaskHeader,
  TaskTitle,
  TasksWrapper,
  StyledRemoveIcon,
  TaskDescription,
  TaskButton,
  TaskDescriptionWrapper,
} from './TaskCards.style';

interface TasksCardsProps {
  boardId: string;
  columnId: string;
  showEditPopupOnClick: (task: Task) => void;
  showDeletePopupOnClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    task: Task
  ) => void;
}

function TaskCards({
  boardId,
  columnId,
  showEditPopupOnClick,
  showDeletePopupOnClick,
}: TasksCardsProps) {
  const { tasks } = useGetAllTasks(boardId, columnId);

  return (
    <TasksWrapper>
      {tasks &&
        tasks.map((task) => (
          <StyledTask key={task._id} $backgroundColor={task.color}>
            <TaskHeader>
              <TaskTitle onClick={() => showEditPopupOnClick(task)}>
                {task.title}
              </TaskTitle>
              <TaskButton onClick={(event) => showDeletePopupOnClick(event, task)}>
                <StyledRemoveIcon />
              </TaskButton>
            </TaskHeader>
            <TaskDescriptionWrapper>
              <TaskDescription>{task.description}</TaskDescription>
            </TaskDescriptionWrapper>
          </StyledTask>
        ))}
    </TasksWrapper>
  );
}

export default memo(TaskCards);
