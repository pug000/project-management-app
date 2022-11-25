import { useGetAllProjectsQuery } from 'redux/api/projectsApiSlice';
import { getLoggedIn } from 'redux/selectors/userSelectors';

import { useAppSelector } from './useRedux';

const useGetAllProject = () => {
  const isLoggedIn = useAppSelector(getLoggedIn);
  const { data: projects, isFetching: isProjectsListLoading } = useGetAllProjectsQuery(
    undefined,
    { skip: !isLoggedIn }
  );

  return {
    projects,
    isProjectsListLoading,
  };
};

export default useGetAllProject;
