import { createSelector } from 'reselect';
import { InitialState } from 're-ducks/store/initialState';

const postsSelector = (state: InitialState) => state.posts;

export const getPostsLatest = createSelector(
  [postsSelector],
  (state) => state.latest,
);

export default getPostsLatest;
