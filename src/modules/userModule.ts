import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchUserAPI,
  signOutAPI,
  signInAPI,
  putUserAPI,
} from 'api/Endpoint';
import { push } from 'connected-react-router';
import showSnackbar from 'hook/showSnackbar';

export type UserType = {
  isSignedIn: boolean,
  uid: string,
  name: string,
  nickname: string,
}

export type UserStateType = {
  loading: boolean,
  error: string,
  user: UserType,
  users: Array<UserType>,
};

const initialState: UserStateType = {
  loading: false,
  error: '',
  user: {
    isSignedIn: false,
    uid: '',
    name: '',
    nickname: '',
  },
  users: [],
};

export const signIn = createAsyncThunk<
  UserType,
  { email: string, password: string },
  { rejectValue: { message: string } }
>(
  'user/fetchUser',
  async (_args, _thunkApi) => {
    try {
      const res = await signInAPI({ ..._args });
      _thunkApi.dispatch(push('/'));
      return res;
    } catch (e) {
      showSnackbar(e, _thunkApi);
      return _thunkApi.rejectWithValue({
        message: e.message,
      });
    }
  },
);

export const signOut = createAsyncThunk<
  UserType,
  void,
  { rejectValue: { message: string } }
>(
  'user/signOut',
  async (_args, _thunkApi) => {
    try {
      await signOutAPI();
      return {
        isSignedIn: false,
        uid: '',
        name: '',
        nickname: '',
      };
    } catch (e) {
      showSnackbar(e, _thunkApi);
      return _thunkApi.rejectWithValue({
        message: e.message,
      });
    }
  },
);

export const fetchUser = createAsyncThunk<
  UserType,
  void,
  { rejectValue: { message: string } }
>(
  'user/fetchUser',
  async (_args, _thunkApi) => {
    try {
      const res = await fetchUserAPI();
      return res;
    } catch (e) {
      showSnackbar(e, _thunkApi);
      return _thunkApi.rejectWithValue({
        message: e.message,
      });
    }
  },
);

export const updateUser = createAsyncThunk<
  UserType,
  { name: string, nickname: string },
  { rejectValue: { message: string } }
>(
  'user/updateUser',
  async (_args, _thunkApi) => {
    try {
      const res = await putUserAPI({ ..._args });
      _thunkApi.dispatch(push('/mypage'));
      return res;
    } catch (e) {
      showSnackbar(e, _thunkApi);
      return _thunkApi.rejectWithValue({
        message: e.message,
      });
    }
  },
);

export const userModule = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getStart: (state) => {
      state.loading = true;
    },
    getSuccessUser: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    getSuccessLogout: (state, action) => {
      state.user = action.payload;
    },
    updateSuccessUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      const getAction = userModule.actions.getSuccessUser(action.payload);
      userModule.caseReducers.getSuccessUser(state, getAction);
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
      const getAction = userModule.actions.getSuccessLogout(action.payload);
      userModule.caseReducers.getSuccessLogout(state, getAction);
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const getAction = userModule.actions.updateSuccessUser(action.payload);
      userModule.caseReducers.updateSuccessUser(state, getAction);
    });
  },
});
