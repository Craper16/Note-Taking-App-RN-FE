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
    setDropDownCategories: (
      state,
      action: PayloadAction<{data: dropDownCategoriesModel[]}>,
    ) => {
      state.dropDownCategories = [...action.payload.data];
    },
  },
});

export const {setCategories, setDropDownCategories} = categoriesSlice.actions;

export default categoriesSlice.reducer;
