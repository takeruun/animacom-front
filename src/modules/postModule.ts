import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  searchPostsAPI,
  fetchPostsAPI,
  fetchPostAPI,
  createPostAPI,
  editPostAPI,
  postReactionsAPI,
  destroyReactionsAPI,
  destroyPostAPI,
} from 'api/Endpoint';
import { push } from 'connected-react-router';
import showSnackbar from 'hook/showSnackbar';

export type PostType = {
  id: string,
  title: string,
  subTitle: string,
  body: string,
  categoryId: string,
  images: Array<{ id: string, file: File, imagePath: string }>
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

export type PostStateType = {
  loading: boolean,
  error: string,
  post: PostType,
  latest: Array<PostType>,
  dayAgo: Array<PostType>,
  cute5: Array<PostType>,
  fav5: Array<PostType>,
  good5: Array<PostType>,
  cool5: Array<PostType>,
  searchPosts: Array<PostType>,
};

export const initialState: PostStateType = {
  loading: false,
  error: '',
  post: {
    id: '',
    title: '',
    subTitle: '',
    body: '',
    categoryId: '',
    images: [],
    cuteCount: 0,
    favCount: 0,
    goodCount: 0,
    coolCount: 0,
  },
  latest: [],
  dayAgo: [],
  cute5: [],
  fav5: [],
  good5: [],
  cool5: [],
  searchPosts: [],
};

export const fetchCategoryPosts = createAsyncThunk<
  Array<PostType>,
  number,
  { rejectValue: { message: string } }
>(
  'post/fetchCategoryPosts',
  async (_args, _thunkApi) => {
    try {
      const res = await searchPostsAPI({ categoryId: _args });
      return res;
    } catch (e) {
      _thunkApi.dispatch(showSnackbar({ e }));
      return _thunkApi.rejectWithValue({
        message: e.message,
      });
    }
  },
);

export const searchPosts = createAsyncThunk<
  Array<PostType>,
  string,
  { rejectValue: { message: string } }
>(
  'post/searchPosts',
  async (_args, _thunkApi) => {
    try {
      const res = await searchPostsAPI({ keyword: _args });
      return res;
    } catch (e) {
      _thunkApi.dispatch(showSnackbar({ e }));
      return _thunkApi.rejectWithValue({
        message: e.message,
      });
    }
  },
);

export const fetchPosts = createAsyncThunk<
  { posts: Array<PostType>, path: string },
  string,
  { rejectValue: { message: string } }
>(
  'post/fetchPosts',
  async (_args, _thunkApi) => {
    try {
      const res = await fetchPostsAPI(_args);
      return { posts: res, path: _args };
    } catch (e) {
      _thunkApi.dispatch(showSnackbar({ e }));
      return _thunkApi.rejectWithValue({
        message: e.message,
      });
    }
  },
);

export const fetchPost = createAsyncThunk<
  PostType,
  string,
  { rejectValue: { message: string } }
>(
  'post/fetchPost',
  async (_args, _thunkApi) => {
    try {
      const res = await fetchPostAPI(_args);
      return res;
    } catch (e) {
      _thunkApi.dispatch(showSnackbar({ e }));
      return _thunkApi.rejectWithValue({
        message: e.message,
      });
    }
  },
);

export const editPost = createAsyncThunk<
  PostType,
  { id: string, data: FormData },
  { rejectValue: { message: string } }
>(
  'post/editPost',
  async (_args, _thunkApi) => {
    try {
      const res = await editPostAPI(_args.id, _args.data);
      _thunkApi.dispatch(push('/'));
      return res;
    } catch (e) {
      _thunkApi.dispatch(showSnackbar({ e }));
      return _thunkApi.rejectWithValue({
        message: e.stack,
      });
    }
  },
);

export const createPost = createAsyncThunk<
  PostType,
  FormData,
  { rejectValue: { message: string } }
>(
  'post/editPost',
  async (_args, _thunkApi) => {
    try {
      const res = await createPostAPI(_args);
      _thunkApi.dispatch(push('/'));
      return res;
    } catch (e) {
      _thunkApi.dispatch(showSnackbar({ e }));
      return _thunkApi.rejectWithValue({
        message: e.stack,
      });
    }
  },
);

export const destroyPost = createAsyncThunk<
  '',
  string,
  { rejectValue: { message: string } }
>(
  'post/destroyPost',
  async (_args, _thunkApi) => {
    try {
      await destroyPostAPI(_args);
      return '';
    } catch (e) {
      _thunkApi.dispatch(showSnackbar({ e }));
      return _thunkApi.rejectWithValue({
        message: e.stack,
      });
    }
  },
);

export const postReactions = createAsyncThunk<
  PostType,
  { id: string, kind: string },
  { rejectValue: { message: string } }
>(
  'post/postReactions',
  async (_args, _thunkApi) => {
    try {
      const res = await postReactionsAPI(_args.id, _args.kind);
      return res;
    } catch (e) {
      _thunkApi.dispatch(showSnackbar({ e }));
      return _thunkApi.rejectWithValue({
        message: e.message,
      });
    }
  },
);

export const destroyReactions = createAsyncThunk<
  PostType,
  { id: string, kind: string },
  { rejectValue: { message: string } }
>(
  'post/destroyReactions',
  async (_args, _thunkApi) => {
    try {
      const res = await destroyReactionsAPI(_args.id, _args.kind);
      return res;
    } catch (e) {
      _thunkApi.dispatch(showSnackbar({ e }));
      return _thunkApi.rejectWithValue({
        message: e.message,
      });
    }
  },
);

export const postModule = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getStart: (state) => {
      state.loading = true;
    },
    getSuccessPost: (state, action) => {
      state.loading = false;
      state.post = action.payload;
    },
    getSuccessSearchPosts: (state, action) => {
      state.loading = false;
      state.searchPosts = action.payload;
    },
    getSuccessLatestPosts: (state, action) => {
      state.loading = false;
      state.latest = action.payload;
    },
    getSuccessDayAgoPosts: (state, action) => {
      state.loading = false;
      state.dayAgo = action.payload;
    },
    getSuccessCute5Posts: (state, action) => {
      state.loading = false;
      state.cute5 = action.payload;
    },
    getSuccessFav5Posts: (state, action) => {
      state.loading = false;
      state.fav5 = action.payload;
    },
    getSuccessGood5Posts: (state, action) => {
      state.loading = false;
      state.good5 = action.payload;
    },
    getSuccessCool5Posts: (state, action) => {
      state.loading = false;
      state.cool5 = action.payload;
    },
    postSuccessReactions: (state, action) => {
      state.loading = false;
      state.post = action.payload;
    },
    destorySuccessReactions: (state, action) => {
      state.loading = false;
      state.post = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryPosts.fulfilled, (state, action) => {
      const getAction = postModule.actions.getSuccessSearchPosts(action.payload);
      postModule.caseReducers.getSuccessSearchPosts(state, getAction);
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      const getAction = postModule.actions.getSuccessPost(action.payload);
      postModule.caseReducers.getSuccessPost(state, getAction);
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      if (action.payload.path === 'latest') {
        const getAction = postModule.actions.getSuccessLatestPosts(action.payload.posts);
        postModule.caseReducers.getSuccessLatestPosts(state, getAction);
      } else if (action.payload.path === 'day_ago') {
        const getAction = postModule.actions.getSuccessDayAgoPosts(action.payload.posts);
        postModule.caseReducers.getSuccessDayAgoPosts(state, getAction);
      } else if (action.payload.path === 'reactions/bests/cute') {
        const getAction = postModule.actions.getSuccessCute5Posts(action.payload.posts);
        postModule.caseReducers.getSuccessCute5Posts(state, getAction);
      } else if (action.payload.path === 'reactions/bests/fav') {
        const getAction = postModule.actions.getSuccessFav5Posts(action.payload.posts);
        postModule.caseReducers.getSuccessFav5Posts(state, getAction);
      } else if (action.payload.path === 'reactions/bests/good') {
        const getAction = postModule.actions.getSuccessGood5Posts(action.payload.posts);
        postModule.caseReducers.getSuccessGood5Posts(state, getAction);
      } else if (action.payload.path === 'reactions/bests/cool') {
        const getAction = postModule.actions.getSuccessCool5Posts(action.payload.posts);
        postModule.caseReducers.getSuccessCool5Posts(state, getAction);
      }
    });
    builder.addCase(postReactions.fulfilled, (state, action) => {
      const getAction = postModule.actions.postSuccessReactions(action.payload);
      postModule.caseReducers.postSuccessReactions(state, getAction);
    });
    builder.addCase(destroyReactions.fulfilled, (state, action) => {
      const getAction = postModule.actions.destorySuccessReactions(action.payload);
      postModule.caseReducers.destorySuccessReactions(state, getAction);
    });
    builder.addCase(postReactions.rejected, (_state, action) => {
      alert(action.payload?.message);
    });
    builder.addCase(destroyReactions.rejected, (_state, action) => {
      alert(action.payload?.message);
    });
  },
});

export const {
  getSuccessPost,
  getSuccessSearchPosts,
  getSuccessLatestPosts,
  getSuccessDayAgoPosts,
  getSuccessCute5Posts,
  getSuccessFav5Posts,
  getSuccessGood5Posts,
  getSuccessCool5Posts,
  postSuccessReactions,
  destorySuccessReactions,
} = postModule.actions;

export default postModule.reducer;
