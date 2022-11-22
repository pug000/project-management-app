import React, { memo, useCallback } from 'react';

import { useAppDispatch } from 'hooks/useRedux';

import { setSelectedProject } from 'redux/slices/projectSlice';
import { setDeletePopupOpen } from 'redux/slices/popupSlice';

import { projectIconsList } from 'utils/constants';

import { Project } from 'ts/interfaces';

import { StyledLink } from 'styles/styles';
import {
  Card,
  CardButton,
  CardButtonWrapper,
  CardDescription,
  CardDescriptionWrapper,
  CardHeader,
  CardsWrapper,
  CardTitle,
  IconWrapper,
} from './ProjectCards.style';

interface ProjectCardsProps {
  projects: Project[];
}

function ProjectCards({ projects }: ProjectCardsProps) {
  const dispatch = useAppDispatch();

  const editOrDeleteProjectOnClick = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      id: number,
      project: Project
    ) => {
      event.preventDefault();
      dispatch(setSelectedProject(project));

      if (id === 2) {
        dispatch(setDeletePopupOpen(true));
      }
    },
    []
  );

  return (
    <CardsWrapper>
      {projects.map((project) => (
        <StyledLink key={project._id} to={`/projects/${project._id}`}>
          <Card>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardButtonWrapper>
                {projectIconsList.map(({ id, icon }) => (
                  <CardButton
                    key={id}
                    onClick={(event) => editOrDeleteProjectOnClick(event, id, project)}
                  >
                    <IconWrapper>{icon}</IconWrapper>
                  </CardButton>
                ))}
              </CardButtonWrapper>
            </CardHeader>
            <CardDescriptionWrapper>
              <CardDescription>{project.description}</CardDescription>
            </CardDescriptionWrapper>
          </Card>
        </StyledLink>
      ))}
    </CardsWrapper>
  );
}

export default memo(ProjectCards);
