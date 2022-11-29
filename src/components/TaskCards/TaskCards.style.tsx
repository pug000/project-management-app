import styled from 'styled-components';

import { BackgroundColorProps } from 'ts/interfaces';

import { IoClose } from 'react-icons/io5';

const TasksWrapper = styled.div`
  width: 100%;
  height: 100%;
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
  cursor: grab;
  gap: 5px;

  &:active {
    cursor: grabbing;
  }
`;

const TaskHeader = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: ${({ theme }) => theme.effects.transition};
  gap: 20px;
`;

const TaskButton = styled.button.attrs({
  type: 'button',
})`
  background-color: ${({ theme }) => theme.colors.transparent};
  border: none;
  outline: none;
  min-width: 25px;
  transition: ${({ theme }) => theme.effects.transition};
  cursor: pointer;

  &:hover:enabled {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }

  &:active:enabled {
    opacity: ${({ theme }) => theme.effects.activeOpacity};
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

const TaskTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.text};
  font-family: ${({ theme }) => theme.fonts.title};
  text-align: left;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: ${({ theme }) => theme.effects.transition};

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.backgroundWhite};
    text-decoration: underline;
  }
`;

const TaskDescriptionWrapper = styled.div`
  display: flex;
`;

const TaskDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.smallText};
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledRemoveIcon = styled(IoClose)`
  color: ${({ theme }) => theme.colors.backgroundWhite};
`;

export {
  StyledTask,
  TaskHeader,
  TaskTitle,
  TaskDescriptionWrapper,
  TaskDescription,
  TasksWrapper,
  TaskButton,
  StyledRemoveIcon,
};
