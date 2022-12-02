import { setCreateColumnPopupOpen } from 'redux/slices/columnSlice';

import { addFetchOptions } from 'utils/functions';

import { Endpoints, Methods } from 'ts/enums';
import { ColumnData, Column } from 'ts/interfaces';

import { RootState } from 'redux/store';
import apiSlice from './apiSlice';

type OmitColumnData = Omit<ColumnData, 'title' | 'order'>;

interface ColumnResponse {
  id: string;
  body: Column;
}

interface ColumnOrder {
  _id: string;
  order: number;
}

const columnsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllColumns: builder.query<ColumnData[], string>({
      query: (id) =>
        addFetchOptions(`${Endpoints.boards}${id}/${Endpoints.columns}`, Methods.get),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(setCreateColumnPopupOpen(false));
        } catch (error) {
          throw new Error(`${error}`);
        }
      },
      transformResponse: (columns: ColumnData[]) =>
        columns.sort((a, b) => a.order - b.order),
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Column' as const, id: _id })), 'Column']
          : ['Column'],
    }),

    createColumn: builder.mutation<ColumnData, ColumnResponse>({
      query: ({ id, body }) => ({
        ...addFetchOptions(`${Endpoints.boards}${id}/${Endpoints.columns}`, Methods.post),
        body,
      }),
      invalidatesTags: ['Column'],
    }),

    deleteColumnById: builder.mutation<ColumnData, ColumnData>({
      query: ({ _id, boardId }) =>
        addFetchOptions(
          `${Endpoints.boards}${boardId}/${Endpoints.columns}${_id}`,
          Methods.delete
        ),
      invalidatesTags: ['Column'],
    }),

    updateColumnById: builder.mutation<ColumnData, ColumnData>({
      query: ({ _id, boardId, ...body }) => ({
        ...addFetchOptions(
          `${Endpoints.boards}${boardId}/${Endpoints.columns}${_id}`,
          Methods.put
        ),
        body,
      }),
      invalidatesTags: ['Column'],
    }),

    updateOrderColumn: builder.mutation<ColumnData[], ColumnOrder[]>({
      query: (body) => ({
        ...addFetchOptions(`${Endpoints.columnsSet}`, Methods.patch),
        body,
      }),
      invalidatesTags: ['Column'],
    }),

    getColumnById: builder.query<ColumnData, OmitColumnData>({
      query: ({ _id, boardId }) =>
        addFetchOptions(
          `${Endpoints.boards}${boardId}/${Endpoints.columns}${_id}`,
          Methods.get
        ),
      providesTags: ['Column'],
    }),
  }),
});

export const {
  useGetAllColumnsQuery,
  useCreateColumnMutation,
  useDeleteColumnByIdMutation,
  useUpdateColumnByIdMutation,
  useUpdateOrderColumnMutation,
  useGetColumnByIdQuery,
} = columnsApiSlice;

const getBaseAllColumns = (state: RootState, id: string) =>
  columnsApiSlice.endpoints.getAllColumns.select(id)(state);

export { getBaseAllColumns };
