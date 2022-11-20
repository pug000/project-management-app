import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'redux/store';

import { baseUrl } from 'utils/constants';

import { Endpoints, Methods } from 'ts/enums';
import { ProjectData } from 'ts/interfaces';
import { addFetchOptions } from 'utils/functions';

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
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
  endpoints: (builder) => ({
    getAllProjects: builder.query<ProjectData[], void>({
      query: () => addFetchOptions(`${Endpoints.boards}`, Methods.get),
    }),
  }),
});

export const { useGetAllProjectsQuery } = projectsApi;
