import { createSelector } from 'reselect';
import { InitialState } from 're-ducks/store/initialState';

const postSelector = (state: InitialState) => state.post;

export const getPost = createSelector(
  [postSelector],
  (state) => state,
);

export const getPostTitle = createSelector(
  [postSelector],
  (state) => state.title,
);

export const getPostSubTitle = createSelector(
  [postSelector],
  (state) => state.subTitle,
);

export const getPostBody = createSelector(
  [postSelector],
  (state) => state.body,
);

export const getPostCategoryId = createSelector(
  [postSelector],
  (state) => state.categoryId,
);

export const getCuteCount = createSelector(
  [postSelector],
  (state) => state.cuteCount,
);

export const getFavCount = createSelector(
  [postSelector],
  (state) => state.favCount,
);

export const getGoodCount = createSelector(
  [postSelector],
  (state) => state.goodCount,
);

export const getCoolCount = createSelector(
  [postSelector],
  (state) => state.coolCount,
);

export const getAlreadyCuted = createSelector(
  [postSelector],
  (state) => state.alreadyCuted,
);

export const getAlreadyFaved = createSelector(
  [postSelector],
  (state) => state.alreadyFaved,
);

export const getAlreadyGooded = createSelector(
  [postSelector],
  (state) => state.alreadyGooded,
);

export const getAlreadyCooled = createSelector(
  [postSelector],
  (state) => state.alreadyCooled,
);
