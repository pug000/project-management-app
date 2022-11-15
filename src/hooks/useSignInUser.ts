import { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { useSignInMutation } from 'redux/api/authApiSlice';
import { useGetUserByIdQuery } from 'redux/api/userApiSlice';
import { getAuthUser } from 'redux/selectors/userSelectors';
import { setLoggedIn, setUser } from 'redux/slices/userSlice';

import { UserFormValues } from 'ts/interfaces';

import { useAppDispatch, useAppSelector } from './useRedux';

const useSignInUser = () => {
  const authUser = useAppSelector(getAuthUser);
  const dispatch = useAppDispatch();
  const [
    signIn,
    {
      originalArgs: userData,
      isLoading: isLoadingSignIn,
      isError: isErrorSignIn,
      error: signInErrorMessage,
    },
  ] = useSignInMutation();
  const {
    data: user,
    isSuccess: isSuccessGetUser,
    isFetching: isLoadingGetUser,
  } = useGetUserByIdQuery(authUser?._id ?? '', { skip: !authUser?._id });
  const isLoadingAuth = isLoadingSignIn || isLoadingGetUser;

  const onSubmit: SubmitHandler<UserFormValues> = useCallback(
    async ({ name, ...formValues }) => {
      await signIn(formValues);
    },
    []
  );

  useEffect(() => {
    if (user && userData && isSuccessGetUser) {
      dispatch(
        setUser({
          ...userData,
          name: user.name,
        })
      );
      dispatch(setLoggedIn(true));
    }
  }, [isSuccessGetUser]);

  return {
    isLoadingAuth,
    isErrorSignIn,
    signInErrorMessage,
    onSubmit,
  };
};

export default useSignInUser;
