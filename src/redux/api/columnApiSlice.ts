import { setCreationPopupOpen, setEditPopupOpen } from 'redux/slices/popupSlice';
import { Endpoints, Methods } from 'ts/enums';
import { ColumnData, ColumnFormValue } from 'ts/interfaces';
import { addFetchOptions } from 'utils/functions';
import apiSlice from './apiSlice';

type OmitColumnData = Omit<ColumnData, 'title' | 'order'>;

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
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(setCreationPopupOpen(false));
          dispatch(setEditPopupOpen(false));
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
