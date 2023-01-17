import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  categoryData,
  dropDownCategoriesModel,
} from '../../interfaces/categoryInterface';

interface categoriesModel {
  categories: categoryData[];
  dropDownCategories: dropDownCategoriesModel[];
}

const initialState: categoriesModel = {
  categories: [],
  dropDownCategories: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<{data: categoryData[]}>) => {
      state.categories = [...action.payload.data];
    },
    setCategory: (state, action: PayloadAction<{data: categoryData}>) => {
      state.categories = [action.payload.data, ...state.categories];
    },
    setDropDownCategories: (
      state,
      action: PayloadAction<{data: dropDownCategoriesModel[]}>,
    ) => {
      state.dropDownCategories = [
        ...state.dropDownCategories,
        ...action.payload.data,
      ];
    },
    addCategoryToDropDown: (
      state,
      action: PayloadAction<dropDownCategoriesModel>,
    ) => {
      state.dropDownCategories = [action.payload, ...state.dropDownCategories];
    },
    defaultCategories: state => {
      state.categories = initialState.categories;
      state.dropDownCategories = initialState.dropDownCategories;
    },
  },
});

export const {
  setCategories,
  setDropDownCategories,
  setCategory,
  defaultCategories,
  addCategoryToDropDown,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
