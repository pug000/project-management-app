import React, { memo, useCallback } from 'react';

import { useAppDispatch } from 'hooks/useRedux';

import { setSelectedProject } from 'redux/slices/projectSlice';
import { setDeletePopupOpen } from 'redux/slices/popupSlice';
import { useGetAllColumnsQuery } from 'redux/api/columnApiSlice';

import { Project } from 'ts/interfaces';

<<<<<<< HEAD
import Column from 'components/Column/Column';
import Loader from 'components/Loader/Loader';
=======
import { MdOutlineDelete } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
>>>>>>> c418d9d847a688669072d2633898b7c2c12b6f85

import { StyledLink } from 'styles/styles';
import defaultTheme from 'styles/theme';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit/dist/createAction';
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
  const { data: columns, isLoading: isColumnListLoading } =
    useGetAllColumnsQuery(undefined);

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
                    <BiEdit color={defaultTheme.colors.grey} />
                  </IconWrapper>
                </CardButton>
                <CardButton onClick={(event) => deleteProjectOnClick(event, project)}>
                  <IconWrapper>
                    <MdOutlineDelete color={defaultTheme.colors.pink} />
                  </IconWrapper>
                </CardButton>
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
