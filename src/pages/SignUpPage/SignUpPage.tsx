import React, { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { useAppDispatch } from 'hooks/useRedux';

import { setAuthUser, setLoggedIn, setUser } from 'redux/slices/userSlice';
import { useSignInMutation, useSignUpMutation } from 'redux/api/authSlice';

import AuthForm from 'components/AuthForm/AuthForm';

import { UserFormValues } from 'ts/interfaces';

function SignUpPage() {
  const dispatch = useAppDispatch();
  const [
    signUp,
    { originalArgs: userData, isSuccess: isSuccessSignUp, isLoading: isLoadingSignUp },
  ] = useSignUpMutation();
  const [
    signIn,
    { data: authData, isSuccess: isSuccessSignIn, isLoading: isLoadingSignIn },
  ] = useSignInMutation();
  const isLoadingAuth = isLoadingSignUp || isLoadingSignIn;

  const onSubmit: SubmitHandler<UserFormValues> = useCallback(async (formValues) => {
    await signUp(formValues);
  }, []);

  const authUser = useCallback(async () => {
    if (userData && isSuccessSignUp) {
      const { name, ...data } = userData;
      await signIn(data);
    }
  }, [isSuccessSignUp]);

  useEffect(() => {
    authUser();
  }, [isSuccessSignUp]);

  useEffect(() => {
    if (authData && userData && isSuccessSignIn) {
      dispatch(setUser(userData));
      dispatch(setAuthUser(authData));
      dispatch(setLoggedIn(true));
    }
  }, [authData, userData, isSuccessSignIn]);

  return (
    <AuthForm keyPrefix="signUp" onSubmit={onSubmit} isLoadingAuth={isLoadingAuth} />
  );
}

export default SignUpPage;
