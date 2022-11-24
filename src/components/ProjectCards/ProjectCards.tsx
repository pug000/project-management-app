import React, { memo, useCallback } from 'react';

import { useAppDispatch } from 'hooks/useRedux';

import { setSelectedProject } from 'redux/slices/projectSlice';
import { setDeletePopupOpen } from 'redux/slices/popupSlice';
import { useGetAllColumnsQuery } from 'redux/api/columnApiSlice';

import { projectIconsList } from 'utils/constants';

import { Project } from 'ts/interfaces';

import Column from 'components/Column/Column';
import Loader from 'components/Loader/Loader';

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
  const { data: columns, isLoading: isColumnListLoading } =
    useGetAllColumnsQuery(undefined);

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
            {/* {isColumnListLoading && <Loader />}
            {columns?.length && <Column columns={columns} />} */}
          </Card>
        </StyledLink>
      ))}
    </CardsWrapper>
  );
}

export default memo(ProjectCards);
