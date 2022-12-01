import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'hooks/useRedux';

import {
  setSelectedProject,
  setDeleteProjectPopupOpen,
  setEditProjectPopupOpen,
} from 'redux/slices/projectSlice';

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
  CardOwnerWrapper,
  CardOwner,
  CardOwnerName,
} from './ProjectCards.style';

interface ProjectCardsProps {
  projects: Project[];
}

function ProjectCards({ projects }: ProjectCardsProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'projects' });

  const deleteProjectOnClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, project: Project) => {
      event.preventDefault();
      dispatch(setSelectedProject(project));
      dispatch(setDeleteProjectPopupOpen(true));
    },
    []
  );

  const editProjectOnClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, project: Project) => {
      event.preventDefault();
      dispatch(setSelectedProject(project));
      dispatch(setEditProjectPopupOpen(true));
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
            <CardOwnerWrapper>
              <CardOwner>
                {t('projectOwner')} <CardOwnerName>{project.owner}</CardOwnerName>
              </CardOwner>
            </CardOwnerWrapper>
          </Card>
        </StyledLink>
      ))}
    </CardsWrapper>
  );
}

export default memo(ProjectCards);
