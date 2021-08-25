import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserReactionPostsAPI } from 'api/Endpoint';
import showSnackbar from 'hook/showSnackbar';
import { PostType } from './postModule';

export type UserPostStateType = {
  loading: boolean,
  error: string,
  cutePosts: Array<PostType>,
  favPosts: Array<PostType>,
  goodPosts: Array<PostType>,
  coolPosts: Array<PostType>,
};

export const initialState: UserPostStateType = {
  loading: false,
  error: '',
  cutePosts: [],
  favPosts: [],
  goodPosts: [],
  coolPosts: [],
};

export const fetchUserReactionPosts = createAsyncThunk<
  { posts: Array<PostType>, kind: string },
  string,
  { rejectValue: { message: string } }
>(
  'userPost/fetchUserReactionPosts',
  async (_args, _thunkApi) => {
    try {
      const res = await fetchUserReactionPostsAPI(_args);
      return res;
    } catch (e) {
      showSnackbar(e, _thunkApi);
      return _thunkApi.rejectWithValue({
        message: e.stack,
      });
    }
  },
);

export const userPostModule = createSlice({
  name: 'userPost',
  initialState,
  reducers: {
    getStart: (state) => {
      state.loading = true;
    },
    getSuccessCutePosts: (state, action) => {
      state.loading = false;
      state.cutePosts = action.payload;
    },
    getSuccessFavPosts: (state, action) => {
      state.loading = false;
      state.favPosts = action.payload;
    },
    getSuccessGoodPosts: (state, action) => {
      state.loading = false;
      state.goodPosts = action.payload;
    },
    getSuccessCoolPosts: (state, action) => {
      state.loading = false;
      state.coolPosts = action.payload;
    },
    getFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserReactionPosts.pending, (state) => {
      userPostModule.caseReducers.getStart(state);
    });
    builder.addCase(fetchUserReactionPosts.fulfilled, (state, action) => {
      if (action.payload.kind === 'cute') {
        const getAction = userPostModule.actions.getSuccessCutePosts(action.payload.posts);
        userPostModule.caseReducers.getSuccessCutePosts(state, getAction);
      } else if (action.payload.kind === 'fav') {
        const getAction = userPostModule.actions.getSuccessFavPosts(action.payload.posts);
        userPostModule.caseReducers.getSuccessFavPosts(state, getAction);
      } else if (action.payload.kind === 'good') {
        const getAction = userPostModule.actions.getSuccessGoodPosts(action.payload.posts);
        userPostModule.caseReducers.getSuccessGoodPosts(state, getAction);
      } else if (action.payload.kind === 'cool') {
        const getAction = userPostModule.actions.getSuccessCoolPosts(action.payload.posts);
        userPostModule.caseReducers.getSuccessCoolPosts(state, getAction);
      }
    });
    builder.addCase(fetchUserReactionPosts.rejected, (state, action) => {
      const getAction = userPostModule.actions.getFailure(action.payload);
      userPostModule.caseReducers.getFailure(state, getAction);
    });
  },
});

export const {
  getStart,
  getSuccessCutePosts,
  getSuccessFavPosts,
  getSuccessGoodPosts,
  getSuccessCoolPosts,
} = userPostModule.actions;

export default userPostModule.reducer;
