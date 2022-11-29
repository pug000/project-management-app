import React, { memo } from 'react';

import useGetAllTasks from 'hooks/useGetAllTasks';

import Button from 'components/Button/Button';

import theme from 'styles/theme';
import { Task } from 'ts/interfaces';
import {
  StyledTask,
  TaskHeader,
  TaskTitle,
  TasksWrapper,
  StyledRemoveIcon,
  TaskDescription,
} from './TaskCards.style';

interface TasksCardsProps {
  boardId: string;
  columnId: string;
  showDeletePopupOnClick: (task: Task) => void;
}

function TaskCards({ boardId, columnId, showDeletePopupOnClick }: TasksCardsProps) {
  const { tasks } = useGetAllTasks(boardId, columnId);

  return (
    <TasksWrapper>
      {tasks &&
        tasks.map((task) => (
          <StyledTask key={task._id} $backgroundColor={task.color}>
            <TaskHeader>
              <TaskTitle>{task.title}</TaskTitle>
              <Button
                type="button"
                width={theme.fontSizes.text}
                backgroundColor={theme.colors.transparent}
                callback={() => showDeletePopupOnClick(task)}
              >
                <StyledRemoveIcon />
              </Button>
            </TaskHeader>
            <TaskDescription>{task.description}</TaskDescription>
          </StyledTask>
        ))}
    </TasksWrapper>
  );
}

export default memo(TaskCards);
