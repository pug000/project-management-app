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
import userSlice from './slices/userSlice';
import projectSlice from './slices/projectSlice';
import columnSlice from './slices/columnSlice';
import taskSlice from './slices/taskSlice';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: [],
};

const userConfig = {
  key: 'user',
  storage,
  version: 1,
  whitelist: ['user', 'authUser', 'isLoggedIn'],
};

const rootReducer = combineReducers({
  user: persistReducer(userConfig, userSlice),
  project: projectSlice,
  column: columnSlice,
  task: taskSlice,

  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
export { persistor };
export default store;
