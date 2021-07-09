import { createSelector } from 'reselect';
import { InitialState } from 're-ducks/store/initialState';

const postsSelector = (state: InitialState) => state.posts;

export const getPost = createSelector(
  [postsSelector],
  (state) => state,
);

export const getPostTitle = createSelector(
  [postsSelector],
  (state) => state.title,
);

export const getPostSubTitle = createSelector(
  [postsSelector],
  (state) => state.subTitle,
);

export const getPostBody = createSelector(
  [postsSelector],
  (state) => state.body,
);

export const getPostCategoryId = createSelector(
  [postsSelector],
  (state) => state.categoryId,
);

export const getLoding = createSelector(
  [postsSelector],
  (state) => state.loading,
);
