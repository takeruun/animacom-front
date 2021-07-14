import { Action } from 'redux';
import { PostType } from 're-ducks/post/types';

export type PostsState = {
  latest: Array<PostType>,
}

export interface START_FETCH extends Action {
  type: 'START_FETCH',
}

export interface END_FETCH extends Action {
  type: 'END_FETCH',
}

export interface FETCH_POSTS extends Action {
  type: 'FETCH_POSTS',
  payload: Array<PostType>,
}

export type ActionsType = START_FETCH | END_FETCH | FETCH_POSTS
