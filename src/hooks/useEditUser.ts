import { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useEditUserByIdMutation } from 'redux/api/userApiSlice';
import {
  getAuthUser,
  getErrorNotificationPopupOpen,
} from 'redux/selectors/userSelectors';
import { setErrorNotificationPopupOpen } from 'redux/slices/userSlice';

import { UserFormValues } from 'ts/interfaces';

import { useAppSelector, useAppDispatch } from './useRedux';

const useEditUser = () => {
  const navigate = useNavigate();
  const authUser = useAppSelector(getAuthUser);
  const isErrorNotificationPopupOpen = useAppSelector(getErrorNotificationPopupOpen);
  const dispatch = useAppDispatch();
  const [
    editUserById,
    {
      isLoading: isLoadingEditUser,
      isSuccess: isSuccessEditUser,
      isError: isErrorEditUser,
      error: editUserErrorMessage,
    },
  ] = useEditUserByIdMutation();

  const onSubmit: SubmitHandler<UserFormValues> = useCallback(async (formValues) => {
    if (authUser?._id) {
      await editUserById({
        id: authUser._id,
        body: formValues,
      });
    }
  }, []);

  useEffect(() => {
    if (isErrorEditUser) {
      dispatch(setErrorNotificationPopupOpen(true));
    }
  }, [isErrorEditUser]);

  useEffect(() => {
    if (isSuccessEditUser) {
      navigate('/profile');
    }
  }, [isSuccessEditUser]);

  useEffect(
    () => () => {
      if (isErrorNotificationPopupOpen) {
        dispatch(setErrorNotificationPopupOpen(false));
      }
    },
    []
  );

  return {
    isErrorNotificationPopupOpen,
    isLoadingEditUser,
    editUserErrorMessage,
    onSubmit,
  };
};

export default useEditUser;
