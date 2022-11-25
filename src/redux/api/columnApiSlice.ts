import { Endpoints, Methods } from 'ts/enums';
import { ColumnData } from 'ts/interfaces';
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
  }),
});

export const { useGetAllColumnsQuery } = columnsApiSlice;
