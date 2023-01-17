import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_KEY} from '@env';
import * as Keychain from 'react-native-keychain';
import {categoryData} from '../../interfaces/categoryInterface';

interface categoriesResponse {
  categories: categoryData[];
}

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
  endpoints: builder => ({
    fetchCategories: builder.query<categoriesResponse, void>({
      query: () => {
        return {
          url: '/category/categories',
          method: 'get',
        };
      },
    }),
    addCategory: builder.mutation({
      query: (body: {title: string}) => {
        return {
          url: '/category/create-category',
          method: 'post',
          body,
        };
      },
    }),
  }),
});

export const {useFetchCategoriesQuery, useAddCategoryMutation} = categoriesApi;
