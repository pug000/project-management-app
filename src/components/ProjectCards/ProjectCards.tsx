import React, { memo, useCallback } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit/dist/createAction';

import { useAppDispatch } from 'hooks/useRedux';

import { setSelectedProject } from 'redux/slices/projectSlice';
import { setDeletePopupOpen } from 'redux/slices/popupSlice';

import { Project } from 'ts/interfaces';

import { StyledDeleteIcon, StyledEditIcon, StyledLink } from 'styles/styles';
import defaultTheme from 'styles/theme';
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
  setEditPopupOpen: ActionCreatorWithPayload<boolean, 'popup/setEditPopupOpen'>;
}

function ProjectCards({ projects, setEditPopupOpen }: ProjectCardsProps) {
  const dispatch = useAppDispatch();

  const deleteProjectOnClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, project: Project) => {
      event.preventDefault();
      dispatch(setSelectedProject(project));
      dispatch(setDeletePopupOpen(true));
    },
    []
  );

  const editProjectOnClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, project: Project) => {
      event.preventDefault();
      dispatch(setSelectedProject(project));
      dispatch(setEditPopupOpen(true));
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
                <CardButton onClick={(event) => editProjectOnClick(event, project)}>
                  <IconWrapper>
                    <StyledEditIcon />
                  </IconWrapper>
                </CardButton>
                <CardButton onClick={(event) => deleteProjectOnClick(event, project)}>
                  <IconWrapper>
                    <StyledDeleteIcon $color={defaultTheme.colors.pink} />
                  </IconWrapper>
                </CardButton>
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
