import { createSelector } from 'reselect';
import { InitialState } from 're-ducks/store/initialState';

const postsSelector = (state: InitialState) => state.apiStatus;

export const getApiStatusLoading = createSelector(
  [postsSelector],
  (state) => state.loading,
);

export const getApiStatusError = createSelector(
  [postsSelector],
  (state) => state.error,
);
