import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCommentsAPI } from 'api/Endpoint';

export type CommentType = {
  id: number,
  userId: number,
  postId: number,
  body: string,
  createdAt: string,
};

export type CommentStateType = {
  loading: boolean,
  comment: Array<CommentType>,
};

const initialState: CommentStateType = {
  loading: false,
  comment: [],
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
    } catch (e) {
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
      state.comment.push(action.payload);
    },
    getSuccessComments: (state, action) => {
      state.comment = action.payload;
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
} = commentModule.actions;
