import { addFetchOptions, parseJwt } from 'utils/functions';

import { Endpoints, Methods } from 'ts/enums';
import { AuthUser, User, UserData } from 'ts/interfaces';

import { setAuthUser, setUser } from 'redux/slices/userSlice';
import apiSlice from './apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<User, User>({
      query: (body: User) => ({
        ...addFetchOptions(`${Endpoints.signUp}`, Methods.post),
        body,
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(setUser(arg));
        } catch (error) {
          /* empty */
        }
      },
      transformResponse: ({ _id, ...data }: UserData) => data,
      transformErrorResponse: ({ status }): string => {
        if (status === 409) {
          return 'signUp.error';
        }

        return 'authorization.error';
      },
    }),

    signIn: builder.mutation<AuthUser, User>({
      query: (body: User) => ({
        ...addFetchOptions(`${Endpoints.signIn}`, Methods.post),
        headers: {
          'Content-type': 'application/json',
        },
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setAuthUser((await queryFulfilled).data));
        } catch (error) {
          /* empty */
        }
      },
      transformResponse: ({ token }: Pick<AuthUser, 'token'>) => ({
        token,
        ...parseJwt(token),
      }),
      transformErrorResponse: ({ status }): string => {
        if (status === 401) {
          return 'signIn.error';
        }

        return 'authorization.error';
      },
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApiSlice;
