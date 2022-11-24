import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import useDeleteProject from 'hooks/useDeleteProject';
import useCreateProject from 'hooks/useCreateProject';

import {
  useGetAllProjectsQuery,
  useUpdateProjectMutation,
} from 'redux/api/projectsApiSlice';
import { getLoggedIn } from 'redux/selectors/userSelectors';
import {
  setDeletePopupOpen,
  setCreationPopupOpen,
  setSuccessPopupOpen,
  setEditPopupOpen,
} from 'redux/slices/popupSlice';
import { getEditPopupOpen, getSuccessPopupOpen } from 'redux/selectors/popupSelectors';

import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import NoResultsContainer from 'components/NoResultsContainer/NoResultsContainer';
import ProjectCards from 'components/ProjectCards/ProjectCards';
import PopupWarning from 'components/PopupWarning/PopupWarning';
import PopupWithForm from 'components/PopupWithForm/PopupWithForm';
import PopupNotification from 'components/PopupNotification/PopupNotification';

import defaultTheme from 'styles/theme';
import { MainWrapper } from 'styles/styles';
import { SubmitHandler } from 'react-hook-form';
import { EditFormValues } from 'ts/interfaces';
import { ProjectsControls, ProjectsTitle, ProjectsContainer } from './ProjectsPage.style';

function ProjectsPage() {
  const isLoggedIn = useAppSelector(getLoggedIn);
  const isSuccessPopupOpen = useAppSelector(getSuccessPopupOpen);
  const { data: projects, isFetching: isProjectsListLoading } = useGetAllProjectsQuery(
    undefined,
    { skip: !isLoggedIn }
  );
  const { isDeletePopupOpen, isLoadingDeleteProject, selectedProject, deleteProject } =
    useDeleteProject();
  const { t } = useTranslation('translation', { keyPrefix: 'projectsPage' });
  const dispatch = useAppDispatch();
  const { isSuccessCreateProject, isCreationPopupOpen, isCreationLoading, onSubmit } =
    useCreateProject();

  useEffect(() => {
    if (isSuccessCreateProject && !isCreationPopupOpen) {
      dispatch(setSuccessPopupOpen(true));
    }
  }, [isSuccessCreateProject, isCreationPopupOpen]);

  const isEditPopupOpen = useAppSelector(getEditPopupOpen);
  const [editProject, { isLoading: isLoadingEditProject }] = useUpdateProjectMutation();

  const editOnSubmit: SubmitHandler<EditFormValues> = useCallback(
    async ({ color, ...formValues }) => {
      if (selectedProject) {
        const { description, ...projectData } = selectedProject;
        await editProject({
          ...projectData,
          title: JSON.stringify({ ...formValues }),
        });
      }
    },
    [isEditPopupOpen]
  );

  return (
    <ProtectedRoute>
      <MainWrapper>
        <ProjectsControls>
          <ProjectsTitle>{t('title')}</ProjectsTitle>
          <Button
            type="button"
            width="130px"
            backgroundColor={defaultTheme.colors.transparent}
            color={defaultTheme.colors.primaryColor}
            callback={() => dispatch(setCreationPopupOpen(true))}
          >
            {t('newProjectButton')}
          </Button>
        </ProjectsControls>
        <ProjectsContainer>
          {(isProjectsListLoading ||
            isLoadingDeleteProject ||
            isCreationLoading ||
            isLoadingEditProject) && <Loader />}
          {projects?.length ? (
            <ProjectCards projects={projects} setEditPopupOpen={setEditPopupOpen} />
          ) : (
            <NoResultsContainer
              text="projectsPage.emptyContainerText"
              buttonText="projectsPage.emptyContainerButton"
              setPopupShown={setCreationPopupOpen}
            />
          )}
        </ProjectsContainer>
        <PopupWarning
          isPopupShown={isDeletePopupOpen}
          setPopupShown={setDeletePopupOpen}
          actionOnYes={deleteProject}
          text="deleteProject"
        />
        <PopupWithForm
          isPopupShown={isCreationPopupOpen}
          setPopupShown={setCreationPopupOpen}
          keyPrefix="newProject"
          selectedItem={selectedProject}
          onSubmit={onSubmit}
        />
        <PopupWithForm
          isPopupShown={isEditPopupOpen}
          setPopupShown={setEditPopupOpen}
          keyPrefix="editProject"
          selectedItem={selectedProject}
          onSubmit={editOnSubmit}
        />
        <PopupNotification
          isPopupShown={isSuccessPopupOpen}
          setPopupShown={setSuccessPopupOpen}
          text={t('successful')}
          backgroundColor={defaultTheme.colors.primaryColor}
        />
      </MainWrapper>
    </ProtectedRoute>
  );
}

export default memo(ProjectsPage);
