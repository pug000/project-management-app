import { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { useSignInMutation, useSignUpMutation } from 'redux/api/authApiSlice';
import { getAuthUser, getUser } from 'redux/selectors/userSelectors';
import { setNotificationPopupOpen } from 'redux/slices/popupSlice';
import { setLoggedIn } from 'redux/slices/userSlice';

import { UserFormValues } from 'ts/interfaces';

import { useAppDispatch, useAppSelector } from './useRedux';

const useSignUpUser = () => {
  const user = useAppSelector(getUser);
  const authUser = useAppSelector(getAuthUser);
  const dispatch = useAppDispatch();
  const [
    signUp,
    { isLoading: isLoadingSignUp, isError: isErrorSignUp, error: signUpErrorMessage },
  ] = useSignUpMutation();
  const [signIn, { isLoading: isLoadingSignIn }] = useSignInMutation();
  const isLoadingAuth = isLoadingSignUp || isLoadingSignIn;

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
      dispatch(setNotificationPopupOpen(true));
    }
  }, [isErrorSignUp]);

  return {
    isLoadingAuth,
    signUpErrorMessage,
    onSubmit,
  };
};

export default useSignUpUser;
