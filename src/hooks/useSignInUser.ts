import { useState, useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useSignInMutation } from 'redux/api/authApiSlice';
import { useGetUserByIdQuery } from 'redux/api/userApiSlice';
import { getAuthUser, getLoggedIn } from 'redux/selectors/userSelectors';
import { setNotificationPopupOpen } from 'redux/slices/popupSlice';
import { setLoggedIn, setUser } from 'redux/slices/userSlice';

import { UserFormValues } from 'ts/interfaces';

import { useAppDispatch, useAppSelector } from './useRedux';

const useSignInUser = () => {
  const authUser = useAppSelector(getAuthUser);
  const isLoggedIn = useAppSelector(getLoggedIn);
  const [isLoadingAuth, setLoadingAuth] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (isErrorSignIn) {
      dispatch(setNotificationPopupOpen(true));
    }
  }, [isErrorSignIn]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/projects');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoadingSignIn || isLoadingGetUser) {
      setLoadingAuth(true);
    }

    if (isErrorSignIn || isSuccessGetUser) {
      setLoadingAuth(false);
    }
  }, [isLoadingSignIn, isLoadingGetUser, isErrorSignIn, isSuccessGetUser]);

  return {
    isLoadingAuth,
    signInErrorMessage,
    onSubmit,
  };
};

export default useSignInUser;
