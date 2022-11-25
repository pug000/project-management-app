import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import { useAppDispatch } from 'hooks/useRedux';
import useDeleteProject from 'hooks/useDeleteProject';
import useGetProjectById from 'hooks/useGetProjectById';

import { setCreationPopupOpen, setDeletePopupOpen } from 'redux/slices/popupSlice';

import { backButtonAnimation } from 'utils/animations';

import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import PopupWarning from 'components/PopupWarning/PopupWarning';
import NoResultsContainer from 'components/NoResultsContainer/NoResultsContainer';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

import defaultTheme from 'styles/theme';
import { MainWrapper, StyledPrevIcon } from 'styles/styles';

import {
  ProjectContainer,
  ProjectControls,
  ProjectControlsWrapper,
  ProjectDescription,
  ProjectTitle,
  StyledDeleteIcon,
} from './ProjectPage.style';

function ProjectPage() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'projectPage' });
  const { selectedProject, isLoadingSelectedProject, isSuccessSelectedProject } =
    useGetProjectById();
  const { isLoadingDeleteProject, isDeletePopupOpen, deleteProject, navigate } =
    useDeleteProject(selectedProject);

  return (
    <ProtectedRoute>
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
                callback={() => dispatch(setDeletePopupOpen(true))}
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
            >
              {t('newColumnButton')}
            </Button>
          </ProjectControlsWrapper>
        </ProjectControls>
        <ProjectDescription>{selectedProject?.description}</ProjectDescription>
        <ProjectContainer>
          {(isLoadingSelectedProject || isLoadingDeleteProject) && <Loader />}
          {selectedProject ? (
            <div>ColumnWrapper</div>
          ) : (
            <NoResultsContainer
              text="projectPage.emptyContainerText"
              buttonText="projectPage.emptyContainerButton"
              setPopupShown={setCreationPopupOpen}
            />
          )}
        </ProjectContainer>
        <PopupWarning
          isPopupShown={isDeletePopupOpen}
          setPopupShown={setDeletePopupOpen}
          text="deleteProject"
          actionOnYes={deleteProject}
        />
        {!selectedProject && isSuccessSelectedProject && <Navigate to="*" />}
      </MainWrapper>
    </ProtectedRoute>
  );
}

export default ProjectPage;
