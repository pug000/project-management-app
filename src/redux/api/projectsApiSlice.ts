import { Endpoints, Methods } from 'ts/enums';
import { ProjectData } from 'ts/interfaces';
import { addFetchOptions } from 'utils/functions';
import apiSlice from './apiSlice';

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query<ProjectData[], void>({
      query: () => addFetchOptions(`${Endpoints.boards}`, Methods.get),
    }),
  }),
});

export const { useGetAllProjectsQuery } = projectsApiSlice;
