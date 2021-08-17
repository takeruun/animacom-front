import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserReactionCountsAPI } from 'api/Endpoint';
import showSnackbar from 'hook/showSnackbar';

type ReactionCountsType = {
  cuteCount: number,
  favCount: number,
  goodCount: number,
  coolCount: number,
};

export type ReactionCountsStateType = {
  loading: boolean,
  error: string,
  cuteCount: number,
  favCount: number,
  goodCount: number,
  coolCount: number,
};

const initialState: ReactionCountsStateType = {
  loading: false,
  error: '',
  cuteCount: 0,
  favCount: 0,
  goodCount: 0,
  coolCount: 0,
};

export const fetchUserReactionCounts = createAsyncThunk<
  ReactionCountsType,
  void,
  { rejectValue: { message: string } }
>(
  'reactionCounts/fetchUserReactionCounts',
  async (_args, _thunkApi) => {
    try {
      const counts = await fetchUserReactionCountsAPI();

      return {
        cuteCount: counts.find((c: { count: number, kind: number; }) => c.kind === 1)?.count || 0,
        favCount: counts.find((c: { count: number, kind: number; }) => c.kind === 2)?.count || 0,
        goodCount: counts.find((c: { count: number, kind: number; }) => c.kind === 3)?.count || 0,
        coolCount: counts.find((c: { count: number, kind: number; }) => c.kind === 4)?.count || 0,
      };
    } catch (e) {
      showSnackbar(e, _thunkApi);
      return _thunkApi.rejectWithValue({
        message: e.stack,
      });
    }
  },
);

export const reactionCountsModule = createSlice({
  name: 'reactionCounts',
  initialState,
  reducers: {
    getStart: (state) => {
      state.loading = true;
    },
    getSuccessReactionCounts: (state, action) => {
      state.loading = false;
      state.cuteCount = action.payload.cuteCount;
      state.favCount = action.payload.favCount;
      state.goodCount = action.payload.goodCount;
      state.coolCount = action.payload.coolCount;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserReactionCounts.pending, (state) => {
      reactionCountsModule.caseReducers.getStart(state);
    });
    builder.addCase(fetchUserReactionCounts.fulfilled, (state, action) => {
      const getAction = reactionCountsModule.actions.getSuccessReactionCounts(action.payload);
      reactionCountsModule.caseReducers.getSuccessReactionCounts(state, getAction);
    });
  },
});
