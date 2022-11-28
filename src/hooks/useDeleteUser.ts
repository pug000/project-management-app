import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteUserByIdMutation } from 'redux/api/userApiSlice';
import { getAuthUser, getDeleteUserPopupOpen } from 'redux/selectors/userSelectors';
import { setDeleteUserPopupOpen, setLoggedOut } from 'redux/slices/userSlice';

import { useAppDispatch, useAppSelector } from './useRedux';

const useDeleteUser = () => {
  const isDeleteUserPopupOpen = useAppSelector(getDeleteUserPopupOpen);
  const authUser = useAppSelector(getAuthUser);
  const dispatch = useAppDispatch();
  const [
    deleteUserById,
    { isSuccess: isSuccessDeleteUser, isLoading: isLoadingDeleteUser },
  ] = useDeleteUserByIdMutation();
  const navigate = useNavigate();

  const deleteUserProfile = useCallback(async () => {
    if (authUser?._id) {
      dispatch(setDeleteUserPopupOpen(false));
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
      if (isDeleteUserPopupOpen) {
        dispatch(setDeleteUserPopupOpen(false));
      }
    },
    []
  );

  return {
    isLoadingDeleteUser,
    isDeleteUserPopupOpen,
    deleteUserProfile,
    setDeleteUserPopupOpen,
  };
};

export default useDeleteUser;
