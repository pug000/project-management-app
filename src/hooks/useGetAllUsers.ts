import { useGetAllUsersQuery } from 'redux/api/userApiSlice';
import { getLoggedIn } from 'redux/selectors/userSelectors';

import { useAppSelector } from './useRedux';

const useGetAllUsers = () => {
  const isLoggedIn = useAppSelector(getLoggedIn);
  const { data: users, isFetching: isUsersListLoading } = useGetAllUsersQuery(undefined, {
    skip: !isLoggedIn,
  });

  return {
    users,
    isUsersListLoading,
  };
};

export default useGetAllUsers;
