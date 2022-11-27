import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';

import { useAppDispatch } from 'hooks/useRedux';
import useDeleteProject from 'hooks/useDeleteProject';
import useGetProjectById from 'hooks/useGetProjectById';
import useCreateColumn from 'hooks/useCreateColumn';
import useDeleteColumn from 'hooks/useDeleteColumn';

import {
  setCreationPopupOpen,
  setDeleteColumnPopupOpen,
  setDeleteProjectPopupOpen,
} from 'redux/slices/popupSlice';

import { backButtonAnimation } from 'utils/animations';

import PopupWarning from 'components/PopupWarning/PopupWarning';
import NoResultsContainer from 'components/NoResultsContainer/NoResultsContainer';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import ColumnContainer from 'components/ColumnContainer/ColumnContainer';
import PopupWithFormColumnTask from 'components/PopupWithFormColumn/PopupWithFormColumn';

import defaultTheme from 'styles/theme';
import { MainWrapper, StyledPrevIcon, StyledDeleteIcon } from 'styles/styles';

import useGetAllColumns from 'hooks/useGetAllColumns';
import {
  ProjectContainer,
  ProjectControls,
  ProjectControlsWrapper,
  ProjectDescription,
  ProjectTitle,
} from './ProjectPage.style';

function ProjectPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'projectPage' });
  const { selectedProject, isLoadingSelectedProject, isNavigate } = useGetProjectById();
  const { isLoadingDeleteProject, isDeleteProjectPopupOpen, deleteProject, navigate } =
    useDeleteProject(selectedProject);
  const { isCreationPopupOpen, isCreationLoading, onSubmit } = useCreateColumn(id ?? '');
  const { isLoadingDeleteColumn, isDeleteColumnPopupOpen, deleteColumn } =
    useDeleteColumn();
  const { columns, isColumnListLoading } = useGetAllColumns();
  const isLoadingProjectPage =
    isLoadingSelectedProject ||
    isLoadingDeleteProject ||
    isCreationLoading ||
    isColumnListLoading ||
    isLoadingDeleteColumn;

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
        <ProjectControlsWrapper>
          <Button
            type="button"
            width="130px"
            backgroundColor={defaultTheme.colors.transparent}
            color={defaultTheme.colors.primaryColor}
            callback={() => dispatch(setCreationPopupOpen(true))}
          >
            {t('newColumnButton')}
          </Button>
        </ProjectControlsWrapper>
      </ProjectControls>
      <ProjectDescription>{selectedProject?.description}</ProjectDescription>
      <ProjectContainer>
        {columns?.length ? (
          <ColumnContainer columns={columns} />
        ) : (
          <NoResultsContainer
            text="projectPage.emptyContainerText"
            buttonText="projectPage.emptyContainerButton"
            setPopupShown={setCreationPopupOpen}
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
        isPopupShown={isCreationPopupOpen}
        setPopupShown={setCreationPopupOpen}
        keyPrefix="editColumnForm"
        formTitleText="newColumnTitle"
        onSubmit={onSubmit}
      />
      {isLoadingProjectPage && <Loader />}
      {isNavigate && <Navigate to="*" />}
    </MainWrapper>
  );
}

export default ProjectPage;
