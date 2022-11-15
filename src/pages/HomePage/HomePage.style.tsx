import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { BackgroundColorProps } from 'ts/interfaces';

const PageSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.title};
  font-weight: ${({ theme }) => theme.fontsWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.h1};
  color: ${({ theme }) => theme.colors.title};
  margin-bottom: 20px;
`;

const TextWrapper = styled.div`
  width: 40%;
`;

const Text = styled.p`
  width: 85%;
  margin-bottom: 25px;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textButton};
  display: inline-block;
`;

const ImageWrapper = styled.div``;

const SubTitle = styled.h5`
  font-weight: ${({ theme }) => theme.fontsWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.h5};
  margin-bottom: 25px;
  color: ${({ theme }) => theme.colors.grey};
`;

const MainPageElement = styled.div<BackgroundColorProps>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  width: 25%;
  padding: 20px;
  align-self: stretch;

  svg {
    transform: scale(1.5);
    margin-left: 5px;
    margin-top: 5px;
  }
`;

const ElementTitle = styled.h4`
  font-family: ${({ theme }) => theme.fonts.title};
  font-weight: ${({ theme }) => theme.fontsWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.h4};
  margin: 20px 0;
`;

const Author = styled.a<BackgroundColorProps>`
  display: flex;
  gap: 30px;
  background-color: ${({ theme }) => theme.colors.backgroundGrey};
  width: 25%;
  padding: 20px;
  align-self: stretch;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.effects.transition};

  &:hover {
    box-shadow: 0px 10px 13px ${({ $backgroundColor }) => $backgroundColor};
  }

  &:hover h5 {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }

  ${TextWrapper} {
    width: 80%;
  }

  ${ImageWrapper} {
    width: 30%;

    img {
      width: 100%;
      object-fit: cover;
      border-radius: 3px;
    }
  }
`;

const AuthorName = styled.h5`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  transition: ${({ theme }) => theme.effects.transition};
`;

const AuthorDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.smallText};
`;

export {
  PageSection,
  TextWrapper,
  Title,
  Text,
  Link,
  SubTitle,
  ImageWrapper,
  MainPageElement,
  ElementTitle,
  Author,
  AuthorName,
  AuthorDescription,
};
