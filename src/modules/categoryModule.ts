import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategoriesAPI, fetchRootCategoriesAPI } from 'api/Endpoint';
import showSnackbar from 'hook/showSnackbar';

export type CategoryType = {
  id: string,
  name: string,
};

type CategoryStateType = {
  loading: boolean,
  error: string,
  categories: Array<{ id: string, name: string }>,
  rootCategories: Array<{ id: string, name: string }>,
};

const initialState: CategoryStateType = {
  loading: false,
  error: '',
  categories: [],
  rootCategories: [],
};

export const fetchCategories = createAsyncThunk<
  Array<CategoryType>,
  void,
  { rejectValue: { message: string } }
>(
  'category/fetchCategories',
  async (_args, _thunkApi) => {
    try {
      const res = await fetchCategoriesAPI();
      return res;
    } catch (e) {
      showSnackbar(e, _thunkApi);
      return _thunkApi.rejectWithValue({
        message: e.stack,
      });
    }
  },
);

export const fetchRootCategories = createAsyncThunk<
  Array<CategoryType>,
  void,
  { rejectValue: { message: string } }
>(
  'category/fetchRootCategories',
  async (_args, _thunkApi) => {
    try {
      const res = await fetchRootCategoriesAPI();
      return res;
    } catch (e) {
      showSnackbar(e, _thunkApi);
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
    getSuccessRootCategory: (state, action) => {
      state.loading = false;
      state.rootCategories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      const getAction = categoryModule.actions.getSuccessCategory(action.payload);
      categoryModule.caseReducers.getSuccessCategory(state, getAction);
    });
    builder.addCase(fetchRootCategories.fulfilled, (state, action) => {
      const getAction = categoryModule.actions.getSuccessRootCategory(action.payload);
      categoryModule.caseReducers.getSuccessRootCategory(state, getAction);
    });
  },
});
