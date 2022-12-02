import { useEffect, useState } from 'react';
import { useGetAllUsersQuery } from 'redux/api/userApiSlice';
import { getLoggedIn } from 'redux/selectors/userSelectors';

import { SelectOptions } from 'ts/interfaces';
import { defaultSelectOptions } from 'utils/constants';

import { useAppSelector } from './useRedux';

const useGetAllUsers = () => {
  const isLoggedIn = useAppSelector(getLoggedIn);
  const { data: users, isFetching: isUsersListLoading } = useGetAllUsersQuery(undefined, {
    skip: !isLoggedIn,
  });

  const [usersList, setUsersList] = useState<SelectOptions[]>(defaultSelectOptions);

  useEffect(() => {
    if (!isUsersListLoading && users) {
      const usersOptions = users?.map((user) => ({
        value: user.name ?? '',
        label: user.name ?? '',
      }));
      setUsersList(usersOptions);
    }
  }, [users]);

  return {
    usersList,
    isUsersListLoading,
  };
};

export default useGetAllUsers;
