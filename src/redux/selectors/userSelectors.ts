import { RootState } from 'redux/store';

const getUser = (state: RootState) => state.user.user;

const getAuthUser = (state: RootState) => state.user.authUser;

const getLoggedIn = (state: RootState) => state.user.isLoggedIn;

export { getUser, getAuthUser, getLoggedIn };
