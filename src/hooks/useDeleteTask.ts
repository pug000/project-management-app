import { useCallback, useEffect } from 'react';

import { useDeleteTaskMutation } from 'redux/api/tasksApiSlice';
import { getDeleteTaskPopupOpen } from 'redux/selectors/taskSelectors';
import { setSelectedTask, setDeleteTaskPopupOpen } from 'redux/slices/taskSlice';

import { Task } from 'ts/interfaces';

import { useAppSelector, useAppDispatch } from './useRedux';

const useDeleteTask = (selectedTask: Task | null) => {
  const isDeleteTaskPopupOpen = useAppSelector(getDeleteTaskPopupOpen);
  const [deleteTaskById, { isLoading: isLoadingDeleteTask }] = useDeleteTaskMutation();
  const dispatch = useAppDispatch();

  const showDeletePopupOnClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, task: Task) => {
      event.stopPropagation();
      dispatch(setSelectedTask(task));
      dispatch(setDeleteTaskPopupOpen(true));
    },
    []
  );

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
  }, [isDeleteTaskPopupOpen]);

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
