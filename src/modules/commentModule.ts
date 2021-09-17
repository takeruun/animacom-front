import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCommentsAPI } from 'api/Endpoint';
import showSnackbar from 'hook/showSnackbar';

export type CommentType = {
  id: number,
  userId: number,
  nickname: string,
  postId: number,
  body: string,
  createdAt: string,
};

export type CommentStateType = {
  loading: boolean,
  comments: Array<CommentType>,
};

export const initialState: CommentStateType = {
  loading: false,
  comments: [],
};

export const fetchComments = createAsyncThunk<
  Array<CommentType>,
  string,
  { rejectValue: { message: string } }
>(
  'comment/fetchComments',
  async (_args, _thunkApi) => {
    try {
      const res = await fetchCommentsAPI(_args);
      return res;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      _thunkApi.dispatch(showSnackbar({ e }));
      return _thunkApi.rejectWithValue({
        message: e.stack,
      });
    }
  },
);

export const commentModule = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    getStart: (state) => {
      state.loading = true;
    },
    getSuccessComment: (state, action) => {
      state.comments.push(action.payload);
    },
    getSuccessComments: (state, action) => {
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      const getAction = commentModule.actions.getSuccessComments(action.payload);
      commentModule.caseReducers.getSuccessComments(state, getAction);
    });
  },
});

export const {
  getSuccessComment,
  getSuccessComments,
} = commentModule.actions;

export default commentModule.reducer;
