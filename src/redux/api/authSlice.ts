import { Endpoints, Methods } from 'ts/enums';
import { AuthUser, User } from 'ts/interfaces';
import { addFetchOptions, parseJwt } from 'utils/functions';
import apiSlice from './apiSlice';

interface UserData extends User {
  _id: string;
}

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
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authSlice;
