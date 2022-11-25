import { Endpoints, Methods } from 'ts/enums';
import { ColumnData } from 'ts/interfaces';
import { addFetchOptions } from 'utils/functions';
import apiSlice from './apiSlice';

export const columnsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllColumns: builder.query<ColumnData[], ColumnData>({
      query: (column: ColumnData) =>
        addFetchOptions(
          `${Endpoints.boards}${column.boardId}${Endpoints.columns}`,
          Methods.get
        ),
      transformResponse: (columns: ColumnData[]) =>
        columns.map(({ title, ...data }) => ({
          ...data,
          ...JSON.parse(title),
        })),
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Column' as const, _id })), 'Column']
          : ['Column'],
    }),
    deleteColumnById: builder.mutation<ColumnData, Partial<ColumnData>>({
      query: (column: ColumnData) =>
        addFetchOptions(
          `${Endpoints.boards}${column.boardId}${Endpoints.columns}${column._id}`,
          Methods.delete
        ),
      invalidatesTags: (_result, _error, id) => [{ type: 'Column', id }],
    }),
  }),
});

export const { useGetAllColumnsQuery, useDeleteColumnByIdMutation } = columnsApiSlice;
