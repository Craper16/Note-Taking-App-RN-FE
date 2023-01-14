import {configureStore} from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import {authApi} from './api/authApi';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import notesSlice from './notes/notesSlice';
import {notesApi} from './api/notesApi';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    notes: notesSlice,
    [authApi.reducerPath]: authApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(notesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
