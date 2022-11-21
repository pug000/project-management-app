import { Endpoints, Methods } from 'ts/enums';
import { Project, ProjectData } from 'ts/interfaces';
import { addFetchOptions } from 'utils/functions';
import apiSlice from './apiSlice';

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query<Project[], void>({
      query: () => addFetchOptions(`${Endpoints.boards}`, Methods.get),
      transformResponse: (projects: ProjectData[]) =>
        projects.map(({ title, ...data }) => ({
          ...data,
          ...JSON.parse(title),
        })),
    }),
    deleteProjectById: builder.mutation<ProjectData, string>({
      query: (_id: string) =>
        addFetchOptions(`${Endpoints.boards}${_id}`, Methods.delete),
    }),
  }),
});

export const { useGetAllProjectsQuery, useDeleteProjectByIdMutation } = projectsApiSlice;
