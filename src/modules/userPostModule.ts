import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserReactionPostsAPI } from 'api/Endpoint';

type PostType = {
  id: string,
  title: string,
  subTitle: string,
  body: string,
  categoryId: string,
  images: Array<{ id: string, file: File | null, imagePath: string }>
  cuteCount: number,
  favCount: number,
  goodCount: number,
  coolCount: number,
  alreadyCuted?: boolean,
  alreadyFaved?: boolean,
  alreadyGooded?: boolean,
  alreadyCooled?: boolean,
  reactions?: Array<{ id: string, kind: number }>,
};

export type UserPostStateType = {
  loading: boolean,
  error: string,
  cutePosts: Array<PostType>,
  favPosts: Array<PostType>,
  goodPosts: Array<PostType>,
  coolPosts: Array<PostType>,
};

const initialState: UserPostStateType = {
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
  async (_args, thunkApi) => {
    try {
      const posts = await fetchUserReactionPostsAPI(_args);
      return { posts, kind: _args };
    } catch (e) {
      return thunkApi.rejectWithValue({
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
      state.cutePosts = action.payload.posts;
    },
    getSuccessFavPosts: (state, action) => {
      state.loading = false;
      state.favPosts = action.payload.posts;
    },
    getSuccessGoodPosts: (state, action) => {
      state.loading = false;
      state.goodPosts = action.payload.posts;
    },
    getSuccessCoolPosts: (state, action) => {
      state.loading = false;
      state.coolPosts = action.payload.posts;
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
