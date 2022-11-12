import { addFetchOptions, parseJwt } from 'utils/functions';

import { Endpoints, Methods } from 'ts/enums';
import { AuthUser, User, UserData } from 'ts/interfaces';

import apiSlice from './apiSlice';

const authSlice = apiSlice.injectEndpoints({
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
      transformResponse: ({ _id, ...data }: UserData) => data,
    }),

    signIn: builder.mutation<AuthUser, User>({
      query: (body: User) => ({
        ...addFetchOptions(`${Endpoints.signIn}`, Methods.post),
        headers: {
          'Content-type': 'application/json',
        },
        body,
      }),
      transformResponse: ({ token }: Pick<AuthUser, 'token'>) => ({
        token,
        _id: parseJwt(token),
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authSlice;
