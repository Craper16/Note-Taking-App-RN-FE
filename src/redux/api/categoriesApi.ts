import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_KEY} from '@env';
import * as Keychain from 'react-native-keychain';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
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
    fetchCategories: builder.query<void, void>({
      query: () => {
        return {
          url: '/category/categories',
          method: 'get',
        };
      },
    }),
  }),
});

export const {useFetchCategoriesQuery} = categoriesApi;
