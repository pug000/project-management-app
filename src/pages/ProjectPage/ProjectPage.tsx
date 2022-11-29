import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import useDeleteProject from 'hooks/useDeleteProject';
import useGetProjectById from 'hooks/useGetProjectById';
import useCreateColumn from 'hooks/useCreateColumn';
import useDeleteColumn from 'hooks/useDeleteColumn';
import useGetAllColumns from 'hooks/useGetAllColumns';
import useEditColumnTitle from 'hooks/useEditColumnTitle';

import { setDeleteProjectPopupOpen } from 'redux/slices/projectSlice';
import {
  setCreateColumnPopupOpen,
  setDeleteColumnPopupOpen,
} from 'redux/slices/columnSlice';
import { getLoadingTasksList } from 'redux/selectors/taskSelectors';

import { backButtonAnimation } from 'utils/animations';

import PopupWarning from 'components/PopupWarning/PopupWarning';
import NoResultsContainer from 'components/NoResultsContainer/NoResultsContainer';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Columns from 'components/Columns/Columns';
import PopupWithFormColumnTask from 'components/PopupWithFormColumn/PopupWithFormColumn';

import defaultTheme from 'styles/theme';
import { MainWrapper, StyledPrevIcon, StyledDeleteIcon } from 'styles/styles';
import {
  ProjectButtonWrapper,
  ProjectContainer,
  ProjectControls,
  ProjectControlsWrapper,
  ProjectDescription,
  ProjectTitle,
} from './ProjectPage.style';

function ProjectPage() {
  const isLoadingGetAllTasks = useAppSelector(getLoadingTasksList);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'projectPage' });
  const { selectedProject, isLoadingSelectedProject, isNavigate } = useGetProjectById();
  const { isLoadingDeleteProject, isDeleteProjectPopupOpen, deleteProject, navigate } =
    useDeleteProject(selectedProject);
  const { isCreateColumnPopupOpen, isLoadingCreateColumn, onSubmit } = useCreateColumn();
  const { isLoadingDeleteColumn, isDeleteColumnPopupOpen, deleteColumn } =
    useDeleteColumn();
  const { columns, isLoadingColumnList } = useGetAllColumns();
  const { isLoadingEditColumnTitle } = useEditColumnTitle();
  const isLoadingProjectPage = [
    isLoadingSelectedProject,
    isLoadingColumnList,
    isLoadingDeleteProject,
    isLoadingDeleteColumn,
    isLoadingCreateColumn,
    isLoadingEditColumnTitle,
    isLoadingGetAllTasks,
  ].some((loader) => loader);

  return (
    <MainWrapper>
      <ProjectControls>
        <ProjectControlsWrapper>
          <Button
            type="button"
            width="30px"
            animation={backButtonAnimation}
            backgroundColor={defaultTheme.colors.transparent}
            color={defaultTheme.colors.primaryColor}
            callback={() => navigate(-1)}
          >
            <StyledPrevIcon $isDisabled={isLoadingSelectedProject} />
          </Button>
          <ProjectTitle>{selectedProject?.title}</ProjectTitle>
          {selectedProject && (
            <Button
              type="button"
              width="30px"
              backgroundColor={defaultTheme.colors.transparent}
              color={defaultTheme.colors.pink}
              callback={() => dispatch(setDeleteProjectPopupOpen(true))}
            >
              <StyledDeleteIcon />
            </Button>
          )}
        </ProjectControlsWrapper>
        <ProjectButtonWrapper>
          <Button
            type="button"
            width="130px"
            backgroundColor={defaultTheme.colors.transparent}
            color={defaultTheme.colors.primaryColor}
            callback={() => dispatch(setCreateColumnPopupOpen(true))}
          >
            {t('newColumnButton')}
          </Button>
        </ProjectButtonWrapper>
      </ProjectControls>
      <ProjectDescription>{selectedProject?.description}</ProjectDescription>
      <ProjectContainer>
        {columns?.length ? (
          <Columns columns={columns} />
        ) : (
          <NoResultsContainer
            text="projectPage.emptyContainerText"
            buttonText="projectPage.emptyContainerButton"
            setPopupShown={setCreateColumnPopupOpen}
          />
        )}
      </ProjectContainer>
      <PopupWarning
        isPopupShown={isDeleteProjectPopupOpen}
        setPopupShown={setDeleteProjectPopupOpen}
        text="deleteProject"
        actionOnYes={deleteProject}
      />
      <PopupWarning
        isPopupShown={isDeleteColumnPopupOpen}
        setPopupShown={setDeleteColumnPopupOpen}
        text="deleteColumn"
        actionOnYes={deleteColumn}
      />
      <PopupWithFormColumnTask
        isPopupShown={isCreateColumnPopupOpen}
        setPopupShown={setCreateColumnPopupOpen}
        keyPrefix="editColumnForm"
        title="newColumnTitle"
        onSubmit={onSubmit}
      />
      {isLoadingProjectPage && <Loader />}
      {isNavigate && <Navigate to="*" />}
    </MainWrapper>
  );
}

export default ProjectPage;
