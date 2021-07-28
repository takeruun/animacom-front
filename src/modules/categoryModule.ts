import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategoriesAPI } from 'api/Endpoint';

type CategoryType = {
  categories: Array<{ id: string, name: string }>,
};

export type CategoryStateType = {
  loading: boolean,
  error: string,
  categories: Array<{ id: string, name: string }>,
};

const initialState: CategoryStateType = {
  loading: false,
  error: '',
  categories: [],
};

export const fetchCategories = createAsyncThunk<
  CategoryType,
  void,
  { rejectValue: { message: string } }
>(
  'category/fetchCategories',
  async (_args, _thunkApi) => {
    try {
      const res = await fetchCategoriesAPI();
      return res.categories;
    } catch (e) {
      return _thunkApi.rejectWithValue({
        message: e.stack,
      });
    }
  },
);

export const categoryModule = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getStart: (state) => {
      state.loading = true;
    },
    getSuccessCategory: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      const getAction = categoryModule.actions.getSuccessCategory(action.payload);
      categoryModule.caseReducers.getSuccessCategory(state, getAction);
    });
  },
});
