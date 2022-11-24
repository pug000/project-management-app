import React from 'react';
import Button from 'components/Button/Button';
import theme from 'styles/theme';
import { AiFillDelete } from 'react-icons/ai';
import {
  ColumnWrapper,
  ColumnHeader,
  ColumnHeaderButton,
  ColumnTitle,
  ColumnTaskContainer,
} from './Column.style';

interface ColumnProps {
  title: string;
  children?: React.ReactNode;
}

function Column({ title, children }: ColumnProps) {
  return (
    <ColumnWrapper>
      <ColumnHeader>
        <ColumnTitle>{title}</ColumnTitle>
        <ColumnHeaderButton>
          <Button
            type="button"
            width={theme.fontSizes.text}
            backgroundColor={theme.colors.transparent}
            color={theme.colors.darkBlue}
            callback={() => console.log('delete column')}
          >
            <AiFillDelete />
          </Button>
        </ColumnHeaderButton>
      </ColumnHeader>
      <Button type="button" callback={() => console.log('add task')}>
        Add task
      </Button>
      <ColumnTaskContainer>{children}</ColumnTaskContainer>
    </ColumnWrapper>
  );
}

Column.defaultProps = {
  children: undefined,
};

export default Column;
