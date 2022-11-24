import { setCreationPopupOpen, setEditPopupOpen } from 'redux/slices/popupSlice';
import { setSelectedProject } from 'redux/slices/projectSlice';
import { Endpoints, Methods } from 'ts/enums';
import { Project, ProjectData } from 'ts/interfaces';
import { addFetchOptions } from 'utils/functions';
import apiSlice from './apiSlice';

type OmitProjectData = Omit<ProjectData, '_id'>;

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query<Project[], void>({
      query: () => addFetchOptions(`${Endpoints.boards}`, Methods.get),
      transformResponse: (projects: ProjectData[]) =>
        projects.map(({ title, ...data }) => ({
          ...data,
          ...JSON.parse(title),
        })),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(setCreationPopupOpen(false));
          dispatch(setEditPopupOpen(false));
          dispatch(setSelectedProject(null));
        } catch (error) {
          throw new Error(`${error}`);
        }
      },
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Project' as const, _id })), 'Project']
          : ['Project'],
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
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectByIdMutation,
} = projectsApiSlice;
