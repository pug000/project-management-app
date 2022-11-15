import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthUser, User } from 'ts/interfaces';

interface UserState {
  user: User | null;
  authUser: AuthUser | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  authUser: null,
  isLoggedIn: false,
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
  },
});

export const { setUser, setLoggedIn, setAuthUser } = userSlice.actions;

export default userSlice.reducer;
