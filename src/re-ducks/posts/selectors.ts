import { createSelector } from 'reselect';
import { InitialState } from 're-ducks/store/initialState';

const postsSelector = (state: InitialState) => state.posts;

export const getLatestPosts = createSelector(
  [postsSelector],
  (state) => state.latest,
);

export const getDayAgoPosts = createSelector(
  [postsSelector],
  (state) => state.dayAgo,
);

export const getCute5Posts = createSelector(
  [postsSelector],
  (state) => state.cute5,
);

export const getFav5Posts = createSelector(
  [postsSelector],
  (state) => state.fav5,
);

export const getCool5Posts = createSelector(
  [postsSelector],
  (state) => state.cool5,
);

export const getGood5Posts = createSelector(
  [postsSelector],
  (state) => state.good5,
);
