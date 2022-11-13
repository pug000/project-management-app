import React, { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { useAppDispatch } from 'hooks/useRedux';

import { setAuthUser, setLoggedIn, setUser } from 'redux/slices/userSlice';
import { useLazyGetUserByIdQuery } from 'redux/api/userApiSlice';
import { useSignInMutation } from 'redux/api/authApiSlice';

import AuthForm from 'components/AuthForm/AuthForm';

import { UserFormValues } from 'ts/interfaces';

function SignInPage() {
  const dispatch = useAppDispatch();
  const [
    signIn,
    {
      data: authData,
      originalArgs: userData,
      isSuccess: isSuccessSignIn,
      isLoading: isLoadingSignIn,
    },
  ] = useSignInMutation();
  const [
    getUserById,
    { data: user, isSuccess: isSuccessGetUser, isFetching: isLoadingGetUser },
  ] = useLazyGetUserByIdQuery();
  const isLoadingAuth = isLoadingSignIn || isLoadingGetUser;

  const onSubmit: SubmitHandler<UserFormValues> = useCallback(
    async ({ name, ...formValues }) => {
      await signIn(formValues);
    },
    []
  );

  const authUser = useCallback(async () => {
    if (authData && isSuccessSignIn) {
      dispatch(setAuthUser(authData));
      await getUserById(authData._id);
    }
  }, [isSuccessSignIn]);

  const addUser = useCallback(() => {
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

  useEffect(() => {
    addUser();
  }, [isSuccessGetUser]);

  useEffect(() => {
    authUser();
  }, [isSuccessSignIn]);

  return (
    <main>
      <AuthForm keyPrefix="signIn" onSubmit={onSubmit} isLoadingAuth={isLoadingAuth} />
    </main>
  );
}

export default SignInPage;
