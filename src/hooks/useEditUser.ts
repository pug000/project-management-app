import { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useEditUserByIdMutation } from 'redux/api/userApiSlice';
import { getErrorPopupOpen } from 'redux/selectors/popupSelectors';
import { getAuthUser } from 'redux/selectors/userSelectors';
import { setErrorPopupOpen } from 'redux/slices/popupSlice';

import { UserFormValues } from 'ts/interfaces';

import { useAppSelector, useAppDispatch } from './useRedux';

const useEditUser = () => {
  const navigate = useNavigate();
  const authUser = useAppSelector(getAuthUser);
  const isErrorPopupOpen = useAppSelector(getErrorPopupOpen);
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
      dispatch(setErrorPopupOpen(true));
    }
  }, [isErrorEditUser]);

  useEffect(() => {
    if (isSuccessEditUser) {
      navigate('/profile');
    }
  }, [isSuccessEditUser]);

  useEffect(
    () => () => {
      if (isErrorPopupOpen) {
        dispatch(setErrorPopupOpen(false));
      }
    },
    []
  );

  return {
    isErrorPopupOpen,
    isLoadingEditUser,
    editUserErrorMessage,
    onSubmit,
  };
};

export default useEditUser;
