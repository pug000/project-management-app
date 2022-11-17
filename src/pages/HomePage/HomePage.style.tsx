import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { BackgroundColorProps } from 'ts/interfaces';

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.title};
  font-weight: ${({ theme }) => theme.fontsWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.h1};
  color: ${({ theme }) => theme.colors.title};
  margin-bottom: 20px;

  @media (max-width: 1050px) {
    width: 90%;
    text-align: center;
    align-self: center;
  }

  @media (max-width: 600px) {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSizes.h3};
  }
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

const ImageWrapper = styled.div`
  resize: both;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const SubTitle = styled.h5`
  font-weight: ${({ theme }) => theme.fontsWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.h5};
  margin-bottom: 25px;
  color: ${({ theme }) => theme.colors.grey};
`;

const MainPageElement = styled.div<BackgroundColorProps>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  max-width: 350px;
  height: 230px;
  width: 100%;
  padding: 20px;

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

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 40%;

  @media (max-width: 1050px) {
    width: 100%;
    align-items: center;

    ${Text} {
      width: 100%;
      text-align: center;
    }
  }
`;

const Author = styled.a<BackgroundColorProps>`
  display: flex;
  gap: 30px;
  background-color: ${({ theme }) => theme.colors.backgroundGrey};
  max-width: 350px;
  width: 100%;
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
    align-items: flex-start;
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

const TextSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 40px;
  margin-bottom: 40px;
  flex-wrap: wrap;

  @media (max-width: 1050px) {
    flex-direction: column;
    width: 80%;
    align-items: center;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ColumnSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 40px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const PageSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;

  @media (max-width: 1050px) {
    flex-direction: column;
    gap: 40px;
  }
`;

export {
  PageSection,
  TextSection,
  ColumnSection,
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
