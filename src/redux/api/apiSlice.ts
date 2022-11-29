import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from 'redux/store';

import { baseUrl } from 'utils/constants';

const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers, { getState }) {
      const { authUser } = (getState() as RootState).user;

      if (authUser?.token) {
        headers.set('authorization', `Bearer ${authUser?.token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['User', 'Project', 'Column', 'Task'],
  endpoints: () => ({}),
});

export default apiSlice;
