import { useState, useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useSignInMutation, useSignUpMutation } from 'redux/api/authApiSlice';
import {
  getAuthUser,
  getErrorNotificationPopupOpen,
  getLoggedIn,
  getUser,
} from 'redux/selectors/userSelectors';
import { setErrorNotificationPopupOpen, setLoggedIn } from 'redux/slices/userSlice';

import { UserFormValues } from 'ts/interfaces';

import { useAppDispatch, useAppSelector } from './useRedux';

const useSignUpUser = () => {
  const user = useAppSelector(getUser);
  const isErrorNotificationPopupOpen = useAppSelector(getErrorNotificationPopupOpen);
  const authUser = useAppSelector(getAuthUser);
  const isLoggedIn = useAppSelector(getLoggedIn);
  const [isLoadingAuth, setLoadingAuth] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [
    signUp,
    { isLoading: isLoadingSignUp, isError: isErrorSignUp, error: signUpErrorMessage },
  ] = useSignUpMutation();
  const [signIn, { isLoading: isLoadingSignIn, isSuccess: isSuccessSignIn }] =
    useSignInMutation();

  const onSubmit: SubmitHandler<UserFormValues> = useCallback(async (formValues) => {
    await signUp(formValues);
  }, []);

  const signInUser = useCallback(async () => {
    if (user) {
      const { name, ...data } = user;
      await signIn(data);
    }
  }, [user]);

  useEffect(() => {
    signInUser();
  }, [user]);

  useEffect(() => {
    if (authUser) {
      dispatch(setLoggedIn(true));
    }
  }, [authUser]);

  useEffect(() => {
    if (isErrorSignUp) {
      dispatch(setErrorNotificationPopupOpen(true));
    }
  }, [isErrorSignUp]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/projects');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoadingSignIn || isLoadingSignUp) {
      setLoadingAuth(true);
    }

    if (isErrorSignUp || isSuccessSignIn) {
      setLoadingAuth(false);
    }
  }, [isLoadingSignIn, isLoadingSignUp, isErrorSignUp, isSuccessSignIn]);

  return {
    isErrorNotificationPopupOpen,
    isLoadingAuth,
    signUpErrorMessage,
    onSubmit,
  };
};

export default useSignUpUser;
