import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'hooks/useRedux';
import useDeleteProject from 'hooks/useDeleteProject';

import { useGetAllProjectsQuery } from 'redux/api/projectsApiSlice';
import { getLoggedIn } from 'redux/selectors/userSelectors';
import { setDeletePopupOpen } from 'redux/slices/popupSlice';

import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import NoResultsContainer from 'components/NoResultsContainer/NoResultsContainer';
import ProjectCards from 'components/ProjectCards/ProjectCards';
import PopupWarning from 'components/PopupWarning/PopupWarning';

import defaultTheme from 'styles/theme';
import { MainWrapper } from 'styles/styles';
import { ProjectsControls, ProjectsTitle, ProjectsContainer } from './ProjectsPage.style';
import Task from 'components/Task/Task';
import Column from 'components/Column/Column';

interface ColumnItemsProps {
  id: string;
  title: string;
  object: TaskItemsProps[];
}

const ColumnItems: ColumnItemsProps[] = [
  {
    id: '1',
    title: 'column title 1',
    object: [
      {
        id_task: '1',
        titleTask: 'task  title',
        text: 'fist',
        backgroundColor: 'red',
      },
      {
        id_task: '2',
        titleTask: 'task title',
        text: 'second',
        backgroundColor: 'yellow',
      },
    ],
  },
  {
    id: '2',
    title: 'column title 2',
    object: [
      {
        id_task: '3',
        titleTask: 'task  title 3',
        text: 'fist asdasd asdasd /n asdasdasd',
        backgroundColor: 'green',
      },
      {
        id_task: '4',
        titleTask: 'task title 4',
        text: 'second',
        backgroundColor: 'purple',
      },
      {
        id_task: '5',
        titleTask: 'task title 5',
        text: 'second',
        backgroundColor: 'grey',
      },
    ],
  },
];
interface TaskItemsProps {
  id_task: string;
  titleTask: string;
  text: string;
  backgroundColor: string;
}

// const TaskItems: TaskItemsProps[] = [
//   {
//     id_task: '1',
//     titleTask: 'task  title',
//     text: 'fist',
//     backgroundColor: 'red',
//   },
//   {
//     id_task: '2',
//     titleTask: 'task title',
//     text: 'second',
//     backgroundColor: 'yellow',
//   },
// ];

function ProjectsPage() {
  const isLoggedIn = useAppSelector(getLoggedIn);
  const { data: projects, isLoading: isProjectsListLoading } = useGetAllProjectsQuery(
    undefined,
    { skip: !isLoggedIn }
  );
  const { isDeletePopupOpen, isLoadingDeleteProject, deleteProject } = useDeleteProject();
  const { t } = useTranslation('translation', { keyPrefix: 'projectsPage' });

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
          >
            {t('newProjectButton')}
          </Button>
        </ProjectsControls>
        <ProjectsContainer>
          {(isProjectsListLoading || isLoadingDeleteProject) && <Loader />}
          {projects?.length ? (
            <ProjectCards projects={projects} />
          ) : (
            // <NoResultsContainer
            //   text="projectsPage.emptyContainerText"
            //   buttonText="projectsPage.emptyContainerButton"
            // />

            <>
              {ColumnItems.map(({ id, title, object }) => (
                <Column key={id} title={title}>
                  {object.map(({ id_task, titleTask, text, backgroundColor }) => (
                    <Task
                      key={id_task}
                      title={titleTask}
                      text={text}
                      backgroundColor={backgroundColor}
                    />
                  ))}
                </Column>
              ))}
            </>
          )}
        </ProjectsContainer>
        <PopupWarning
          isPopupShown={isDeletePopupOpen}
          setPopupShown={setDeletePopupOpen}
          actionOnYes={deleteProject}
          text="deleteProject"
        />
      </MainWrapper>
    </ProtectedRoute>
  );
}

export default memo(ProjectsPage);
