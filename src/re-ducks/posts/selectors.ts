import { createSelector } from 'reselect';
import { InitialState } from 're-ducks/store/initialState';

const postsSelector = (state: InitialState) => state.posts;

export const getPosts = createSelector(
  [postsSelector],
  (state) => state.list,
);

export const getPostTitle = createSelector(
  [postsSelector],
  (state) => state.list[0].title
)

export default getPosts;
