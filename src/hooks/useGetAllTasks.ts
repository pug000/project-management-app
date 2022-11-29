import { useGetAllTasksQuery } from 'redux/api/tasksApiSlice';
import { getLoggedIn } from 'redux/selectors/userSelectors';

import { useAppSelector } from './useRedux';

const useGetAllTasks = (boardId: string, columnId: string) => {
  const isLoggedIn = useAppSelector(getLoggedIn);
  const { data: tasks } = useGetAllTasksQuery(
    { boardId, columnId },
    { skip: !isLoggedIn }
  );

  return {
    tasks,
  };
};

export default useGetAllTasks;
