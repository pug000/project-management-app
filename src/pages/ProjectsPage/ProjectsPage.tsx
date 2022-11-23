import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import useDeleteProject from 'hooks/useDeleteProject';

import {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
} from 'redux/api/projectsApiSlice';
import { getLoggedIn, getUser } from 'redux/selectors/userSelectors';
import { getCreationPopupOpen } from 'redux/selectors/popupSelectors';
import { setDeletePopupOpen, setCreationPopupOpen } from 'redux/slices/popupSlice';

import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import NoResultsContainer from 'components/NoResultsContainer/NoResultsContainer';
import ProjectCards from 'components/ProjectCards/ProjectCards';
import PopupWarning from 'components/PopupWarning/PopupWarning';
import PopupWithForm from 'components/PopupWithForm/PopupWithForm';

import { EditFormValues } from 'ts/interfaces';

import defaultTheme from 'styles/theme';
import { MainWrapper } from 'styles/styles';
import { ProjectsControls, ProjectsTitle, ProjectsContainer } from './ProjectsPage.style';

function ProjectsPage() {
  const isLoggedIn = useAppSelector(getLoggedIn);
  const { data: projects, isLoading: isProjectsListLoading } = useGetAllProjectsQuery(
    undefined,
    { skip: !isLoggedIn }
  );
  const { isDeletePopupOpen, isLoadingDeleteProject, selectedProject, deleteProject } =
    useDeleteProject();
  const { t } = useTranslation('translation', { keyPrefix: 'projectsPage' });
  const dispatch = useAppDispatch();
  const isCreationPopupOpen = useAppSelector(getCreationPopupOpen);
  const [createProject, data] = useCreateProjectMutation();
  const user = useAppSelector(getUser);

  const onSubmit: SubmitHandler<EditFormValues> = useCallback(
    async ({ color, ...formValues }) => {
      await createProject({
        title: JSON.stringify({ ...formValues }),
        owner: user?.name ?? '',
        users: [],
      });
    },
    []
  );

  useEffect(() => {
    if (data.isSuccess) {
      dispatch(setCreationPopupOpen(false));
    }
  }, [data.isSuccess]);

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
          {(isProjectsListLoading || isLoadingDeleteProject) && <Loader />}
          {projects?.length ? (
            <ProjectCards projects={projects} />
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
      </MainWrapper>
    </ProtectedRoute>
  );
}

export default memo(ProjectsPage);
