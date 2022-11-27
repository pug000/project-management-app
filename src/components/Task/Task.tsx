import React, { useState } from 'react';
import Button from 'components/Button/Button';
import theme from 'styles/theme';
import { AiFillDelete } from 'react-icons/ai';
import {
  TaskWrapper,
  TaskHeader,
  TaskHeaderButton,
  TaskTitle,
  TaskContainer,
} from './Task.style';

interface TaskProps {
  title: string;
  text?: string;
  backgroundColor?: string;
}

function Task({ title, text, backgroundColor }: TaskProps) {
  const [task, setTask] = useState(text);
  const textareaChangedHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedTextarea = event.target.value;
    setTask(updatedTextarea);
  };

  return (
    <TaskWrapper $backgroundColor={backgroundColor}>
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
            <AiFillDelete />
          </Button>
        </TaskHeaderButton>
      </TaskHeader>
      <TaskContainer value={task} onChange={(event) => textareaChangedHandler(event)} />
    </TaskWrapper>
  );
}

Task.defaultProps = {
  text: undefined,
  backgroundColor: theme.colors.pink,
};

export default Task;
