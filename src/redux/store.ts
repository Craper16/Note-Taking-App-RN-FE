import {configureStore} from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import {authApi} from './api/authApi';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import notesSlice from './notes/notesSlice';
import {notesApi} from './api/notesApi';
import categoriesSlice from './categories/categoriesSlice';
import {categoriesApi} from './api/categoriesApi';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    notes: notesSlice,
    categories: categoriesSlice,
    [authApi.reducerPath]: authApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(notesApi.middleware)
      .concat(categoriesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
