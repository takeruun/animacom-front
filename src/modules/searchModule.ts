import { createSlice } from '@reduxjs/toolkit';

type SearchType = {
  word: string,
};

const initialState: SearchType = {
  word: '',
};

export const searchModule = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateWord: (state, action) => {
      state.word = action.payload;
    },
  },
});

export const { updateWord } = searchModule.actions;
