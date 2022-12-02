import { addFetchOptions } from 'utils/functions';

import { Endpoints, Methods } from 'ts/enums';
import { User, UserData } from 'ts/interfaces';

import { setUser } from 'redux/slices/userSlice';
import apiSlice from './apiSlice';

type UserDataOmitPassword = Omit<UserData, 'password'>;

interface UpdatedUserData {
  id: string;
  body: User;
}

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<UserDataOmitPassword, string>({
      query: (id: string) => addFetchOptions(`${Endpoints.users}${id}`, Methods.get),
      transformErrorResponse: ({ status }): string =>
        status === 403 ? 'authorization.tokenInvalid' : 'authorization.error',
    }),

    deleteUserById: builder.mutation<UserDataOmitPassword, string>({
      query: (id: string) => addFetchOptions(`${Endpoints.users}${id}`, Methods.delete),
    }),

    editUserById: builder.mutation<UserDataOmitPassword, UpdatedUserData>({
      query: ({ id, body }) => ({
        ...addFetchOptions(`${Endpoints.users}${id}`, Methods.put),
        body,
      }),
      onQueryStarted: async ({ body }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(setUser(body));
        } catch (error) {
          if (error instanceof Error) {
            throw error;
          }
        }
      },
      transformErrorResponse: ({ status }): string =>
        status === 409 ? 'signUp.error' : 'authorization.error',
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useDeleteUserByIdMutation,
  useEditUserByIdMutation,
} = userApiSlice;
