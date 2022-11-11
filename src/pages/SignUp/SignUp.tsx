import React, { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { useAppDispatch } from 'hooks/useRedux';

import { setAuthUser, setLoggedIn, setUser } from 'redux/slices/userSlice';
import { useSignInMutation, useSignUpMutation } from 'redux/api/userApi';

import AuthForm from 'components/AuthForm/AuthForm';

import { UserFormValues } from 'ts/interfaces';

function SignUp() {
  const dispatch = useAppDispatch();
  const [signUp, { originalArgs: userData, isSuccess: isSuccessSignUp }] =
    useSignUpMutation();
  const [signIn, { data: authData, isSuccess: isSuccessSignIn }] = useSignInMutation();

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

  return <AuthForm keyPrefix="signUp" onSubmit={onSubmit} />;
}

export default SignUp;
