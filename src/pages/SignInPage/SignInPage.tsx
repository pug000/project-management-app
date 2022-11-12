import React, { useCallback, useEffect } from 'react';
import AuthForm from 'components/AuthForm/AuthForm';
import { useAppDispatch } from 'hooks/useRedux';
import { SubmitHandler } from 'react-hook-form';
import { UserFormValues } from 'ts/interfaces';
import { useSignInMutation } from 'redux/api/authSlice';
import { useLazyGetUserByIdQuery } from 'redux/api/userSlice';
import { setAuthUser, setLoggedIn, setUser } from 'redux/slices/userSlice';

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
    <AuthForm keyPrefix="signIn" onSubmit={onSubmit} isLoadingAuth={isLoadingAuth} />
  );
}

export default SignInPage;
