import React, { memo } from 'react';

import Button from 'components/Button/Button';

import { useGetAllTasksQuery } from 'redux/api/tasksApiSlice';

import theme from 'styles/theme';
import {
  Task,
  TaskHeader,
  TaskTitle,
  TasksWrapper,
  StyledRemoveIcon,
  TaskDescription,
} from './TaskCards.style';

interface TasksCardsProps {
  boardId: string;
  columnId: string;
}

function TaskCards({ boardId, columnId }: TasksCardsProps) {
  const { data: tasks } = useGetAllTasksQuery({ boardId, columnId });

  return (
    <TasksWrapper>
      {tasks &&
        tasks.map((task) => (
          <Task key={task._id} $backgroundColor={task.color}>
            <TaskHeader>
              <TaskTitle>{task.title}</TaskTitle>
              <Button
                type="button"
                width={theme.fontSizes.text}
                backgroundColor={theme.colors.transparent}
              >
                <StyledRemoveIcon />
              </Button>
            </TaskHeader>
            <TaskDescription>{task.description}</TaskDescription>
          </Task>
        ))}
    </TasksWrapper>
  );
}

export default memo(TaskCards);
