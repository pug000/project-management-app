import styled from 'styled-components';
import { StyledLink } from 'styles/styles';

const CardsWrapper = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
  gap: 25px;
  background-color: ${({ theme }) => theme.colors.backgroundGrey};
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: space-around;

  ${StyledLink} {
    max-width: 300px;
    width: 100%;
    height: 100%;
    display: flex;

    &:hover {
      opacity: 1;
    }
  }

  @media (max-width: 380px) {
    grid-template-columns: repeat(auto-fill, 260px);

    ${StyledLink} {
      max-width: 260px;
    }
  }
`;

const Card = styled.div`
  width: 100%;
  min-height: 185px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  padding: 20px;
  border-radius: 10px;
  border-left: 5px solid ${({ theme }) => theme.colors.primaryColor};
  box-shadow: 0px 10px 13px rgba(0, 0, 0, 0.02);
  transition: ${({ theme }) => theme.effects.transition};
  text-align: left;
  gap: 10px;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    opacity: 1;
    box-shadow: 0px 10px 13px rgba(0, 0, 0, 0.07);
  }
`;

const CardHeader = styled.div`
  display: flex;
  gap: 10px;
`;

const CardButtonWrapper = styled.div`
  display: flex;
  gap: 5px;

  button {
    padding: 0;
  }
`;

const CardButton = styled.button.attrs({
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
`;

const CardTitle = styled.h5`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-family: ${({ theme }) => theme.fonts.text};
  font-weight: ${({ theme }) => theme.fontsWeight.bold};
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const CardDescriptionWrapper = styled.div`
  display: flex;
`;

const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.text};
  word-wrap: break-word;
  overflow: hidden;
`;

const CardOwnerWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.smallNoteText};
  word-break: break-word;
  overflow: hidden;
`;

const CardOwner = styled.p`
  font-style: italic;
  color: ${({ theme }) => theme.colors.grey};
`;

const CardOwnerName = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.backgroundGrey};
  padding: 0 7px 0 5px;
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.primaryColor};
`;

export {
  CardsWrapper,
  Card,
  CardHeader,
  CardButtonWrapper,
  CardButton,
  CardTitle,
  CardDescriptionWrapper,
  CardDescription,
  IconWrapper,
  CardOwnerWrapper,
  CardOwner,
  CardOwnerName,
};
