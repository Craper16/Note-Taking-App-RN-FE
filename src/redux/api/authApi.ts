import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_KEY} from '@env';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_KEY,
  }),
  endpoints: builder => ({
    signUpUser: builder.mutation({
      query: (body: {username: string; password: string}) => {
        return {
          url: `/auth/signup`,
          method: 'post',
          body,
        };
      },
    }),
    signInUser: builder.mutation({
      query: (body: {username: string; password: string}) => {
        return {
          url: `/auth/signin`,
          method: 'post',
          body,
        };
      },
    }),
  }),
});

export const {useSignInUserMutation, useSignUpUserMutation} = authApi;
