import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserReactionPostsAPI } from 'api/Endpoint';
import { RootState } from 're-ducks/store/store';

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

export const fetchUserCutePosts = createAsyncThunk<
  Array<PostType>,
  string,
  { rejectValue: { message: string } }
>(
  'userPost/fetchUserCutePosts',
  async (_args, thunkApi) => {
    try {
      const posts = await fetchUserReactionPostsAPI(_args);
      return posts;
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
    builder.addCase(fetchUserCutePosts.fulfilled, (state, action) => {
      const getAction = userPostModule.actions.getSuccessCutePosts(action.payload);
      userPostModule.caseReducers.getSuccessCutePosts(state, getAction);
    });
    builder.addCase(fetchUserCutePosts.rejected, (state, action) => {
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

export const cutePostsSelecter = (state: RootState) => state.userPost.cutePosts;
