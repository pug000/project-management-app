import styled from 'styled-components';

const ColumnWrapper = styled.div`
  display: flex;
  overflow: auto;
  width: 100%;
  height: 61vh;
  gap: 25px;
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

const ColumnTaskContainer = styled.div`
  width: 100%;
  height: 65vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export {
  ColumnWrapper,
  ColumnsContainer,
  ColumnHeader,
  ColumnTitle,
  ColumnTaskContainer,
};
