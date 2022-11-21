import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteUserByIdMutation } from 'redux/api/userApiSlice';
import { getDeletePopupOpen } from 'redux/selectors/popupSelectors';
import { getAuthUser } from 'redux/selectors/userSelectors';
import { setDeletePopupOpen } from 'redux/slices/popupSlice';
import { setLoggedOut } from 'redux/slices/userSlice';

import { useAppDispatch, useAppSelector } from './useRedux';

const useDeleteUser = () => {
  const isDeletePopupOpen = useAppSelector(getDeletePopupOpen);
  const authUser = useAppSelector(getAuthUser);
  const dispatch = useAppDispatch();
  const [
    deleteUserById,
    { isSuccess: isSuccessDeleteUser, isLoading: isLoadingDeleteUser },
  ] = useDeleteUserByIdMutation();
  const navigate = useNavigate();

  const deleteUserProfile = useCallback(async () => {
    if (authUser?._id) {
      dispatch(setDeletePopupOpen(false));
      await deleteUserById(authUser._id);
    }
  }, []);

  useEffect(() => {
    if (isSuccessDeleteUser) {
      navigate('/');
      dispatch(setLoggedOut());
    }
  }, [isSuccessDeleteUser]);

  useEffect(
    () => () => {
      if (isDeletePopupOpen) {
        dispatch(setDeletePopupOpen(false));
      }
    },
    []
  );

  return {
    isLoadingDeleteUser,
    isDeletePopupOpen,
    deleteUserProfile,
    setDeletePopupOpen,
  };
};

export default useDeleteUser;
