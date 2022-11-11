import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const HeaderContainer = styled.header`
  height: 75px;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px;
  position: sticky;
`;

const HeaderContainerElements = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const HeaderLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
`;

export { HeaderContainer, HeaderContainerElements, HeaderLink };
