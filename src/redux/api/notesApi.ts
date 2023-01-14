import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_KEY} from '@env';
import * as Keychain from 'react-native-keychain';

interface updateModel {
  noteId: string;
  body: {
    title: string;
    content: string;
    tags: string[];
  };
}

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
      query: (body: {
        title: string;
        content: string;
        tags: string[];
        categoryTitle: string;
      }) => {
        return {
          url: '/note/create-note',
          method: 'post',
          body,
        };
      },
    }),
    updateNote: builder.mutation({
      query: ({noteId, body}: updateModel) => {
        return {
          url: `/note/update-note/${noteId}`,
          method: 'put',
          body,
        };
      },
    }),
    deleteNote: builder.mutation({
      query: (noteId: string) => {
        return {
          url: `/note/delete-note/${noteId}`,
          method: 'delete',
        };
      },
    }),
  }),
});

export const {
  useFetchNotesQuery,
  useCreateNoteMutation,
  useFetchNoteQuery,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
