import styled from 'styled-components';
import { MainWrapper } from 'styles/styles';

const ColumnWrapper = styled(MainWrapper)`
  flex-direction: row;
  justify-content: space-evenly;
  background-color: ${({ theme }) => theme.colors.backgroundGrey};
  padding: 10px 0;
`;

const ColumnsContainer = styled.div`
  max-width: 300px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  border-left: 5px solid ${({ theme }) => theme.colors.grey};
  box-shadow: 0px 10px 13px rgb(0 0 0 / 2%);
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  cursor: pointer;
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

const ColumnHeaderButtonWrapper = styled.div`
  display: flex;
  gap: 5px;

  button {
    padding: 0;
  }
`;

const ColumnHeaderButton = styled.button.attrs({
  type: 'button',
})`
  border: none;
  outline: none;
  background-color: ${({ theme }) => theme.colors.transparent};
  cursor: pointer;
  transition: ${({ theme }) => theme.effects.transition};

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }

  &:focus {
    outline: none;
  }

  &:active {
    opacity: ${({ theme }) => theme.effects.activeOpacity};
  }
`;

const IconWrapper = styled.div`
  width: 25px;
  height: 25px;

  svg {
    width: 100%;
    height: 100%;
  }
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
  ColumnsContainer,
  ColumnHeader,
  ColumnHeaderButtonWrapper,
  ColumnHeaderButton,
  ColumnTitle,
  IconWrapper,
  ColumnTaskContainer,
};
