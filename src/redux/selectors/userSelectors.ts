import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const getBaseUserState = (state: RootState) => state.user;

const getUser = createSelector(getBaseUserState, (state) => state.user);

const getAuthUser = createSelector(getBaseUserState, (state) => state.authUser);

const getLoggedIn = createSelector(getBaseUserState, (state) => state.isLoggedIn);

export { getUser, getAuthUser, getLoggedIn };
