import styled from 'styled-components';

const TaskWrapper = styled.div`
  width: 200px;
  min-height: 100px;
  max-height: 200px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.red};
  cursor: pointer;
`;

const TaskHeader = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: ${({ theme }) => theme.effects.transition};
`;

const TaskHeaderButton = styled.div`
  opacity: ${({ theme }) => theme.effects.activeOpacity};
`;

const TaskTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.text};
  font-family: ${({ theme }) => theme.fonts.title};
  text-align: left;
`;

const TaskContainer = styled.div`
  width: 100%;
  max-height: auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export { TaskWrapper, TaskHeader, TaskHeaderButton, TaskTitle, TaskContainer };
