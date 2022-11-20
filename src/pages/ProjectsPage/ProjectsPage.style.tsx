import styled from 'styled-components';

const ProjectsControls = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
`;

const ProjectsTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.title};
  font-weight: ${({ theme }) => theme.fontsWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.h2};
  color: ${({ theme }) => theme.colors.title};
`;

const ProjectsContainer = styled.section`
  display: flex;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 100%;
  gap: 25px;
  background-color: ${({ theme }) => theme.colors.backgroundGrey};
  border-radius: 10px;
`;

export { ProjectsControls, ProjectsTitle, ProjectsContainer };
