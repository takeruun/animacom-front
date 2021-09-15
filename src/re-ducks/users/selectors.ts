import { createSelector } from 'reselect';
import { InitialState } from 're-ducks/store/initialState';

const usersSelector = (state: InitialState) => state.users;

export const getIsSignedIn = createSelector(
  [usersSelector],
  (state) => state.isSignedIn,
);

export const getUserId = createSelector(
  [usersSelector],
  (state) => state.uid,
);

export const getUsername = createSelector(
  [usersSelector],
  (state) => state.name,
);

export const getUserNickname = createSelector(
  [usersSelector],
  (state) => state.nickname,
);
