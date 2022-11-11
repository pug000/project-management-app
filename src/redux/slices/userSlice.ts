import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from 'ts/interfaces';

interface UserState {
  user: User | null;
  token: string | null;
  userId: string | null;
  isUserLogin: boolean;
}

const initialState: UserState = {
  user: null,
  token: null,
  userId: null,
  isUserLogin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<User>) {
      state.user = payload;
    },

    setUserId(state, { payload }: PayloadAction<string | null>) {
      state.userId = payload;
    },

    setToken(state, { payload }: PayloadAction<string | null>) {
      state.token = payload;
    },

    setUserLogin(state, { payload }: PayloadAction<boolean>) {
      state.isUserLogin = payload;
    },
  },
});

export const { setUser, setUserId, setToken, setUserLogin } = userSlice.actions;

export default userSlice.reducer;
