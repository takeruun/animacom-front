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
