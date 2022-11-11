import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from 'redux/store';

import { baseUrl } from 'utils/constants';
import { addFetchOptions } from 'utils/functions';

import { Endpoints, Methods } from 'ts/enums';
import { User } from 'ts/interfaces';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers, { getState }) {
      const { token } = (getState() as RootState).user;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
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
      invalidatesTags: ['User'],
    }),

    signIn: builder.mutation<string, string>({
      query: () => ({
        ...addFetchOptions(`${Endpoints.signIn}`, Methods.post),
        headers: {
          'Content-type': 'application/json',
          accept: 'application/json',
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = userApi;
export default userApi;
