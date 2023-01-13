import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_KEY} from '@env';
import * as Keychain from 'react-native-keychain';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_KEY,
    prepareHeaders: async (headers: Headers) => {
      try {
        const accessToken = await Keychain.getGenericPassword();

        if (accessToken) {
          headers.set('Authorization', `Bearer ${accessToken.password}`);
        }
      } catch (error) {
        console.log('Keychain could not be accessed', error);
      }
    },
  }),
  keepUnusedDataFor: 0,
  endpoints: builder => ({
    fetchNotes: builder.query({
      query: (page: number) => {
        return {
          url: `/note/notes?page=${page}`,
          method: 'get',
        };
      },
    }),
    fetchNote: builder.query({
      query: (noteId: string) => {
        return {
          url: `/note/${noteId}`,
          method: 'get',
        };
      },
    }),
    createNote: builder.mutation({
      query: body => {
        return {
          url: '/note/create-note',
          method: 'post',
          body,
        };
      },
    }),
  }),
});

export const {useFetchNotesQuery, useCreateNoteMutation, useFetchNoteQuery} =
  notesApi;
