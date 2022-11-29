import { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useUpdateTaskMutation } from 'redux/api/tasksApiSlice';
import { getEditTaskPopupOpen } from 'redux/selectors/taskSelectors';
import { setEditTaskPopupOpen, setSelectedTask } from 'redux/slices/taskSlice';

import { EditFormValues, Task } from 'ts/interfaces';

import { useAppDispatch, useAppSelector } from './useRedux';

const useEditTask = (selectedTask: Task | null) => {
  const isEditTaskPopupOpen = useAppSelector(getEditTaskPopupOpen);
  const [editTask, { isLoading: isLoadingEditTask }] = useUpdateTaskMutation();
  const dispatch = useAppDispatch();

  const showEditPopupOnClick = useCallback((task: Task) => {
    dispatch(setSelectedTask(task));
    dispatch(setEditTaskPopupOpen(true));
  }, []);

  const editOnSubmit: SubmitHandler<EditFormValues> = useCallback(
    async ({ title, color, description }) => {
      if (selectedTask) {
        const { boardId, columnId, userId, users, order } = selectedTask;
        dispatch(setEditTaskPopupOpen(false));
        dispatch(setSelectedTask(null));
        await editTask({
          boardId,
          columnId,
          id: selectedTask._id,
          body: {
            title,
            description: JSON.stringify({ color, description }),
            userId,
            users,
            order,
          },
        });
      }
    },
    [selectedTask]
  );

  useEffect(
    () => () => {
      if (isEditTaskPopupOpen) {
        dispatch(setEditTaskPopupOpen(false));
        dispatch(setSelectedTask(null));
      }
    },
    []
  );

  return {
    isEditTaskPopupOpen,
    isLoadingEditTask,
    showEditPopupOnClick,
    editOnSubmit,
  };
};

export default useEditTask;
