import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchUserAPI,
  signOutAPI,
  signInAPI,
  putUserAPI,
  fetchUsersAPI,
  followUserAPI,
  unfollowUserAPI,
  signUpAPI,
} from 'api/Endpoint';
import { push } from 'connected-react-router';
import showSnackbar from 'hook/showSnackbar';

export type UserImageType = {
  file?: File,
  imagePath: string,
};

export type UserType = {
  isSignedIn: boolean,
  id: string,
  name: string,
  nickname: string,
  followerCount: number,
  followingCount: number,
  image: UserImageType,
  follow?: boolean,
};

export type UserStateType = {
  loading: boolean,
  error: string,
  user: UserType,
  users: Array<UserType>,
};

export const initialState: UserStateType = {
  loading: false,
  error: '',
  user: {
    isSignedIn: false,
    id: '',
    name: '',
    nickname: '',
    followerCount: 0,
    followingCount: 0,
    image: {
      imagePath: '',
    },
  },
  users: [],
};

export const signIn = createAsyncThunk<
  UserType,
  { email: string, password: string },
  { rejectValue: { message: string } }
>(
  'user/signIn',
  async (_args, _thunkApi) => {
    try {
      const res = await signInAPI({ ..._args });
      _thunkApi.dispatch(push('/'));
      showSnackbar({ _thunkApi, msg: 'ログインしました。', isError: false });
      return res;
    } catch (e) {
      showSnackbar({ e, _thunkApi });
      return _thunkApi.rejectWithValue({
        message: e.message,
      });
    }
  },
);

export const signUp = createAsyncThunk<
  UserType,
  FormData,
  { rejectValue: { message: string } }
>(
  'user/signUp',
  async (_args, _thunkApi) => {
    try {
      const res = await signUpAPI(_args);
      showSnackbar({ _thunkApi, msg: 'アカウント作成、ログインしました。', isError: false });
      return res;
    } catch (e) {
      showSnackbar({ e, _thunkApi });
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
        id: '',
        name: '',
        nickname: '',
        followerCount: 0,
        followingCount: 0,
        image: {
          imagePath: '',
        },
      };
    } catch (e) {
      showSnackbar({ e, _thunkApi });
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
      showSnackbar({ e, _thunkApi });
      return _thunkApi.rejectWithValue({
        message: e.message,
      });
    }
  },
);

export const updateUser = createAsyncThunk<
  UserType,
  FormData,
  { rejectValue: { message: string } }
>(
  'user/updateUser',
  async (_args, _thunkApi) => {
    try {
      const res = await putUserAPI(_args);
      _thunkApi.dispatch(push('/mypage'));
      return res;
    } catch (e) {
      showSnackbar({ e, _thunkApi });
      return _thunkApi.rejectWithValue({
        message: e.message,
      });
    }
  },
);

export const fetchUsers = createAsyncThunk<
  Array<UserType>,
  void,
  { rejectValue: { message: string } }
>(
  'user/fetchUsers',
  async (_args, _thunkApi) => {
    try {
      const res = await fetchUsersAPI();
      return res;
    } catch (e) {
      showSnackbar({ e, _thunkApi });
      return _thunkApi.rejectWithValue({
        message: e.message,
      });
    }
  },
);

export const followUser = createAsyncThunk<
  { followingCount: number, user: UserType },
  string,
  { rejectValue: { message: string } }
>(
  'user/followUser',
  async (_args, _thunkApi) => {
    try {
      const res = await followUserAPI(_args);
      return res;
    } catch (e) {
      showSnackbar({ e, _thunkApi });
      return _thunkApi.rejectWithValue({
        message: e.message,
      });
    }
  },
);

export const unfollowUser = createAsyncThunk<
  { followingCount: number, userId: string },
  string,
  { rejectValue: { message: string } }
>(
  'user/unfollowUser',
  async (_args, _thunkApi) => {
    try {
      const res = await unfollowUserAPI(_args);
      return res;
    } catch (e) {
      showSnackbar({ e, _thunkApi });
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
    getSuccessUsers: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    getSuccessLogout: (state, action) => {
      state.user = action.payload;
    },
    updateSuccessUser: (state, action) => {
      state.user = action.payload;
    },
    followSuccess: (state, action) => {
      state.user.followingCount = action.payload;
    },
    unfollowSuccess: (state, action) => {
      state.user.followingCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      const getAction = userModule.actions.getSuccessUser(action.payload);
      userModule.caseReducers.getSuccessUser(state, getAction);
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      const getAction = userModule.actions.getSuccessUser(action.payload);
      userModule.caseReducers.getSuccessUser(state, getAction);
    });
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
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const getAction = userModule.actions.getSuccessUsers(action.payload);
      userModule.caseReducers.getSuccessUsers(state, getAction);
    });
    builder.addCase(followUser.fulfilled, (state, action) => {
      const getAction = userModule.actions.followSuccess(action.payload.followingCount);
      userModule.caseReducers.followSuccess(state, getAction);

      const actionUser = action.payload.user;
      const users = state.users.map((user) => (user.id === actionUser.id ? actionUser : user));
      const getActionUsers = userModule.actions.getSuccessUsers(users);
      userModule.caseReducers.getSuccessUsers(state, getActionUsers);
    });
    builder.addCase(unfollowUser.fulfilled, (state, action) => {
      const getAction = userModule.actions.unfollowSuccess(action.payload.followingCount);
      userModule.caseReducers.unfollowSuccess(state, getAction);

      const unfollow = state.users.find((user) => user.id === action.payload.userId);
      unfollow!.followerCount -= 1;
      unfollow!.follow = false;
      const users = state.users.map((user) => (user.id === unfollow!.id ? unfollow : user));
      const getActionUsers = userModule.actions.getSuccessUsers(users);
      userModule.caseReducers.getSuccessUsers(state, getActionUsers);
    });
  },
});

export const {
  getSuccessUser,
  getSuccessUsers,
  getSuccessLogout,
  updateSuccessUser,
  followSuccess,
  unfollowSuccess,
} = userModule.actions;

export default userModule.reducer;
