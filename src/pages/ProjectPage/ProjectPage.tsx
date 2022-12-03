import React, { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation } from 'react-router-dom';

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

interface ProjectPageProps {
  setFooterShown: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProjectPage({ setFooterShown }: ProjectPageProps) {
  const isLoadingGetAllTasks = useAppSelector(getLoadingTasksList);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'projectPage' });
  const { selectedProject, isLoadingSelectedProject, isNavigate } = useGetProjectById();
  const { columnList, isLoadingColumnList } = useGetAllColumns();
  const { isLoadingDeleteProject, isDeleteProjectPopupOpen, deleteProject, navigate } =
    useDeleteProject(selectedProject);
  const { isCreateColumnPopupOpen, isLoadingCreateColumn, onSubmit, id } =
    useCreateColumn(columnList);
  const { isLoadingDeleteColumn, isDeleteColumnPopupOpen, deleteColumn } =
    useDeleteColumn();
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

  const [buttonText, setButtonText] = useState(`${t('newColumnButton')}`);
  const [buttonWidth, setButtonWidth] = useState('130px');
  const location = useLocation();
  const ref = useRef<HTMLElement | null>(null);

  const changeProjectPageLayout = () => {
    if (ref.current && ref.current.offsetWidth <= 800) {
      setButtonText('+');
      setButtonWidth('30px');
      if (location.pathname === `/projects/${id}`) {
        setFooterShown(false);
      }
    } else {
      setButtonText(`${t('newColumnButton')}`);
      setButtonWidth('130px');
      setFooterShown(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', changeProjectPageLayout);
    changeProjectPageLayout();
    return () => {
      window.removeEventListener('resize', changeProjectPageLayout);
      setFooterShown(true);
    };
  }, []);

  return (
    <MainWrapper ref={ref}>
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
            width={buttonWidth}
            backgroundColor={defaultTheme.colors.transparent}
            color={defaultTheme.colors.primaryColor}
            callback={() => dispatch(setCreateColumnPopupOpen(true))}
          >
            {buttonText}
          </Button>
        </ProjectButtonWrapper>
      </ProjectControls>
      <ProjectDescription>{selectedProject?.description}</ProjectDescription>
      <ProjectContainer>
        {columnList?.length ? (
          <Columns />
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
      {isNavigate && <Navigate to="/" />}
    </MainWrapper>
  );
}

export default memo(ProjectPage);
