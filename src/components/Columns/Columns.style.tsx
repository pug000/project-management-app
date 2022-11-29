import styled from 'styled-components';

const ColumnWrapper = styled.div`
  display: flex;
  overflow: auto;
  width: 100%;
  height: 61vh;
  gap: 25px;

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

const ColumnsContainer = styled.div`
  min-width: 300px;
  max-width: 300px;
  width: 100%;
  height: 58vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  border-left: 5px solid ${({ theme }) => theme.colors.grey};
  box-shadow: 0px 10px 13px rgb(0 0 0 / 2%);
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  cursor: default;
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

export { ColumnWrapper, ColumnsContainer, ColumnHeader, ColumnTitle };
