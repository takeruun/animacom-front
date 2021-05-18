import { createSelector } from 'reselect';
import { InitialState } from 're-ducks/store/initialState';

const usersSelector = (state: InitialState) => state.users;

export const getUserId = createSelector(
  [usersSelector],
  (state) => state.uid,
);

export const getUsername = createSelector(
  [usersSelector],
  (state) => state.name,
);
