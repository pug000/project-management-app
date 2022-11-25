import styled from 'styled-components';
import { MdOutlineDelete } from 'react-icons/md';

import { IconsProps } from 'ts/interfaces';

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
`;

const ProjectControlsWrapper = styled.div`
  display: flex;
  gap: 10px;

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
  font-size: ${({ theme }) => theme.fontSizes.h2};
  color: ${({ theme }) => theme.colors.title};

  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.h3};
  }
`;

const ProjectDescription = styled.p`
  align-self: flex-start;
  margin-bottom: 15px;
`;

const ProjectContainer = styled.section`
  display: flex;
  justify-content: center;
  padding: 20px;
  width: 100%;
  height: 100%;
  gap: 25px;
  background-color: ${({ theme }) => theme.colors.backgroundGrey};
  border-radius: 10px;
`;

const StyledDeleteIcon = styled(MdOutlineDelete).attrs({
  style: {
    width: '100%',
    height: '100%',
  },
})<IconsProps>`
  color: ${({ $isDisabled, theme }) =>
    $isDisabled ? theme.colors.transparent : theme.colors.grey};
  transition: ${({ theme }) => theme.effects.transition};

  &:hover {
    color: ${({ theme }) => theme.colors.pink};
  }
`;

export {
  ProjectControls,
  ProjectControlsWrapper,
  ProjectTitle,
  ProjectDescription,
  ProjectContainer,
  StyledDeleteIcon,
};
