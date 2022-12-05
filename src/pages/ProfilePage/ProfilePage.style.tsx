import styled from 'styled-components';

const ProfileSection = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  gap: 40px;
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 500px;
  gap: 10px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const ImageWrapper = styled.div`
  &:not(:nth-child(2)) {
    align-self: flex-start;
  }

  &:nth-child(2) {
    align-self: flex-end;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

export { ProfileSection, ImagesContainer, ImageWrapper };
