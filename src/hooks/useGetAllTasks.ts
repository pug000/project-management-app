import { useGetAllTasksQuery } from 'redux/api/tasksApiSlice';
import { getAllTasks } from 'redux/selectors/taskSelectors';
import { getLoggedIn } from 'redux/selectors/userSelectors';
import { RootState } from 'redux/store';

import { useAppSelector } from './useRedux';

const useGetAllTasks = (boardId: string, columnId: string) => {
  const isLoggedIn = useAppSelector(getLoggedIn);
  useGetAllTasksQuery({ boardId, columnId }, { skip: !isLoggedIn });
  const tasks = useAppSelector((state: RootState) =>
    getAllTasks(state, { boardId, columnId })
  );

  return {
    tasks,
  };
};

export default useGetAllTasks;
