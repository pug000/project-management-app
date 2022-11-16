import { Endpoints, Methods } from 'ts/enums';
import { UserData } from 'ts/interfaces';
import { addFetchOptions } from 'utils/functions';
import apiSlice from './apiSlice';

type UserDataOmitPassword = Omit<UserData, 'password'>;

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<UserDataOmitPassword, string>({
      query: (id: string) => addFetchOptions(`${Endpoints.users}${id}`, Methods.get),
    }),

    deleteUserById: builder.mutation<UserDataOmitPassword, string>({
      query: (id: string) => addFetchOptions(`${Endpoints.users}${id}`, Methods.delete),
    }),
  }),
});

export const { useGetUserByIdQuery, useDeleteUserByIdMutation } = userApiSlice;
