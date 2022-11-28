// import { setEditPopupOpen } from 'redux/slices/popupSlice';
import { setCreateColumnPopupOpen } from 'redux/slices/columnSlice';

import { addFetchOptions } from 'utils/functions';

import { Endpoints, Methods } from 'ts/enums';
import { ColumnData, Column } from 'ts/interfaces';

import apiSlice from './apiSlice';

type OmitColumnData = Omit<ColumnData, 'title' | 'order'>;

interface ColumnResponse {
  id: string;
  body: Column;
}

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
    createColumn: builder.mutation<ColumnData, ColumnResponse>({
      query: ({ id, body }) => ({
        ...addFetchOptions(`${Endpoints.boards}${id}/${Endpoints.columns}`, Methods.post),
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(setCreateColumnPopupOpen(false));
          // dispatch(setEditPopupOpen(false));
        } catch (error) {
          throw new Error(`${error}`);
        }
      },
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
  useGetColumnByIdQuery,
} = columnsApiSlice;
