import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import useDeleteProject from 'hooks/useDeleteProject';
import useGetProjectById from 'hooks/useGetProjectById';
import useCreateColumn from 'hooks/useCreateColumn';

import { setCreationPopupOpen, setDeleteProjectPopupOpen } from 'redux/slices/popupSlice';
import { useGetAllColumnsQuery } from 'redux/api/columnApiSlice';
import { getLoggedIn } from 'redux/selectors/userSelectors';

import { backButtonAnimation } from 'utils/animations';

import PopupWarning from 'components/PopupWarning/PopupWarning';
import NoResultsContainer from 'components/NoResultsContainer/NoResultsContainer';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import ColumnContainer from 'components/ColumnContainer/ColumnContainer';
import PopupWithFormColumnTask from 'components/PopupWithFormColumnTask/PopupWithFormColumnTask';

import defaultTheme from 'styles/theme';
import { MainWrapper, StyledPrevIcon, StyledDeleteIcon } from 'styles/styles';

import {
  ProjectContainer,
  ProjectControls,
  ProjectControlsWrapper,
  ProjectDescription,
  ProjectTitle,
} from './ProjectPage.style';

function ProjectPage() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'projectPage' });
  const {
    selectedProject,
    isLoadingSelectedProject,
    isSuccessSelectedProject,
    isNavigate,
  } = useGetProjectById();
  const { isLoadingDeleteProject, isDeleteProjectPopupOpen, deleteProject, navigate } =
    useDeleteProject(selectedProject);
  const { id } = useParams();
  const isLoggedIn = useAppSelector(getLoggedIn);
  const { data: columns, isFetching: isColumnListLoading } = useGetAllColumnsQuery(
    id ?? '',
    { skip: !id && !isLoggedIn }
  );
  const { isCreationPopupOpen, isCreationLoading, onSubmit } = useCreateColumn(id ?? '');

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
        {(isLoadingSelectedProject ||
          isLoadingDeleteProject ||
          isCreationLoading ||
          isColumnListLoading) && <Loader />}
        {columns?.length ? (
          <ColumnContainer />
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
      {isNavigate && <Navigate to="*" />}
      <PopupWithFormColumnTask
        isPopupShown={isCreationPopupOpen}
        setPopupShown={setCreationPopupOpen}
        keyPrefix="editColumnForm"
        formTitleText="newColumnTitle"
        onSubmit={onSubmit}
      />
    </MainWrapper>
  );
}

export default ProjectPage;
