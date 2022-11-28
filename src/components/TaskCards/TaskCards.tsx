import React, { memo } from 'react';

import Button from 'components/Button/Button';

import theme from 'styles/theme';
import {
  Task,
  TaskHeader,
  TaskTitle,
  TasksWrapper,
  StyledRemoveIcon,
  TaskDescription,
} from './TaskCards.style';

function TaskCards() {
  return (
    <TasksWrapper>
      <Task $backgroundColor={theme.colors.primaryColor}>
        <TaskHeader>
          <TaskTitle>dsadasdas</TaskTitle>
          <Button
            type="button"
            width={theme.fontSizes.text}
            backgroundColor={theme.colors.transparent}
          >
            <StyledRemoveIcon />
          </Button>
        </TaskHeader>
        <TaskDescription />
      </Task>
    </TasksWrapper>
  );
}

export default memo(TaskCards);
