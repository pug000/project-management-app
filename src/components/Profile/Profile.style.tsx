import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 40%;
  gap: 45px;
  background-color: ${({ theme }) => theme.colors.backgroundGrey};
  border-radius: 10px;
  justify-content: space-around;

  @media (max-width: 900px) {
    max-width: 500px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.backgroundGrey};
    padding: 50px 20px;
    border-radius: 10px;
  }
`;

const ProfileMainContent = styled.div`
  display: flex;
  gap: 45px;
  flex-direction: column;
`;

const ProfileTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.title};
  font-weight: ${({ theme }) => theme.fontsWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.h2};
  color: ${({ theme }) => theme.colors.title};
  align-self: center;

  @media (max-width: 360px) {
    font-size: ${({ theme }) => theme.fontSizes.h3};
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ProfileTextWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const ProfileText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  &:first-child {
    min-width: 95px;
  }

  &:nth-child(2) {
    width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export {
  ProfileMainContent,
  ProfileTitle,
  ProfileContainer,
  ProfileWrapper,
  ProfileTextWrapper,
  ProfileText,
  ButtonWrapper,
};
