import { useCallback, useEffect } from 'react';

import { useDeleteTaskMutation } from 'redux/api/tasksApiSlice';
import { getSelectedTask, getDeleteTaskPopupOpen } from 'redux/selectors/taskSelectors';
import { setSelectedTask, setDeleteTaskPopupOpen } from 'redux/slices/taskSlice';

import { Task } from 'ts/interfaces';

import { useAppSelector, useAppDispatch } from './useRedux';

const useDeleteTask = () => {
  const selectedTask = useAppSelector(getSelectedTask);
  const isDeleteTaskPopupOpen = useAppSelector(getDeleteTaskPopupOpen);
  const [deleteTaskById, { isLoading: isLoadingDeleteTask }] = useDeleteTaskMutation();
  const dispatch = useAppDispatch();

  const showDeletePopupOnClick = useCallback((task: Task) => {
    dispatch(setSelectedTask(task));
    dispatch(setDeleteTaskPopupOpen(true));
  }, []);

  const deleteTask = useCallback(async () => {
    if (selectedTask) {
      const { boardId, columnId } = selectedTask;
      dispatch(setDeleteTaskPopupOpen(false));
      dispatch(setSelectedTask(null));
      await deleteTaskById({ boardId, columnId, id: selectedTask._id });
    }
  }, [selectedTask]);

  useEffect(() => {
    if (!isDeleteTaskPopupOpen && selectedTask) {
      dispatch(setSelectedTask(null));
    }
  }, [isDeleteTaskPopupOpen, selectedTask]);

  useEffect(
    () => () => {
      if (isDeleteTaskPopupOpen) {
        dispatch(setDeleteTaskPopupOpen(false));
        dispatch(setSelectedTask(null));
      }
    },
    []
  );

  return {
    isDeleteTaskPopupOpen,
    isLoadingDeleteTask,
    showDeletePopupOnClick,
    deleteTask,
  };
};

export default useDeleteTask;
