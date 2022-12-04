import styled from 'styled-components';

interface DragProps {
  $isDragging?: boolean;
}

const ColumnWrapper = styled.div`
  display: flex;
  overflow: auto;
  width: 100%;
  gap: 25px;
  height: calc(100vh - 430px);

  @media (max-width: 800px) {
    height: calc(100vh - 320px);
  }

  &::-webkit-scrollbar {
    width: 16px;
    background-color: ${({ theme }) => theme.colors.backgroundGrey};
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.backgroundWhite};
    border-radius: 16px;
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

const ColumnContainer = styled.div<DragProps>`
  min-width: 300px;
  max-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  border-left: 5px solid
    ${({ $isDragging, theme }) =>
      $isDragging ? theme.colors.primaryColor : theme.colors.grey};
  box-shadow: 0px 10px 13px rgb(0 0 0 / 2%);
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  cursor: default;

  @media (max-width: 400px) {
    min-width: 270px;
  }

  @media (max-width: 360px) {
    min-width: 240px;
  }
`;

const ColumnHeader = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const ColumnTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-family: ${({ theme }) => theme.fonts.title};
  text-align: left;
`;

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

export { ColumnWrapper, ColumnContainer, ColumnHeader, ColumnTitle, TasksWrapper };
