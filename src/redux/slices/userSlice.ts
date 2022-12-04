import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthUser, User } from 'ts/interfaces';

interface UserState {
  user: User | null;
  authUser: AuthUser | null;
  isLoggedIn: boolean;
  isDeleteUserPopupOpen: boolean;
  isLogoutUserPopupOpen: boolean;
  isErrorNotificationPopupOpen: boolean;
  isTokenInvalidPopupOpen: boolean;
}

const initialState: UserState = {
  user: null,
  authUser: null,
  isLoggedIn: false,
  isDeleteUserPopupOpen: false,
  isLogoutUserPopupOpen: false,
  isErrorNotificationPopupOpen: false,
  isTokenInvalidPopupOpen: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<User | null>) {
      state.user = payload;
    },

    setAuthUser(state, { payload }: PayloadAction<AuthUser | null>) {
      state.authUser = payload;
    },

    setLoggedIn(state, { payload }: PayloadAction<boolean>) {
      state.isLoggedIn = payload;
    },

    setDeleteUserPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isDeleteUserPopupOpen = payload;
    },

    setLogoutUserPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isLogoutUserPopupOpen = payload;
    },

    setErrorNotificationPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isErrorNotificationPopupOpen = payload;
    },

    setTokeInvalidPopupOpen(state, { payload }: PayloadAction<boolean>) {
      state.isTokenInvalidPopupOpen = payload;
    },

    setLoggedOut(state) {
      state.user = null;
      state.authUser = null;
      state.isLoggedIn = false;
    },
  },
});

export const {
  setUser,
  setLoggedIn,
  setAuthUser,
  setDeleteUserPopupOpen,
  setLogoutUserPopupOpen,
  setErrorNotificationPopupOpen,
  setTokeInvalidPopupOpen,
  setLoggedOut,
} = userSlice.actions;

export default userSlice.reducer;
