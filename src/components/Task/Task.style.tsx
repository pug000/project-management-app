import styled from 'styled-components';
import { BackgroundColorProps } from 'ts/interfaces';

const TaskHeaderButton = styled.div`
  transition: ${({ theme }) => theme.effects.transition};
  opacity: 0;
`;

const TaskWrapper = styled.div<BackgroundColorProps>`
  width: auto;
  min-height: 100px;
  max-height: 200px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  transition: ${({ theme }) => theme.effects.transition};
  cursor: pointer;

  &:hover ${TaskHeaderButton} {
    opacity: ${({ theme }) => theme.effects.activeOpacity};
  }
`;

const TaskHeader = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: ${({ theme }) => theme.effects.transition};
`;

const TaskTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.text};
  font-family: ${({ theme }) => theme.fonts.title};
  text-align: left;
`;

const TaskContainer = styled.textarea`
  width: 100%;
  min-height: 50px;
  max-height: 200px;
  /* overflow-y: auto; */
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.transparent};
  outline: none;
  color: inherit;
  resize: none;
  border: none;
  font-family: inherit;
`;

export { TaskWrapper, TaskHeader, TaskHeaderButton, TaskTitle, TaskContainer };
