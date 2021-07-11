import { Action } from 'redux';

export type PostType = {
  title: string,
  subTitle: string,
  body: string,
  categoryId: string,
  images: Array<{ id: string, file: File | null, iamgePath: string }>
  loading: boolean,
  error: boolean,
}

export type PostsState = {
  list: PostType[]
}

export interface GET_POST extends Action {
  type: 'GET_POST',
  payload: PostType,
}
export interface CREATE_POST extends Action {
  type: 'CREATE_POST',
  payload: PostType,
}

export interface EDIT_POST extends Action {
  type: 'EDIT_POST',
  payload: PostType,
}
export interface START_FETCH extends Action {
  type: 'START_FETCH',
}

export interface END_FETCH extends Action {
  type: 'END_FETCH',
}

export type ActionsType = CREATE_POST | GET_POST | START_FETCH | EDIT_POST | END_FETCH
