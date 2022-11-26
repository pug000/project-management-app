import { Endpoints, Methods } from 'ts/enums';
import { ColumnData, ColumnFormValue } from 'ts/interfaces';
import { addFetchOptions } from 'utils/functions';
import apiSlice from './apiSlice';

export const columnsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllColumns: builder.query<ColumnData[], string>({
      query: (id) =>
        addFetchOptions(`${Endpoints.boards}${id}/${Endpoints.columns}`, Methods.get),
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Column' as const, _id })), 'Column']
          : ['Column'],
    }),
    createColumn: builder.mutation<ColumnData, ColumnFormValue>({
      query: ({ id, body }) => ({
        ...addFetchOptions(`${Endpoints.boards}${id}/${Endpoints.columns}`, Methods.post),
        body,
      }),
      invalidatesTags: ['Column'],
    }),
  }),
});

export const { useGetAllColumnsQuery, useCreateColumnMutation } = columnsApiSlice;
