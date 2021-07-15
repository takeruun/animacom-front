import { Action, Dispatch } from 'redux';
import {
  startFetchAction,
  endFetchAction,
} from './actions';

export const startFetch = () => (
  (dispatch: Dispatch<Action>) => {
    dispatch(startFetchAction());
  }
);

export const endFetch = () => (
  (dispatch: Dispatch<Action>) => {
    dispatch(endFetchAction());
  }
);
