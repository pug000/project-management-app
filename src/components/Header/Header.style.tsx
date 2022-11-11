import styled from 'styled-components';

const HeaderContainer = styled.header`
  height: 75px;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const HeaderContainerElements = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export { HeaderContainer, HeaderContainerElements };
