import styled from 'styled-components';

const ProjectControls = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
  gap: 50px;

  Button {
    margin-top: 6px;
  }

  @media (max-width: 530px) {
    gap: 10px;
  }
`;

const ProjectControlsWrapper = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: hidden;

  Button {
    padding: 0;

    &:nth-child(3) {
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const ProjectTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.title};
  font-weight: ${({ theme }) => theme.fontsWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.h3};
  color: ${({ theme }) => theme.colors.title};
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.h3};
  }
`;

const ProjectButtonWrapper = styled.div`
  display: flex;
`;

const ProjectDescription = styled.p`
  align-self: flex-start;
  margin-bottom: 15px;
  word-break: break-all;
`;

const ProjectContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 100%;
  overflow-y: none;
  background-color: ${({ theme }) => theme.colors.backgroundGrey};
  border-radius: 10px;

  @media (max-width: 800px) {
    margin-bottom: 20px;
  }
`;

export {
  ProjectControls,
  ProjectControlsWrapper,
  ProjectTitle,
  ProjectDescription,
  ProjectContainer,
  ProjectButtonWrapper,
};
