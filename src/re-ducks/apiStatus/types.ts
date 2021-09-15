import { Action } from 'redux';

export type ApiStatusState = {
  loading: boolean,
  error: boolean,
}

export interface START_FETCH extends Action {
  type: 'START_FETCH',
}

export interface END_FETCH extends Action {
  type: 'END_FETCH',
}

export type ActionsType = START_FETCH | END_FETCH