import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import apiSlice from './api/apiSlice';
import { projectsApi } from './api/projectsApi';
import userSlice from './slices/userSlice';
import popupSlice from './slices/popupSlice';

const rootReducer = combineReducers({
  user: userSlice,
  popup: popupSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [projectsApi.reducerPath]: projectsApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  blacklist: ['apiSlice', 'popupSlice', 'projectsApi'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(apiSlice.middleware)
      .concat(projectsApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
export { persistor };
export default store;
