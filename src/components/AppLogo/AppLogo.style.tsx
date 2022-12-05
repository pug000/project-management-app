import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const AppLogoWrapper = styled.div`
  width: 160px;

  @media (max-width: 375px) {
    width: 140px;
  }
`;

const AppLogoLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
`;

const AppLogoText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  font-weight: ${({ theme }) => theme.fontsWeight.bold};
`;

const LogoWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding-left: 7px;

  @media (max-width: 375px) {
    padding-left: 0;
  }
`;

const AppLogoNote = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.smallNoteText};
  margin-top: 2px;
  color: ${({ theme }) => theme.colors.grey};

  @media (max-width: 375px) {
    font-size: 11px;
  }
`;

export { AppLogoWrapper, AppLogoLink, AppLogoText, LogoWrapper, AppLogoNote };
