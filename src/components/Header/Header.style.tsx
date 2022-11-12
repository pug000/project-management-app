import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { HeaderProps } from 'ts/interfaces';

const HeaderWrapper = styled.header<HeaderProps>`
  background-color: ${({ $backgroundColor, theme }) =>
    $backgroundColor ?? theme.colors.backgroundWhite};
  position: sticky;
  top: 0px;
  transition: all 0.7s ease;
`;

const HeaderContainer = styled.div`
  grid-area: subHeader;
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const HeaderContainerElements = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const HeaderLink = styled(NavLink)`
  text-decoration: none;
`;

export { HeaderWrapper, HeaderContainer, HeaderContainerElements, HeaderLink };
