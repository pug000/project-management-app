import { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { useCreateTaskMutation } from 'redux/api/tasksApiSlice';
import { getSelectedColumn } from 'redux/selectors/columnSelectors';
import { getCreateTaskPopupOpen } from 'redux/selectors/taskSelectors';
import { getAuthUser } from 'redux/selectors/userSelectors';
import { setSelectedColumn } from 'redux/slices/columnSlice';
import { setCreateTaskPopupOpen, setSelectedTask } from 'redux/slices/taskSlice';

import { ColumnData, EditFormValues } from 'ts/interfaces';

import { useAppDispatch, useAppSelector } from './useRedux';

const useCreateTask = () => {
  const isCreateTaskPopupOpen = useAppSelector(getCreateTaskPopupOpen);
  const authUser = useAppSelector(getAuthUser);
  const selectedColumn = useAppSelector(getSelectedColumn);
  const dispatch = useAppDispatch();
  const [createTask, { isLoading: isLoadingCreateTask }] = useCreateTaskMutation();

  const showCreateTaskPopup = useCallback((column: ColumnData) => {
    dispatch(setSelectedColumn(column));
    dispatch(setCreateTaskPopupOpen(true));
  }, []);

  const onSubmit: SubmitHandler<EditFormValues> = useCallback(
    async ({ title, ...formValues }) => {
      if (selectedColumn) {
        await createTask({
          boardId: selectedColumn.boardId,
          columnId: selectedColumn._id,
          body: {
            title,
            description: JSON.stringify({ ...formValues }),
            userId: authUser?._id ?? '',
            users: [],
            order: 0,
          },
        });
      }
    },
    [isCreateTaskPopupOpen]
  );

  useEffect(() => {
    if (!isCreateTaskPopupOpen && selectedColumn) {
      dispatch(setSelectedColumn(null));
    }
  }, [isCreateTaskPopupOpen, selectedColumn]);

  useEffect(
    () => () => {
      if (isCreateTaskPopupOpen) {
        dispatch(setCreateTaskPopupOpen(false));
        dispatch(setSelectedTask(null));
      }
    },
    []
  );

  return {
    isCreateTaskPopupOpen,
    isLoadingCreateTask,
    onSubmit,
    showCreateTaskPopup,
  };
};

export default useCreateTask;