import { Action } from 'redux';
import { PostType } from 're-ducks/post/types';

export type PostsState = {
  latest: Array<PostType>,
  dayAgo: Array<PostType>,
  cute5: Array<PostType>,
  fav5: Array<PostType>,
  good5: Array<PostType>,
  cool5: Array<PostType>,
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
  param: string,
}

export interface FETCH_LATEST_POSTS extends Action {
  type: 'FETCH_LATEST_POSTS',
  payload: Array<PostType>,
}

export interface FETCH_DAY_AGO_POSTS extends Action {
  type: 'FETCH_DAY_AGO_POSTS',
  payload: Array<PostType>,
}

export interface FETCH_CUTE5_POSTS extends Action {
  type: 'FETCH_CUTE5_POSTS',
  payload: Array<PostType>,
}

export interface FETCH_FAV5_POSTS extends Action {
  type: 'FETCH_FAV5_POSTS',
  payload: Array<PostType>,
}

export interface FETCH_GOOD5_POSTS extends Action {
  type: 'FETCH_GOOD5_POSTS',
  payload: Array<PostType>,
}

export interface FETCH_COOL5_POSTS extends Action {
  type: 'FETCH_COOL5_POSTS',
  payload: Array<PostType>,
}

export type ActionsType = START_FETCH |
  END_FETCH |
  FETCH_POSTS |
  FETCH_LATEST_POSTS |
  FETCH_DAY_AGO_POSTS |
  FETCH_CUTE5_POSTS |
  FETCH_FAV5_POSTS |
  FETCH_GOOD5_POSTS |
  FETCH_COOL5_POSTS

