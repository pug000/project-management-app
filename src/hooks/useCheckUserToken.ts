import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLazyGetUserByIdQuery } from 'redux/api/userApiSlice';
import {
  getLoggedIn,
  getAuthUser,
  getTokenInvalidPopupOpen,
} from 'redux/selectors/userSelectors';
import { setLoggedOut, setTokeInvalidPopupOpen } from 'redux/slices/userSlice';

import { useAppSelector, useAppDispatch } from './useRedux';

const useCheckUserToken = () => {
  const isLoggedIn = useAppSelector(getLoggedIn);
  const authUser = useAppSelector(getAuthUser);
  const isTokenInvalidPopupOpen = useAppSelector(getTokenInvalidPopupOpen);
  const [checkUser, { error: tokenInvalidErrorMessage, isError: isTokenInvalid }] =
    useLazyGetUserByIdQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signOutUser = useCallback(() => {
    if (isLoggedIn && authUser) {
      const currentDate = new Date();
      const signOutDate = new Date(authUser.exp * 1000);

      if (currentDate >= signOutDate) {
        dispatch(setLoggedOut());
        navigate('/');
      } else {
        checkUser(authUser._id);
      }
    }
  }, []);

  useEffect(() => {
    if (isTokenInvalid) {
      navigate('/');
      dispatch(setLoggedOut());
    }

    if (isTokenInvalid && !isLoggedIn) {
      dispatch(setTokeInvalidPopupOpen(true));
    }
  }, [isTokenInvalid, isLoggedIn]);

  useEffect(() => {
    signOutUser();
  }, []);

  return {
    isTokenInvalidPopupOpen,
    tokenInvalidErrorMessage,
  };
};

export default useCheckUserToken;
