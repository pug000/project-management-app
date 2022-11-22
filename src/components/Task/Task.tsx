import React from 'react';
import Button from 'components/Button/Button';
import theme from 'styles/theme';
import { RiCloseFill } from 'react-icons/ri';
import {
  TaskWrapper,
  TaskHeader,
  TaskHeaderButton,
  TaskTitle,
  TaskContainer,
} from './Task.style';

interface ColumnProps {
  title: string;
  children?: React.ReactNode;
}

function Task({ title, children }: ColumnProps) {
  return (
    <TaskWrapper>
      <TaskHeader>
        <TaskTitle>{title}</TaskTitle>
        <TaskHeaderButton>
          <Button
            type="button"
            width={theme.fontSizes.text}
            backgroundColor={theme.colors.transparent}
            color={theme.colors.darkBlue}
            callback={() => console.log('delete task')}
          >
            <RiCloseFill />
          </Button>
        </TaskHeaderButton>
      </TaskHeader>
      <TaskContainer>{children}</TaskContainer>
    </TaskWrapper>
  );
}

Task.defaultProps = {
  children: undefined,
};

export default Task;
