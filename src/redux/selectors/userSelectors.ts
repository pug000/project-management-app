import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const getBaseUserState = (state: RootState) => state.user;

const getUser = createSelector(getBaseUserState, (state) => state.user);

const getAuthUser = createSelector(getBaseUserState, (state) => state.authUser);

const getLoggedIn = createSelector(getBaseUserState, (state) => state.isLoggedIn);

const getDeleteUserPopupOpen = createSelector(
  getBaseUserState,
  (state) => state.isDeleteUserPopupOpen
);

const getLogoutUserPopupOpen = createSelector(
  getBaseUserState,
  (state) => state.isLogoutUserPopupOpen
);

const getErrorNotificationPopupOpen = createSelector(
  getBaseUserState,
  (state) => state.isErrorNotificationPopupOpen
);

const getTokenInvalidPopupOpen = createSelector(
  getBaseUserState,
  (state) => state.isTokenInvalidPopupOpen
);

export {
  getUser,
  getAuthUser,
  getLoggedIn,
  getDeleteUserPopupOpen,
  getLogoutUserPopupOpen,
  getErrorNotificationPopupOpen,
  getTokenInvalidPopupOpen,
};
