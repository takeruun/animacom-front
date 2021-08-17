import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export type SnackbarStateType = {
  isShow: boolean,
  isError: boolean,
  error: string,
  message: string,
};

const initialState: SnackbarStateType = {
  isShow: false,
  isError: false,
  error: '',
  message: '',
};

export const snackbarModule = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    open: (state, action) => {
      state.isShow = true;
      state.isError = action.payload.isError ?? initialState.isError;
      state.error = action.payload.error ?? initialState.error;
      state.message = action.payload.message;
    },
    close: (state) => {
      state.isShow = false;
    },
  },
});

export const { open, close } = snackbarModule.actions;

export const openSnackbar = createAsyncThunk<
  void,
  SnackbarStateType
>(
  'snack/openSnackbar',
  async (_args, _thunkApi) => {
    _thunkApi.dispatch(close());
    _thunkApi.dispatch(open(_args));
  },
);

export const closeSnackbar = createAsyncThunk<
  void,
  void
>(
  'snack/closeSnackbar',
  async (_args, _thunkApi) => {
    _thunkApi.dispatch(close());
  },
);
