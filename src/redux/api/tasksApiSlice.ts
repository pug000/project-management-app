import {
  setCreateTaskPopupOpen,
  setEditTaskPopupOpen,
  setLoadingGetAllTasks,
} from 'redux/slices/taskSlice';
import { RootState } from 'redux/store';

import { addFetchOptions } from 'utils/functions';

import { Endpoints, Methods } from 'ts/enums';
import { NewTask, Task, TaskData, TasksProps } from 'ts/interfaces';

import apiSlice from './apiSlice';

interface MutationTaskProps extends TasksProps {
  id: string;
  body: NewTask;
}

interface TaskOrder {
  _id: string;
  order: number;
  columnId: string;
}

const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.query<Task[], TasksProps>({
      query: ({ boardId, columnId }) =>
        addFetchOptions(
          `${Endpoints.boards}${boardId}/${Endpoints.columns}${columnId}/${Endpoints.tasks}`,
          Methods.get
        ),
      transformResponse: (tasks: TaskData[]) =>
        tasks
          .map((data) => ({
            ...data,
            ...JSON.parse(data.description),
          }))
          .sort((a, b) => a.order - b.order),
      onQueryStarted: async (_, { dispatch, queryFulfilled, getState }) => {
        try {
          dispatch(setLoadingGetAllTasks(true));
          const { isEditTaskPopupOpen, isCreateTaskPopupOpen } = (getState() as RootState)
            .task;
          await queryFulfilled;
          dispatch(setLoadingGetAllTasks(false));
          if (isCreateTaskPopupOpen) {
            dispatch(setCreateTaskPopupOpen(false));
          } else if (isEditTaskPopupOpen) {
            dispatch(setEditTaskPopupOpen(false));
          }
        } catch (error) {
          if (error instanceof Error) {
            throw error;
          }
        }
      },
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Task' as const, id: _id })), 'Task']
          : ['Task'],
    }),

    createTask: builder.mutation<TaskData, Omit<MutationTaskProps, 'id'>>({
      query: ({ boardId, columnId, body }) => ({
        ...addFetchOptions(
          `${Endpoints.boards}${boardId}/${Endpoints.columns}${columnId}/${Endpoints.tasks}`,
          Methods.post
        ),
        body,
      }),
      invalidatesTags: ['Task'],
    }),

    updateTask: builder.mutation<TaskData, MutationTaskProps>({
      query: ({ boardId, columnId, id, body }) => ({
        ...addFetchOptions(
          `${Endpoints.boards}${boardId}/${Endpoints.columns}${columnId}/${Endpoints.tasks}${id}`,
          Methods.put
        ),
        body: {
          ...body,
          columnId,
        },
      }),
      invalidatesTags: ['Task'],
    }),

    updateOrderTask: builder.mutation<TaskData[], TaskOrder[]>({
      query: (body) => ({
        ...addFetchOptions(`${Endpoints.tasksSet}`, Methods.patch),
        body,
      }),
      invalidatesTags: ['Task'],
    }),

    deleteTask: builder.mutation<TaskData, Omit<MutationTaskProps, 'body'>>({
      query: ({ boardId, columnId, id }) => ({
        ...addFetchOptions(
          `${Endpoints.boards}${boardId}/${Endpoints.columns}${columnId}/${Endpoints.tasks}${id}`,
          Methods.delete
        ),
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useUpdateOrderTaskMutation,
  useDeleteTaskMutation,
} = tasksApiSlice;

const getBaseAllTasks = (state: RootState, query: TasksProps) =>
  tasksApiSlice.endpoints.getAllTasks.select(query)(state);

export { getBaseAllTasks };
