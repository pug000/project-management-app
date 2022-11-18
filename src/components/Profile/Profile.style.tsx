import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 25px;
  width: 40%;
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
  &:first-child {
    min-width: 95px;
  }

  &:nth-child(2) {
    width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: flex-start;
  align-self: flex-start;
  gap: 15px;
`;

export {
  ProfileContainer,
  ProfileWrapper,
  ProfileTextWrapper,
  ProfileText,
  ButtonWrapper,
};
