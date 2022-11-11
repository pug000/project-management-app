import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from 'redux/store';

import { baseUrl } from 'utils/constants';
import { addFetchOptions, parseJwt } from 'utils/functions';

import { Endpoints, Methods } from 'ts/enums';
import { AuthUser, User } from 'ts/interfaces';

interface UserData extends User {
  _id: string;
}

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers, { getState }) {
      const { authUser } = (getState() as RootState).user;

      if (authUser?.token) {
        headers.set('authorization', `Bearer ${authUser?.token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['User'],
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
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = userApi;
export default userApi;
