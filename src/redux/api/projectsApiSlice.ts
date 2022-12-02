import {
  setCreateProjectPopupOpen,
  setEditProjectPopupOpen,
} from 'redux/slices/projectSlice';
import { RootState } from 'redux/store';

import { addFetchOptions } from 'utils/functions';

import { Endpoints, Methods } from 'ts/enums';
import { Project, ProjectData } from 'ts/interfaces';

import apiSlice from './apiSlice';

type OmitProjectData = Omit<ProjectData, '_id'>;

const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query<Project[], void>({
      query: () => addFetchOptions(`${Endpoints.boards}`, Methods.get),
      transformResponse: (projects: ProjectData[]) =>
        projects.map(({ title, ...data }) => ({
          ...data,
          ...JSON.parse(title),
        })),
      onQueryStarted: async (_, { dispatch, queryFulfilled, getState }) => {
        try {
          const { isCreateProjectPopupOpen, isEditProjectPopupOpen } = (
            getState() as RootState
          ).project;
          await queryFulfilled;
          if (isCreateProjectPopupOpen) {
            dispatch(setCreateProjectPopupOpen(false));
          } else if (isEditProjectPopupOpen) {
            dispatch(setEditProjectPopupOpen(false));
          }
        } catch (error) {
          if (error instanceof Error) {
            throw error;
          }
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Project' as const, id: _id })),
              'Project',
            ]
          : ['Project'],
    }),

    getProjectById: builder.query<Project, string>({
      query: (id: string) => addFetchOptions(`${Endpoints.boards}${id}`, Methods.get),
      transformResponse: (project: ProjectData) =>
        project
          ? {
              ...project,
              ...JSON.parse(project.title),
            }
          : undefined,
      providesTags: ['Project'],
    }),

    createProject: builder.mutation<ProjectData, OmitProjectData>({
      query: (body: OmitProjectData) => ({
        ...addFetchOptions(`${Endpoints.boards}`, Methods.post),
        body,
      }),
      invalidatesTags: ['Project'],
    }),

    updateProject: builder.mutation<ProjectData, ProjectData>({
      query: ({ _id, ...body }: ProjectData) => ({
        ...addFetchOptions(`${Endpoints.boards}${_id}`, Methods.put),
        body,
      }),
      invalidatesTags: ['Project'],
    }),

    deleteProjectById: builder.mutation<ProjectData, string>({
      query: (_id: string) =>
        addFetchOptions(`${Endpoints.boards}${_id}`, Methods.delete),
      invalidatesTags: ['Project'],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectByIdMutation,
} = projectsApiSlice;
