import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import baseUrl from 'utils/constants';

const testApi = createApi({
  reducerPath: 'garageApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: [''],
  endpoints: () => ({}),
});

export default testApi;
