import styled from 'styled-components';

import { BackgroundColorProps } from 'ts/interfaces';

import { AiFillDelete } from 'react-icons/ai';

const TasksWrapper = styled.div`
  width: 100%;
  height: 65vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &::-webkit-scrollbar {
    width: 16px;
    background-color: ${({ theme }) => theme.colors.backgroundWhite};
  }

  &::-webkit-scrollbar-track {
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.backgroundWhite};
  }

  &::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 4px solid ${({ theme }) => theme.colors.backgroundWhite};
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
`;

const StyledTask = styled.div<BackgroundColorProps>`
  width: auto;
  min-height: 100px;
  max-height: 200px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ $backgroundColor, theme }) =>
    $backgroundColor ?? theme.colors.primaryColor};
  transition: ${({ theme }) => theme.effects.transition};
  cursor: pointer;
`;

const TaskHeader = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: ${({ theme }) => theme.effects.transition};

  Button {
    padding: 0;
  }
`;

const TaskTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.text};
  font-family: ${({ theme }) => theme.fonts.title};
  text-align: left;
`;

const TaskDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.text};
  word-wrap: break-word;
  overflow: hidden;
`;

const StyledRemoveIcon = styled(AiFillDelete).attrs({
  styles: {
    width: '100%',
    height: '100%',
  },
})`
  color: ${({ theme }) => theme.colors.backgroundWhite};
`;

export {
  StyledTask,
  TaskHeader,
  TaskTitle,
  TaskDescription,
  TasksWrapper,
  StyledRemoveIcon,
};
