import React, { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { getLoggedIn } from 'redux/selectors/userSelectors';
import { setCreationPopupOpen, setDeletePopupOpen } from 'redux/slices/popupSlice';
import { setSelectedColumn } from 'redux/slices/columnSlice';
import { useGetAllColumnsQuery, useCreateColumnMutation } from 'redux/api/columnApiSlice';
import { useGetProjectByIdQuery } from 'redux/api/projectsApiSlice';

import Button from 'components/Button/Button';
import Task from 'components/Task/Task';
import PopupWithForm from 'components/PopupWithForm/PopupWithForm';

import { BiEdit } from 'react-icons/bi';
import { MdOutlineDelete } from 'react-icons/md';
import defaultTheme from 'styles/theme';

import { MainWrapper } from 'styles/styles';
import { ProjectsControls, ProjectsTitle } from 'pages/ProjectsPage/ProjectsPage.style';
import {
  ColumnWrapper,
  ColumnsContainer,
  ColumnHeader,
  ColumnHeaderButtonWrapper,
  ColumnHeaderButton,
  ColumnTitle,
  ColumnTaskContainer,
  IconWrapper,
} from './ColumnContainer.style';

function ColumnContainer() {
  const isLoggedIn = useAppSelector(getLoggedIn);
  const { t } = useTranslation('translation', { keyPrefix: 'columnContainer' });
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data: columns, isFetching: isColumnListLoading } = useGetAllColumnsQuery(
    id ?? '',
    { skip: !id && !isLoggedIn }
  );
  const { data: project, isFetching: isProjectByIdLoading } = useGetProjectByIdQuery(
    id ?? '',
    { skip: !id && !isLoggedIn }
  );

  // const { isCreationPopupOpen, isCreationLoading, onSubmit } = useCreateColumnMutation(
  //   id ?? '',
  //   { skip: !id && !isLoggedIn }
  // );

  return (
    <MainWrapper>
      <ProjectsControls>
        {project && <ProjectsTitle>{project.title}</ProjectsTitle>}
        <Button
          type="button"
          width="130px"
          backgroundColor={defaultTheme.colors.transparent}
          color={defaultTheme.colors.primaryColor}
          callback={() => dispatch(setCreationPopupOpen(true))}
        >
          {t('newColumnButton')}
        </Button>
      </ProjectsControls>
      <ColumnWrapper>
        {columns?.length &&
          columns.map((column) => (
            <ColumnsContainer key={column._id}>
              <ColumnHeader>
                <ColumnTitle>{column.title}</ColumnTitle>
                <ColumnHeaderButtonWrapper>
                  <ColumnHeaderButton onClick={() => console.log('edit')}>
                    <IconWrapper>
                      <BiEdit color={defaultTheme.colors.grey} />
                    </IconWrapper>
                  </ColumnHeaderButton>
                  <ColumnHeaderButton onClick={(event) => console.log('del')}>
                    <IconWrapper>
                      <MdOutlineDelete color={defaultTheme.colors.pink} />
                    </IconWrapper>
                  </ColumnHeaderButton>
                </ColumnHeaderButtonWrapper>
              </ColumnHeader>
              <Button type="button" callback={() => console.log('add task')}>
                Add task
              </Button>
              <ColumnTaskContainer>
                <Task title="hello" />
              </ColumnTaskContainer>
            </ColumnsContainer>
          ))}
      </ColumnWrapper>
      {/* <PopupWithForm
        isPopupShown={isCreationPopupOpen}
        setPopupShown={setCreationPopupOpen}
        keyPrefix="editProjectForm"
        formTitleText="newProjectTitle"
        onSubmit={onSubmit}
      /> */}
    </MainWrapper>
  );
}

export default memo(ColumnContainer);
