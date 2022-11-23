import styled from 'styled-components';

const ColumnHeaderButton = styled.div`
  transition: ${({ theme }) => theme.effects.transition};
  opacity: 0;
`;

const ColumnWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  cursor: pointer;
  &:hover ${ColumnHeaderButton} {
    opacity: ${({ theme }) => theme.effects.activeOpacity};
  }
`;

const ColumnHeader = styled.div`
  min-width: 100%;
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
