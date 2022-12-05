import { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useSignInMutation } from 'redux/api/authApiSlice';
import { useGetUserByIdQuery } from 'redux/api/userApiSlice';
import {
  getAuthUser,
  getErrorNotificationPopupOpen,
  getLoggedIn,
} from 'redux/selectors/userSelectors';
import {
  setErrorNotificationPopupOpen,
  setLoggedIn,
  setUser,
} from 'redux/slices/userSlice';

import { UserFormValues } from 'ts/interfaces';

import { useAppDispatch, useAppSelector } from './useRedux';

const useSignInUser = () => {
  const authUser = useAppSelector(getAuthUser);
  const isLoggedIn = useAppSelector(getLoggedIn);
  const isErrorNotificationPopupOpen = useAppSelector(getErrorNotificationPopupOpen);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [
    signIn,
    {
      originalArgs: userData,
      isLoading: isLoadingSignIn,
      isError: isErrorSignIn,
      error: signInErrorMessage,
      reset,
    },
  ] = useSignInMutation();
  const {
    data: user,
    isSuccess: isSuccessGetUser,
    isFetching: isLoadingGetUser,
  } = useGetUserByIdQuery(authUser?._id ?? '', { skip: !authUser?._id });

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
      reset();
    }
  }, [isSuccessGetUser]);

  useEffect(() => {
    if (isErrorSignIn) {
      dispatch(setErrorNotificationPopupOpen(true));
    }
  }, [isErrorSignIn]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/projects');
    }
  }, [isLoggedIn]);

  const isLoadingAuth = [isLoadingSignIn, isLoadingGetUser].some((loader) => loader);

  return {
    isErrorNotificationPopupOpen,
    isLoadingAuth,
    signInErrorMessage,
    onSubmit,
  };
};

export default useSignInUser;
