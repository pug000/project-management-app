import styled from 'styled-components';

const ColumnWrapper = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  cursor: pointer;
`;

const ColumnHeaderButton = styled.div`
  opacity: ${({ theme }) => theme.effects.activeOpacity};
`;

const ColumnHeader = styled.div`
  min-width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: ${({ theme }) => theme.effects.transition};
`;

const ColumnTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-family: ${({ theme }) => theme.fonts.title};
  text-align: left;
`;

const ColumnTaskContainer = styled.div`
  width: 100%;
  min-height: 600px;
  max-height: 1000px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export {
  ColumnWrapper,
  ColumnHeader,
  ColumnHeaderButton,
  ColumnTitle,
  ColumnTaskContainer,
};
