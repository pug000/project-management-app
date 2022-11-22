import styled from 'styled-components';

const ProjectsControls = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;

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

// const ProjectsContainer = styled.section`
//   padding: 20px;
//   width: 100%;
//   height: 100%;
//   gap: 25px;
//   background-color: ${({ theme }) => theme.colors.backgroundGrey};
//   border-radius: 10px;
//   display: grid;
//   grid-template-columns: repeat(auto-fit, 300px);
//   justify-content: flex-start;
//   align-items: flex-start;
//   align-content: flex-start;
//   justify-items: center;

//   ${StyledLink} {
//     max-width: 300px;
//     width: 100%;

//     &:hover {
//       opacity: 1;
//     }
//   }
// `;

// const NoResultsSection = styled.section`
//   display: flex;
//   justify-content: center;
//   padding: 20px;
//   width: 100%;
//   height: 100%;
//   gap: 25px;
//   background-color: ${({ theme }) => theme.colors.backgroundGrey};
//   border-radius: 10px;
// `;

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
