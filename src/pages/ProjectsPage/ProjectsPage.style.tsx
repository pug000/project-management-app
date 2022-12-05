import styled from 'styled-components';

const ProjectsControls = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;

  @media (max-width: 600px) {
    flex-wrap: wrap;
  }

  Button {
    margin-top: 6px;
  }
`;

const ProjectsTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.title};
  font-weight: ${({ theme }) => theme.fontsWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.h2};
  color: ${({ theme }) => theme.colors.title};

  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.h3};
  }
`;

const ProjectsContainer = styled.section`
  display: flex;
  justify-content: center;
  padding: 20px;
  width: 100%;
  height: 100%;
  gap: 25px;
  background-color: ${({ theme }) => theme.colors.backgroundGrey};
  border-radius: 10px;
`;

export { ProjectsControls, ProjectsTitle, ProjectsContainer };
