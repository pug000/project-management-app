import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
  sticky?: boolean;
}

const HeaderWrapper = styled.header<HeaderProps>`
  background-color: ${({ sticky, theme }) =>
    sticky ? theme.colors.backgroundBlue : theme.colors.backgroundWhite};
  position: sticky;
  top: 0px;
  margin-bottom: 20px;
  transition: ${({ theme }) => theme.effects.transition};
  z-index: 3;
`;

const HeaderContainer = styled.div`
  grid-area: subHeader;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const HeaderContainerElements = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

const HeaderLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.smallText};

  &.active {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }

  &#signOut.active {
    opacity: 1;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderLinkElement = styled.div`
  transition: ${({ theme }) => theme.effects.transition};
  padding: 15px 5px;

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

export {
  HeaderWrapper,
  HeaderContainer,
  HeaderContainerElements,
  HeaderLink,
  HeaderLinkElement,
};
